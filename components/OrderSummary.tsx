import {
  Divider,
  Grid,
  Group,
  List,
  NumberInput,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { formatCurrency, getProducts, getTotals } from '../utils/products'

const OrderSummary: React.FC<{
  product: string
  setProduct: any
  total: number
  setTotal: any
  onProductsChange?: (products: any[]) => void
}> = ({ product, setProduct, total, setTotal, onProductsChange = () => {} }) => {
  const [editableProducts, setEditableProducts] = useState(getProducts(product))

  // Update editable products when product type changes
  useEffect(() => {
    setEditableProducts(getProducts(product))
  }, [product])

  // Recalculate totals when products change
  useEffect(() => {
    const totals = getTotals(editableProducts)
    setTotal(totals.total)
    // Pass updated products to parent component
    if (onProductsChange) {
      onProductsChange(editableProducts)
    }
  }, [editableProducts, setTotal, onProductsChange])

  const updateProductQuantity = (sku: string, newQuantity: number) => {
    setEditableProducts((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const updateProductPrice = (sku: string, newPrice: number) => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, price: Math.max(0, newPrice) } : item))
    )
  }

  const totals = getTotals(editableProducts)

  console.log(total)
  return (
    <>
      <Group position="apart" mb="md">
        <Title order={3}>Order</Title>
        <SegmentedControl
          data={['Soda', 'Socks']}
          value={product}
          onChange={(value) => {
            setProduct(value)
          }}
          size="sm"
        />
      </Group>

      <List listStyleType="none" mb={20}>
        {editableProducts.map((productItem) => (
          <List.Item key={productItem.sku} mb="md">
            <Grid>
              <Grid.Col span={3}>
                <img width="100%" src={productItem.imageSrc} alt={productItem.name} />
              </Grid.Col>
              <Grid.Col span={9}>
                <Title order={5}>{productItem.name}</Title>
                <Group spacing="xs" mb="xs">
                  <Text size="sm" fw={700} color="dimmed">
                    Price:
                  </Text>
                  <NumberInput
                    value={productItem.price / 100} // Convert cents to dollars for display
                    onChange={(value) =>
                      updateProductPrice(productItem.sku, Math.round((value || 0) * 100))
                    }
                    precision={2}
                    step={0.01}
                    min={0}
                    decimalSeparator="."
                    prefix="$"
                    size="xs"
                    hideControls
                    styles={(theme) => ({
                      input: {
                        border: `1px solid ${theme.colors.gray[3]}`,
                        borderRadius: theme.radius.sm,
                        padding: '4px 8px',
                        fontWeight: 700,
                        minWidth: '80px',
                        textAlign: 'center',
                        '&:hover': {
                          borderColor: theme.colors.blue[4],
                        },
                        '&:focus': {
                          borderColor: theme.colors.blue[6],
                        },
                      },
                    })}
                  />
                </Group>
                <Group spacing="xs" mb="xs">
                  <Text size="sm" fw={700} color="dimmed">
                    Quantity:
                  </Text>
                  <NumberInput
                    value={productItem.quantity}
                    onChange={(value) => updateProductQuantity(productItem.sku, value || 0)}
                    min={0}
                    size="xs"
                    hideControls
                    styles={(theme) => ({
                      input: {
                        border: `1px solid ${theme.colors.gray[3]}`,
                        borderRadius: theme.radius.sm,
                        padding: '4px 8px',
                        fontWeight: 700,
                        minWidth: '60px',
                        textAlign: 'center',
                        '&:hover': {
                          borderColor: theme.colors.blue[4],
                        },
                        '&:focus': {
                          borderColor: theme.colors.blue[6],
                        },
                      },
                    })}
                  />
                </Group>
                <Text size="sm" fw={700}>
                  <Text span color="dimmed">
                    SKU:
                  </Text>{' '}
                  {productItem.sku}
                </Text>
              </Grid.Col>
            </Grid>
          </List.Item>
        ))}
      </List>
      <Divider my="sm" variant="dotted" />
      <Group position="apart" mb={5}>
        <Text color="dimmed" size="sm" fw={700}>
          Subtotal
        </Text>
        <Text size="sm" fw={700}>
          {formatCurrency(totals.subtotal)}
        </Text>
      </Group>
      <Group position="apart" mb={5}>
        <Text color="dimmed" size="sm" fw={700}>
          Taxes
        </Text>
        <Text size="sm" fw={700}>
          {formatCurrency(0)}
        </Text>
      </Group>
      <Divider my="sm" variant="dotted" />
      <Group position="apart" mb={5}>
        <Text color="dimmed" size="sm" fw={700}>
          Total
        </Text>
        <Text size="sm" fw={700}>
          {formatCurrency(totals.total)}
        </Text>
      </Group>
    </>
  )
}

export default OrderSummary
