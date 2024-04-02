import React, { useEffect } from 'react'
import { Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { ProductFlow } from '../utils/email'

const Checkout: React.FC<{
  customerForm: Record<string, any>
  setCustomerForm: any
  productFlow: ProductFlow
}> = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/hp_com/shopping_cart.html')
  }, [])

  return (
    <Loader />
  )
}

export default Checkout
