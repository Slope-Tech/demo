// TODO: Add support for ineligible state
export const QUALIFIED_EMAIL_SUFFIX = '+skip-pre_qualify';

export const getEmailValue = (email: string): string => {
  if (email.includes(QUALIFIED_EMAIL_SUFFIX)) {
    return QUALIFIED_EMAIL_SUFFIX
  }

  return ''
}

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