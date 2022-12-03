import { CustomerType, ProductFlow } from '../components/MainHeader';

// TODO: Add support for ineligible state
export const QUALIFIED_EMAIL_SUFFIX = '+skip-pre_qualify';

export const getEmailValue = (email: string): string => {
  if (email.includes(QUALIFIED_EMAIL_SUFFIX)) {
    return QUALIFIED_EMAIL_SUFFIX;
  }

  return '';
};

export const generateDemoEmail = ({
  productFlow,
  customerType,
}: {
  productFlow: ProductFlow;
  customerType: CustomerType;
}) => {
  let email = 'demo';
  switch (productFlow) {
    case ProductFlow.PAY_NOW_ONLY:
      email += '+terms-pay_now';
      break;
    case ProductFlow.BNPL_ONLY:
      email += '+terms-bnpl';
      break;
    default:
      break;
  }

  switch (customerType) {
    case CustomerType.PREQUALIFIED:
      email += QUALIFIED_EMAIL_SUFFIX;
      break;
    default:
      break;
  }
  email += '@slope.so';
  return email;
};

export const qualifiedEmail = (email: string, value: string) => {
  if (!email) {
    return '';
  }

  email = email.replaceAll(QUALIFIED_EMAIL_SUFFIX, '');

  if (value) {
    const parts = email.split('@');
    return `${parts[0]}${value}@${parts[1]}`;
  }

  return email;
};
