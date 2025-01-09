const unusedProducts = {
  Beer: [
    {
      quantity: 180,
      name: 'Budweiser Beer - 6 pack - 16oz Cans',
      price: 639,
      imageSrc: '/images/products/budweiser.jpg',
      sku: 'budweiser-sku-1',
    },
    {
      quantity: 210,
      name: 'Corona Extra - 24 pack - 12oz Bottle',
      price: 2899,
      imageSrc: '/images/products/corona.jpg',
      sku: 'corona-sku-1',
    },
  ],
}

const products = {
  Soda: [
    {
      quantity: 110,
      name: 'Nitro Pepsi - Variety Pack',
      price: 999,
      imageSrc: '/images/products/nitro-pepsi.png',
      sku: 'pepsi-sku-1',
    },
    {
      quantity: 1120,
      name: 'Mtn Dew Major Melon Watermelon -  12 Count',
      price: 799,
      imageSrc: '/images/products/mtn-dew-major-melon.jpeg',
      sku: 'mtn-dew-sku-1',
    },
  ],
  Socks: [
    {
      quantity: 67,
      name: 'Slope Socks',
      price: 1997,
      imageSrc: '/images/products/socks.jpg',
      sku: 'slope-socks-sku-1',
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

  const total = subtotal

  return {
    subtotal,
    total,
  }
}

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(number / 100.0)
    .toString()
}
