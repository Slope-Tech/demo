import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost, getAuthHeaders } from '../../utils/creds'
import { parseTaxIdFromEmail } from '../../utils/email'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    order: Record<string, any>
  }>
) {
  if (req.method !== 'POST') {
    res.status(404)
    return
  }

  const {
    items,
    contactBusinessName,
    contactEmail,
    contactPhone,
    billingAddress,
    currency,
    total,
  } = JSON.parse(req.body)

  const taxId = parseTaxIdFromEmail(contactEmail)

  const orderRes = await fetch(`${getApiHost()}/v4/orders`, {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      currency,
      total,
      externalId: (Math.random() + 1).toString(36).split('.')[1],
      items,
      contactBusinessName,
      contactEmail,
      contactPhone,
      billingAddress,
      taxId,
    }),
  })

  const order = await orderRes.json()
  if (!order.id) {
    res.status(500).json(order)
    return
  }

  res.status(200).json({
    order,
  })
}
