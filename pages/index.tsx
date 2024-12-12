import React from 'react'
import { useRouter } from 'next/router'
import { UnstyledButton } from '@mantine/core'
import { AppData } from '../types/types'
import MerchantDemoPage from '../components/custom-demos/MerchantDemoPage'

declare global {
  interface Window {
    SlopeJs: any
  }
}

const IndexPage: React.FC<{
  appData: AppData
  updateAppData: any
}> = () => {
  const router = useRouter()
  return (
    <MerchantDemoPage screenshotSrc="/images/smartandfinal_index.png">
      <UnstyledButton
        pos="absolute"
        top={8}
        left={50}
        w={230}
        h={44}
        // sx={{ border: '1px solid orange' }}
        onClick={() => router.push('/')}
      />
      <UnstyledButton
        pos="absolute"
        top={64}
        left={1188}
        w={140}
        h={40}
        // sx={{ border: '1px solid orange' }}
        onClick={() => router.push('/cart')}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
