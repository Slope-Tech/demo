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
  PREQUALIFIED = '+skip-pre_qualify',
  INELIGIBLE = '+ineligible',
  ORDER_MAX = '+orders-total-max',
  ORDER_MIN = '+orders-total-min',
  OUTSTANDING = '+outstanding-orders',
  OVERDUE = '+orders-overdue'
}

export const generateDemoEmail = ({
  customerType
}: {
  customerType: CustomerType
}) => {
  let email = 'demo'

  switch (customerType) {
    case CustomerType.PREQUALIFIED:
    case CustomerType.INELIGIBLE:
    case CustomerType.ORDER_MAX:
    case CustomerType.ORDER_MIN:
    case CustomerType.OUTSTANDING:
    case CustomerType.OVERDUE:
      email += customerType as string
      break
    default:
      break
  }
  email += '@slope.so'
  return email
}
