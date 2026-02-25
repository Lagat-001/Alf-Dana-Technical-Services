'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Eye, EyeOff, Phone, Mail, User, ArrowRight, Loader2 } from 'lucide-react'
import { AppStorage } from '@/lib/app-storage'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher'
import { cn } from '@/lib/utils'

interface Props {
  onSuccess: () => void
}

type Mode = 'login' | 'signup'
type Method = 'email' | 'phone'

export function AppLoginScreen({ onSuccess }: Props) {
  const t = useTranslations('app')
  const locale = useLocale()

  const [mode, setMode] = useState<Mode>('login')
  const [method, setMethod] = useState<Method>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    identifier: '',
    password: '',
    confirm: '',
  })

  const set = (key: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [key]: val }))
    setError('')
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    setError('')
    setForm({ name: '', identifier: '', password: '', confirm: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const identifier = form.identifier.trim()
    const password = form.password

    if (!identifier || !password) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)

    // Simulate a brief async delay for UX polish
    setTimeout(() => {
      if (mode === 'login') {
        const cred = AppStorage.getCredential()
        if (!cred || cred.identifier !== identifier || cred.password !== password) {
          setError(t('invalid_credentials'))
          setLoading(false)
          return
        }
        // Success
        AppStorage.setSession(true)
        AppStorage.saveProfile({
          name: cred.name,
          phone: cred.method === 'phone' ? cred.identifier : '',
          email: cred.method === 'email' ? cred.identifier : undefined,
        })
        onSuccess()
      } else {
        // Signup
        const name = form.name.trim()
        const confirm = form.confirm

        if (!name) {
          setError('Please fill in all required fields.')
          setLoading(false)
          return
        }
        if (password !== confirm) {
          setError(t('password_mismatch'))
          setLoading(false)
          return
        }
        const existing = AppStorage.getCredential()
        if (existing && existing.identifier === identifier) {
          setError(t('account_exists'))
          setLoading(false)
          return
        }
        AppStorage.saveCredential({ method, identifier, password, name })
        AppStorage.setSession(true)
        AppStorage.saveProfile({
          name,
          phone: method === 'phone' ? identifier : '',
          email: method === 'email' ? identifier : undefined,
        })
        onSuccess()
      }
    }, 400)
  }

  // White inputs with dark text — works reliably on every device & color scheme
  const inputClass = cn(
    'w-full h-12 rounded-xl px-4 text-sm',
    'bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400',
    'outline-none transition-all duration-200',
    'focus:border-[#00B4D8] focus:bg-white focus:ring-2 focus:ring-[#00B4D8]/20'
  )

  return (
    <div className="fixed inset-0 z-[200] bg-[#040f1e] flex flex-col items-center justify-center p-5 overflow-y-auto">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00B4D8]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FF6B00]/6 rounded-full blur-[100px]" />
      </div>

      {/* Language switcher — top right */}
      <div className="absolute top-4 end-4 z-10">
        <LanguageSwitcher locale={locale} />
      </div>

      <div className="relative w-full max-w-sm py-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[72px] h-[72px] rounded-[22px] bg-white/8 border border-white/12 flex items-center justify-center shadow-2xl mb-4 overflow-hidden">
            <Image src="/logo.png" alt="ALF DANA" width={52} height={52} className="object-contain" />
          </div>
          <div className="text-white font-bold text-xl tracking-tight">ALF DANA</div>
          <div className="text-[#00B4D8] text-xs font-semibold tracking-[0.15em] mt-0.5">TECHNICAL SERVICES</div>
        </div>

        {/* Card — white background for clean, modern look */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          {/* Title */}
          <div className="mb-5">
            <h1 className="text-[#0A2540] font-bold text-2xl">
              {mode === 'login' ? t('login_title') : t('signup_title')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'login' ? t('login_subtitle') : t('signup_subtitle')}
            </p>
          </div>

          {/* Email / Phone toggle */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 mb-4 gap-1">
            <button
              type="button"
              onClick={() => { setMethod('email'); setForm(f => ({ ...f, identifier: '' })); setError('') }}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-all duration-200',
                method === 'email'
                  ? 'bg-[#0A2540] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Mail className="w-3.5 h-3.5" />
              {t('use_email')}
            </button>
            <button
              type="button"
              onClick={() => { setMethod('phone'); setForm(f => ({ ...f, identifier: '' })); setError('') }}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-all duration-200',
                method === 'phone'
                  ? 'bg-[#0A2540] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              {t('use_phone')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name — signup only */}
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder={t('name_placeholder')}
                  className={cn(inputClass, 'pl-10')}
                  autoComplete="name"
                />
              </div>
            )}

            {/* Email / Phone */}
            <div className="relative">
              {method === 'email'
                ? <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                : <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              }
              <input
                type={method === 'email' ? 'email' : 'tel'}
                value={form.identifier}
                onChange={(e) => set('identifier', e.target.value)}
                placeholder={method === 'email' ? t('email_placeholder') : t('phone_placeholder')}
                className={cn(inputClass, 'pl-10')}
                autoComplete={method === 'email' ? 'email' : 'tel'}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                placeholder={t('password_placeholder')}
                className={cn(inputClass, 'pr-11')}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm password — signup only */}
            {mode === 'signup' && (
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={(e) => set('confirm', e.target.value)}
                  placeholder={t('confirm_placeholder')}
                  className={cn(inputClass, 'pr-11')}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs text-center px-1">{error}</p>
            )}

            {/* CTA button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 flex items-center justify-center gap-2 rounded-xl font-bold text-base text-white bg-[#00B4D8] hover:bg-[#00a3c4] active:bg-[#0093b0] shadow-lg shadow-[#00B4D8]/30 transition-all duration-200 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading
                ? <Loader2 className="w-5 h-5 animate-spin" />
                : (
                  <>
                    {mode === 'login' ? t('login_btn') : t('signup_btn')}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )
              }
            </button>
          </form>

          {/* Toggle mode */}
          <button
            type="button"
            onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
            className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
          >
            {mode === 'login' ? t('no_account') : t('have_account')}
          </button>
        </div>
      </div>
    </div>
  )
}
