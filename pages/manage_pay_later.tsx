import React, { useState } from 'react'
import {
  Button,
  Box,
  Center,
  Image,
  Text,
  Group,
  Stack,
} from '@mantine/core'
import { useRouter } from 'next/router'

const ManagePayLater = ({ customerForm }: { customerForm: any }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleClickPayLaterSignup = () => {
    router.push('/pay_later_signup')
  }
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

  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_manage_net_terms.png' alt='Alibaba Manage Net Terms' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' left={0} top={303} w={60} h={54} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickOrders} />
          <Button pos='absolute' left={0} top={523} w={60} h={67} sx={{ opacity: 0, ':hover': { opacity: 0.2 } }} onClick={handleClickPayLaterSignup} />
          <Button pos='absolute' left={252} top={160} w={221} h={48} color='orange.7' bg='#FF7D52' radius='md' loading={loading} onClick={handleClick}>
            <Stack align='center' spacing={0}>
              <Text lh={1} size='lg'>Apply for financing</Text>
              <Group mt={4} spacing={4}>
                <Text lh={1} fz={10}>Powered by</Text>
                <Image src='/images/slope_logo_white.svg' width={34} height={12} />
              </Group>
            </Stack>
          </Button>
        </Box>
      </Box>
    </Center>
  )
}

export default ManagePayLater
