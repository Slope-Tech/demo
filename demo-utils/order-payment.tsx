/* eslint-disable import/prefer-default-export */
import { useRouter } from 'next/router'
import React, { MutableRefObject, ReactNode, useState } from 'react'
import { Box, Button, ButtonProps, Group, Text } from '@mantine/core'
import { useMove, usePrevious } from '@mantine/hooks'
import { CustomerType } from '../utils/email'

const MERCHANT_NAME = 'dell'

export function usePaymentButton({
  total,
  customerType = undefined,
  draggable = false,
  withIcon = false,
  label = 'Pay with Slope',
  width = 320,
  height = 40,
  left = 0,
  top = 0,
  ...buttonProps
}: {
  total: number
  customerType?: CustomerType
  draggable?: boolean
  withIcon?: boolean
  label?: ReactNode
  width?: number
  height?: number
} & ButtonProps): {
  viewportRef: MutableRefObject<HTMLDivElement> | null
  rendered: ReactNode
} {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState<{ left?: number; top?: number }>({
    left: undefined,
    top: undefined,
  })
  const move = draggable
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useMove<HTMLDivElement>((newPos) => {
        if (!draggable) {
          return
        }
        const viewport = {
          w: move.ref?.current.clientWidth || 0,
          h: move.ref?.current.clientHeight || 0,
        }
        setPosition({
          left: Math.round(viewport.w * newPos.x - width / 2),
          top: Math.round(viewport.h * newPos.y - height / 2),
        })
      })
    : { active: false, ref: null }
  const prevMoveActive = usePrevious(move.active)
  const viewportRef = draggable ? move.ref : null
  const handleClick = async () => {
    const isLegacySDK = true
    const guestMode = false
    const customerForm = {
      businessName: 'Slope Demo Customer',
      email: `hannah+demo-${MERCHANT_NAME}${customerType || ''}@slopepay.com`,
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
  }

  return {
    viewportRef,
    rendered: (
      <Box
        pos="absolute"
        left={left}
        top={top}
        {...(draggable
          ? {
              left: position.left || left,
              top: position.top || top,
            }
          : null)}
      >
        <Button
          {...buttonProps}
          w={width}
          h={height}
          loading={loading}
          onClick={() => {
            if (prevMoveActive) {
              return
            }
            handleClick()
          }}
        >
          {withIcon && !loading ? (
            <Group spacing={4}>
              <img
                alt="slope logo"
                src="/images/icon_white.svg"
                height={height * 0.8}
                width={height * 0.8}
              />
              {label}
            </Group>
          ) : (
            label
          )}
        </Button>
        {draggable && (
          <Text
            pos="absolute"
            left={2}
            top={2}
            ff="monospace"
            c="black"
            fz="xs"
            lh={1}
            // bg="white"
            // ta="end"
          >
            left: {position.left}
            <br />
            top: {position.top}
          </Text>
        )}
      </Box>
    ),
  }
}
