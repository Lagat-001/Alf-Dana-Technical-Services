'use client'

import { useState, useEffect } from 'react'

export function useIsPWA(): boolean {
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    // Android/desktop Chrome: display-mode: standalone
    // iOS Safari: navigator.standalone property (proprietary)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsPWA(isStandalone)
  }, [])

  return isPWA
}
