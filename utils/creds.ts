export const getAuthHeaders = ({ qualified }) => {
  return {
    Authorization: `Basic ${process.env.BASIC_AUTH_TOKEN}`,
    "Content-Type": "application/json",
  }
}

export const getApiHost = () => {
  return process.env.API_HOST
}