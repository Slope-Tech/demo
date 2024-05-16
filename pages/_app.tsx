import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppShell, Container, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { useState } from 'react'

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

  const providerTheme: MantineThemeOverride = {
    colors: {
      fog: [
        '#F8FAFF',
        '#F6F9FF',
        '#F2F6FE',
        '#EDF3FE',
        '#E9F0FE',
        '#BBC3D4',
        '#8D97AB',
        '#5E6A81',
        '#47546C',
        '#303E58',
      ],
    },
    primaryColor: 'fog',
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
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>Slope Checkout Demo</title>
        <script async src={`${process.env.NEXT_PUBLIC_CHECKOUT_HOST}/slope.min.js?v=2`} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={providerTheme}>
        <AppShell
          styles={(theme) => ({
            main: {
              backgroundColor: theme.colors.gray[6],
              padding: 0
            },
          })}
        >
          <Container>
            <Component
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              {...pageProps}
            />
          </Container>
        </AppShell>
      </MantineProvider>
    </div>
  )
}

export default SlopeDemo
