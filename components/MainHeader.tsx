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
} from '@mantine/core';
import { IconChevronDown, IconWallet } from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QUALIFIED_EMAIL_SUFFIX, getEmailValue, qualifiedEmail } from '../utils/email';

const HEADER_HEIGHT = 56;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
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
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
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
}));

const MainHeader: React.FC<{ customerForm: Record<string, any>, setCustomerForm: any}> = (
  { customerForm, setCustomerForm },
) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();

  const item = {
    link: '/payment_methods',
    label: 'Payment Methods',
  };

  const mItem = (
    <Menu.Item>
      <Anchor
        href={item.link}
        onClick={(e) => {
          e.preventDefault();
          router.push(item.link);
        }}
      >
        <Group>
          <IconWallet />
          {item.label}
        </Group>
      </Anchor>
    </Menu.Item>
  );

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
      <Menu.Dropdown>
        {mItem}
      </Menu.Dropdown>
    </Menu>
  );

  const controls = (
    <>
      <SegmentedControl
        data={['Socks', 'Beer']}
        value={customerForm.product}
        onChange={(value) => {
          setCustomerForm({
            ...customerForm,
            product: value,
          });
        }}
        size="sm"
      />
      <SegmentedControl
        data={[{ label: 'Pay Now & Later', value: 'on' }, { label: 'Pay Later', value: '' }]}
        size="sm"
        value={customerForm.payNow ? 'on' : ''}
        onChange={(value) => {
          setCustomerForm({
            ...customerForm,
            payNow: !!value,
          });
        }}
      />
      <SegmentedControl
        data={[
          { label: 'Qualified', value: QUALIFIED_EMAIL_SUFFIX },
          { label: 'New', value: '' },
        ]}
        size="sm"
        value={getEmailValue(customerForm.email)}
        onChange={(value) => {
          setCustomerForm({
            ...customerForm,
            email: qualifiedEmail(customerForm.email, value),
          });
        }}
      />
    </>
  );

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <Text
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
            color="white"
            size="xl"
            fw={700}
          >
            <img alt="Slope Logo" src="/images/slope_logo_white.png" height={32} />
            {'  '}
            Slope Demo
          </Text>
          <Group spacing={10} className={classes.links}>
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
                <Group spacing={10}>
                  {controls}
                  <Menu>{mItem}</Menu>
                </Group>
              </Paper>
            )}
          </Transition>

        </div>
      </Container>
    </Header>
  );
};

export default MainHeader;
