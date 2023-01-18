const unusedProducts = {
  Beer: [
    {
      id: 1,
      quantity: 180,
      name: 'Budweiser Beer - 6 pack - 16oz Cans',
      price: 639,
      imageSrc: '/images/products/budweiser.jpg',
    },
    {
      id: 2,
      quantity: 210,
      name: 'Corona Extra - 24 pack - 12oz Bottle',
      price: 2899,
      imageSrc: '/images/products/corona.jpg',
    },
  ],
}

const products = {
  Soda: [
    {
      id: 1,
      quantity: 150,
      name: 'Nitro Pepsi - Variety Pack',
      price: 999,
      imageSrc: '/images/products/nitro-pepsi.png',
    },
    {
      id: 2,
      quantity: 1440,
      name: 'Mtn Dew Major Melon Watermelon -  12 Count',
      price: 799,
      imageSrc: '/images/products/mtn-dew-major-melon.jpeg',
    },
  ],
  Socks: [
    {
      id: 3,
      quantity: 150,
      name: 'Slope Socks',
      price: 829,
      imageSrc: '/images/products/socks.jpg',
    },
  ],
}

export const getProducts = (product) => {
  return products[product]
}

export const getTotals = (products) => {
  const subtotal = products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity
  }, 0)

  const taxes = Math.round(subtotal * 0.09)
  const total = subtotal + taxes

  return {
    subtotal,
    taxes,
    total,
  }
}

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(number / 100.0)
    .toString()
}
