import React, { useState } from 'react'
import { Box, Image, Select } from '@mantine/core'
import { usePaymentButton } from '../demo-utils/order-payment'
import { CustomerType } from '../utils/email'

const Orders = () => {
  const [customerType, setCustomerType] = useState(CustomerType.SKIP_PRE_QUALIFY)
  const { viewportRef, rendered: paymentButton } = usePaymentButton({
    total: 9_259_65,
    customerType,
    // draggable: true,
    label: 'Pay with Slope',
    withIcon: true,
    width: 360,
    height: 38,
    left: 916,
    top: 780,
    color: 'orange.7',
    bg: '#FF6600',
    fz: 'md',
  })
  return (
    <Box pos="relative" h="100vh" sx={{ flexShrink: 0, overflow: 'auto' }}>
      <Box pos="relative" ref={viewportRef} w={1400} mx='auto' >
        <Image src="/images/dell_checkout.png" alt="Dell Checkout" />
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
      </Box>
    </Box>
  )
}

export default Orders
