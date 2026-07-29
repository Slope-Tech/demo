import React from 'react'
import { Checkbox, ColorPicker, Container, SegmentedControl, TextInput, Title } from '@mantine/core'
import { AppData, CheckoutMode, ProductFlow } from '../types/types'

export const CheckoutOptions: React.FC<{
  appData: AppData
  updateAppData: any
}> = ({ appData, updateAppData }) => {
  const { productFlow, mode, primaryColor } = appData

  const onChangeMode = (value: CheckoutMode) => (event) => {
    updateAppData({ mode: event.currentTarget.checked ? value : null })
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
        onChange={onChangeMode('redirect')}
        checked={mode === 'redirect'}
        label="Perform a full-screen redirect"
        mb="xs"
      />

      <Checkbox
        onChange={onChangeMode('inline')}
        checked={mode === 'inline'}
        label="Perform a full inline screen redirect"
        mb="xs"
      />

      {!mode && (
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
