import React, { useState } from 'react'
import {
  Button as MantineButton,
  Image,
  Center,
  Box,
  ButtonProps,
  BoxProps,
  Select,
} from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { useRouter } from 'next/router'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const customerTypes = [
  {
    label: 'Pre-qualified',
    email: 'demo+skip-pre_qualify@slope.so',
  },
  {
    label: 'New',
    email: 'demo@slope.so',
  },
  {
    label: 'Skip Compliance',
    email: 'demo+skip-compliance@slope.so',
  },
]

const Pos: React.FC<{ x: number; y: number } & BoxProps> = ({ x, y, ...props }) => (
  <Center w={0} h={0} pos="absolute" top={y} left={x} {...props}>
    <Box sx={{ flexShrink: 0 }}>{props.children}</Box>
  </Center>
)

const TransparentButton: React.FC<{ x: number; y: number; onClick: () => any } & ButtonProps> = ({
  x,
  y,
  w,
  h,
  ...props
}) => (
  <Pos y={y} x={x}>
    <Box w={w} h={h} sx={{ opacity: 0, cursor: 'pointer', flexShrink: 0 }} {...props} />
  </Pos>
)

const Button: React.FC<
  { x: number; y: number; w: number; h: number; onClick: () => any } & ButtonProps
> = ({ x, y, ...props }) => (
  <Pos y={y} x={x}>
    <MantineButton styles={{ root: { flexShrink: 0 } }} {...props} />
  </Pos>
)

const Checkout: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState(customerTypes[0].email)
  const products = [
    {
      quantity: 25,
      name: 'All Natural Ground Beef (28 oz / 12 cans per case)',
      price: 104_00,
      sku: 'ground-beef-28oz-12cans',
    },
    {
      quantity: 1,
      name: 'Shipping - UPS Ground',
      price: 797_90,
      sku: 'shipping-ups-ground',
    },
  ]
  const primaryColor = '#1971C2'

  const total = 3_397_90

  const onPay = async () => {
    setLoading(true)
    const customerData = {
      businessName: 'Slope Demo Customer',
      email: customerEmail,
      phone: '+16175551212',
      line1: '123 California St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
      currency: 'usd',
    }

    const customerResp = await fetch('/api/create-customer', {
      method: 'POST',
      body: JSON.stringify(customerData),
    })

    const customerJson = await customerResp.json()

    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        customerId: customerJson.customer.id,
        currency: 'usd',
        total,
        items: products.map((p) => ({
          sku: p.sku,
          name: p.name,
          description: p.name,
          unitPrice: p.price,
          price: p.price * p.quantity,
          type: 'lineItem',
          quantity: p.quantity,
        })),
      }),
    })

    const { secret, order } = await orderRes.json()

    const successPath = `/success?orderNumber=${order.number}`

    const slopeParams = {
      primaryColor,
      intentSecret: secret,
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

  const pageIdx = parseInt((router.query.pageIdx as string) || '0', 10)
  const setPage = (idx) => {
    router.push({ query: { pageIdx: idx } })
    window.scrollTo(0, 0)
  }
  const nextPage = () => setPage(pageIdx + 1)
  const prevPage = () => setPage(pageIdx - 1)

  const pages = [
    {
      bg: '1_cart.png',
      elements: [<TransparentButton x={1138} y={665} w={140} h={50} onClick={nextPage} />],
    },
    {
      bg: '2_checkout.png',
      elements: [
        <TransparentButton x={210} y={780} w={140} h={50} onClick={prevPage} />,
        <TransparentButton x={640} y={780} w={180} h={70} onClick={nextPage} />,
      ],
    },
    {
      bg: '3_shipping.png',
      elements: [
        <TransparentButton x={230} y={440} w={170} h={50} onClick={prevPage} />,
        <TransparentButton x={640} y={440} w={180} h={70} onClick={nextPage} />,
      ],
    },
    {
      bg: '4_payment.png',
      elements: [
        <TransparentButton x={220} y={772} w={160} h={50} onClick={prevPage} />,
        <Button x={678} y={773} w={106} h={65} loading={loading} onClick={onPay} color="blue.8">
          Pay Later
        </Button>,
        <Pos x={520} y={765}>
          <Select
            label="Slope Customer"
            size="xs"
            data={customerTypes.map(({ label, email }) => ({ label, value: email }))}
            value={customerEmail}
            onChange={(v) => v && setCustomerEmail(v)}
          />
        </Pos>,
      ],
    },
  ]

  useHotkeys([
    ['arrowLeft', () => setPage(pageIdx - 1)],
    ['arrowRight', () => setPage(pageIdx + 1)],
  ])

  return (
    <Center>
      <Box pos="relative">
        <Image width={1400} src={`/keystone/${pages[pageIdx].bg}`} />
        {pages[pageIdx].elements}
      </Box>
    </Center>
  )
}

export default Checkout
