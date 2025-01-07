import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Title,
  Text,
  Group,
  Table,
  Card,
  Space,
  Select,
  LoadingOverlay,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { IconShoppingCart } from '@tabler/icons'
import OrderSummary from '../../components/OrderSummary'
import ErrorAlert from '../../components/ErrorAlert'
import { formatCurrency, getProducts, getTotals } from '../../utils/products'
import { AppData, CustomerType, ProductFlow } from '../../types/types'
import { CheckoutOptions } from '../../components/CheckoutOptions'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const toTermKeyLabel = (termKey: string) => {
  let key = termKey.replace('_', ' ')
  key = key.charAt(0).toUpperCase() + key.slice(1)
  return key
}

const Checkout: React.FC<{
  appData: AppData
  updateAppData: any
}> = ({ appData, updateAppData }) => {
  const { customerForm, mode } = appData

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)
  const [customer, setCustomer] = useState<any>(null)
  const [customerSecret, setCustomerSecret] = useState<string | null>()
  const [financingTerm, setFinancingTerm] = useState<string | null>(null)
  const [loadingEstimatedPayout, setLoadingEstimatedPayout] = useState(false)
  const [estimatedDiscountedPayout, setEstimatedDiscountedPayout] = useState<any[] | null>(null)
  const selectedDiscountedPayout = estimatedDiscountedPayout?.find(
    (dp) => dp.termKey === financingTerm
  )

  const localeSelector = ''
  const guestMode = false

  const fetchEstimatedDiscountedPayout = async (
    customerId: string,
    secret: string,
    orderTotal: number
  ) => {
    setLoadingEstimatedPayout(true)
    const resp = await fetch('/api/estimated-discounted-payout', {
      method: 'POST',
      headers: {
        Authorization: secret,
      },
      body: JSON.stringify({
        customerId,
        total: orderTotal,
      }),
    })
    const updatedEstimatedDiscountedPayout = await resp.json()
    setEstimatedDiscountedPayout(updatedEstimatedDiscountedPayout.discountedPayouts)
    setLoadingEstimatedPayout(false)
  }

  useEffect(() => {
    if (customer && customerSecret) {
      fetchEstimatedDiscountedPayout(customer.id, customerSecret, total)
    }
  }, [customer?.id, total, financingTerm])

  const initCustomer = async () => {
    const customerResp = await fetch('/api/create-customer', {
      method: 'POST',
      body: JSON.stringify({
        ...customerForm,
        email: `test${CustomerType.SKIP_PRE_QUALIFY}@slopepay.com`,
      }),
    })
    const createdCustomer = await customerResp.json()
    setCustomer(createdCustomer.customer)
    setCustomerSecret(createdCustomer.secret)
    await fetchEstimatedDiscountedPayout(createdCustomer.customer.id, createdCustomer.secret, total)
  }

  useEffect(() => {
    initCustomer()
  }, [])

  const onPay = async () => {
    if (!selectedDiscountedPayout) {
      window.alert('Please select a financing term')
      return
    }

    setLoading(true)
    if (mode !== 'redirect') {
      window.SlopeJs.open()
    }

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        ...customerForm,
        customerId: guestMode ? undefined : customer.id,
        total: selectedDiscountedPayout.principal,
        additionalData: {
          // This is not a public API feature
          // Internal API is subject to change at any time at Slope's sole discretion
          requestedTerms: selectedDiscountedPayout.termKey,
          selectPayoutAtCheckout: true,
        },
        items: [
          ...products.map((p) => ({
            sku: p.sku,
            name: p.name,
            description: p.name,
            unitPrice: p.price,
            price: p.price * p.quantity,
            type: 'lineItem',
            quantity: p.quantity,
          })),
          {
            type: 'discount',
            name: 'Payout discount',
            unitPrice: -selectedDiscountedPayout.financingFee,
            price: -selectedDiscountedPayout.financingFee,
            quantity: 1,
          },
        ],
      }),
    })

    const { secret, order } = await orderRes.json()

    const successPath = `/seller_financing/success?orderNumber=${order.number}`

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
      offerType: ProductFlow.BNPL_ONLY,
      intentSecret: secret,
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

    window.SlopeJs.start(slopeParams)
  }

  const slopeButton = (
    <Button
      leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={22} />}
      fullWidth
      color="orange"
      loading={loading}
      onClick={onPay}
      disabled={!customerSecret || !customer || !financingTerm}
    >
      Get paid with Slope
    </Button>
  )

  return (
    <>
      <Title order={2} mb="xl">
        <Group spacing="xs">
          <IconShoppingCart />
          <Text span>Seller Financing</Text>
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
          />

          <Title order={3} mb="sm">
            Financing Options
          </Title>
          <Text size="sm">
            Rates provided below are estimated and do not constitute an actual offer.
            <br />
            Financing eligibility and rates subject to change.
          </Text>
          <Space h="md" />

          <Select
            label="Financing term"
            placeholder="Select your term"
            value={financingTerm}
            onChange={setFinancingTerm}
            clearable
            mb="md"
            data={
              estimatedDiscountedPayout?.map((dp) => ({
                label: toTermKeyLabel(dp.termKey),
                value: dp.termKey,
              })) || []
            }
          />

          {selectedDiscountedPayout && (
            <Card withBorder shadow="sm" radius="md" mb="md">
              <LoadingOverlay visible={loadingEstimatedPayout} />
              <Table>
                <thead>
                  <td>Term</td>
                  <td>Payout amount</td>
                  <td>Estimated fee</td>
                  <td>Discount Rate</td>
                </thead>
                <tbody>
                  {selectedDiscountedPayout && (
                    <tr key={selectedDiscountedPayout.termKey}>
                      <td>{toTermKeyLabel(selectedDiscountedPayout.termKey)}</td>
                      <td>{formatCurrency(selectedDiscountedPayout.principal)}</td>
                      <td>{formatCurrency(selectedDiscountedPayout.financingFee)}</td>
                      <td>{selectedDiscountedPayout.discountFeePct.toFixed(2)}%</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          )}

          {slopeButton}
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Checkout
