import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Checkout: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/shopping_cart.html')
  }, [])
  return null
}

export default Checkout