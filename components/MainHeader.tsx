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
  Center,
  Box
} from '@mantine/core'
import {
  IconChevronDown,
  IconCircleLetterX,
  IconWallet,
  IconX
} from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CustomerType, generateDemoEmail, ProductFlow } from '../utils/email'

const HEADER_HEIGHT = 56

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor
    }).background,
    borderBottom: 0
  },

  dev: {
    backgroundColor: theme.colors.orange[7]
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
      color: theme.primaryColor
    }).background,
    overflow: 'hidden',
    padding: 8,

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '90%'
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    textDecoration: 'none',
    color: theme.white
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  }
}))

const MainHeader: React.FC<{
  customerForm: Record<string, any>
  setCustomerForm: any
  productFlow: ProductFlow
  setProductFlow: any
}> = ({ customerForm, setCustomerForm, productFlow, setProductFlow }) => {
  const [devCounter, setDevCounter] = useState<number>(0)
  const [enableDev, setEnableDev] = useState<boolean>(false)
  const [opened, setOpened] = useState(false)
  const [customerType, setCustomerType] = useState<CustomerType>(
    CustomerType.NEW
  )
  const { classes } = useStyles()
  const router = useRouter()

  const item = {
    link: '/payment_methods',
    label: 'Payment Methods'
  }

  const baseCustomerTypes = [
    { label: 'Qualified', value: CustomerType.PREQUALIFIED },
    { label: 'New', value: CustomerType.NEW }
  ]

  let availableCustomerTypes = enableDev
    ? [
        ...baseCustomerTypes,
        { label: 'Ineligible', value: CustomerType.INELIGIBLE },
        {
          label: (
            <Center>
              <IconX size={12} color="red" />
              <Box>Order Max</Box>
            </Center>
          ),
          value: CustomerType.ORDER_MAX
        },
        {
          label: (
            <Center>
              <IconX size={12} color="red" />
              <Box>Order Min</Box>
            </Center>
          ),
          value: CustomerType.ORDER_MIN
        },
        {
          label: (
            <Center>
              <IconX size={12} color="red" />
              <Box>Outstanding</Box>
            </Center>
          ),
          value: CustomerType.OUTSTANDING
        },
        {
          label: (
            <Center>
              <IconX size={12} color="red" />
              <Box>Overdue</Box>
            </Center>
          ),

          value: CustomerType.OVERDUE
        }
      ]
    : baseCustomerTypes

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
        data={['Socks', 'Beer']}
        value={customerForm.product}
        onChange={(value) => {
          setCustomerForm({
            ...customerForm,
            product: value
          })
        }}
        size="xs"
      />
      <SegmentedControl
        data={[
          { label: 'Pay Now & Later', value: ProductFlow.BNPL_AND_PAY_NOW },
          { label: 'Pay Now', value: ProductFlow.PAY_NOW_ONLY },
          { label: 'Pay Later', value: ProductFlow.BNPL_ONLY }
        ]}
        size="xs"
        value={productFlow}
        onChange={(value) => {
          const newProductFlow = value as ProductFlow
          setProductFlow(newProductFlow)
          setCustomerForm({
            ...customerForm,
            email: generateDemoEmail({
              customerType
            })
          })
        }}
      />
      <SegmentedControl
        data={availableCustomerTypes}
        size="xs"
        value={customerType}
        onChange={(value) => {
          const newCustomerType = value as CustomerType
          setCustomerType(newCustomerType)
          setCustomerForm({
            ...customerForm,
            email: generateDemoEmail({
              customerType: newCustomerType
            })
          })
        }}
      />
    </>
  )

  return (
    <Header
      height={HEADER_HEIGHT}
      className={`${classes.header} ${enableDev ? classes.dev : ''}`}
    >
      <Container className={classes.inner}>
        <Text
          component="a"
          href="/"
          onClick={(e) => {
            setDevCounter(devCounter + 1)
            if (enableDev) {
              if (devCounter > 0) {
                setEnableDev(false)
                setDevCounter(0)
                if (
                  customerType !== CustomerType.NEW &&
                  customerType !== CustomerType.PREQUALIFIED
                ) {
                  setCustomerType(CustomerType.NEW)
                  setCustomerForm({
                    ...customerForm,
                    email: generateDemoEmail({
                      customerType: CustomerType.NEW
                    })
                  })
                }
              }
            } else {
              if (devCounter > 3) {
                setEnableDev(true)
                setDevCounter(0)
              }
            }
            e.preventDefault()
            router.push('/')
          }}
          color="white"
          size="xl"
          fw={700}
        >
          <img
            alt="Slope Logo"
            src="/images/slope_logo_white.png"
            height={32}
          />
          &nbsp;&nbsp;Slope De{enableDev ? 'v-' : ''}mo
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
      </Container>
    </Header>
  )
}

export default MainHeader
