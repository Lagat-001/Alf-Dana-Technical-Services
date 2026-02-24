'use client'

import { useState, useEffect } from 'react'

export function useIsPWA(): boolean {
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    setIsPWA(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  return isPWA
}
