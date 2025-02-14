import { Card, Text, Title, List, Button } from '@mantine/core';

const SlopeFinanceProgram = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: '12px',
        border: '1px solid #ccc',
        padding: '16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Title order={2}>Slope Finance Program</Title>
      <Text size="sm" mt="sm">
        Amazon is now partnering with Slope to offer merchants a flexible line of 
        credit that you can draw on at any time, empowering you to grow with ease.
      </Text>

      <List mt="md" spacing="sm">
        <List.Item>Get the online application in less than 5 minutes</List.Item>
        <List.Item>
          Get approved up to $250k instantly and up to millions as soon as 2 business days
        </List.Item>
        <List.Item>Use secured funds however your business needs</List.Item>
      </List>

      <Text size="sm" mt="md">
        To be eligible, you must be a registered business in the US with an EIN.
      </Text>
      <Text size="sm">
        Amazon will additionally provide Slope with business information to aid Slope in the loan application.
      </Text>

      <Text size="sm" mt="sm">
        <a href="https://slopepay.com/faqs" target="_blank" rel="noopener noreferrer">
          Click here
        </a>{' '}
        for more information.
      </Text>

      <Button
        component="a"
        href="https://pay.sandbox.slopepay.com/signup/mch_2svM16cZdSq3pKVIyjH0aBcB3vE"
        target="_blank"
        rel="noopener noreferrer"
        mt="md"
        fullWidth
      >
        Get started with Slope
      </Button>
    </Card>
  );
};

export default SlopeFinanceProgram;