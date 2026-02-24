'use client'

import { useState, useEffect } from 'react'
import { useIsPWA } from '@/hooks/useIsPWA'
import { AppStorage } from '@/lib/app-storage'
import { AppLoginScreen } from './AppLoginScreen'

export function AppLoginGate() {
  const isPWA = useIsPWA()
  const [loaded, setLoaded] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    setHasSession(AppStorage.hasSession())
    setLoaded(true)
  }, [])

  // Wait for client-side hydration before deciding
  if (!loaded) return null

  // Only show login when running as installed PWA with no active session
  if (!isPWA || hasSession) return null

  return <AppLoginScreen onSuccess={() => setHasSession(true)} />
}
