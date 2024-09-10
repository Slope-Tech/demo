import React, { useState } from 'react'
import {
  Button,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useRouter } from 'next/router'

const PayLaterSignup = ({ customerForm }: { customerForm: any }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleClick = async () => {
    setLoading(true)
    const customerResp = await fetch('/api/create-customer', {
      method: 'POST',
      body: JSON.stringify(customerForm),
    })

    const jsonResp = await customerResp.json()
    const slopeParams = {
      primaryColor: null,
      intentSecret: jsonResp.secret,
      flow: 'pre_qualify',
      onSuccess: async () => {
        // router.push(successPath)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {
        // noop
      },
      onEvent: console.log,
    }

    window.initializeSlope(slopeParams)
    window.Slope.open()
    setLoading(false)
  }
  const handleClickOrders = () => {
    router.push('/')
  }
  const handleClickPayments = () => {
    router.push('/manage_pay_later')
  }

  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_pay_later_promo.png' alt='Alibaba Pay Later Signup' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' left={148} top={393} w={124} h={40} color='orange.7' bg='#FF7722' radius='xl' fz='md' loading={loading} onClick={handleClick}>Apply now</Button>
          <Button pos='absolute' left={0} top={283} w={60} h={54} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickOrders} />
          <Button pos='absolute' left={0} top={337} w={60} h={54} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickPayments} />
        </Box>
      </Box>
    </Center>
  )
}

export default PayLaterSignup
