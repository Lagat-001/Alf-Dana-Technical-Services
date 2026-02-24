'use client'

import { useState, useEffect } from 'react'
import { Download, Smartphone, X, Share, Plus, MoreVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Platform = 'ios' | 'android' | 'other'

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
  const [platform, setPlatform] = useState<Platform>('other')
  const [showInstallModal, setShowInstallModal] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const ua = navigator.userAgent
    const ios = /iphone|ipad|ipod/i.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream
    const android = /android/i.test(ua)
    setPlatform(ios ? 'ios' : android ? 'android' : 'other')

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (isInstalled) return null
  // In header, only show if native install event is available
  if (variant === 'header' && !installEvent) return null

  const handleInstall = async () => {
    if (installEvent) {
      // Android/Desktop Chrome — native bottom-sheet (best UX, no modal needed)
      await installEvent.prompt()
      const { outcome } = await installEvent.userChoice
      if (outcome === 'accepted') setInstallEvent(null)
    } else {
      // No native prompt: show platform-specific step-by-step instructions
      setShowInstallModal(true)
    }
  }

  /* ── Banner variant (above footer) ── */
  if (variant === 'banner') {
    return (
      <>
        <section className="bg-gradient-to-r from-[#0A2540] via-[#0d3a6e] to-[#0A2540] py-8">
          <div className="container-brand flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-white">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/30 flex items-center justify-center shrink-0">
                <Smartphone className="w-7 h-7 text-[#FF6B00]" />
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">{t('download_title')}</p>
                <p className="text-sm text-white/70 mt-0.5">{t('download_subtitle')}</p>
                {/* Offline badge */}
                <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30 rounded-full px-2.5 py-0.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] inline-block" />
                  {t('offline_badge')}
                </span>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className={cn(
                'flex items-center gap-2.5 min-h-[52px] px-7 py-3 rounded-xl font-semibold text-base',
                'bg-[#FF6B00] hover:bg-[#e55f00] text-white',
                'shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35',
                'transition-all duration-200 hover:scale-105 active:scale-100',
                'whitespace-nowrap w-full sm:w-auto justify-center',
                className
              )}
            >
              <Download className="w-5 h-5 shrink-0" />
              {t('download_btn_offline')}
            </button>
          </div>
        </section>

        {showInstallModal && (
          <InstallInstructionsModal
            platform={platform}
            onClose={() => setShowInstallModal(false)}
            t={t}
          />
        )}
      </>
    )
  }

  /* ── Header variant (top-right) ── */
  return (
    <>
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

      {showInstallModal && (
        <InstallInstructionsModal
          platform={platform}
          onClose={() => setShowInstallModal(false)}
          t={t}
        />
      )}
    </>
  )
}

function InstallInstructionsModal({
  platform,
  onClose,
  t,
}: {
  platform: Platform
  onClose: () => void
  t: ReturnType<typeof useTranslations<'pwa'>>
}) {
  const title =
    platform === 'android' ? t('android_modal_title') : t('ios_modal_title')

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-[#0d2a4a] rounded-2xl shadow-2xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A2540] flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#0A2540] dark:text-white">{title}</p>
              <p className="text-xs text-muted-foreground">ALF DANA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps */}
        {platform === 'ios' && (
          <div className="space-y-4">
            <InstallStep
              num="1"
              icon={<Share className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('ios_step1_title')}
              desc={t('ios_step1_desc')}
            />
            <div className="w-px h-4 bg-border mx-4" />
            <InstallStep
              num="2"
              icon={<Plus className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('ios_step2_title')}
              desc={t('ios_step2_desc')}
            />
            <div className="w-px h-4 bg-border mx-4" />
            <InstallStep
              num="3"
              icon={<Smartphone className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('ios_step3_title')}
              desc={t('ios_step3_desc')}
            />
          </div>
        )}

        {platform === 'android' && (
          <div className="space-y-4">
            <InstallStep
              num="1"
              icon={<MoreVertical className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('android_step1_title')}
              desc={t('android_step1_desc')}
            />
            <div className="w-px h-4 bg-border mx-4" />
            <InstallStep
              num="2"
              icon={<Plus className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('android_step2_title')}
              desc={t('android_step2_desc')}
            />
            <div className="w-px h-4 bg-border mx-4" />
            <InstallStep
              num="3"
              icon={<Smartphone className="w-4 h-4 text-[#0A2540] dark:text-white" />}
              title={t('android_step3_title')}
              desc={t('android_step3_desc')}
            />
          </div>
        )}

        {platform === 'other' && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('generic_install_desc')}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-[#0A2540] dark:bg-white/10 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {t('ios_got_it')}
        </button>
      </div>
    </div>
  )
}

function InstallStep({
  num,
  icon,
  title,
  desc,
}: {
  num: string
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shrink-0 text-xs font-bold text-[#FF6B00]">
        {num}
      </div>
      <div className="flex items-start gap-2 flex-1">
        <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0A2540] dark:text-white">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
      </div>
    </div>
  )
}
