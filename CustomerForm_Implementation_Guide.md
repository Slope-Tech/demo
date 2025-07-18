# CustomerForm Implementation Guide

## Overview

This guide provides a step-by-step implementation for creating a customer account with optional account linking functionality. The function handles customer creation, account linking, and state management.

## Function Purpose

The `onClickCreateCustomer` function:

1. Creates a new customer/user account via API
2. Optionally links the account if a link token is provided
3. Manages loading states and UI updates
4. Handles the complete customer creation workflow

## Prerequisites

### Required Dependencies

```typescript
// State management
import { useState } from 'react'

// Utility functions (implement these based on your needs)
import { customerTypeToShortcutTypes, parseTaxIdFromEmail, generateDemoEmail } from '../utils/email'
```

### Environment Variables

```bash
# Required for direct API calls
SLOPE_API_KEY=your_slope_api_key_here
```

### Authentication

All API calls require:

- **Authorization Header**: `Bearer ${SLOPE_API_KEY}`
- **API Version Header**: `X-Slope-Version: 2024-01-01`
- **Content-Type**: `application/json`

### Required State Variables

```typescript
const [loadingUser, setLoadingUser] = useState(false)
const [createCustomerResponse, setCreateCustomerResponse] = useState<any>(undefined)

// Customer form data structure
const customerForm = {
  customerType: string,
  businessName: string,
  phone: string,
  email: string,
  line1: string, // Address line 1
  city: string,
  state: string,
  postalCode: string,
  country: string,
  isLinked: boolean,
}
```

## Implementation Steps

### Step 1: Basic Function Structure

```typescript
const onClickCreateCustomer = async () => {
  // Set loading state
  setLoadingUser(true)

  try {
    // Implementation steps follow...
  } catch (error) {
    console.error('Error creating customer:', error)
    // Handle error appropriately
  } finally {
    setLoadingUser(false)
  }
}
```

### Step 2: Customer Creation API Call

```typescript
// Make POST request to create customer
const response = await fetch('https://api.slope.so/v4/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SLOPE_API_KEY}`,
    'X-Slope-Version': '2024-01-01',
  },
  body: JSON.stringify({
    shortcutTypes: customerTypeToShortcutTypes(customerForm.customerType),
    businessName: customerForm.businessName,
    phone: customerForm.phone,
    address: {
      line1: customerForm.line1,
      city: customerForm.city,
      state: customerForm.state,
      postalCode: customerForm.postalCode,
      country: customerForm.country,
    },
    taxId: parseTaxIdFromEmail(customerForm.email),
    isLinked: customerForm.isLinked,
  }),
})

const body = await response.json()
```

### Step 3: Conditional Account Linking

```typescript
// If linkToken is provided, perform account linking
if (body.linkToken) {
  const linkTokenResponse = await fetch('https://api.slope.so/v4/user-links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLOPE_API_KEY}`,
      'X-Slope-Version': '2024-01-01',
    },
    body: JSON.stringify({
      linkToken: body.linkToken,
    }),
  })

  const data = await linkTokenResponse.json()

  // Update app data with tokens
  updateAppData({
    linkToken: body.linkToken,
    accessToken: data.accessToken,
  })
}
```

### Step 4: State Updates

```typescript
// Store the response and update UI state
setCreateCustomerResponse(body)
setLoadingUser(false)
setShowCustomerForm(null) // Hide the form
```

## Complete Implementation

```typescript
const onClickCreateCustomer = async () => {
  setLoadingUser(true)

  try {
    // Step 1: Create customer
    const response = await fetch('https://api.slope.so/v4/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLOPE_API_KEY}`,
        'X-Slope-Version': '2024-01-01',
      },
      body: JSON.stringify({
        shortcutTypes: customerTypeToShortcutTypes(customerForm.customerType),
        businessName: customerForm.businessName,
        phone: customerForm.phone,
        address: {
          line1: customerForm.line1,
          city: customerForm.city,
          state: customerForm.state,
          postalCode: customerForm.postalCode,
          country: customerForm.country,
        },
        taxId: parseTaxIdFromEmail(customerForm.email),
        isLinked: customerForm.isLinked,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const body = await response.json()

    // Step 2: Handle account linking if token provided
    if (body.linkToken) {
      const linkTokenResponse = await fetch('https://api.slope.so/v4/user-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SLOPE_API_KEY}`,
          'X-Slope-Version': '2024-01-01',
        },
        body: JSON.stringify({
          linkToken: body.linkToken,
        }),
      })

      if (!linkTokenResponse.ok) {
        throw new Error(`Link token error! status: ${linkTokenResponse.status}`)
      }

      const data = await linkTokenResponse.json()
      updateAppData({
        linkToken: body.linkToken,
        accessToken: data.accessToken,
      })
    }

    // Step 3: Update UI state
    setCreateCustomerResponse(body)
    setShowCustomerForm(null)
  } catch (error) {
    console.error('Error creating customer:', error)
    // Handle error state - show error message to user
    // setError(error.message) // if you have error state
  } finally {
    setLoadingUser(false)
  }
}
```

## API Endpoints

### POST https://api.slope.so/v4/customers

**Request Body:**

```typescript
{
  shortcutTypes: string[], // Customer type shortcuts
  businessName: string,
  phone: string,
  address: {
    line1: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  },
  taxId: string,
  isLinked: boolean
}
```

**Response:**

```typescript
{
  email: string,
  password: string,
  linkToken?: string, // Optional - only if account linking is needed
  // ... other customer data
}
```

### POST https://api.slope.so/v4/user-links

**Request Body:**

```typescript
{
  linkToken: string
}
```

**Response:**

```typescript
{
  accessToken: string,
  // ... other linking data
}
```

## Utility Functions to Implement

### generateDemoEmail

```typescript
const generateRandomTaxId = () => Math.floor(100000000 + Math.random() * 900000000)

