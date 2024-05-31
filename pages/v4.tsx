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
  Alert,
  Anchor,
  Code,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { IconCreditCard, IconShoppingCart, IconUserPlus } from '@tabler/icons'
import OrderSummary from '../components/OrderSummary'
import ErrorAlert from '../components/ErrorAlert'
import { getProducts, getTotals } from '../utils/products'
import { ProductFlow, customerTypeToShortcutTypes, parseTaxIdFromEmail } from '../utils/email'
import CustomerForm from '../components/CustomerForm'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const Checkout: React.FC<{
  customerForm: Record<string, any>
  setCustomerForm: any
  productFlow: ProductFlow
}> = ({ customerForm, setCustomerForm, productFlow }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [error, setError] = useState(null)
  const [primaryColor, setPrimaryColor] = useState('')
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)
  const [createCustomerResponse, setCreateCustomerResponse] = useState<any>(undefined)

  const onChangeRedirect = (event) => {
    setCustomerForm({ ...customerForm, mode: event.currentTarget.checked ? 'redirect' : null })
  }

  const onClickCreateCustomer = async () => {
    setLoadingUser(true)
    const response = await fetch('/api/v4-create-customer', {
      method: 'POST',
      body: JSON.stringify({
        shortcutTypes: customerTypeToShortcutTypes(customerForm.customerType),
        businessName: customerForm.businessName,
        phone: customerForm.phone,
        address: {
          line1: customerForm.line1,
          city: customerForm.city,
          state: customerForm.state,
          postalCode: customerForm.postalCode,
          country: customerForm.country,
        },
        taxId: parseTaxIdFromEmail(customerForm.email),
      }),
    })

    const body = await response.json()
    setCreateCustomerResponse(body)
    setLoadingUser(false)
  }

  const onPay = async () => {
    setLoading(true)
    if (customerForm.mode !== 'redirect') {
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

    const { order } = await orderRes.json()

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
        cancelUrl: `${baseHost}/`,
        successUrl: `${baseHost}${successPath}`,
      })
      window.location.href = `${order.checkoutUrl}&${urlParams.toString()}`
      return
    }

    const primaryColorObject = primaryColor
      ? { primaryColor: (primaryColor as string).slice(1) }
      : {}

    const slopeParams = {
      ...primaryColorObject,
      code: order.checkoutCode,
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

  let createdCustomerBody

  if (createCustomerResponse) {
    createdCustomerBody = (
      <Alert my="sm" color="green" title="New user account created:">
        <Text>
          Email: <Code>{createCustomerResponse.email}</Code>
        </Text>
        <Text>
          Password: <Code>{createCustomerResponse.password}</Code>
        </Text>
      </Alert>
    )
  }

  return (
    <>
      <Alert color="blue" title="This is the Slope V4 API" mb="md">
        <Group position="apart" noWrap>
          <Text>
            Customers will be asked to sign in or create a new Slope account prior to checkout. To
            learn more about the API changes visit our{' '}
            <Anchor
              color="blue"
              href="https://developers.slopepay.com/v4/docs/rfc-v4-api"
              target="_blank"
            >
              updated developer docs
            </Anchor>
            .
          </Text>
          <Button
            component="a"
            color="blue"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              router.push('/')
            }}
          >
            Return back to V3
          </Button>
        </Group>
      </Alert>
      <Title order={2} mb="xl">
        <Group spacing="xs">
          <IconShoppingCart />
          <Text span>Checkout: V4 API</Text>
        </Group>
      </Title>

      <Grid gutter="xl">
        <Grid.Col md={12} lg={4}>
          <OrderSummary
            product={product}
            setProduct={setProduct}
            total={total}
            setTotal={setTotal}
          />
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
          <CustomerForm customerForm={customerForm} setCustomerForm={setCustomerForm} />

          <Button
            leftIcon={<IconUserPlus />}
            fullWidth
            color="blue"
            loading={loadingUser}
            onClick={onClickCreateCustomer}
          >
            Create Slope user account
          </Button>

          {createdCustomerBody}

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
