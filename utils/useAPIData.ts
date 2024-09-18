import { useState } from 'react'

export function useAPIData({ fetch, deps = [] }: { fetch: () => Promise<any>; deps?: any[] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState()

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetch()
      setData(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, deps)

  return { loading, error, data }
}
