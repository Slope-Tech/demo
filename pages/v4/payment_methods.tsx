import { Button, Title, Group, Card, Text } from '@mantine/core'
import { IconBuildingBank, IconCreditCard, IconWallet } from '@tabler/icons'
import React, { useState } from 'react'
import ErrorAlert from '../../components/ErrorAlert'

const PaymentMethods: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onPreQualify = async () => {
    setLoading(true)

    window.SlopeJs.start({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      flow: 'pre_qualify',
      onSuccess: (resp) => {
        console.log('onSuccess slope', resp)
        setLoading(false)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {
        setLoading(false)
      },
      onEvent: console.log,
    })
  }

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
              Pre Qualify with Slope
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </>
  )
}

export default PaymentMethods
