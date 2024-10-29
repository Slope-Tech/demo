import React from 'react'
import { AppData, ProductFlow } from '../types/types'
import MerchantDemoPage from '../components/custom-demos/MerchantDemoPage'
import usePaymentButton from '../utils/custom-demos/usePaymentButton'
import CustomerForm from '../components/CustomerForm'
import { useAppData } from './_app'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const IndexPage: React.FC<{
  appData: AppData
  updateAppData: any
}> = () => {
  const [appData, updateAppData] = useAppData()
  const paymentButton1 = usePaymentButton({
    total: 4813449,
    width: 200,
    height: 42,
    left: 1064,
    top: 255,
    productFlow: ProductFlow.BNPL_AND_PAY_NOW
  })
  const paymentButton2 = usePaymentButton({
    total: 4813449,
    width: 200,
    height: 42,
    left: 1067,
    top: 1085,
    productFlow: ProductFlow.BNPL_AND_PAY_NOW
  })
  return (
    <>
      <CustomerForm appData={appData} updateAppData={updateAppData} />
      <MerchantDemoPage screenshotSrc="/images/uline_checkout_4_checkout.png">
        {paymentButton1.rendered}
        {paymentButton2.rendered}
      </MerchantDemoPage>
    </>
  )
}

export default IndexPage
