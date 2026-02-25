'use client'

import { useState, useEffect } from 'react'
import { Home, ClipboardList, Bell, User, X, Phone, Mail, Save, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useIsPWA } from '@/hooks/useIsPWA'
import { useAppProfile } from '@/hooks/useAppProfile'
import { AppStorage } from '@/lib/app-storage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function AppBottomNav() {
  const isPWA = useIsPWA()
  const t = useTranslations('app')
  const pathname = usePathname()
  const { profile, save } = useAppProfile()

  const [unread, setUnread] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', phone: '', email: '' })

  // Re-read on every tab navigation
  useEffect(() => {
    setUnread(AppStorage.getUnreadCount())
  }, [pathname])

  // Re-read when user switches back to this PWA tab/window
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        setUnread(AppStorage.getUnreadCount())
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const openProfile = () => {
    setEditForm({
      name: profile?.name ?? '',
      phone: profile?.phone ?? '',
      email: profile?.email ?? '',
    })
    setShowProfile(true)
  }

  const saveProfile = () => {
    if (!editForm.name.trim() || !editForm.phone.trim()) return
    save({ name: editForm.name.trim(), phone: editForm.phone.trim(), email: editForm.email.trim() || undefined })
    setShowProfile(false)
  }

  const handleLogout = () => {
    AppStorage.setSession(false)
    setShowProfile(false)
    window.location.reload()
  }

  if (!isPWA) return null

  const tabs = [
    { href: '/', icon: Home, label: t('home') },
    { href: '/app/requests', icon: ClipboardList, label: t('my_requests') },
    { href: '/app/notifications', icon: Bell, label: t('notifications'), badge: unread },
  ]

  return (
    <>
      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-[#0d2a4a] border-t border-border safe-area-inset-bottom">
        <div className="flex items-stretch h-16">
          {tabs.map((tab) => {
            const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors',
                  isActive
                    ? 'text-[#FF6B00]'
                    : 'text-muted-foreground hover:text-[#FF6B00]'
                )}
              >
                <div className="relative">
                  <tab.icon className="w-5 h-5" />
                  {tab.badge != null && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -end-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <span className="absolute top-0 inset-x-4 h-0.5 bg-[#FF6B00] rounded-b-full" />
                )}
              </Link>
            )
          })}

          {/* Profile tab — opens drawer */}
          <button
            onClick={openProfile}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-[#FF6B00] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t('profile')}</span>
          </button>
        </div>
      </nav>

      {/* Profile drawer */}
      {showProfile && (
        <div className="fixed inset-0 z-[150] flex items-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProfile(false)} />
          <div className="relative w-full bg-white dark:bg-[#0d2a4a] rounded-t-3xl p-6 pb-10 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg text-[#0A2540] dark:text-white">{t('profile')}</h2>
              <button onClick={() => setShowProfile(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FF6B00]" />
                  {t('profile_name')}
                </Label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                  {t('profile_phone')}
                </Label>
                <Input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="+971 5X XXX XXXX"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  {t('profile_email')}
                </Label>
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <button
                onClick={saveProfile}
                className="w-full flex items-center justify-center gap-2 min-h-[48px] bg-[#FF6B00] text-white font-semibold rounded-xl hover:bg-[#e55f00] transition-colors"
              >
                <Save className="w-4 h-4" />
                {t('save_profile')}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 h-11 border border-red-400/30 text-red-400 font-semibold rounded-xl hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
