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
  const handleClickMyAccount = () => {
    router.push('/')
  }
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0, overflow: 'auto' }}>
        <Image pos='absolute' width='100%' src='/images/alibaba_company_profile.png' alt='Alibaba Company Profile' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' left={250} top={12} w={104} h={36} sx={{ opacity: 0.1, ':hover': { opacity: 0.2 } }} onClick={handleClickMyAccount} />
        </Box>
      </Box>
    </Center>
  )
}

export default Orders
