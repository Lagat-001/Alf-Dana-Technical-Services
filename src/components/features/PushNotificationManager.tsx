'use client'

import { useEffect, useState } from 'react'
import { Bell, X, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface PushNotificationManagerProps {
  userName?: string
  phone?: string
  onDismiss: () => void
}

export function PushNotificationManager({ userName, phone, onDismiss }: PushNotificationManagerProps) {
  const t = useTranslations('notifications')
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied'>('idle')

  useEffect(() => {
    // Don't show if already asked, or if Notification API unavailable
    if (typeof window === 'undefined') return
    if (!('Notification' in window)) return
    if (Notification.permission === 'granted') {
      // Already have permission — fire the thank-you notification immediately
      fireThankYouNotification(userName, phone, t)
      return
    }
    if (localStorage.getItem('notif-permission-asked')) return

    // Short delay so it doesn't overlap with WhatsApp opening
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [userName, phone, t])

  // Auto-dismiss after 8 seconds if user ignores it
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => handleDismiss(), 8000)
    return () => clearTimeout(timer)
  }, [visible])

  const handleAllow = async () => {
    localStorage.setItem('notif-permission-asked', 'true')
    setVisible(false)
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setStatus('granted')
        // Small delay before firing notification (feels more natural)
        setTimeout(() => {
          fireThankYouNotification(userName, phone, t)
          onDismiss()
        }, 600)
      } else {
        setStatus('denied')
        setTimeout(onDismiss, 1000)
      }
    } catch {
      onDismiss()
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('notif-permission-asked', 'true')
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  if (!visible && status === 'idle') return null

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white dark:bg-[#0d2a4a] rounded-2xl shadow-2xl border border-border p-5 animate-slide-up">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-[#FF6B00]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0A2540] dark:text-white leading-snug">
              {t('permission_title')}
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {t('permission_desc')}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleAllow}
                className="flex items-center gap-1.5 bg-[#FF6B00] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#FF6B00]/90 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                {t('allow')}
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-muted-foreground px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                {t('not_now')}
              </button>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function fireThankYouNotification(
  userName: string | undefined,
  phone: string | undefined,
  t: ReturnType<typeof useTranslations<'notifications'>>
) {
  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  // Use service worker notification if SW is active (shows even when tab is in background)
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(t('thank_you_title'), {
        body: phone
          ? `${t('thank_you_body')} (${phone})`
          : t('thank_you_body'),
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'quote-request',
      } as NotificationOptions & { tag?: string })
    }).catch(() => {
      // Fallback to regular Notification
      new Notification(t('thank_you_title'), {
        body: phone ? `${t('thank_you_body')} (${phone})` : t('thank_you_body'),
        icon: '/icons/icon-192.png',
      })
    })
  } else {
    new Notification(t('thank_you_title'), {
      body: phone
        ? `${t('thank_you_body')} (${phone})`
        : t('thank_you_body'),
      icon: '/icons/icon-192.png',
    })
  }
}
