// Duplicated from slope-checkout repo
export enum ProductFlow {
  // Flows that require order context and result in a placed order.
  BNPL_ONLY = 'bnpl',
  PAY_NOW_ONLY = 'pay_now',
  BNPL_AND_PAY_NOW = 'bnpl_pay_now',
  // Only goes through prequalification, and then closes. Requires no order context.
  STANDALONE_PREQUAL = 'standalone_prequal',
  // Manage customer payment methods.
  MANAGE_CUSTOMER_PAYMENT_METHODS = 'manage_customer_pymnt_methods'
}

export enum CustomerType {
  NEW = 'new',
  PREQUALIFIED = 'prequalified',
  INELIGIBLE = 'ineligible' // to implement
}
// TODO: Add support for ineligible state
export const QUALIFIED_EMAIL_SUFFIX = '+skip-pre_qualify'

export const generateDemoEmail = ({
  customerType
}: {
  customerType: CustomerType
}) => {
  let email = 'demo'

  switch (customerType) {
    case CustomerType.PREQUALIFIED:
      email += QUALIFIED_EMAIL_SUFFIX
      break
    default:
      break
  }
  email += '@slope.so'
  return email
}
