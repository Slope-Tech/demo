import { Box, Button, Center, Image } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const Payment = ({ order, secret }: { order: any; secret: any }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const handleClickSlope = async () => {
    setLoading(true)
    if (!order || !secret) {
      return
    }

    const offerType = 'bnpl'

    const successPath = `/success?orderNumber=${order.number}`

    const slopeParams = {
      primaryColor: null,
      flow: 'checkout',
      intentSecret: secret,
      offerType,
      onSuccess: async () => {
        router.push(successPath)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {
        setLoading(false)
      },
      onOrderOpen: (payload) => {
        console.log('Slope order open', payload)
      },
      onEvent: console.log,
    }

    window.initializeSlope(slopeParams)
    window.Slope.open()
    setLoading(false)
  }

  return (
    <Center w="100%" h="100%">
      <Box pos="relative" w={1400} h={800} sx={{ flexShrink: 0 }}>
        <Image
          pos="absolute"
          width="100%"
          height="100%"
          src="/images/alibaba_payment.png"
          alt="Alibaba Payment"
        />
        <Box pos="relative" w="100%" h="100%">
          <Button
            pos="absolute"
            top={473}
            right={184}
            w={284}
            h={36}
            radius="xl"
            color="orange.7"
            bg="#FF6600"
            onClick={handleClickSlope}
            leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={22} />}
            loading={loading}
            disabled={!order || !secret}
            fz="md"
            styles={{ icon: { marginLeft: 6 }, label: { flexGrow: 1, justifyContent: 'center' } }}
          >
            Pay with Slope
          </Button>
        </Box>
      </Box>
    </Center>
  )
}

export default Payment
