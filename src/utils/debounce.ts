import { useState, useEffect } from 'react'

interface UseDebounceParams {
  value: string
  delay: number
  setIsLoading?: (value: boolean) => void
}

export default function useDebounce({
  value,
  delay,
  setIsLoading,
}: UseDebounceParams) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (setIsLoading) {
      console.log('LOADING')
      setIsLoading(true)
    }

    const handler = setTimeout(() => {
      if (setIsLoading) {
        console.log('NOT LOADING')
        setIsLoading(false)
      }
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, setIsLoading])

  return debouncedValue
}
