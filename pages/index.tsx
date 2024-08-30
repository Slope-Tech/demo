import React from 'react'
import {
  Button,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useRouter } from 'next/router'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const Product = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/shopping_cart')
  }
  return (
    <Center w='100%' h='100%'>
      <Box pos='relative' w={1400} h={770} sx={{ flexShrink: 0}}>
        <Image pos='absolute' width='100%' height='100%' src='/images/dentsply_product.png' alt='Dentsply Product' />
        <Box pos='relative' w='100%' h='100%'>
          <Button pos='absolute' bottom={223} right={72} w={378} h={36} color='yellow.6' bg='#FFA726' c='black' onClick={handleClick}>ADD TO CART</Button>
        </Box>
      </Box>
    </Center>
  )
}

export default Product
