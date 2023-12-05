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
  NEW = 'new',
  COMPLIANCE_ONBOARDING = '+compliance-onboarding-required',
  PREQUALIFIED = '+skip-pre_qualify',
  INELIGIBLE = '+ineligible',
  ORDER_MAX = '+orders-total-max',
  ORDER_MIN = '+orders-total-min',
  OUTSTANDING = '+outstanding-orders',
  OVERDUE = '+orders-overdue',
  FORCE_REEVAL = '+force-reeval',
  FORCE_REEVAL_INCREASED = '+force-reeval_increased',
  FORCE_REEVAL_DECREASE_APPROVED = '+force-reeval_decrease_approved',
  FORCE_REEVAL_DECREASE_REJECTED = '+force-reeval_decrease_rejected',
  FORCE_REEVAL_INELIGIBLE = '+force-reeval_ineligible',
  MASK_KYB = '+mask-kyb',
}

export const generateDemoEmail = ({ customerType }: { customerType: CustomerType }) => {
  let email = 'demo'

  if (Object.values(CustomerType).includes(customerType)) {
    email += customerType as string
  }
  email += '@slope.so'
  return email
}
