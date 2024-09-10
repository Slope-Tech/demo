import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Box, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { useState } from 'react'
import { CustomerType, generateDemoEmail } from '../utils/email'

const SlopeDemo = ({ Component, pageProps }: AppProps) => {
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
  const [customerForm, setCustomerForm] = useState({
    businessName: 'Slope Demo Customer',
    customerType: CustomerType.NEW,
    email: generateDemoEmail({ customerType: CustomerType.NEW }),
    phone: '+16175551212',
    line1: '123 California St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
    currency: 'usd',
    qualified: true,
    product: 'Soda',
    kyb: {
      entityType: 'LLC'
    },
    kybQuestionnaire: {
      transactionVolumeEstimate: 15000_00,
    }
  })

  return (
    <div>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>Slope Checkout Demo</title>
        <script async src={`${process.env.NEXT_PUBLIC_CHECKOUT_HOST}/slope.min.js?v=2`} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={providerTheme}>
          <Box m={0} p={0} w='100vw' h='100vh' bg='gray.4'>
            <Component
              {...pageProps}
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
            />
          </Box>
      </MantineProvider>
    </div>
  )
}

export default SlopeDemo
