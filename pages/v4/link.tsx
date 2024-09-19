import React, { useState } from 'react'
import { Button, Title, Text, Group, Code, Box, Card, Tabs } from '@mantine/core'
import { IconPlugConnected } from '@tabler/icons'
import Checkout from './index'
import PaymentMethods from './payment_methods'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const Link: React.FC<any> = (props = {}) => {
  const [loading, setLoading] = useState(false)
  const [linkToken, setLinkToken] = useState()
  const [userLink, setUserLink] = useState<any>()
  const [activeTab, setActiveTab] = useState<string | null>('checkout')

  const getAccessToken = async (newLinkToken) => {
    const resp = await fetch('/api/v4-user-links', {
      method: 'POST',
      body: JSON.stringify({
        linkToken: newLinkToken,
      }),
    })

    const data = await resp.json()
    setUserLink(data)
  }

  const onClickLink = async () => {
    setLoading(true)

    window.SlopeJs.open()

    const slopeParams = {
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      flow: 'link',
      onSuccess: async (resp) => {
        setLinkToken(resp.linkToken)
        getAccessToken(resp.linkToken)
      },
      onFailure: (err) => {
        console.error(err)
      },
      onClose: () => {},
      onOrderOpen: (payload) => {
        console.log('Slope order open', payload)
      },
      onEvent: console.log,
    }

    window.SlopeJs.start(slopeParams)
    setLoading(false)
  }

  let linkedBlock = <Text>Connect the demo app with your Slope account</Text>
  if (linkToken) {
    linkedBlock = (
      <Text>
        You are now linked to Slope with linkToken: <Code>{linkToken}</Code>
      </Text>
    )
  }

  let userBlock

  if (userLink) {
    let tabBlock
    if (activeTab === 'checkout') {
      tabBlock = <Checkout {...props} accessToken={userLink?.accessToken} />
    } else if (activeTab === 'payment_methods') {
      tabBlock = <PaymentMethods {...props} accessToken={userLink?.accessToken} />
    }

    userBlock = (
      <Box>
        <Title order={3} mt="xl" mb="md">
          <Group spacing="xs">
            <IconPlugConnected />
            <Text span>Linked as {userLink.userEmail} below:</Text>
          </Group>
        </Title>
        <Tabs color="orange" value={activeTab} onTabChange={(value) => setActiveTab(value)}>
          <Tabs.List>
            <Tabs.Tab value="checkout">Checkout</Tabs.Tab>
            <Tabs.Tab value="payment_methods">Payment methods</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Card withBorder>
          <Card.Section p="xl">{tabBlock}</Card.Section>
        </Card>
      </Box>
    )
  }

  return (
    <>
      <Title order={2} mb="xl">
        <Group spacing="xs">
          <IconPlugConnected />
          <Text span>Integrations</Text>
        </Group>
      </Title>

      <Group position="apart">
        {linkedBlock}
        <Button
          disabled={!!linkToken}
          leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={22} />}
          color="orange"
          loading={loading}
          onClick={onClickLink}
        >
          Link with Slope
        </Button>
      </Group>

      {userBlock}
    </>
  )
}

export default Link
