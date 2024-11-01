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

const CheckoutPage: React.FC<{
  appData: AppData
  updateAppData: any
}> = () => {
  const [customerType, setCustomerType] = useState(CustomerType.SKIP_PRE_QUALIFY)
  const paymentButton = usePaymentButton({
    total: 10_313_94,
    width: 393,
    height: 50,
    top: 439,
    right: 130,
    radius: 25,
    customerType,
    label: 'Pay Later with Slope',
    productFlow: ProductFlow.BNPL_AND_PAY_NOW,
  })
  return (
    <MerchantDemoPage screenshotSrc="/images/ebay_checkout.png">
      {paymentButton.rendered}
      <Select
        pos='absolute'
        w={390}
        top={540}
        right={134}
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

export default CheckoutPage
