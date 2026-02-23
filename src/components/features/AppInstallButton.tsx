'use client'

import { useState, useEffect } from 'react'
import { Download, Smartphone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface AppInstallButtonProps {
  variant?: 'header' | 'banner'
  scrolled?: boolean
  className?: string
}

export function AppInstallButton({
  variant = 'header',
  scrolled = false,
  className,
}: AppInstallButtonProps) {
  const t = useTranslations('pwa')
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (isInstalled) return null

  const handleInstall = async () => {
    if (installEvent) {
      await installEvent.prompt()
      const { outcome } = await installEvent.userChoice
      if (outcome === 'accepted') {
        setInstallEvent(null)
      }
    } else {
      // iOS / unsupported browser fallback
      alert(
        'To install: open this site in Safari, tap the Share button, then tap "Add to Home Screen"'
      )
    }
  }

  /* ── Banner variant (above footer) ── */
  if (variant === 'banner') {
    return (
      <section className="bg-gradient-to-r from-[#0A2540] via-[#0d3a6e] to-[#0A2540] py-8">
        <div className="container-brand flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-white">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/30 flex items-center justify-center shrink-0">
              <Smartphone className="w-7 h-7 text-[#FF6B00]" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">{t('download_title')}</p>
              <p className="text-sm text-white/70 mt-0.5">{t('download_subtitle')}</p>
            </div>
          </div>

          <button
            onClick={handleInstall}
            className={cn(
              'flex items-center gap-2.5 min-h-[52px] px-7 py-3 rounded-xl font-semibold text-base',
              'bg-[#FF6B00] hover:bg-[#e55f00] text-white',
              'shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35',
              'transition-all duration-200 hover:scale-105 active:scale-100',
              'whitespace-nowrap',
              className
            )}
          >
            <Download className="w-5 h-5 shrink-0" />
            {t('download_btn')}
          </button>
        </div>
      </section>
    )
  }

  /* ── Header variant (top-right) ── */
  return (
    <button
      onClick={handleInstall}
      aria-label={t('download_btn')}
      className={cn(
        'flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-200',
        'min-h-[44px] px-3 py-2',
        scrolled
          ? 'bg-[#00B4D8]/10 hover:bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30'
          : 'bg-white/10 hover:bg-white/20 text-white border border-white/25',
        className
      )}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline text-sm">{t('download_btn')}</span>
    </button>
  )
}
