'use client'

import { useState, useEffect } from 'react'
import { X, Share, Plus, MoreVertical, CheckCircle } from 'lucide-react'
import Image from 'next/image'
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

/* ── Shared SVGs ── */
const AppleSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn('fill-current', className)} aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

const AndroidSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn('fill-current', className)} aria-hidden="true">
    <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M6.44 6.94l-1.47-2.55a.25.25 0 0 0-.433.25l1.49 2.58A8.5 8.5 0 0 0 3.5 11.5h17a8.5 8.5 0 0 0-2.527-4.28l1.49-2.58a.25.25 0 0 0-.433-.25L17.56 6.94A8.46 8.46 0 0 0 12 5c-2.05 0-3.93.73-5.56 1.94M3.5 13v4.5A1.5 1.5 0 0 0 5 19h1v2.5a1.5 1.5 0 0 0 3 0V19h6v2.5a1.5 1.5 0 0 0 3 0V19h1a1.5 1.5 0 0 0 1.5-1.5V13z" />
  </svg>
)

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
    // Android/desktop: display-mode: standalone; iOS Safari: navigator.standalone
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    if (isStandalone) {
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

  /* ── Banner variant (used at top of home page + above footer) ── */
  if (variant === 'banner') {
    return (
      <>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#061a30] via-[#0d3060] to-[#061a30] py-14 md:py-20">
          {/* Vibrant background glows */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#FF6B00]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-[#FF6B00]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="container-brand relative">
            {/* Logo phone + heading */}
            <div className="flex flex-col items-center text-center mb-10">
              {/* Phone frame with logo */}
              <div className="relative mb-6">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-[28px] bg-[#FF6B00]/50 blur-xl scale-110 pointer-events-none" />
                {/* Phone shape */}
                <div className="relative w-24 h-36 rounded-[28px] bg-gradient-to-b from-[#1a4a7a] to-[#0A2540] border-[3px] border-[#FF6B00] shadow-2xl shadow-[#FF6B00]/50 flex flex-col items-center justify-center overflow-hidden">
                  {/* Top notch */}
                  <div className="absolute top-2.5 w-10 h-1.5 bg-[#FF6B00]/50 rounded-full" />
                  {/* Logo */}
                  <div className="mt-3 w-14 h-14 relative">
                    <Image src="/logo.png" alt="ALF DANA" fill className="object-contain drop-shadow-lg" />
                  </div>
                  {/* Home bar */}
                  <div className="absolute bottom-2 w-8 h-1 bg-[#FF6B00]/60 rounded-full" />
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {t('download_title')}
              </h2>
              <p className="text-white/70 mt-2.5 text-base md:text-lg max-w-md leading-relaxed">
                {t('download_subtitle')}
              </p>
              <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40 rounded-full px-3 py-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] inline-block animate-pulse" />
                  {t('offline_badge')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 rounded-full px-3 py-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block" />
                  Free • No app store
                </span>
              </div>
            </div>

            {/* Two platform buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              {/* iPhone button */}
              <button
                onClick={() => setShowModal('ios')}
                className={cn(
                  'group flex items-center gap-4 px-7 py-5 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95 flex-1 justify-center',
                  platform === 'ios'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#ff8a30] text-white shadow-2xl shadow-[#FF6B00]/50 hover:shadow-[#FF6B00]/70 hover:from-[#ff7a00] hover:to-[#ff9a40] scale-[1.03] border border-[#FF9A60]/40'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-[#FF6B00]/50 hover:shadow-lg hover:shadow-[#FF6B00]/20'
                )}
              >
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                  platform === 'ios' ? 'bg-white/20' : 'bg-white/10 group-hover:bg-[#FF6B00]/20'
                )}>
                  <AppleSVG className="w-6 h-6" />
                </div>
                <div className="text-start">
                  <div className="text-xs opacity-70 leading-none mb-1 font-medium">
                    {platform === 'ios' ? '✓ Detected your device' : 'Step-by-step guide'}
                  </div>
                  <div className="leading-tight text-lg font-bold">{t('ios_btn')}</div>
                </div>
              </button>

              {/* Android button */}
              <button
                onClick={handleAndroidInstall}
                className={cn(
                  'group flex items-center gap-4 px-7 py-5 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95 flex-1 justify-center',
                  platform === 'android'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#ff8a30] text-white shadow-2xl shadow-[#FF6B00]/50 hover:shadow-[#FF6B00]/70 hover:from-[#ff7a00] hover:to-[#ff9a40] scale-[1.03] border border-[#FF9A60]/40'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-[#FF6B00]/50 hover:shadow-lg hover:shadow-[#FF6B00]/20'
                )}
              >
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                  platform === 'android' ? 'bg-white/20' : 'bg-white/10 group-hover:bg-[#FF6B00]/20'
                )}>
                  <AndroidSVG className="w-6 h-6" />
                </div>
                <div className="text-start">
                  <div className="text-xs opacity-70 leading-none mb-1 font-medium">
                    {platform === 'android' ? '✓ Detected your device' : 'Step-by-step guide'}
                  </div>
                  <div className="leading-tight text-lg font-bold">{t('android_btn')}</div>
                </div>
              </button>
            </div>

            {/* Bottom hint */}
            <p className="text-center text-white/35 text-xs mt-6 tracking-wide">
              Works on all modern browsers · iOS Safari · Android Chrome
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

  /* ── Header variant (top-right nav button) ── */
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
        <div className="w-4 h-4 shrink-0 relative">
          <Image src="/logo.png" alt="ALF DANA" fill className="object-contain" />
        </div>
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
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-[#0d2a4a] rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Modal header */}
        <div className="bg-gradient-to-br from-[#061a30] to-[#0d3060] px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Logo in phone frame (small) */}
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/50 flex items-center justify-center overflow-hidden relative">
                <Image src="/logo.png" alt="ALF DANA" fill className="object-contain p-1.5" />
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
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all',
                activePlatform === 'ios'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#ff8a30] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              )}
            >
              <AppleSVG className="w-4 h-4 shrink-0" />
              iPhone
            </button>
            <button
              onClick={() => setActivePlatform('android')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all',
                activePlatform === 'android'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#ff8a30] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              )}
            >
              <AndroidSVG className="w-4 h-4 shrink-0" />
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
              <InstallStep num="1" icon={<Share className="w-4 h-4" />} title={t('ios_step1_title')} desc={t('ios_step1_desc')} isLast={false} />
              <InstallStep num="2" icon={<Plus className="w-4 h-4" />} title={t('ios_step2_title')} desc={t('ios_step2_desc')} isLast={false} />
              <InstallStep num="3" icon={<CheckCircle className="w-4 h-4" />} title={t('ios_step3_title')} desc={t('ios_step3_desc')} isLast={true} />
            </div>
          )}
          {activePlatform === 'android' && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('android_modal_title')}
              </p>
              <InstallStep num="1" icon={<MoreVertical className="w-4 h-4" />} title={t('android_step1_title')} desc={t('android_step1_desc')} isLast={false} />
              <InstallStep num="2" icon={<Plus className="w-4 h-4" />} title={t('android_step2_title')} desc={t('android_step2_desc')} isLast={false} />
              <InstallStep num="3" icon={<CheckCircle className="w-4 h-4" />} title={t('android_step3_title')} desc={t('android_step3_desc')} isLast={true} />
            </div>
          )}
        </div>

        {/* Footer button */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#ff8a30] hover:from-[#ff7a00] hover:to-[#ff9a40] text-white text-sm font-bold transition-all shadow-lg shadow-[#FF6B00]/30"
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
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#ff8a30] flex items-center justify-center shrink-0 text-sm font-bold text-white shadow-md shadow-[#FF6B00]/40">
          {num}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#FF6B00]/40 to-[#FF6B00]/10 my-1.5 min-h-[20px]" />}
      </div>
      <div className={cn('flex items-start gap-2.5 flex-1', isLast ? 'pb-0' : 'pb-4')}>
        <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center shrink-0 text-[#FF6B00] mt-0.5">
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
