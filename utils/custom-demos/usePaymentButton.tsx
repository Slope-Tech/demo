import { useRouter } from 'next/router'
import React, { MutableRefObject, ReactNode, useState } from 'react'
import { Box, Button, ButtonProps, Group, Text, useMantineTheme } from '@mantine/core'
import { useMove, usePrevious } from '@mantine/hooks'
import { CustomerType, ProductFlow } from '../../types/types'
import { useAppData } from '../../pages/_app'
import { getProducts, getTotals } from '../products'
import { customerTypeToShortcutTypes } from '../email'

const DEFAULT_COLOR = '#FD7E14'

export default function usePaymentButton({
  total,
  customerType,
  draggable = false,
  withIcon = true,
  label = 'Pay with Slope',
  width = '100%',
  height = 40,
  left,
  top,
  fz = 'md',
  productFlow: propsProductFlow,
  color,
  ...buttonProps
}: {
  total?: number
  productFlow?: ProductFlow
  customerType?: CustomerType
  draggable?: boolean
  withIcon?: boolean
  label?: ReactNode
  width?: ButtonProps['w']
  height?: number
} & ButtonProps = {}): {
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
          left: Math.round(viewport.w * newPos.x - (width as any) / 2),
          top: Math.round(viewport.h * newPos.y - height / 2),
        })
      })
    : { active: false, ref: null }
  const prevMoveActive = usePrevious(move.active)
  const viewportRef = draggable ? move.ref : null

  const [{ customerForm, productFlow: appProductFlow, mode, primaryColor, accessToken }] =
    useAppData()
  const products = getProducts(customerForm.product)
  const totals = getTotals(products)

  const theme = useMantineTheme()
  const bgColor = color || primaryColor || DEFAULT_COLOR
  const bgColorHover = theme.fn.darken(bgColor, 0.2)
  const bgColorActive = theme.fn.darken(bgColor, 0.3)

  const handleClick = async () => {
    setLoading(true)
    if (mode !== 'redirect') {
      window.SlopeJs.open()
    }

    let localAccessToken: string = ''
    if (accessToken) {
      localAccessToken = accessToken
    }

    if (customerType !== undefined) {
      const response = await fetch('/api/v4-create-customer', {
        method: 'POST',
        body: JSON.stringify({
          shortcutTypes: customerTypeToShortcutTypes(customerType),
          businessName: customerForm.businessName,
          phone: customerForm.phone,
          address: {
            line1: customerForm.line1,
            city: customerForm.city,
            state: customerForm.state,
            postalCode: customerForm.postalCode,
            country: customerForm.country,
          },
          taxId: Math.round((Math.random() * 9 + 1) * 1e8),
          isLinked: true,
        }),
      })

      const body = await response.json()

      if (body.linkToken) {
        const userLinksResponse = await fetch('/api/v4-user-links', {
          method: 'POST',
          body: JSON.stringify({
            linkToken: body.linkToken,
          }),
        })

        const userLinks = await userLinksResponse.json()
        localAccessToken = userLinks.accessToken
      }
    }

    const orderRes = await fetch('/api/v4-create-order', {
      method: 'POST',
      body: JSON.stringify({
        total: total || totals.total,
        currency: 'usd',
        contactBusinessName: customerForm.businessName,
        contactEmail: customerForm.email,
        contactPhone: customerForm.phone,
        billingAddress: {
          line1: customerForm.line1,
          city: customerForm.city,
          state: customerForm.state,
          postalCode: customerForm.postalCode,
          country: customerForm.country,
        },
        items: total
          ? [{ name: 'Invoice', price: total, unitPrice: total, quantity: 1 }]
          : products.map((p) => ({
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

    let offerType
    const productFlow = propsProductFlow || appProductFlow
    switch (productFlow) {
      case ProductFlow.BNPL_ONLY:
      case ProductFlow.PAY_NOW_ONLY:
        offerType = productFlow
        break
      default:
        break
    }

    const successPath = `/success?orderNumber=${order.number}`

    if (mode === 'redirect') {
      // NOTE: The redirect API is still private and should not be used by developers.
      // Contact the Slope team if you're interested in using the redirect API.
      const baseHost = `${window.location.protocol}//${window.location.host}`
      const urlParams = new URLSearchParams({
        cancelUrl: `${baseHost}/`,
        successUrl: `${baseHost}${successPath}`,
      })
      window.location.href = `${order.checkoutUrl}&${urlParams.toString()}`
      return
    }

    const slopeParams = {
      primaryColor,
      code: order.checkoutCode,
      intentSecret: secret,
      accessToken: localAccessToken,
      offerType,
      flow: 'checkout',
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

    window.SlopeJs.start(slopeParams)
  }

  return {
    viewportRef,
    rendered: (
      <Box
        pos={Number.isFinite(left) || Number.isFinite(top) ? 'absolute' : 'unset'}
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
          fz={fz}
          sx={{
            backgroundColor: bgColor,
            ':hover': {
              backgroundColor: bgColorHover,
            },
            ':active': {
              backgroundColor: bgColorActive,
            },
          }}
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
                height={height * 0.65}
                width={height * 0.65}
              />
              {label}
            </Group>
          ) : (
            label
          )}
        </Button>
        {draggable && (
          <Text pos="absolute" left={2} top={2} ff="monospace" c="black" fz="xs" lh={1}>
            left: {position.left}
            <br />
            top: {position.top}
          </Text>
        )}
      </Box>
    ),
  }
}
