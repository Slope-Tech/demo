import {
  Box,
  Text,
  Button,
  Code,
  SimpleGrid,
  TextInput,
  Select,
  Group,
  Container,
  Accordion,
  Checkbox,
  Center,
  CopyButton,
  ActionIcon,
  BoxProps,
} from '@mantine/core'
import {
  IconClipboardCheck,
  IconClipboardCopy,
  IconPlugConnected,
  IconUserPlus,
} from '@tabler/icons'
import React, { useState } from 'react'
import { customerTypeToShortcutTypes, generateDemoEmail, parseTaxIdFromEmail } from '../utils/email'
import { CustomerType } from '../types/types'

const CustomerForm: React.FC<
  {
    appData: any
    updateAppData: any
  } & BoxProps
> = ({ appData, updateAppData, ...boxProps }) => {
  const { customerForm } = appData
  const [loadingUser, setLoadingUser] = useState(false)
  const [createCustomerResponse, setCreateCustomerResponse] = useState<any>(undefined)
  const [showCustomerForm, setShowCustomerForm] = useState<string | null>('customer')

  const onClickCreateCustomer = async () => {
    setLoadingUser(true)
    const response = await fetch('/api/v4-create-customer', {
      method: 'POST',
      body: JSON.stringify({
        shortcutTypes: customerTypeToShortcutTypes(customerForm.customerType),
        businessName: customerForm.businessName,
        phone: customerForm.phone,
        address: {
          line1: customerForm.line1,
          city: customerForm.city,
          state: customerForm.state,
          postalCode: customerForm.postalCode,
          country: customerForm.country,
        },
        taxId: parseTaxIdFromEmail(customerForm.email),
        isLinked: customerForm.isLinked,
      }),
    })

    const body = await response.json()

    if (body.linkToken) {
      const linkTokenResponse = await fetch('/api/v4-user-links', {
        method: 'POST',
        body: JSON.stringify({
          linkToken: body.linkToken,
        }),
      })

      const data = await linkTokenResponse.json()
      updateAppData({ linkToken: body.linkToken, accessToken: data.accessToken })
    }

    setCreateCustomerResponse(body)
    setLoadingUser(false)
    setShowCustomerForm(null)
  }

  const availableCustomerTypes = [
    { label: 'New', value: CustomerType.NEW, group: '' },
    { label: 'Qualified', value: CustomerType.SKIP_PRE_QUALIFY, group: '' },
    { label: 'Skip Compliance', value: CustomerType.SKIP_COMPLIANCE, group: '' },
    { label: 'Skip Banking', value: CustomerType.SKIP_BANKING, group: '' },
    {
      label: 'Skip Compliance & Banking',
      value: CustomerType.SKIP_COMPLIANCE_AND_BANKING,
      group: '',
    },
    {
      label: 'Skip Consumer Credit',
      value: CustomerType.SKIP_CONSUMER_CREDIT,
      group: '',
    },
    {
      label: 'Skip Compliance & Consumer Credit',
      value: CustomerType.SKIP_COMPLIANCE_AND_CONSUMER_CREDIT,
      group: '',
    },
    // TODO - @aliceslin91 this shortcut does not work, have not dug into why
    // {
    //   label: 'Skip Compliance & Banking & Consumer Credit',
    //   value: CustomerType.SKIP_COMPLIANCE_AND_BANKING_AND_CONSUMER_CREDIT as string,
    //   group: '',
    // },
  ]

  const renderFormField = (field: string, label: string) => {
    const value = customerForm[field]
    let error
    if (field === 'state' && value.length !== 2) {
      error = 'State must be 2 characters'
    } else if (!value) {
      error = `${label} cant be blank`
    }

    return (
      <TextInput
        mb={10}
        onChange={(event) => {
          const newForm = { ...customerForm }
          newForm[field] = event.currentTarget.value
          updateAppData({ customer: newForm })
        }}
        value={value}
        label={label}
        withAsterisk
        error={error}
      />
    )
  }

  if (createCustomerResponse) {
    const copyButton = (
      <CopyButton value={createCustomerResponse.email}>
        {({ copied, copy }) => (
          <ActionIcon color={copied ? 'green' : 'gray'} onClick={copy}>
            {copied ? <IconClipboardCheck /> : <IconClipboardCopy />}
          </ActionIcon>
        )}
      </CopyButton>
    )

    const completedText = appData.accessToken ? (
      <Group spacing={5}>
        <IconPlugConnected />
        You are now linked to Slope as <Code>{createCustomerResponse.email}</Code>
        {copyButton} password:
        <Code>{createCustomerResponse.password}</Code>
      </Group>
    ) : (
      <Group spacing={5}>
        <IconUserPlus />
        Created customer <Code>{createCustomerResponse.email}</Code>
        {copyButton} use password:
        <Code>{createCustomerResponse.password}</Code>
      </Group>
    )

    return (
      <Box bg="fog.3">
        <Container>
          <Center>
            <Text py="md" color="black" fw={600} size="sm">
              {completedText}
            </Text>
          </Center>
        </Container>
      </Box>
    )
  }

  return (
    <Box bg="gray.1" {...boxProps}>
      <Container>
        <Accordion value={showCustomerForm} onChange={setShowCustomerForm}>
          <Accordion.Item value="customer">
            <Accordion.Control>
              <Text fw="bold">Create customer</Text>
            </Accordion.Control>

            <Accordion.Panel>
              <Group grow>
                <Select
                  mb={10}
                  data={availableCustomerTypes}
                  label="Customer Type"
                  size="sm"
                  value={customerForm.customerType}
                  onChange={(value) => {
                    const newCustomerType = value as CustomerType
                    updateAppData({
                      customerForm: {
                        ...customerForm,
                        customerType: newCustomerType,
                        email: generateDemoEmail({
                          customerType: newCustomerType,
                        }),
                      },
                    })
                  }}
                />
                {renderFormField('email', 'Email')}
              </Group>

              <SimpleGrid cols={2}>
                {renderFormField('businessName', 'Business Name')}
                {renderFormField('phone', 'Phone')}
              </SimpleGrid>
              <SimpleGrid cols={4}>
                {renderFormField('line1', 'Address')}
                {renderFormField('city', 'City')}
                {renderFormField('state', 'State')}
                {renderFormField('postalCode', 'Postal Code')}
              </SimpleGrid>

              <Group grow>
                <Checkbox
                  label="Merchant-linked account"
                  checked={customerForm.isLinked}
                  onChange={(event) => {
                    updateAppData({
                      customerForm: {
                        ...customerForm,
                        isLinked: event.currentTarget.checked,
                      },
                    })
                  }}
                />
                <Button
                  disabled={createCustomerResponse}
                  leftIcon={<IconUserPlus />}
                  color="orange"
                  loading={loadingUser}
                  onClick={onClickCreateCustomer}
                >
                  Create Slope user account
                </Button>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Box>
  )
}

export default CustomerForm
