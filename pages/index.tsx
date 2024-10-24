import React, { useState } from 'react'
import { Button, Grid, Title, Text, Group, Image, Space } from '@mantine/core'
import { IconCreditCard, IconShoppingCart } from '@tabler/icons'
import ErrorAlert from '../components/ErrorAlert'
import OrderSummary from '../components/OrderSummary'
import { AppData, ProductFlow } from '../types/types'
import { getProducts, getTotals } from '../utils/products'
import { CheckoutOptions } from '../components/CheckoutOptions'
import usePaymentButton from '../utils/custom-demos/usePaymentButton'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const Checkout: React.FC<{
  appData: AppData
  updateAppData: any
}> = ({ appData, updateAppData }) => {
  const { productFlow } = appData
  const [error, setError] = useState(null)
  const [product, setProduct] = useState('Soda')
  const products = getProducts(product)
  const totals = getTotals(products)
  const [total, setTotal] = useState(totals.total)
  const paymentButton = usePaymentButton()

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
          />

          <Space h="lg" />
          <Title order={3}>Payment options by</Title>
          <Group align="center" spacing='.5rem' mt={-4}>
            <Text lh={1}>powered by</Text>
            <Image src="/images/fiserv-logo.svg" alt="Fiserv logo" width="3rem" />
          </Group>
          <Space h="lg" />
          {productFlow !== ProductFlow.BNPL_ONLY ? (
            paymentButton.rendered
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
                {paymentButton.rendered}
              </Grid.Col>
            </Grid>
          )}
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Checkout
