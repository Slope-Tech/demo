import { Box, Button, Center, Image, Select } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"

const ShoppingCart = () => {
  const router = useRouter()
  const handleClickCard = () => {
    window.alert('Choose to pay with Slope')
  }
  const [loading, setLoading] = useState(false)
  const [userEmailSuffix, setUserEmailSuffix] = useState('');
  const handleClickSlope = async () => {
    const isLegacySDK = true
    const total = 13545_00
    const guestMode = false
    const customerForm = {
      businessName: 'Slope Demo Customer',
      email: `victor+demo-dentsply${userEmailSuffix}@slopepay.com`,
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
    setLoading(true)
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
        setLoading(false)
        window.alert(`Error: ${JSON.stringify(customerJson)}`)
        return
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

    const offerType = 'bnpl'

    const successPath = `/success?orderNumber=${order.number}`

    const primaryColor = '#212B36'
    const primaryColorObject = primaryColor
      ? { primaryColor: (primaryColor as string).slice(1) }
      : {}

    const slopeParams = {
      ...primaryColorObject,
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
  }

  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={770} sx={{ flexShrink: 0}}>
        <Image pos='absolute' width='100%' height='100%' src='/images/dentsply_shopping_cart.png' alt='Dentsply ShoppingCart' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' top={362} right={72} w={378} h={36} color='yellow.6' bg='#FFA726' c='black' onClick={handleClickCard}>PAY WITH CARD</Button>
          <Button pos='absolute' top={465} right={72} w={378} h={36} color='yellow.6' bg='#FFA726' c='black' onClick={handleClickSlope} leftIcon={<img alt="Slope Logo" src="/images/icon_black.svg" height={22} />} loading={loading}>PAY LATER WITH SLOPE</Button>
          <Select
            pos='absolute'
            top={510}
            right={72}
            w={378}
            h={36}
            data={[{
                value: '+skip-pre_qualify',
                label: 'Onboarded customer'
              }, {
                value: '+skip-compliance',
                label: 'Skip compliance'
              }, {
                value: '',
                label: 'New customer'
              }
            ]}
            value={userEmailSuffix}
            onChange={(value) => setUserEmailSuffix(value || '')}
          />
        </Box>
      </Box>
    </Center>
  )
}

export default ShoppingCart
