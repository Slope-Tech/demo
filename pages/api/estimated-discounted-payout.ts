import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost } from '../../utils/creds'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  if (req.method !== 'POST') {
    res.status(404)
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const secretPayload = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString())
  const { customerId, total } = JSON.parse(req.body)

  const url = `${getApiHost()}/internal/pricing/estimate-discounted-payouts`
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.headers.authorization}`,
      'Slope-Merchant-Id': secretPayload.merchantId,
    },
    body: JSON.stringify({ customerId, total }),
  }

  const estimateRes = await fetch(url, requestOptions)

  const estimate = await estimateRes.json()
  if (!estimate) {
    res.status(500).json(estimate)
    return
  }

  res.status(200).json(estimate)
}
