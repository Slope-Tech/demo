import React from 'react';
import OfferCard from './OfferCard';
import { List } from '@mantine/core';
import { Text } from '@mantine/core';
import IntroSection from './IntroSection';


interface OverlayProps {
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '48%', // Move it slightly up (adjust as needed)
        left: '50%',
        transform: 'translate(-50%, -50%)',

        width: '100vw',  // Adjust width relative to the viewport
        maxWidth: '1800px', // Ensures it doesn't get too big

        height: '40xvw', // Auto size based on content height
        maxHeight: '170vh', // Ensures it doesn’t get too tall
        overflowY: 'auto', // Allows scrolling if content overflows
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 10000,
        padding: '25px',
        borderRadius: '12px',
        border: '0px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.0)',
      }}
    >

      <IntroSection
        title="Amazon Sellers Finance"
        subtitle="How it works"
        paragraphs={[
          "Choose a financing option that meets your business's needs.",
          "Select 'Start Application' next to the financing option. For loans from third-party lenders (ones not issued by Amazon Lending), you'll be redirected to the lender's site.",
          "Fill out the application information. Note: A U.S. business bank account is required.",
          "Completed applications can take up to 5 days for a decision.",
          "Important information: You can apply for more than one financing option if they are issued by different lenders. However, once you accept a loan or lock your account with a lender, you will not be able to proceed with applications from other lenders.",
        ]}
        width="1500px"
        textSize="md"
        spacing="12px"
        textAlign="left"
      />
      <p></p>

      <OfferCard
      logoSrc="https://assets.slopepay.com/images/slope_logo.png"
      companyName="Capital by Slope"
      cashAdvance="$100,000"
      repaymentTime="12 weeks"
      reducedFee="3%"
      status="Pre-approved"
      buttonColor="#148296"
      brandColor="#1E40AF"
      columnTitleColor="#4B5563"
      columnTitleSize="sm"
      valueColor="#111827"
      valueSize="md"
      columnWidths={['280px', '120px', '160px', '140px']} // Standardize these for all cards
      cardWidth="1600px"
      cardHeight="190px"
      logoWidth="150px"
      logoHeight="auto"
      logoContainerWidth="300px"
      statusContent={
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <List spacing="xs" style={{ margin: 0, padding: 0 }}>
            <List.Item>Get the online application in less than 5 minutes</List.Item>
            <List.Item>
              Get approved up to $250k instantly and up to millions as soon as 2 business days
            </List.Item>
            <List.Item>Use secured funds however your business needs</List.Item>
          </List>
        </div>
      }
      statusColumnWidth="350px" // Keep this the same across all cards
      statusAlignment="left"
      statusPaddingRight="50px"
      href='https://pay.sandbox.slopepay.com/signup/mch_2svM16cZdSq3pKVIyjH0aBcB3vE' //unbranded register flow
    />
      <p></p>
      <OfferCard
        logoSrc="logo-generic.png"
        companyName="Example Finance Company"
        cashAdvance="$100,000"
        repaymentTime="12 weeks"
        reducedFee="3%"
        status="Pre-approved"
        statusContent={
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
            minHeight: "90px", // Ensures consistency with shorter cards
            width: "100%",
          }}>
            <List spacing="xs" style={{ margin: 0, padding: 0 }}>
              <List.Item>Example tagline</List.Item>
            </List>
          </div>
        }
        buttonColor="#148296" // Custom button color
        brandColor="#1E40AF" // Dark blue brand name
        columnTitleColor="#4B5563" // Gray column titles
        columnTitleSize="sm" // Slightly larger column labels
        valueColor="#111827" // Darker values
        valueSize="md" // Medium-sized values
        columnWidths={['280px', '120px', '160px', '140px']} // Custom column widths
        cardWidth="1600px"
        cardHeight="90px"
        logoWidth="150px"
        logoHeight="auto"
        logoContainerWidth="300px" // EXPAND SPACE FOR LOGO + BRAND NAME
        statusColumnWidth="350px" // Keep this the same across all cards
        statusAlignment="left"
        href='https://pay.sandbox.slopepay.com/signup/mch_2svMQ7QYj6cUalX4wAPjL9HHuFu' //Amazon branded register flow
      />
      <p></p>
      <OfferCard
        logoSrc="logo-generic.png"
        companyName="Another Finance Company"
        cashAdvance="$100,000"
        repaymentTime="12 weeks"
        reducedFee="3%"
        status="Pre-approved"
        statusContent={
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
            minHeight: "90px", // Ensures consistency with shorter cards
            width: "100%",
          }}>
            <List spacing="xs" style={{ margin: 0, padding: 0 }}>
              <List.Item>Another tagline</List.Item>
            </List>
          </div>
        }
        buttonColor="#148296" // Custom button color
        brandColor="#1E40AF" // Dark blue brand name
        columnTitleColor="#4B5563" // Gray column titles
        columnTitleSize="sm" // Slightly larger column labels
        valueColor="#111827" // Darker values
        valueSize="md" // Medium-sized values
        columnWidths={['280px', '120px', '160px', '140px']} // Custom column widths
        cardWidth="1600px"
        cardHeight="90px"
        logoWidth="150px"
        logoHeight="auto"
        logoContainerWidth="300px" // EXPAND SPACE FOR LOGO + BRAND NAME
        statusColumnWidth="350px" // Keep this the same across all cards
        statusAlignment="left"
      />
      <p></p>
      {children}
    </div>
  );
};

export default Overlay;