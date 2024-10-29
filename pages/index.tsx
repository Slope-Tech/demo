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
      <MerchantDemoPage screenshotSrc="/images/uline_checkout_1_address.png">
      <UnstyledButton
        pos="absolute"
        w={106}
        h={38}
        bottom={109}
        left={374}
        onClick={() => router.push('/shipping')}
      />
    </MerchantDemoPage>
  )
}

export default IndexPage