const generateDemoEmail = ({ customerType }: { customerType: string }) => {
  const taxId = generateRandomTaxId()
  let email = `demo`
  if (customerType) {
    email += customerType
  }
  email += `+skip-pre_qualify+tax${taxId}@slopepay.com`
  return email
}
```

### customerTypeToShortcutTypes

```typescript
const customerTypeToShortcutTypes = (customerType: string): string[] => {
  // Convert customer type to array of shortcut types by splitting on '+'
  return customerType.split('+').filter((t) => t)
}
```

### parseTaxIdFromEmail

```typescript
const parseTaxIdFromEmail = (email: string): string | null => {
  // Extract tax ID from email format: demo{type}+skip-pre_qualify+tax{taxId}@slopepay.com
  const match = email.match(/tax(\d+)@slopepay\.com/)
  return match ? match[1] : null
}
```

### Email Format

The demo email format follows this pattern:

```
demo{customerType}+skip-pre_qualify+tax{taxId}@slopepay.com
```

Examples:

- `demo+SKIP_COMPLIANCE+skip-pre_qualify+tax123456789@slopepay.com`
- `demo+NEW+skip-pre_qualify+tax987654321@slopepay.com`
- `demo+SKIP_BANKING+skip-pre_qualify+tax555666777@slopepay.com`

## Error Handling Best Practices

1. **Network Errors**: Handle fetch failures and HTTP errors
2. **Validation Errors**: Validate form data before API calls
3. **API Errors**: Handle API-specific error responses
4. **Loading States**: Always manage loading states properly
5. **User Feedback**: Provide clear error messages to users

## Integration Notes

- Ensure all required form fields are validated before calling
- Implement proper loading UI states
- Handle success/error feedback appropriately
- Consider implementing retry logic for failed requests
- Add proper TypeScript types for better development experience

### Important Security Considerations

- **Server-Side Implementation Recommended**: For production applications, consider implementing these API calls on the server-side to keep your API keys secure
- **CORS**: If calling directly from the client, ensure the Slope API supports CORS for your domain
- **Environment Variables**: Never expose API keys in client-side code in production
- **Rate Limiting**: Implement appropriate rate limiting to avoid hitting API limits

### Client vs Server Implementation

**Client-Side (Browser)**:

```typescript
// ⚠️ Only for development/testing - API key will be exposed
const response = await fetch('https://api.slope.so/v4/customers', {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLOPE_API_KEY}`,
    // ... other headers
  },
})
```

**Server-Side (Recommended)**:

```typescript
// ✅ Secure - API key stays on server
// In your API route (e.g., /api/create-customer)
const response = await fetch('https://api.slope.so/v4/customers', {
  headers: {
    Authorization: `Bearer ${process.env.SLOPE_API_KEY}`,
    // ... other headers
  },
})
```

## Usage Example

```typescript
// In your component
<Button
  disabled={!isFormValid() || loadingUser}
  loading={loadingUser}
  onClick={onClickCreateCustomer}
>
  Create Customer Account
</Button>
```

This guide provides all the necessary components to implement the customer creation functionality in any React-based application.
