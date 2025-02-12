import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Checkout: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/amazon_sellers_homepage.htm')
  }, [])
  return null
}

export default Checkout