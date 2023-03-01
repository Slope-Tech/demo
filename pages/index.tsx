import React, { useState } from 'react'
import { Button, Grid, Title, Text, Group, Checkbox } from '@mantine/core'
import { useRouter } from 'next/router'
import { IconCreditCard, IconShoppingCart } from '@tabler/icons'
import CustomerForm from '../components/CustomerForm'
import OrderSummary from '../components/OrderSummary'
import ErrorAlert from '../components/ErrorAlert'
import { getProducts, getTotals } from '../utils/products'
import { ProductFlow } from '../utils/email'

const Checkout: React.FC<{
  customerForm: Record<string, any>
  setCustomerForm: any
  productFlow: ProductFlow
}> = ({ customerForm, setCustomerForm, productFlow }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChangeRedirect = (event) => {
    setCustomerForm({ ...customerForm, mode: event.currentTarget.checked ? 'redirect' : null })
  }

  const onPay = async () => {
    setLoading(true)

    const customerResp = await fetch('/api/create-customer', {
      method: 'POST',
      body: JSON.stringify(customerForm),
    })

    const customerJson = await customerResp.json()

    if (!customerJson.customer) {
      setLoading(false)
      setError(customerJson)
      return
    }

    const products = getProducts(customerForm.product)
    const totals = getTotals(products)

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        ...customerForm,
        customerId: customerJson.customer.id,
        total: totals.total,
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

    if (customerForm.mode === 'redirect') {
      // NOTE: The redirect API is still private and should not be used by developers.
      // Contact the Slope team if you're interested in using the redirect API.
      const baseHost = `${window.location.protocol}//${window.location.host}`
      const urlParams = new URLSearchParams({
        secret,
        mode: 'redirect',
        cancelUrl: `${baseHost}/`,
        successUrl: `${baseHost}${successPath}`,
      })
      window.location.href = `${process.env.NEXT_PUBLIC_CHECKOUT_HOST}/pay?${urlParams.toString()}`
      return
    }

    // @ts-ignore
    window.initializeSlope({
      intentSecret: secret,
      offerType,
      onSuccess: async () => {
        router.push(successPath)
      },
      onFailure: (err) => {
        console.error(err)
        alert(err.message)
      },
      onClose: () => {
        setLoading(false)
      },
      onEvent: console.log,
    })
    // @ts-ignore
    window.Slope.open()
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
          <OrderSummary product={customerForm.product} />
        </Grid.Col>
        <Grid.Col md={12} lg={8}>
          <Title order={3} mb="xs">
            Customer
          </Title>
          <ErrorAlert error={error} setError={setError} />
          <CustomerForm customerForm={customerForm} setCustomerForm={setCustomerForm} />

          <Title mt="lg" mb="sm" order={3}>
            Payment
          </Title>
          <Checkbox
            onChange={onChangeRedirect}
            checked={customerForm.mode === 'redirect'}
            label="Perform a full-screen redirect"
            mb="md"
          />
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
