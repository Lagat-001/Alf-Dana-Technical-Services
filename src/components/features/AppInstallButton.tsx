'use client'

import { useState, useEffect } from 'react'
import { Smartphone, X, Share, Plus, MoreVertical, CheckCircle } from 'lucide-react'
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
  const [showModal, setShowModal] = useState<'ios' | 'android' | null>(null)

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
  if (variant === 'header' && !installEvent) return null

  const handleAndroidInstall = async () => {
    if (installEvent) {
      await installEvent.prompt()
      const { outcome } = await installEvent.userChoice
      if (outcome === 'accepted') setInstallEvent(null)
    } else {
      setShowModal('android')
    }
  }

  /* ── Banner variant (above footer) ── */
  if (variant === 'banner') {
    return (
      <>
        <section className="bg-gradient-to-br from-[#0A2540] via-[#0d3a6e] to-[#0A2540] py-12 md:py-16">
          <div className="container-brand">
            {/* Heading */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-3xl bg-[#FF6B00]/20 border border-[#FF6B00]/30 flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {t('download_title')}
              </h2>
              <p className="text-white/70 mt-2 text-base max-w-md">
                {t('download_subtitle')}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-xs bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30 rounded-full px-3 py-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] inline-block" />
                {t('offline_badge')}
              </span>
            </div>

            {/* Two platform buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              {/* iPhone button */}
              <button
                onClick={() => setShowModal('ios')}
                className={cn(
                  'flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95 flex-1 justify-center',
                  platform === 'ios'
                    ? 'bg-[#FF6B00] text-white shadow-xl shadow-[#FF6B00]/30 hover:bg-[#e55f00] scale-[1.02]'
                    : 'bg-white/10 text-white border border-white/25 hover:bg-white/20'
                )}
              >
                {/* Apple logo SVG */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 fill-current" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-75 leading-none mb-0.5">
                    {platform === 'ios' ? '✓ Your device' : 'Step-by-step guide'}
                  </div>
                  <div className="leading-tight">{t('ios_btn')}</div>
                </div>
              </button>

              {/* Android button */}
              <button
                onClick={handleAndroidInstall}
                className={cn(
                  'flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95 flex-1 justify-center',
                  platform === 'android'
                    ? 'bg-[#FF6B00] text-white shadow-xl shadow-[#FF6B00]/30 hover:bg-[#e55f00] scale-[1.02]'
                    : 'bg-white/10 text-white border border-white/25 hover:bg-white/20'
                )}
              >
                {/* Android logo SVG */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 fill-current" aria-hidden="true">
                  <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M6.44 6.94l-1.47-2.55a.25.25 0 0 0-.433.25l1.49 2.58A8.5 8.5 0 0 0 3.5 11.5h17a8.5 8.5 0 0 0-2.527-4.28l1.49-2.58a.25.25 0 0 0-.433-.25L17.56 6.94A8.46 8.46 0 0 0 12 5c-2.05 0-3.93.73-5.56 1.94M3.5 13v4.5A1.5 1.5 0 0 0 5 19h1v2.5a1.5 1.5 0 0 0 3 0V19h6v2.5a1.5 1.5 0 0 0 3 0V19h1a1.5 1.5 0 0 0 1.5-1.5V13z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-75 leading-none mb-0.5">
                    {platform === 'android' ? '✓ Your device' : 'Step-by-step guide'}
                  </div>
                  <div className="leading-tight">{t('android_btn')}</div>
                </div>
              </button>
            </div>

            {/* Helper text */}
            <p className="text-center text-white/40 text-xs mt-5">
              Free • No app store needed • Works offline
            </p>
          </div>
        </section>

        {showModal && (
          <InstallInstructionsModal
            initialPlatform={showModal}
            onClose={() => setShowModal(null)}
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
        onClick={() => setShowModal(platform === 'ios' ? 'ios' : 'android')}
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
        <Smartphone className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline text-sm">{t('download_btn')}</span>
      </button>

      {showModal && (
        <InstallInstructionsModal
          initialPlatform={showModal}
          onClose={() => setShowModal(null)}
          t={t}
        />
      )}
    </>
  )
}

function InstallInstructionsModal({
  initialPlatform,
  onClose,
  t,
}: {
  initialPlatform: 'ios' | 'android'
  onClose: () => void
  t: ReturnType<typeof useTranslations<'pwa'>>
}) {
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>(initialPlatform)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-[#0d2a4a] rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Modal header */}
        <div className="bg-[#0A2540] px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/30 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">ALF DANA</p>
                <p className="text-xs text-white/60">Install Guide</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Platform tab switcher */}
          <div className="flex bg-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActivePlatform('ios')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all',
                activePlatform === 'ios'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-white/70 hover:text-white'
              )}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              iPhone
            </button>
            <button
              onClick={() => setActivePlatform('android')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all',
                activePlatform === 'android'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-white/70 hover:text-white'
              )}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-current" aria-hidden="true">
                <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M6.44 6.94l-1.47-2.55a.25.25 0 0 0-.433.25l1.49 2.58A8.5 8.5 0 0 0 3.5 11.5h17a8.5 8.5 0 0 0-2.527-4.28l1.49-2.58a.25.25 0 0 0-.433-.25L17.56 6.94A8.46 8.46 0 0 0 12 5c-2.05 0-3.93.73-5.56 1.94M3.5 13v4.5A1.5 1.5 0 0 0 5 19h1v2.5a1.5 1.5 0 0 0 3 0V19h6v2.5a1.5 1.5 0 0 0 3 0V19h1a1.5 1.5 0 0 0 1.5-1.5V13z" />
              </svg>
              Android
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 py-5">
          {activePlatform === 'ios' && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('ios_modal_title')}
              </p>
              <InstallStep
                num="1"
                icon={<Share className="w-4 h-4" />}
                title={t('ios_step1_title')}
                desc={t('ios_step1_desc')}
                isLast={false}
              />
              <InstallStep
                num="2"
                icon={<Plus className="w-4 h-4" />}
                title={t('ios_step2_title')}
                desc={t('ios_step2_desc')}
                isLast={false}
              />
              <InstallStep
                num="3"
                icon={<CheckCircle className="w-4 h-4" />}
                title={t('ios_step3_title')}
                desc={t('ios_step3_desc')}
                isLast={true}
              />
            </div>
          )}

          {activePlatform === 'android' && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('android_modal_title')}
              </p>
              <InstallStep
                num="1"
                icon={<MoreVertical className="w-4 h-4" />}
                title={t('android_step1_title')}
                desc={t('android_step1_desc')}
                isLast={false}
              />
              <InstallStep
                num="2"
                icon={<Plus className="w-4 h-4" />}
                title={t('android_step2_title')}
                desc={t('android_step2_desc')}
                isLast={false}
              />
              <InstallStep
                num="3"
                icon={<CheckCircle className="w-4 h-4" />}
                title={t('android_step3_title')}
                desc={t('android_step3_desc')}
                isLast={true}
              />
            </div>
          )}
        </div>

        {/* Footer button */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#e55f00] text-white text-sm font-semibold transition-colors"
          >
            {t('ios_got_it')}
          </button>
        </div>
      </div>
    </div>
  )
}

function InstallStep({
  num,
  icon,
  title,
  desc,
  isLast,
}: {
  num: string
  icon: React.ReactNode
  title: string
  desc: string
  isLast: boolean
}) {
  return (
    <div className="flex gap-3">
      {/* Number + connector */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center shrink-0 text-sm font-bold text-white shadow-sm shadow-[#FF6B00]/30">
          {num}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-[#FF6B00]/20 my-1.5 min-h-[20px]" />}
      </div>

      {/* Content */}
      <div className={cn('flex items-start gap-2.5 flex-1', isLast ? 'pb-0' : 'pb-4')}>
        <div className="w-8 h-8 rounded-xl bg-[#0A2540]/8 dark:bg-white/10 border border-border flex items-center justify-center shrink-0 text-[#0A2540] dark:text-white mt-0.5">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0A2540] dark:text-white leading-snug">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}
