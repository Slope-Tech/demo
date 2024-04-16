import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost, getAuthHeaders } from '../../utils/creds'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    order: Record<string, any>
    secret: string
  }>
) {
  if (req.method !== 'POST') {
    res.status(404)
    return
  }

  const { qualified, customerId, items, line1, city, state, postalCode, country, currency, total } =
    JSON.parse(req.body)

  const orderRes = await fetch(`${getApiHost()}/v3/orders`, {
    method: 'POST',
    headers: getAuthHeaders({ qualified }),
    body: JSON.stringify({
      currency,
      total,
      items,
      customerId,
      externalId: (Math.random() + 1).toString(36),
      billingAddress: {
        line1,
        city,
        state,
        postalCode,
        country,
      },
    }),
  })

  const order = await orderRes.json()

  if (!order.id) {
    res.status(500).json(order)
    return
  }

  const orderIntentRes = await fetch(`${getApiHost()}/v3/orders/${order.id}/intent`, {
    method: 'POST',
    headers: getAuthHeaders({ qualified }),
  })
  const { secret } = await orderIntentRes.json()

  res.status(200).json({
    order,
    secret,
  })
}
