'use client'

import { useState, useEffect } from 'react'
import { Smartphone, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAInstallPromptProps {
  locale: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PWAInstallPrompt({ locale: _locale }: PWAInstallPromptProps) {
  const t = useTranslations('pwa')
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-dismissed')
    if (dismissed) return

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) return

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
      // Show banner after 10 seconds
      setTimeout(() => setShowBanner(true), 10000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installEvent) return
    await installEvent.prompt()
    const { outcome } = await installEvent.userChoice
    if (outcome === 'accepted') {
      setShowBanner(false)
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-dismissed', 'true')
  }

  if (!showBanner || !installEvent) return null

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-[#0A2540] text-white px-4 py-3 flex items-center gap-3 shadow-lg animate-slide-up">
      <Smartphone className="w-5 h-5 text-[#FF6B00] shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium">{t('install_title')}</span>
        <span className="text-xs text-white/70 ms-2 hidden sm:inline">{t('install_desc')}</span>
      </div>
      <button
        onClick={handleInstall}
        className="shrink-0 bg-[#FF6B00] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#FF6B00]/90 transition-colors"
      >
        {t('install_btn')}
      </button>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
