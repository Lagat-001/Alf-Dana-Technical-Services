'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Bell, CheckCheck, Clock } from 'lucide-react'
import { AppStorage, AppNotification } from '@/lib/app-storage'
import { cn } from '@/lib/utils'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

export default function NotificationsPage() {
  const t = useTranslations('app')
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const notifs = AppStorage.getNotifications()
    setNotifications(notifs)
    setLoaded(true)
    // Mark all as read on page open
    AppStorage.markAllNotificationsRead()
  }, [])

  const markAllRead = () => {
    AppStorage.markAllNotificationsRead()
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const hasUnread = notifications.some((n) => !n.read)

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      {/* Page header */}
      <div className="bg-[#0A2540] text-white px-5 py-6">
        <div className="container-brand">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t('notifications')}</h1>
                <p className="text-xs text-white/70">{loaded ? `${notifications.length} notification${notifications.length !== 1 ? 's' : ''}` : '...'}</p>
              </div>
            </div>
            {hasUnread && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                {t('mark_all_read')}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-brand py-6 space-y-3">
        {!loaded ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 dark:bg-[#0d2a4a] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#00B4D8]/10 flex items-center justify-center mb-5">
              <Bell className="w-10 h-10 text-[#00B4D8]" />
            </div>
            <h2 className="text-lg font-bold text-[#0A2540] dark:text-white mb-2">{t('no_notifications_title')}</h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t('no_notifications_desc')}</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                'bg-white dark:bg-[#0d2a4a] rounded-2xl border p-4 flex items-start gap-4 transition-all',
                n.read
                  ? 'border-border opacity-80'
                  : 'border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                n.read ? 'bg-gray-100 dark:bg-white/10' : 'bg-[#FF6B00]/10'
              )}>
                <Bell className={cn('w-5 h-5', n.read ? 'text-muted-foreground' : 'text-[#FF6B00]')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#0A2540] dark:text-white">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(n.date)}
                </p>
              </div>
              {!n.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mt-1 shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
