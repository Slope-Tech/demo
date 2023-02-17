import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppShell, Container, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import MainFooter from '../components/MainFooter'
import MainHeader from '../components/MainHeader'
import { ProductFlow } from '../utils/email'

const SlopeDemo = ({ Component, pageProps }: AppProps) => {
  const [customerForm, setCustomerForm] = useState({
    businessName: 'Slope Demo Customer',
    email: 'demo@slope.so',
    phone: '+16175551212',
    line1: '123 California St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
    currency: 'usd',
    qualified: true,
    product: 'Soda',
  })

  const [productFlow, setProductFlow] = useState<ProductFlow>(ProductFlow.BNPL_AND_PAY_NOW)

  const providerTheme = {
    globalStyles: (theme) => ({
      body: {
        backgroundColor: theme.colors.gray[0],
      },
      main: {
        backgroundColor: 'white',
      },
    }),
  }

  return (
    <div>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
        <title>Slope Checkout Demo</title>
        <script async src={`${process.env.NEXT_PUBLIC_CHECKOUT_HOST}/slope.min.js`} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={providerTheme}>
        <AppShell
          padding="xl"
          header={
            <MainHeader
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              productFlow={productFlow}
              setProductFlow={setProductFlow}
            />
          }
          footer={<MainFooter />}
        >
          <Container pb={20}>
            <Component
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              productFlow={productFlow}
              {...pageProps}
            />
          </Container>
        </AppShell>
      </MantineProvider>
    </div>
  )
}

export default SlopeDemo
