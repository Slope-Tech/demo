import React from 'react'
import {
  Button,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useRouter } from 'next/router'

const OrderDetails = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/payment')
  }
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_order_details.png' alt='Alibaba Order Details' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' top={470} left={115} w={148} h={28} color='orange.7' bg='#FF6600' radius='xl' onClick={handleClick}>Make Payment</Button>
        </Box>
      </Box>
    </Center>
  )
}

export default OrderDetails
