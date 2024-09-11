import { Box, Button, Center, Image, Loader } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CustomerType } from "../utils/email"

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const Payment = () => {
  const router = useRouter()
  const [initializing, setInitializing] = useState(true)
  const [order, setOrder] = useState<any>(null)
  const [secret, setSecret] = useState<any>(null)
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

    return orderRes.json()
  }
  const initPage = async () => {
    setInitializing(true)
    const created = await createOrder()
    setOrder(created.order)
    setSecret(created.secret)
    setInitializing(false)
  }

  useEffect(() => {
    initPage()
  }, [])

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

  if (initializing) {
    return <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0}} bg='white'>
        <Center w='100%' h='100%'>
          <Loader />
        </Center>
      </Box>
    </Center>
  }

  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0}}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_payment.png' alt='Alibaba Payment' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' top={473} right={184} w={284} h={36} radius='xl' color='orange.7' bg='#FF6600' onClick={handleClickSlope} leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={22} />} loading={loading} fz='md' styles={{ icon: { marginLeft: 6 }, label: { flexGrow: 1, justifyContent: 'center' }}} >
            Pay with Slope
          </Button>
        </Box>
      </Box>
    </Center>
  )
}

export default Payment
