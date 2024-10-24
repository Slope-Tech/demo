import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppShell, Container, MantineProvider, MantineThemeOverride } from '@mantine/core'
import React, { useContext, useMemo, useState } from 'react'
import MainFooter from '../components/MainFooter'
import { MainHeader } from '../components/MainHeader'
import { generateDemoEmail } from '../utils/email'
import { AppData, CustomerType, ProductFlow } from '../types/types'
import CustomerForm from '../components/CustomerForm'

const AppDataContext = React.createContext<{
  appData: AppData
  updateAppData: (newData: Partial<AppData>) => void
}>({} as any)

export function useAppData() {
  const { appData, updateAppData } = useContext(AppDataContext)
  return [appData, updateAppData] as const
}

const SlopeDemo = ({ Component, pageProps }: AppProps) => {
  const [appData, setAppData] = useState<AppData>({
    customerForm: {
      businessName: 'Slope Demo Customer',
      customerType: CustomerType.SKIP_PRE_QUALIFY,
      email: generateDemoEmail({ customerType: CustomerType.SKIP_PRE_QUALIFY }),
      phone: '+16175551212',
      line1: '123 California St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
      currency: 'usd',
      product: 'Soda',
      isLinked: true,
    },
    productFlow: ProductFlow.BNPL_ONLY,
    primaryColor: '#FE0102',
  })

  const updateAppData = (newData: Partial<AppData>) => {
    setAppData({ ...appData, ...newData })
  }

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

  const appDataContext = useMemo(() => ({ appData, updateAppData }), [appData])

  return (
    <div>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>Slope Checkout Demo</title>
        <script async src={`${process.env.NEXT_PUBLIC_CHECKOUT_HOST}/slope.min.js?v=2`} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={providerTheme}>
        <AppDataContext.Provider value={appDataContext}>
          <AppShell padding={0} header={<MainHeader />} footer={<MainFooter />}>
            <CustomerForm appData={appData} updateAppData={updateAppData} />
            <Container py={20}>
              <Component appData={appData} updateAppData={updateAppData} {...pageProps} />
            </Container>
          </AppShell>
        </AppDataContext.Provider>
      </MantineProvider>
    </div>
  )
}

export default SlopeDemo
