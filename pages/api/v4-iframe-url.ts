import type { NextApiRequest, NextApiResponse } from 'next'
import { getApiHost, getAuthHeaders } from '../../utils/creds'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    accessToken: string
  }>
) {
  if (req.method !== 'POST') {
    res.status(404)
    return
  }

  const { linkToken } = JSON.parse(req.body)

  const resp = await fetch(`${getApiHost()}/v4/user-links/${linkToken}/iframe-url?page=payments`, {
    method: 'post',
    headers: getAuthHeaders(),
  })

  const data = await resp.json()
  if (!data?.iframeUrl) {
    res.status(500).json(data)
    return
  }

  res.status(200).json(data)
}
