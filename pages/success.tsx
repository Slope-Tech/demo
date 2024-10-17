import { Anchor, Box, Center, Image, Space, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react";

const Success = () => {
  const [orderNumber, setOrderNumber] = useState('');
  useEffect(() => {
    setOrderNumber(new URLSearchParams(window.location.search).get('orderNumber') || '');
  }, [])
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={800} sx={{ flexShrink: 0}}>
        <Image pos='absolute' width='100%' height='100%' src='/images/alibaba_success.png' alt='Alibaba Success' />
        <Box pos='absolute' fz='sm' top={137} left={156} w={730} h={664} p='md'>
          <Title order={2}>Order payment received</Title>
          <Space h='lg' />
          {/* some generic order confirmation boilerplace and info of tracking and delivery */}
          <Title order={4}>General information</Title>
          <Text>Order Number: 219775523001022172</Text>
          <Text>Order Date: {new Date().toLocaleDateString()}</Text>
          <Text>Tracking Number: CH109512983123US</Text>
          <Text>Tracking URL: <Text span color='orange'>Link</Text></Text>
          <Space h='lg' />
          <Title order={4}>Payment information</Title>
          <Text>Payment Method: Slope Pay</Text>
          <Text>Slope confirmation number: {orderNumber}</Text>
          <Text>Check the status of your upcoming payments at <Anchor color='orange' href='https://pay.slopepay.com'>https://pay.slopepay.com</Anchor></Text>
        </Box>
      </Box>
    </Center>
  )
}


export default Success
