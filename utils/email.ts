import { CustomerType } from "../types/types"

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
