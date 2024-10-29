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
    <MerchantDemoPage screenshotSrc="/images/uline_checkout_3_payment.png">
      <UnstyledButton
        pos="absolute"
        w={106}
        h={38}
        top={240}
        right={395}
        onClick={() => router.push('/checkout')}
      />
      <UnstyledButton
        pos="absolute"
        w={106}
        h={38}
        top={825}
        right={396}
        onClick={() => router.push('/checkout')}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
