import { Box, Center, Image } from '@mantine/core'
import React, { ReactNode, RefObject } from 'react'

const MerchantDemoPage: React.FC<{
  screenshotSrc: string
  children?: ReactNode
  viewportRef?: RefObject<HTMLDivElement> | null
}> = ({ screenshotSrc, children = null, viewportRef = null }) => (
  <Center h="100vh" w="100%">
    <Box pos="relative" mah="100vh" w="100%" sx={{ flexShrink: 0, overflow: 'auto' }}>
      <Box pos="relative" ref={viewportRef} w={1400} mx="auto">
        <Image src={screenshotSrc} alt="merchant website" />
        {children}
      </Box>
    </Box>
  </Center>
)

export default MerchantDemoPage
