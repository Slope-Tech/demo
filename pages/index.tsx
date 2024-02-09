import React, { useState } from 'react'
import {
  Button,
  Grid,
  Title,
  Text,
  Group,
  Checkbox,
  Container,
  ColorPicker,
  TextInput,
} from '@mantine/core'
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
  const [localeSelectorChecked, setLocaleSelector] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('')
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)

  const localeSelector =
    productFlow === ProductFlow.PAY_NOW_ONLY && localeSelectorChecked ? 'true' : ''

  const onChangeRedirect = (event) => {
    setCustomerForm({ ...customerForm, mode: event.currentTarget.checked ? 'redirect' : null })
  }

  const onChangeLocaleSelector = (event) => {
    setLocaleSelector(event.currentTarget.checked)
  }

  const onChangeGuest = (event) => {
    setIsGuest(event.currentTarget.checked)
  }

  const guestMode = isGuest && productFlow === ProductFlow.PAY_NOW_ONLY

  const onPay = async () => {
    setLoading(true)

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

    if (customerForm.mode === 'redirect') {
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

    const primaryColorObject = primaryColor
      ? { primaryColor: (primaryColor as string).slice(1) }
      : {}
    // @ts-ignore
    window.initializeSlope({
      ...primaryColorObject,
      localeSelector,
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
          <OrderSummary product={product} setProduct={setProduct} total={total} setTotal={setTotal} />
          <Container bg="gray.1" py="xs" mt="sm">
            <Title mt="lg" mb="sm" order={4}>
              Slope Options
            </Title>

            <Checkbox
              onChange={onChangeRedirect}
              checked={customerForm.mode === 'redirect'}
              label="Perform a full-screen redirect"
              mb="xs"
            />
            <Checkbox
              onChange={onChangeLocaleSelector}
              checked={!!localeSelector}
              disabled={productFlow !== ProductFlow.PAY_NOW_ONLY}
              label="Display language selector"
              mb="xs"
            />
            <Checkbox
              onChange={onChangeGuest}
              checked={guestMode}
              disabled={productFlow !== ProductFlow.PAY_NOW_ONLY}
              label="Guest checkout mode"
              mb="xs"
            />

            {customerForm.mode !== 'redirect' && (
              <>
                <TextInput
                  value={primaryColor}
                  label="Widget theme"
                  mb="xs"
                  labelProps={{
                    style: { backgroundColor: primaryColor, padding: '3px', borderRadius: '3px' },
                  }}
                  readOnly
                />
                <ColorPicker
                  mb="xs"
                  format="hex"
                  swatches={[
                    '#FD611A',
                    '#868e96',
                    '#be4bdb',
                    '#4c6ef5',
                    '#228be6',
                    '#12b886',
                    '#fab005',
                  ]}
                  value={primaryColor}
                  onChange={setPrimaryColor}
                />
              </>
            )}
          </Container>
        </Grid.Col>
        <Grid.Col md={12} lg={8}>
          <ErrorAlert error={error} setError={setError} />
          <Title order={3} mb="sm">
            Customer
          </Title>
          <CustomerForm
            customerForm={customerForm}
            setCustomerForm={setCustomerForm}
            isDisabled={guestMode}
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
