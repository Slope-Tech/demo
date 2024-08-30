import { Box, Center, Image } from "@mantine/core"

const Success = () => (
  <Center w='100%' h='100%'>
    <Box pos='relative' w={1400} h={770} sx={{ flexShrink: 0}}>
      <Image pos='absolute' width='100%' height='100%' src='/images/dentsply_order_confirmation.png' alt='Dentsply Success' />
      <Box pos='relative' w='100%' h='100%'>
        {/*  */}
      </Box>
    </Box>
  </Center>
)


export default Success
