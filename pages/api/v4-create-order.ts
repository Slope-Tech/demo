import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost, getAuthHeaders } from '../../utils/creds'

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

  const { items, currency, total } = JSON.parse(req.body)

  const orderRes = await fetch(`${getApiHost()}/v4/orders`, {
    method: 'post',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      currency,
      total,
      externalId: (Math.random() + 1).toString(36),
      items,
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
