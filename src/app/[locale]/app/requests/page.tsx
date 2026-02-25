'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { ClipboardList, MessageCircle, CheckCircle, Circle, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { AppStorage, QuoteRequest, RequestStatus } from '@/lib/app-storage'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const STATUS_ORDER: RequestStatus[] = ['Pending', 'Under Review', 'Quote Sent', 'Assigned', 'In Progress', 'Completed']

const STATUS_COLORS: Record<RequestStatus, string> = {
  'Pending': 'bg-gray-100 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300',
  'Under Review': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Quote Sent': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Assigned': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'In Progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

const SERVICE_EMOJIS: Record<string, string> = {
  'AC': '❄️', 'Air': '❄️', 'Plumb': '🔧', 'Electric': '⚡', 'Paint': '🎨',
  'Carpet': '🪵', 'Tilin': '🏗️', 'Clean': '🧹', 'Maint': '🏠',
  'صيانة': '❄️', 'سباكة': '🔧', 'كهرباء': '⚡', 'دهان': '🎨',
}

function getEmoji(service: string): string {
  const key = Object.keys(SERVICE_EMOJIS).find((k) => service.toLowerCase().includes(k.toLowerCase()))
  return key ? SERVICE_EMOJIS[key] : '🛠️'
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

function RequestCard({ req }: { req: QuoteRequest }) {
  const t = useTranslations('app')
  const [expanded, setExpanded] = useState(false)
  const currentStep = STATUS_ORDER.indexOf(req.status)

  const statusKeys: Record<RequestStatus, string> = {
    'Pending': t('status_pending'),
    'Under Review': t('status_underreview'),
    'Quote Sent': t('status_sent'),
    'Assigned': t('status_assigned'),
    'In Progress': t('status_inprogress'),
    'Completed': t('status_completed'),
  }

  return (
    <div className="bg-white dark:bg-[#0d2a4a] rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 text-start hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="w-12 h-12 rounded-xl bg-[#0A2540]/10 dark:bg-white/10 flex items-center justify-center text-2xl shrink-0">
          {getEmoji(req.service)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-[#0A2540] dark:text-white truncate">{req.service}</p>
            <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0', STATUS_COLORS[req.status])}>
              {statusKeys[req.status]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t('submitted_on')} {formatDate(req.date)}
          </p>
          {req.message && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{req.message}</p>
          )}
          {req.photoName && (
            <span className="text-xs text-[#FF6B00] flex items-center gap-1 mt-0.5">
              📷 {req.photoName}
            </span>
          )}
        </div>
      </button>

      {/* Track Progress (expanded) */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {t('track_progress')}
          </p>
          <div className="space-y-0">
            {STATUS_ORDER.map((step, idx) => {
              const done = idx <= currentStep
              const isCurrent = idx === currentStep
              return (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                      done
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-gray-100 dark:bg-white/10 text-muted-foreground'
                    )}>
                      {done ? (
                        isCurrent
                          ? <Circle className="w-3 h-3 fill-current" />
                          : <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    {idx < STATUS_ORDER.length - 1 && (
                      <div className={cn('w-0.5 h-8 mt-0.5', done && idx < currentStep ? 'bg-[#FF6B00]' : 'bg-border')} />
                    )}
                  </div>
                  <div className="pt-1 pb-3">
                    <p className={cn('text-sm font-medium', done ? 'text-[#0A2540] dark:text-white' : 'text-muted-foreground')}>
                      {statusKeys[step]}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-[#FF6B00] mt-0.5">{formatDate(req.date)}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function MyRequestsPage() {
  const t = useTranslations('app')
  const [requests, setRequests] = useState<QuoteRequest[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setRequests(AppStorage.getRequests())
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      {/* Page header */}
      <div className="bg-[#0A2540] text-white px-5 py-6">
        <div className="container-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t('my_requests')}</h1>
              <p className="text-xs text-white/70">{loaded ? `${requests.length} request${requests.length !== 1 ? 's' : ''}` : '...'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-brand py-6 space-y-4">
        {!loaded ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-gray-100 dark:bg-[#0d2a4a] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#FF6B00]/10 flex items-center justify-center mb-5">
              <ClipboardList className="w-10 h-10 text-[#FF6B00]" />
            </div>
            <h2 className="text-lg font-bold text-[#0A2540] dark:text-white mb-2">{t('no_requests_title')}</h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">{t('no_requests_desc')}</p>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#FF6B00] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#e55f00] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t('get_quote')}
            </Link>
          </div>
        ) : (
          requests.map((req) => <RequestCard key={req.id} req={req} />)
        )}
      </div>
    </div>
  )
}
