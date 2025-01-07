import React, { useState } from 'react'
import { Button, Grid, Title, Text, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { IconCreditCard, IconShoppingCart } from '@tabler/icons'
import OrderSummary from '../../components/OrderSummary'
import ErrorAlert from '../../components/ErrorAlert'
import { getProducts, getTotals } from '../../utils/products'
import { ProductFlow } from "../../types/types"
import { CheckoutOptions } from '../../components/CheckoutOptions'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const Checkout: React.FC<{
  appData: any
  updateAppData: any
}> = ({ appData, updateAppData }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)

  const { customerForm, productFlow, mode } = appData
  const { localeSelector, guestMode, isLegacySDK } = customerForm

  const onPay = async () => {
    setLoading(true)
    if (!isLegacySDK && mode !== 'redirect') {
      window.SlopeJs.open()
    }

    let customerJson
    if (!guestMode) {
      const customerResp = await fetch('/api/create-customer', {
        method: 'POST',
        body: JSON.stringify(customerForm),
      })

      customerJson = await customerResp.json()

      if (!customerJson.customer) {
        setLoading(false)
        setError(customerJson)
        return
      }
    }

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        ...customerForm,
        customerId: guestMode ? undefined : customerJson.customer.id,
        total,
        items: products.map((p) => ({
          sku: p.sku,
          name: p.name,
          description: p.name,
          unitPrice: p.price,
          price: p.price * p.quantity,
          type: 'lineItem',
          quantity: p.quantity,
        })),
      }),
    })

    const { secret, order } = await orderRes.json()

    let offerType
    switch (productFlow) {
      case ProductFlow.BNPL_ONLY:
      case ProductFlow.PAY_NOW_ONLY:
        offerType = productFlow
        break
      default:
        break
    }

    const successPath = `/success?orderNumber=${order.number}`

    if (mode === 'redirect') {
      // NOTE: The redirect API is still private and should not be used by developers.
      // Contact the Slope team if you're interested in using the redirect API.
      const baseHost = `${window.location.protocol}//${window.location.host}`
      const urlParams = new URLSearchParams({
        localeSelector,
        secret,
        mode: 'redirect',
        cancelUrl: `${baseHost}/`,
        successUrl: `${baseHost}${successPath}`,
      })
      window.location.href = `${
        process.env.NEXT_PUBLIC_CHECKOUT_HOST
      }/en/pay?${urlParams.toString()}`
      return
    }

    const slopeParams = {
      primaryColor: appData.primaryColor,
      localeSelector,
      flow: 'checkout',
      intentSecret: secret,
      offerType,
      onSuccess: async () => {
        router.push(successPath)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {
        setLoading(false)
      },
      onOrderOpen: (payload) => {
        console.log('Slope order open', payload)
      },
      onEvent: console.log,
    }

    if (isLegacySDK) {
      window.initializeSlope(slopeParams)
      window.Slope.open()
    } else {
      window.SlopeJs.start(slopeParams)
    }
  }

  const slopeButton = (
    <Button
      leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={22} />}
      fullWidth
      color="orange"
      loading={loading}
      onClick={onPay}
    >
      {productFlow === ProductFlow.BNPL_ONLY ? 'Pay later with Slope' : 'Pay with Slope'}
    </Button>
  )

  return (
    <>
      <Title order={2} mb="xl">
        <Group spacing="xs">
          <IconShoppingCart />
          <Text span>Checkout V3 API (DEPRECATED)</Text>
        </Group>
      </Title>

      <Grid gutter="xl">
        <Grid.Col md={12} lg={4}>
          <CheckoutOptions appData={appData} updateAppData={updateAppData} isV3 />
        </Grid.Col>
        <Grid.Col md={12} lg={8}>
          <ErrorAlert error={error} setError={setError} />
          <OrderSummary
            product={product}
            setProduct={setProduct}
            total={total}
            setTotal={setTotal}
          />
          <Title order={3} mb="sm">
            Payment
          </Title>
          {productFlow !== ProductFlow.BNPL_ONLY ? (
            slopeButton
          ) : (
            <Grid align="center" gutter="xs" columns={11}>
              <Grid.Col md={11} lg={5}>
                <Button
                  leftIcon={<IconCreditCard />}
                  fullWidth
                  onClick={() => alert('Try paying with Slope!')}
                >
                  Pay now
                </Button>
              </Grid.Col>
              <Grid.Col md={11} lg={1}>
                <Text fw={700} sx={{ textAlign: 'center' }}>
                  OR
                </Text>
              </Grid.Col>
              <Grid.Col md={11} lg={5}>
                {slopeButton}
              </Grid.Col>
            </Grid>
          )}
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Checkout
