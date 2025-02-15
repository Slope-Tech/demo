import { Button, Title, Group, Card, Text } from '@mantine/core'
import { IconBuildingBank, IconCreditCard, IconWallet } from '@tabler/icons'
import React, { useState } from 'react'
import ErrorAlert from '../../components/ErrorAlert'
import { formatCurrency } from '../../utils/products'
import { AppData } from '../../types/types'

const PaymentMethods: React.FC<{ appData: AppData }> = ({ appData }) => {
  const [loading, setLoading] = useState(false)
  const [limits, setLimits] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState(null)

  const onPreQualify = async () => {
    setLoading(true)

    const customerResp = await fetch('/api/create-customer', {
      method: 'POST',
      body: JSON.stringify(appData.customerForm),
    })

    const jsonResp = await customerResp.json()
    if (!jsonResp.customer) {
      setError(jsonResp)
      setLoading(false)
      return
    }

    // @ts-ignore
    window.initializeSlope({
      intentSecret: jsonResp.secret,
      flow: 'pre_qualify',
      onSuccess: ({ customer }) => {
        setLimits(customer.limits)
        setLoading(false)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {
        setLoading(false)
        setLimits(null)
      },
      onEvent: console.log,
    })
    // @ts-ignore
    window.Slope.open()
  }

  const slopeButtonText = limits
    ? `Qualified for ${formatCurrency(limits.customerBalance)}`
    : 'Pre Qualify with Slope'

  return (
    <>
      <Title order={3} mb="xl">
        <Group spacing="xs">
          <IconWallet size={30} /> <Text span>Payment Methods</Text>
        </Group>
      </Title>
      <ErrorAlert error={error} setError={setError} />
      <Card p="lg" radius="md" withBorder mb="xs">
        <Card.Section p="xl">
          <Group position="apart">
            <Group>
              <IconCreditCard />
              <Title order={5}> Visa: Credit Card (1234)</Title>
            </Group>
            <Button leftIcon={<IconCreditCard />} onClick={() => alert('Not supported in demo')}>
              Update
            </Button>
          </Group>
        </Card.Section>
      </Card>
      <Card p="lg" radius="md" withBorder>
        <Card.Section p="xl">
          <Group position="apart">
            <Group>
              <IconBuildingBank size={20} />
              <Title order={5}>Slope: Buy Now, Pay Later</Title>
            </Group>
            <Button
              leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={18} />}
              loading={loading}
              color="orange"
              onClick={onPreQualify}
            >
              {slopeButtonText}
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </>
  )
}

export default PaymentMethods
