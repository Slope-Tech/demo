import { Card, Group } from '@mantine/core'
import React from 'react'

export const CardRow: React.FC<{
  children: React.ReactNode
  rightContent: React.ReactNode
}> = ({ children, rightContent }) => (
  <Card p="lg" radius="md" withBorder mb="xs">
      <Card.Section p="xl">
        <Group position="apart">
          {children}
          {rightContent}
        </Group>
      </Card.Section>
    </Card>
  )
