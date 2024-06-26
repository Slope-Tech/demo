import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost, getAuthHeaders } from '../../utils/creds'
import { generateRandomTaxId } from '../../utils/email'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    customer: Record<string, any>
    secret: string
  }>
) {
  if (req.method !== 'POST') {
    res.status(404)
    return
  }

  const { businessName, email, phone, line1, city, state, postalCode, country } =
    JSON.parse(req.body)

  const customerRes = await fetch(`${getApiHost()}/v3/customers`, {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      businessName,
      email,
      phone,
      externalId: (Math.random() + 1).toString(36),
      kyb: {
        taxId: generateRandomTaxId(),
      },
      address: {
        line1,
        city,
        state,
        postalCode,
        country,
      },
    }),
  })

  const customer = await customerRes.json()
  if (!customer.id) {
    res.status(500).json(customer)
    return
  }

  const customerIntentRes = await fetch(`${getApiHost()}/v3/customers/${customer.id}/intent`, {
    method: 'post',
    headers: getAuthHeaders(),
  })
  const { secret } = await customerIntentRes.json()

  res.status(200).json({
    customer,
    secret,
  })
}
