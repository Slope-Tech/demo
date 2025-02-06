import { Button, Title, Group, Text, Tabs, Alert, Anchor } from '@mantine/core'
import {
  IconAlertCircle,
  IconBuildingBank,
  IconCreditCard,
  IconPlugConnected,
  IconWallet,
} from '@tabler/icons'
import { useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { AppData } from '../types/types'
import { CardRow } from '../components/CardRow'

export default function Account({
  appData,
  updateAppData,
}: {
  appData: AppData
  updateAppData: any
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState<string | null>('integrations')
  const { accessToken } = appData

  const onPreQualify = async () => {
    setLoading(true)

    window.SlopeJs.start({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      accessToken,
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

  const onClickPaymentMethods = async () => {
    setLoading(true)

    window.SlopeJs.start({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      accessToken,
      flow: 'payment_methods',
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

  const onClickLink = async () => {
    setLoading(true)

    window.SlopeJs.open()

    const slopeParams = {
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      flow: 'link',
      customerExternalId: (Math.random() + 1).toString(36),
      onSuccess: async (resp) => {
        updateAppData({ linkToken: resp.linkToken })
        const linkResp = await fetch('/api/v4-user-links', {
          method: 'POST',
          body: JSON.stringify({
            linkToken: resp.linkToken,
          }),
        })
        const data = await linkResp.json()
        updateAppData({ accessToken: data.accessToken })
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

  return (
    <>
      <Title order={2} mb="xl">
        <Group spacing="xs">
          <IconWallet size={30} /> <Text span>Manage Account</Text>
        </Group>
      </Title>
      <ErrorAlert error={error} setError={setError} />

      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="integrations" icon={<IconPlugConnected />}>
            <Title order={5}>Integrations</Title>
          </Tabs.Tab>
          <Tabs.Tab value="financing" icon={<IconBuildingBank />}>
            <Title order={5}>Financing</Title>
          </Tabs.Tab>
          <Tabs.Tab value="paymentMethods" icon={<IconCreditCard />}>
            <Title order={5}>Payment Methods</Title>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="integrations">
          <Alert icon={<IconAlertCircle />} color="blue" mb="lg" title="About Linking">
            <Text>
              The linking flow allows the Slope customer to perform a one-time consent so that you
              can access their account information and embed checkout or other features without
              needing the end user to login again. Read more about the linking flow{' '}
              <Anchor
                color="blue"
                href="https://developers.slopepay.com/docs/link-flow"
                target="_blank"
              >
                here
              </Anchor>
              .
            </Text>
          </Alert>

          <CardRow
            rightContent={
              <Button
                disabled={!!accessToken}
                leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={18} />}
                color="orange"
                onClick={onClickLink}
              >
                {accessToken ? 'Already Linked' : 'Link with Slope'}
              </Button>
            }
          >
            <Group>
              <IconPlugConnected />
              <Title order={5}> Slope: Short Term Financing</Title>
            </Group>
          </CardRow>
        </Tabs.Panel>
        <Tabs.Panel value="financing">
          <Alert icon={<IconAlertCircle />} color="blue" mb="lg" title="About Pre Qualification">
            <Text>
              The pre-qualification flow allows the customer to check if a customer is eligible for
              financing before creating an order. This can be used with or without the linking flow.
              If linked, the customer will not need to login again. If not linked, the customer will
              need to login or create an account.
            </Text>
          </Alert>

          <CardRow
            rightContent={
              <Button
                leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={18} />}
                color="orange"
                onClick={onPreQualify}
              >
                Pre Qualify for Financing
              </Button>
            }
          >
            <Group>
              <IconBuildingBank />
              <Title order={5}> Slope: Short Term Financing</Title>
            </Group>
          </CardRow>
        </Tabs.Panel>
        <Tabs.Panel value="paymentMethods">
          <Alert
            icon={<IconAlertCircle />}
            color="blue"
            mb="lg"
            title="About Manage Payment Methods"
          >
            <Text>
              The manage payment methods flow allows you to embed a pop-up that allows the customer
              to manager their payment methods stored on Slope. This requires the linking flow.
            </Text>
          </Alert>

          <CardRow
            mb="sm"
            rightContent={
              <Button leftIcon={<IconCreditCard />} onClick={() => alert('Not supported in demo')}>
                Update
              </Button>
            }
          >
            <Group>
              <IconCreditCard />
              <Title order={5}> Visa: Credit Card (1234)</Title>
            </Group>
          </CardRow>
          <CardRow
            rightContent={
              <Button
                leftIcon={<img alt="Slope Logo" src="/images/icon_white.svg" height={18} />}
                loading={loading}
                color="orange"
                disabled={!accessToken}
                onClick={onClickPaymentMethods}
              >
                {accessToken ? 'Manage Slope Payment Methods' : 'Requires Linking'}
              </Button>
            }
          >
            <Group>
              <IconBuildingBank size={20} />
              <Title order={5}>Slope Payment Methods</Title>
            </Group>
          </CardRow>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
