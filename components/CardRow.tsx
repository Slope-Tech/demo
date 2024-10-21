import { Card, CardProps, Group } from '@mantine/core'
import React from 'react'

export const CardRow: React.FC<{
  children: React.ReactNode
  rightContent: React.ReactNode,
} & CardProps> = ({ children, rightContent, ...cardProps }) => (
  <Card radius="md" withBorder {...cardProps}>
      <Card.Section p="xl">
        <Group position="apart">
          {children}
          {rightContent}
        </Group>
      </Card.Section>
    </Card>
  )
