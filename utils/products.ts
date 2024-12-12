import { Product } from '../types/types'

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

const productPresets: Record<string, Product[]> = {
  Soda: [
    {
      quantity: 150,
      name: 'Coca-Cola Zero - 330ml, 24ct',
      price: 999,
      imageSrc: '/images/products/coke.avif',
      sku: 'coke-sku-1',
    },
    {
      quantity: 1440,
      name: 'Powerade ION 4 - Mountain Blast/Cherry Ice, 8ct',
      price: 1199,
      imageSrc: '/images/products/powerade.avif',
      sku: 'powerade-sku-1',
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

export const getProducts = (product) => productPresets[product]

export const getTotals = (products: Product[]) => {
  const subtotal = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  const total = subtotal

  return {
    subtotal,
    total,
  }
}

export const formatCurrency = (number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(number / 100.0)
    .toString()
