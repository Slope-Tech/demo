import React, { useState } from 'react'
import { Select } from '@mantine/core'
import { usePaymentButton } from '../demo-utils/usePaymentButton'
import { CustomerType } from '../utils/email'
import MerchantDemoPage from '../components/MerchantDemoPage'

const Orders = () => {
  const [customerType, setCustomerType] = useState(CustomerType.SKIP_PRE_QUALIFY)
  const { viewportRef, rendered: paymentButton } = usePaymentButton({
    total: 9_259_65,
    customerType,
    draggable: false,
    width: 360,
    height: 38,
    left: 916,
    top: 780,
  })
  return (
    <MerchantDemoPage screenshotSrc='/images/dell_checkout.png' viewportRef={viewportRef}>
      <Select
        pos='absolute'
        left={1080}
        top={1040}
        w={200}
        onChange={val => setCustomerType(val as CustomerType)}
        value={customerType}
        data={[
          { value: CustomerType.NEW, label: 'New customer' },
          { value: CustomerType.SKIP_PRE_QUALIFY, label: 'Pre-qualified customer' },
        ]}
      />
      {paymentButton}
    </MerchantDemoPage>
  )
}

export default Orders
