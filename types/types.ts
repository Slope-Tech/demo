
// Duplicated from slope-checkout repo
export enum ProductFlow {
  // Flows that require order context and result in a placed order.
  BNPL_ONLY = 'bnpl',
  PAY_NOW_ONLY = 'pay_now',
  BNPL_AND_PAY_NOW = 'bnpl_pay_now',
}

export enum CustomerType {
  NEW = '',
  SKIP_PRE_QUALIFY = '+skip-pre_qualify',
  SKIP_COMPLIANCE = '+skip-compliance',
  SKIP_BANKING = '+skip-banking',
  SKIP_COMPLIANCE_AND_BANKING = '+skip-compliance+skip-banking',
  SKIP_CONSUMER_CREDIT = '+skip-consumer_credit',
  SKIP_COMPLIANCE_AND_CONSUMER_CREDIT = '+skip-compliance+skip-consumer_credit',
  SKIP_COMPLIANCE_AND_BANKING_AND_CONSUMER_CREDIT = '+skip-compliance+skip-banking+skip-consumer_credit',
}

export interface AppData {
  customerForm: any
  productFlow: ProductFlow
  mode: string
  localeSelector: boolean
  guestMode: boolean
  primaryColor: string
  linkToken: string
  accessToken: string
}
