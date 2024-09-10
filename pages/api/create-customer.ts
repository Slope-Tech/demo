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

  const {
    businessName,
    email,
    phone,
    line1,
    city,
    state,
    postalCode,
    country,
    kyb,
    kybQuestionnaire,
    persons,
  } = JSON.parse(req.body)

  const customerRes = await fetch(`${getApiHost()}/v3/customers`, {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      businessName,
      email,
      phone,
      externalId: (Math.random() + 1).toString(36),
      kyb: {
        ...kyb,
        taxId: generateRandomTaxId(),
      },
      address: line1 && {
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

  if (kybQuestionnaire) {
    // set Estimated Spend
    await fetch(`${getApiHost()}/internal/customers/${customer.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        kybQuestionnaire,
      }),
    })
  }

  // Pre-fill control persons
  if (persons) {
    await fetch('https://api.sandbox.slopepay.com/internal/person/create', {
      headers: {
        authorization: `bearer ${secret}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        persons,
      }),
      method: 'POST',
    })
  }

  res.status(200).json({
    customer,
    secret,
  })
}
