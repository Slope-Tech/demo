// Duplicated from slope-checkout repo
export enum ProductFlow {
  // Flows that require order context and result in a placed order.
  BNPL_ONLY = 'bnpl',
  PAY_NOW_ONLY = 'pay_now',
  BNPL_AND_PAY_NOW = 'bnpl_pay_now',
  // Only goes through prequalification, and then closes. Requires no order context.
  STANDALONE_PREQUAL = 'standalone_prequal',
  // Manage customer payment methods.
  MANAGE_CUSTOMER_PAYMENT_METHODS = 'manage_customer_pymnt_methods',
}

export enum CustomerType {
  NEW = '',
  SKIP_PRE_QUALIFY = '+skip-pre_qualify',
  SKIP_COMPLIANCE = '+skip-compliance',
  SKIP_BANKING = '+skip-banking+low_price',
  SKIP_COMPLIANCE_AND_BANKING = '+skip-compliance+skip-banking+low_price',
  SKIP_CONSUMER_CREDIT = '+skip-consumer_credit',
  SKIP_COMPLIANCE_AND_CONSUMER_CREDIT = '+skip-compliance+skip-consumer_credit',
  SKIP_COMPLIANCE_AND_BANKING_AND_CONSUMER_CREDIT = '+skip-compliance+skip-banking+low_price+skip-consumer_credit',
}

export const generateRandomTaxId = () => Math.floor(100000000 + Math.random() * 900000000)

export const generateDemoEmail = ({ customerType }: { customerType: CustomerType }) => {
  const taxId = generateRandomTaxId()
  let email = `demo`
  if (Object.values(CustomerType).includes(customerType)) {
    email += customerType as string
  }
  email += `+tax${taxId}@slopepay.com`
  return email
}

export const customerTypeToShortcutTypes = (customerType: CustomerType): string[] =>
  customerType.split('+').filter((t) => t)

export const parseTaxIdFromEmail = (email: string): string | null => {
  const match = email.match(/tax(\d+)@slopepay.com/)
  return match ? match[1] : null
}
