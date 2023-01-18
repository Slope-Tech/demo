import { Divider, Grid, Group, List, Text, Title } from '@mantine/core'
import React from 'react'
import { formatCurrency, getProducts, getTotals } from '../utils/products'

const OrderSummary: React.FC<{ product: string }> = ({ product }) => {
  const products = getProducts(product)
  const totals = getTotals(products)
  return (
    <>
      <Title order={3} mb="sm">
        Order
      </Title>
      <List listStyleType="none" mb={20}>
        {products.map((productItem) => (
          <List.Item key={productItem.id} mb="md">
            <Grid>
              <Grid.Col span={3}>
                <img width="100%" src={productItem.imageSrc} alt={productItem.name} />
              </Grid.Col>
              <Grid.Col span={9}>
                <Title order={5}>{productItem.name}</Title>
                <Text size="sm" fw={700}>
                  <Text span color="dimmed">
                    Price:
                  </Text>{' '}
                  {formatCurrency(productItem.price)}
                </Text>
                <Text size="sm" fw={700}>
                  <Text span color="dimmed">
                    Quantity:
                  </Text>{' '}
                  {productItem.quantity}
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
          {formatCurrency(totals.taxes)}
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
