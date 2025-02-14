import React from 'react';
import { Title, Text } from '@mantine/core';

interface IntroSectionProps {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  width?: string;
  textSize?: string;
  spacing?: string;
  textAlign?: 'left' | 'center' | 'right';
  align?: 'left' | 'center'; // NEW: Controls section alignment
}

const IntroSection: React.FC<IntroSectionProps> = ({
  title,
  subtitle,
  paragraphs,
  width = '900px',
  textSize = 'md',
  spacing = '12px',
  textAlign = 'left',
  align = 'left', // Default to left alignment
}) => {
  return (
    <div
      style={{
        maxWidth: width,
        textAlign,
        margin: align === 'center' ? '0 auto' : '0',
        paddingLeft: align === 'left' ? '20px' : '0', // Adjusts left alignment
      }}
    >
      <Title order={1} style={{ marginBottom: spacing }}>{title}</Title>
      {subtitle && <Title order={3} style={{ marginBottom: spacing }}>{subtitle}</Title>}
      {paragraphs.map((para, index) => (
        <Text key={index} size={textSize} style={{ marginBottom: spacing }}>
          {para}
        </Text>
      ))}
    </div>
  );
};

export default IntroSection;