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
  const [customerType, setCustomerType] = useState(CustomerType.NEW)
  const total = 1_930_77
  const productFlow = ProductFlow.BNPL_ONLY
  const bnt1 = usePaymentButton({
    total,
    color: '#C8102E',
    left: 1002,
    top: 181,
    width: 286,
    height: 32,
    productFlow,
    customerType,
  })
  const btn2 = usePaymentButton({
    total,
    color: '#C8102E',
    left: 675,
    top: 1400,
    width: 240,
    height: 32,
    productFlow,
    customerType,
  })
  return (
    <MerchantDemoPage screenshotSrc="/images/smartandfinal_checkout.png">
      {bnt1.rendered}
      {btn2.rendered}
      <Select
        data={[
          {
            value: CustomerType.NEW,
            label: 'New Slope Customer',
          },
          {
            value: CustomerType.SKIP_PRE_QUALIFY,
            label: 'Pre-Qualified Slope Customer',
          },
        ]}
        value={customerType}
        onChange={(value) => setCustomerType(value as CustomerType)}
        pos="absolute"
        top={226}
        left={1002}
        w={286}
        size="xs"
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
