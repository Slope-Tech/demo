import {
  createStyles,
  Header,
  Group,
  Container,
  Avatar,
  Text,
  Anchor,
  Button,
  Box,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.white,
  },
}))

export const MainHeader: React.FC = () => {
  const { classes } = useStyles()
  const router = useRouter()
  let height = 60
  let accountPath = '/account'
  let homePath = '/'
  let deprecationAlert
  if (router.pathname.startsWith('/v3')) {
    deprecationAlert = (
      <Box bg="red.2">
        <Container py="sm">
          <Group position="apart" noWrap>
            <Group>
              <IconAlertCircle color="red" />
              <Text size="sm" color="red.8" fw={600}>
                This V3 API is now deprecated. Please use the new V4 API experience.
              </Text>
            </Group>

            <Button
              component="a"
              color="red"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                router.push('/')
              }}
            >
              Use V4 API
            </Button>
          </Group>
        </Container>
      </Box>
    )
    height += 60
    accountPath = '/v3/account'
    homePath = '/v3'
  }

  return (
    <Header height={height}>
      <Box bg="fog.8">
        <Container>
          <Group position="apart" py="xs">
            <Text
              component="a"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                router.push(homePath)
              }}
              color="white"
              size={25}
              fw={700}
            >
              <img alt="Slope Logo" src="/images/slope_logo.svg" height={32} />
              &nbsp;| Demo
            </Text>

            <Anchor
              href={accountPath}
              className={classes.link}
              onClick={(e) => {
                e.preventDefault()
                router.push(accountPath)
              }}
            >
              <Group spacing="sm">
                <Avatar src="/images/alice.jpg" alt="Name" radius="xl" size={34} />
                <Text weight={600} size="md" sx={{ lineHeight: 1 }} mr={3}>
                  Alice D
                </Text>
              </Group>
            </Anchor>
          </Group>
        </Container>
      </Box>
      {deprecationAlert}
    </Header>
  )
}
