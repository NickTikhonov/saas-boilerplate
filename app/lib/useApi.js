'use client'

import { useEffect, useState, useCallback } from "react"

export function useApi(path) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async() => {
    try {
      setLoading(true)
      const res = await fetch(`/api/${path}`)
      const data = await res.json()
      setData(data)
    } catch(e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [path])
  
  useEffect(() => {
    if (!path || path == "" ) return

    fetchData()
  }, [path, fetchData])
  
  return { data, loading, error, refetch: fetchData }
}