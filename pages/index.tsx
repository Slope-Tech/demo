import React, { useState } from 'react'
import { Button, Grid, Title, Text, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { IconCreditCard, IconShoppingCart } from '@tabler/icons'
import ErrorAlert from '../components/ErrorAlert'
import OrderSummary from '../components/OrderSummary'
import { AppData, ProductFlow } from '../types/types'
import { getProducts, getTotals } from '../utils/products'
import { CheckoutOptions } from '../components/CheckoutOptions'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const Checkout: React.FC<{
  appData: AppData
  updateAppData: any
}> = ({ appData, updateAppData }) => {
  const { customerForm, productFlow, mode, primaryColor, accessToken } = appData
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)
  const [currentProducts, setCurrentProducts] = useState(products)

  const onPay = async () => {
    setLoading(true)
    if (mode !== 'redirect') {
      window.SlopeJs.open()
    }

    const orderRes = await fetch('/api/v4-create-order', {
      method: 'POST',
      body: JSON.stringify({
        total,
        currency: 'usd',
        contactBusinessName: customerForm.businessName,
        contactEmail: customerForm.email,
        contactPhone: customerForm.phone,
        billingAddress: {
          line1: customerForm.line1,
          city: customerForm.city,
          state: customerForm.state,
          postalCode: customerForm.postalCode,
          country: customerForm.country,
        },
        items: currentProducts.map((p) => ({
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

    const { order } = await orderRes.json()

    let offerType
    switch (appData.productFlow) {
      case ProductFlow.BNPL_ONLY:
      case ProductFlow.PAY_NOW_ONLY:
        offerType = appData.productFlow
        break
      default:
        break
    }

    const successPath = `/success?orderNumber=${order.number}`

    if (mode === 'redirect') {
      const baseHost = `${window.location.protocol}//${window.location.host}`
      const urlParams = new URLSearchParams({
        cancelUrl: `${baseHost}/`,
        successUrl: `${baseHost}${successPath}`,
      })
      window.location.href = `${order.checkoutUrl}&${urlParams.toString()}`
      return
    }

    const slopeParams = {
      primaryColor: (primaryColor as string) || undefined,
      code: order.checkoutCode,
      accessToken,
      offerType,
      flow: 'checkout',
      onSuccess: async (payload) => {
        console.log('Slope onSuccess callback: ', payload)
        router.push(successPath)
      },
      onFailure: (err) => {
        console.log('Slope onFailure callback: ', err)
        console.error(err)
      },
      onClose: () => {
        setLoading(false)
      },
      onOrderOpen: (payload) => {
        console.log('Slope onOrderOpen callback: ', payload)
      },
      onEvent: (payload) => {
        console.log('Slope onEvent callback: ', payload)
      },
    }

    window.SlopeJs.start(slopeParams)
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
          <Text span>Checkout</Text>
        </Group>
      </Title>

      <Grid gutter="xl">
        <Grid.Col md={12} lg={4}>
          <CheckoutOptions appData={appData} updateAppData={updateAppData} />
        </Grid.Col>
        <Grid.Col md={12} lg={8}>
          <ErrorAlert error={error} setError={setError} />

          <OrderSummary
            product={product}
            setProduct={setProduct}
            total={total}
            setTotal={setTotal}
            onProductsChange={setCurrentProducts}
          />

          <Title order={3} mb="sm" mt="lg">
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
