import { Card, Flex, Text, Button, Image, Stack, List } from '@mantine/core';

interface OfferCardProps {
  logoSrc: string;
  companyName: string;
  cashAdvance: string;
  repaymentTime: string;
  reducedFee: string;
  statusContent?: React.ReactNode;
  statusAlignment?: 'left' | 'center' | 'right'; 
  statusPaddingRight?: string; // NEW: Adds spacing between Status content and Button
  buttonColor?: string;
  brandColor?: string;
  columnTitleColor?: string;
  columnTitleSize?: string;
  valueColor?: string;
  valueSize?: string;
  columnWidths?: string[];
  statusColumnWidth?: string;
  cardWidth?: string;
  cardHeight?: string;
  logoWidth?: string;
  logoHeight?: string;
  logoContainerWidth?: string;
  companyColumnWidth?: string;
  href?: string;
  openInNewTab?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({
  logoSrc,
  companyName,
  cashAdvance,
  repaymentTime,
  reducedFee,
  statusContent = "Pre-approved",
  statusAlignment = "left",
  statusPaddingRight = "16px", // NEW: Default padding to separate Status and Button
  buttonColor = '#148296',
  brandColor = '#000000',
  columnTitleColor = '#6b7280',
  columnTitleSize = 'xs',
  valueColor = '#000000',
  valueSize = 'sm',
  columnWidths = ['180px', '120px', '160px'],
  statusColumnWidth = '250px',
  cardWidth = '1200px',
  cardHeight = '90px',
  logoWidth = '150px',
  logoHeight = 'auto',
  logoContainerWidth = '250px',
  companyColumnWidth = '350px',
  href = '#',
  openInNewTab = true,
}) => {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      p="md"
      style={{
        maxWidth: cardWidth,
        width: '100%',
        height: cardHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Left: Logo and Company Name Section */}
      <Flex
        align="center"
        gap="sm"
        style={{
          minWidth: logoContainerWidth,
          maxWidth: logoContainerWidth,
          flexShrink: 0,
        }}
      >
        <Image
          src={logoSrc}
          alt={companyName}
          width={logoWidth}
          height={logoHeight}
          style={{ objectFit: 'contain', maxWidth: '100%' }}
        />
        <Text
          weight={500}
          size="lg"
          style={{
            color: brandColor,
            minWidth: companyColumnWidth,
            maxWidth: companyColumnWidth,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            marginLeft: '12px',
          }}
        >
          {companyName}
        </Text>
      </Flex>

      {/* Middle: Columns (Cash Advance, Repayment Time, Reduced Fee) */}
      <Flex gap="lg" style={{ flexGrow: 1, justifyContent: 'center' }}>
        {[
          { label: 'Cash Advance', value: cashAdvance },
          { label: 'Repayment Time', value: repaymentTime },
          { label: 'Reduced Fee', value: reducedFee },
        ].map((item, index) => (
          <Stack key={index} spacing={0} align="center" style={{ minWidth: columnWidths[index], flexShrink: 0 }}>
            <Text size={columnTitleSize} style={{ color: columnTitleColor, whiteSpace: 'nowrap' }}>
              {item.label}
            </Text>
            <Text size={valueSize} weight={500} style={{ color: valueColor }}>
              {item.value}
            </Text>
          </Stack>
        ))}
      </Flex>

      {/* Right: Status Column (Now allows padding between status and button) */}
      <Flex
        style={{
          minWidth: statusColumnWidth,
          maxWidth: statusColumnWidth,
          flexShrink: 0,
          textAlign: statusAlignment,
          justifyContent: statusAlignment === "left" ? "flex-start" : statusAlignment === "right" ? "flex-end" : "center",
          paddingRight: statusPaddingRight, // NEW: Adds spacing between Status and Button
        }}
      >
        {typeof statusContent === 'string' ? (
          <Text size={valueSize} weight={500} style={{ color: valueColor }}>
            {statusContent}
          </Text>
        ) : (
          statusContent
        )}
      </Flex>

      {/* Right: View Offer Button */}
      <Button
        component="a"
        href={href}
        target={openInNewTab ? "_blank" : "_self"}
        rel={openInNewTab ? "noopener noreferrer" : ""}
        style={{
          backgroundColor: buttonColor,
          color: 'white',
          borderRadius: '6px',
          flexShrink: 0,
        }}
      >
        View Offer
      </Button>
    </Card>
  );
};

export default OfferCard;