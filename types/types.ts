
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

export type CheckoutMode = 'redirect' | 'inline'

// Both checkout modes navigate the full page to Slope rather than opening the embedded SDK.
export const isRedirectMode = (mode?: CheckoutMode | null): mode is CheckoutMode =>
  mode === 'redirect' || mode === 'inline'

export interface AppData {
  customerForm: any
  productFlow: ProductFlow
  mode: CheckoutMode | null
  localeSelector: boolean
  guestMode: boolean
  primaryColor: string
  linkToken: string
  accessToken: string
}
