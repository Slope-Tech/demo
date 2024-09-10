import React from 'react'
import {
  Button,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useRouter } from 'next/router'

const Orders = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/order_details')
  }
  const handleClickPayments = () => {
    router.push('/manage_pay_later')
  }
  const handleClickPayLaterSignup = () => {
    router.push('/pay_later_signup')
  }
  const handleClickCompanyProfile = () => {
    router.push('/company_profile')
  }
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_orders.png' alt='Alibaba Orders' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' top={218} right={53} w={240} h={48} color='orange.7' bg='#FF6600' radius='xl' fz='lg' onClick={handleClick}>Make Payment</Button>
          <Button pos='absolute' left={0} top={358} w={60} h={54} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickPayments} />
          <Button pos='absolute' left={0} top={523} w={60} h={67} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickPayLaterSignup} />
          <Button pos='absolute' right={236} top={8} w={70} h={60} sx={{ opacity: 0.1, ':hover': { opacity: 0.1 } }} onClick={handleClickCompanyProfile} />
        </Box>
      </Box>
    </Center>
  )
}

export default Orders
