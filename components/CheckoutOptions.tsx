import React from 'react'
import { Checkbox, ColorPicker, Container, SegmentedControl, TextInput, Title } from '@mantine/core'
import { AppData, ProductFlow } from '../types/types'

export const CheckoutOptions: React.FC<{
  appData: AppData
  updateAppData: any
  isV3?: boolean
}> = ({ appData, updateAppData, isV3 = false }) => {
  const { productFlow, mode, localeSelector, guestMode, primaryColor } = appData

  const onChangeRedirect = (event) => {
    updateAppData({
      mode: event.currentTarget.checked ? 'redirect' : null,
    })
  }

  const onChangeLocaleSelector = (event) => {
    updateAppData({
      localeSelector: event.currentTarget.checked,
    })
  }

  const onChangeGuest = (event) => {
    updateAppData({ guestMode: event.currentTarget.checked })
  }

  const onChangePrimaryColor = (color) => {
    updateAppData({ primaryColor: color })
  }

  return (
    <Container bg="gray.1" py="md">
      <Title mb="sm" order={5}>
        Checkout Options
      </Title>

      <SegmentedControl
        fullWidth
        bg="gray.3"
        mb="md"
        data={[
          { label: 'Pay Later', value: ProductFlow.BNPL_ONLY },
          { label: 'Both', value: ProductFlow.BNPL_AND_PAY_NOW },
          { label: 'Pay Now', value: ProductFlow.PAY_NOW_ONLY },
        ]}
        size="sm"
        value={productFlow}
        onChange={(value) => {
          const newProductFlow = value as ProductFlow
          updateAppData({ productFlow: newProductFlow })
        }}
      />

      <Checkbox
        onChange={onChangeRedirect}
        checked={mode === 'redirect'}
        label="Perform a full-screen redirect"
        mb="xs"
      />

      {isV3 && (
        <>
          <Checkbox
            onChange={onChangeLocaleSelector}
            checked={!!localeSelector}
            disabled={productFlow !== ProductFlow.PAY_NOW_ONLY}
            label="Display language selector"
            mb="xs"
          />
          <Checkbox
            onChange={onChangeGuest}
            checked={guestMode}
            disabled={productFlow !== ProductFlow.PAY_NOW_ONLY}
            label="Guest checkout mode"
            mb="xs"
          />
        </>
      )}

      {mode !== 'redirect' && (
        <>
          <TextInput value={primaryColor} label="Custom color" mb="xs" readOnly />
          <ColorPicker
            fullWidth
            mb="xs"
            format="hex"
            swatches={['#FD611A', '#868e96', '#be4bdb', '#4c6ef5', '#228be6', '#12b886', '#fab005']}
            value={primaryColor}
            onChange={onChangePrimaryColor}
          />
        </>
      )}
    </Container>
  )
}
