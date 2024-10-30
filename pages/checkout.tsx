import React, { useState } from 'react'
import { Select } from '@mantine/core'
import { AppData, CustomerType, ProductFlow } from '../types/types'
import MerchantDemoPage from '../components/custom-demos/MerchantDemoPage'
import usePaymentButton from '../utils/custom-demos/usePaymentButton'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const IndexPage: React.FC<{
  appData: AppData
  updateAppData: any
}> = () => {
  const [customerType, setCustomerType] = useState(CustomerType.SKIP_PRE_QUALIFY)
  const paymentButton1 = usePaymentButton({
    total: 4813449,
    width: 200,
    height: 42,
    left: 1064,
    top: 255,
    customerType,
    productFlow: ProductFlow.BNPL_AND_PAY_NOW,
  })
  const paymentButton2 = usePaymentButton({
    total: 4813449,
    width: 200,
    height: 42,
    left: 1067,
    top: 1085,
    customerType,
    productFlow: ProductFlow.BNPL_AND_PAY_NOW,
  })
  return (
    <MerchantDemoPage screenshotSrc="/images/uline_checkout_4_checkout.png">
      {paymentButton1.rendered}
      {paymentButton2.rendered}
      <Select
        pos='absolute'
        w={240}
        top={120}
        right={138}
        label='Slope customer'
        data={[
          { label: 'Pre-Qualified', value: CustomerType.SKIP_PRE_QUALIFY },
          { label: 'New Customer', value: CustomerType.NEW },
        ]}
        value={customerType}
        onChange={(newValue) => setCustomerType(newValue as CustomerType)}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
