'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { User, Phone, Mail, ArrowRight } from 'lucide-react'
import { useAppProfile } from '@/hooks/useAppProfile'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AppLoginScreen() {
  const t = useTranslations('app')
  const { save } = useAppProfile()

  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    save({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || undefined })
  }

  const handleSkip = () => {
    // Save a minimal profile so the gate doesn't show again
    save({ name: 'Guest', phone: '' })
  }

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-[#0A2540] via-[#0d3a6e] to-[#0A2540] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl">
          <Image src="/logo.png" alt="ALF DANA" width={56} height={56} className="rounded-2xl" />
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-xl">ALF DANA</div>
          <div className="text-[#FF6B00] text-xs font-semibold tracking-wider">TECHNICAL SERVICES</div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white dark:bg-[#0d2a4a] rounded-3xl shadow-2xl p-7">
        <h1 className="text-xl font-bold text-[#0A2540] dark:text-white mb-1">{t('welcome_title')}</h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t('welcome_subtitle')}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="app-name" className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FF6B00]" />
              {t('profile_name')}
            </Label>
            <Input
              id="app-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ahmed Al Mansouri"
              className={errors.name ? 'border-red-400' : ''}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-phone" className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              {t('profile_phone')}
            </Label>
            <Input
              id="app-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+971 5X XXX XXXX"
              className={errors.phone ? 'border-red-400' : ''}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-email" className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              {t('profile_email')}
            </Label>
            <Input
              id="app-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 min-h-[52px] bg-[#FF6B00] hover:bg-[#e55f00] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-100 shadow-lg shadow-[#FF6B00]/25 mt-2"
          >
            {t('continue_btn')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={handleSkip}
          className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t('skip_btn')}
        </button>
      </div>
    </div>
  )
}
