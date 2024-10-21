import { createStyles, Container, Group, Footer, Anchor } from '@mantine/core'
import { IconBrandGithub, IconCode, IconHome } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colors.fog[1],
    borderTop: `1px solid ${theme.colors.fog[3]}`,
  },

  link: {
    display: 'block',
    color: theme.colors.fog[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
}))

const MainFooter = () => {
  const { classes } = useStyles()

  return (
    <Footer height={120} className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Anchor
          target="_blank"
          href="https://slopepay.com"
          className={classes.link}
          color="dimmed"
          size="sm"
        >
          © {new Date().getFullYear()} - Slope Tech, Inc.
        </Anchor>

        <Group spacing="lg" position="right" noWrap>
          <Anchor
            target="_blank"
            href="https://pay.sandbox.slopepay.com"
            className={classes.link}
            color="dimmed"
            size="sm"
          >
            <Group spacing={5}>
              Buyer Portal <IconHome size={16} />
            </Group>
          </Anchor>

          <Anchor
            target="_blank"
            href="https://developers.slopepay.com"
            className={classes.link}
            color="dimmed"
            size="sm"
          >
            <Group spacing={5}>
              Developer Hub <IconCode size={16} />
            </Group>
          </Anchor>
          <Anchor
            target="_blank"
            href="https://github.com/Slope-Tech/demo"
            className={classes.link}
            color="dimmed"
            size="sm"
          >
            <Group spacing={5}>
              GitHub <IconBrandGithub size={16} />
            </Group>
          </Anchor>
        </Group>
      </Container>
    </Footer>
  )
}

export default MainFooter
