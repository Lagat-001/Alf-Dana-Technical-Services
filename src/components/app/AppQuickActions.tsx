'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ClipboardList } from 'lucide-react'
import { useIsPWA } from '@/hooks/useIsPWA'
import { getServiceWhatsAppLink } from '@/lib/whatsapp'

interface QuickAction {
  emoji: string
  label: string
  href?: string
  waService?: string
  isLink?: boolean
}

export function AppQuickActions() {
  const isPWA = useIsPWA()
  const t = useTranslations('app')

  if (!isPWA) return null

  const actions: QuickAction[] = [
    { emoji: '❄️', label: t('quick_ac'), waService: 'AC Maintenance' },
    { emoji: '🔧', label: t('quick_plumbing'), waService: 'Plumbing' },
    { emoji: '📋', label: t('quick_quote'), href: '/contact', isLink: true },
    { emoji: '📍', label: t('quick_track'), href: '/app/requests', isLink: true },
  ]

  return (
    <section className="bg-[#0A2540] py-4 sticky top-16 md:top-20 z-30">
      <div className="container-brand">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="w-4 h-4 text-[#FF6B00]" />
          <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">{t('quick_actions')}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((action) => {
            const className =
              'flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-all active:scale-95 cursor-pointer text-center'

            if (action.isLink && action.href) {
              return (
                <Link key={action.label} href={action.href} className={className}>
                  <span className="text-2xl leading-none">{action.emoji}</span>
                  <span className="text-[10px] text-white/80 font-medium leading-tight">{action.label}</span>
                </Link>
              )
            }

            return (
              <a
                key={action.label}
                href={getServiceWhatsAppLink(action.waService ?? action.label)}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                <span className="text-2xl leading-none">{action.emoji}</span>
                <span className="text-[10px] text-white/80 font-medium leading-tight">{action.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
