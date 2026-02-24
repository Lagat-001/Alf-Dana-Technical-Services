'use client'

import { useIsPWA } from '@/hooks/useIsPWA'
import { useAppProfile } from '@/hooks/useAppProfile'
import { AppLoginScreen } from './AppLoginScreen'

export function AppLoginGate() {
  const isPWA = useIsPWA()
  const { profile, loaded } = useAppProfile()

  // Wait for client-side hydration before deciding
  if (!loaded) return null

  // Only show login when running as installed PWA with no saved profile
  if (!isPWA || profile) return null

  return <AppLoginScreen />
}
