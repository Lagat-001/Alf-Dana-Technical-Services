'use client'

import { useState, useEffect } from 'react'
import { Smartphone, X, Wifi } from 'lucide-react'
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
    const dismissed = localStorage.getItem('pwa-dismissed')
    if (dismissed) return

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    if (isStandalone) return

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
      // Show banner after 15 seconds (less aggressive than before)
      setTimeout(() => setShowBanner(true), 15000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installEvent) return
    await installEvent.prompt()
    const { outcome } = await installEvent.userChoice
    if (outcome === 'accepted') setShowBanner(false)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-dismissed', 'true')
  }

  if (!showBanner || !installEvent) return null

  return (
    <div className="fixed top-16 md:top-20 inset-x-0 z-50 bg-[#0A2540] text-white px-4 py-3 flex items-center gap-3 shadow-lg animate-slide-up">
      <Smartphone className="w-5 h-5 text-[#FF6B00] shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold">{t('install_title')}</span>
        <span className="text-xs text-white/70 ms-2 hidden sm:inline">{t('install_desc')}</span>
        {/* Offline works badge */}
        <span className="inline-flex items-center gap-1 ms-2 text-xs bg-[#00B4D8]/20 text-[#00B4D8] rounded-full px-2 py-0.5 font-medium">
          <Wifi className="w-2.5 h-2.5" />
          {t('offline_badge')}
        </span>
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
        aria-label={t('dismiss')}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
