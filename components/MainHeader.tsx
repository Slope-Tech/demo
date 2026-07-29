import { createStyles, Header, Group, Container, Avatar, Text, Anchor, Box } from '@mantine/core'
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

  return (
    <Header height={60}>
      <Box bg="fog.8">
        <Container>
          <Group position="apart" py="xs">
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

            <Anchor
              href="/account"
              className={classes.link}
              onClick={(e) => {
                e.preventDefault()
                router.push('/account')
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
    </Header>
  )
}
