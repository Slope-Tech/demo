import {
  createStyles,
  Header,
  Menu,
  Group,
  Burger,
  Container,
  Avatar,
  Text,
  Anchor,
  UnstyledButton,
  SegmentedControl,
  Paper,
  Transition,
  Select,
} from '@mantine/core'
import { IconCashBanknote, IconChevronDown, IconCreditCard, IconMoneybag, IconWallet } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CustomerType, generateDemoEmail, ProductFlow } from '../utils/email'

const HEADER_HEIGHT = 56

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: '#47546C',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
    overflow: 'hidden',
    padding: 8,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    textDecoration: 'none',
    color: theme.white,
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}))

const MainHeader: React.FC<{
  customerForm: Record<string, any>
  setCustomerForm: any
  productFlow: ProductFlow
  setProductFlow: any
}> = ({ customerForm, setCustomerForm, productFlow, setProductFlow }) => {
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles()
  const router = useRouter()

  const menuItems = [{
    icon: IconWallet,
    link: '/payment_methods',
    label: 'Payment Methods',
  }, {
    icon: IconCashBanknote,
    link: '/seller_financing',
    label: 'Seller Financing',
  }]

  let availableCustomerTypes = [{ label: 'New', value: CustomerType.NEW, group: '' }]
  // Shortcuts for non-production environment
  if (process.env.API_HOST !== 'https://api.slope.so') {
    availableCustomerTypes = [
      ...availableCustomerTypes,
      { label: 'Qualified', value: CustomerType.SKIP_PRE_QUALIFY, group: '' },
      { label: 'Skip Compliance', value: CustomerType.SKIP_COMPLIANCE, group: '' },
      { label: 'Skip Banking', value: CustomerType.SKIP_BANKING, group: '' },
      {
        label: 'Skip Compliance & Banking',
        value: CustomerType.SKIP_COMPLIANCE_AND_BANKING,
        group: '',
      },
      { label: 'Skip Consumer Credit', value: CustomerType.SKIP_CONSUMER_CREDIT, group: '' },
      {
        label: 'Skip Compliance & Consumer Credit',
        value: CustomerType.SKIP_COMPLIANCE_AND_CONSUMER_CREDIT,
        group: '',
      },
      {
        label: 'Skip Compliance & Banking & Consumer Credit',
        value: CustomerType.SKIP_COMPLIANCE_AND_BANKING_AND_CONSUMER_CREDIT,
        group: '',
      },
    ]
  }

  const mItems = menuItems.map((item) => (
    <Menu.Item key={item.link}>
      <Anchor
        href={item.link}
        onClick={(e) => {
          e.preventDefault()
          router.push(item.link)
        }}
      >
        <Group>
          {React.createElement(item.icon)}
          {item.label}
        </Group>
      </Anchor>
    </Menu.Item>
  ))

  const items = (
    <Menu trigger="hover" exitTransitionDuration={0}>
      <Menu.Target>
        <UnstyledButton className={classes.link}>
          <Group spacing={7}>
            <Avatar src="/images/alice.jpg" alt="Name" radius="xl" size={34} />
            <Text weight={600} size="md" sx={{ lineHeight: 1 }} mr={3}>
              Alice D
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{mItems}</Menu.Dropdown>
    </Menu>
  )

  const controls = (
    <>
      <SegmentedControl
        data={[
          { label: 'Pay Now', value: ProductFlow.PAY_NOW_ONLY },
          { label: 'Pay Later', value: ProductFlow.BNPL_ONLY },
          { label: 'Both', value: ProductFlow.BNPL_AND_PAY_NOW },
        ]}
        size="sm"
        value={productFlow}
        onChange={(value) => {
          const newProductFlow = value as ProductFlow
          setProductFlow(newProductFlow)
        }}
      />
      <Select
        data={availableCustomerTypes}
        size="sm"
        sx={{
          width: 240,
        }}
        value={customerForm.customerType}
        onChange={(value) => {
          const newCustomerType = value as CustomerType
          setCustomerForm({
            ...customerForm,
            customerType: newCustomerType,
            email: generateDemoEmail({
              customerType: newCustomerType,
            }),
          })
        }}
      />
       <SegmentedControl
        data={[
          { label: 'V3', value: '/' },
          { label: 'V4', value: '/v4' },
        ]}
        size="sm"
        value={router.pathname.startsWith('/v4') ? '/v4' : '/'}
        onChange={(value) => {
          if (value !== router.pathname) {
            router.push(value)
          }
        }}
      />
    </>
  )

  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <Text
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              router.push('/')
            }}
            color="white"
            size={25}
            fw={700}
          >
            <img alt="Slope Logo" src="/images/slope_logo.svg" height={32} />
            &nbsp;| Demo
          </Text>
          <Group spacing="sm" className={classes.links}>
            {controls}
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            className={classes.burger}
            size="sm"
            color="white"
          />
          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} style={styles}>
                <Group spacing="sm">
                  {controls}
                  <Menu>{mItems}</Menu>
                </Group>
              </Paper>
            )}
          </Transition>
        </div>
      </Container>
    </Header>
  )
}

export default MainHeader
