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
    <MerchantDemoPage screenshotSrc="/images/uline_checkout_2_shipping.png">
      <UnstyledButton
        pos="absolute"
        w={106}
        h={38}
        top={240}
        right={398}
        onClick={() => router.push('/payment')}
      />
      <UnstyledButton
        pos="absolute"
        w={106}
        h={38}
        top={551}
        right={396}
        onClick={() => router.push('/payment')}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
