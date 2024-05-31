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

  const response = await fetch(`${getApiHost()}/v4/simulation/customer`, {
    method: 'post',
    headers: getAuthHeaders(),
    body: req.body,
  })

  const body = await response.json()
  res.status(response.status).json(body)
}
