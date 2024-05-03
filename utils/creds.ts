export const getAuthHeaders = ({ qualified }) => ({
  Authorization: `Basic ${process.env.BASIC_AUTH_TOKEN}`,
  'Content-Type': 'application/json',
})

export const getApiHost = () => process.env.API_HOST
