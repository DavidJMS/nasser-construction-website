import { useState, useEffect } from 'react'

export function useHomeLoading(delay = 2000) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Artificial delay for smooth entry/exit
    const timer = setTimeout(() => {
      setLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return { loading }
}
