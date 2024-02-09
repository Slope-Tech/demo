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
import { IconChevronDown, IconWallet } from '@tabler/icons'
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
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.NEW)
  const { classes } = useStyles()
  const router = useRouter()

  const item = {
    link: '/payment_methods',
    label: 'Payment Methods',
  }

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

  const mItem = (
    <Menu.Item>
      <Anchor
        href={item.link}
        onClick={(e) => {
          e.preventDefault()
          router.push(item.link)
        }}
      >
        <Group>
          <IconWallet />
          {item.label}
        </Group>
      </Anchor>
    </Menu.Item>
  )

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
      <Menu.Dropdown>{mItem}</Menu.Dropdown>
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
          width: 300,
        }}
        value={customerType}
        onChange={(value) => {
          const newCustomerType = value as CustomerType
          setCustomerType(newCustomerType)
          setCustomerForm({
            ...customerForm,
            email: generateDemoEmail({
              customerType: newCustomerType,
            }),
          })
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
                  <Menu>{mItem}</Menu>
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
