import { Title, Button, Text, Container, createStyles, Group } from '@mantine/core'
import { IconDiscountCheck } from '@tabler/icons'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const Success: React.FC = () => {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Container className={classes.root}>
      <Text sx={{ textAlign: 'center' }} color="green.2">
        <IconDiscountCheck size={400} />
      </Text>
      <Title className={classes.title}>Thank you for your purchase!</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        You&apos;re order number{' '}
        <Text span fw={700}>
          #{router.query.orderNumber}
        </Text>{' '}
        is expected to be be shipped within 1-3 business days!
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => router.push('/')}>
          Return home
        </Button>
      </Group>
    </Container>
  )
}

export default Success
