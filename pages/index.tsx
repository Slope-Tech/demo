import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

declare global {
  interface Window {
    initializeSlope: any
    Slope: any
    SlopeJs: any
  }
}

const Checkout: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/chamfr/cart.html')
  }, [])
  return null
}

export default Checkout
