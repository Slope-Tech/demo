import React, { useState } from 'react'
import {
  Button,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { CustomerType } from '../utils/email';

const OrderDetails: React.FC<{ setOrder: (order: any) => void, setSecret: (secret: any) => void }> = ({ setOrder, setSecret }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const createOrder = async () => {
    const isLegacySDK = true
    const total = 5129_59
    const guestMode = false
    const customerForm = {
      businessName: 'Slope Demo Customer',
      email: `hannah+demo-alibaba${CustomerType.SKIP_PRE_QUALIFY}@slopepay.com`,
      phone: '+16175551212',
      line1: '123 California St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
      currency: 'usd',
      qualified: true,
      product: 'Soda',
    }
    if (!isLegacySDK) {
      window.SlopeJs.open()
    }

    let customerJson
    if (!guestMode) {
      const customerResp = await fetch('/api/create-customer', {
        method: 'POST',
        body: JSON.stringify(customerForm),
      })

      customerJson = await customerResp.json()

      if (!customerJson.customer) {
        window.alert(`Error: ${JSON.stringify(customerJson)}`)
        return {}
      }
    }

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        ...customerForm,
        customerId: guestMode ? undefined : customerJson.customer.id,
        total,
      }),
    })

    const { secret, order } = await orderRes.json()
    return { order, secret }
  }

  const handleClick = async () => {
    setLoading(true)
    const { order, secret } = await createOrder()
    setOrder(order)
    setSecret(secret)
    setLoading(false)
    router.push('/payment')
  }
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_order_details.png' alt='Alibaba Order Details' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' top={470} left={115} w={148} h={28} color='orange.7' bg='#FF6600' radius='xl' onClick={handleClick} loading={loading}>Make Payment</Button>
        </Box>
      </Box>
    </Center>
  )
}

export default OrderDetails
