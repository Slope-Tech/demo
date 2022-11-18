import {
  createStyles, Text, Container, Group,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
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
}));

const MainFooter = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Text<'a'> target="_blank" component="a" href="https://slope.so" className={classes.link} color="dimmed" size="sm">
          © 2022 - Slope
        </Text>

        <Group spacing={0} position="right" noWrap>
          <Text<'a'> target="_blank" component="a" href="https://developers.slope.so" className={classes.link} color="dimmed" size="sm">
            Slope Developer Portal
          </Text>
        </Group>
      </Container>
    </footer>
  );
};

export default MainFooter;
