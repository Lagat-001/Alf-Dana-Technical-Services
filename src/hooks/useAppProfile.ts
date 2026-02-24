'use client'

import { useState, useEffect } from 'react'
import { AppStorage, UserProfile } from '@/lib/app-storage'

export function useAppProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setProfile(AppStorage.getProfile())
    setLoaded(true)
  }, [])

  const save = (p: UserProfile) => {
    AppStorage.saveProfile(p)
    setProfile(p)
  }

  const clear = () => {
    AppStorage.clearProfile()
    setProfile(null)
  }

  return { profile, loaded, save, clear }
}
