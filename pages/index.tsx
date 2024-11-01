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
    <MerchantDemoPage screenshotSrc="/images/ebay_item.png">
      <UnstyledButton
        pos="absolute"
        w={463}
        h={50}
        top={502}
        right={48}
        onClick={() => router.push('/checkout')}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
