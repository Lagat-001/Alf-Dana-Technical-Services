'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/config/routing'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

const LANGUAGES: Record<string, { label: string; native: string; flag: string }> = {
  en: { label: 'English', native: 'English', flag: '🇬🇧' },
  ar: { label: 'Arabic', native: 'العربية', flag: '🇦🇪' },
  hi: { label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  ur: { label: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  zh: { label: 'Chinese', native: '中文', flag: '🇨🇳' },
}

interface LanguageSwitcherProps {
  locale: string
  scrolled?: boolean
}

export function LanguageSwitcher({ locale, scrolled }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES[locale] || LANGUAGES.en

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors',
          scrolled
            ? 'text-[#0A2540] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
            : 'text-white hover:bg-white/10'
        )}
        aria-label="Switch language"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute end-0 top-full mt-1.5 w-44 bg-white dark:bg-[#0d2a4a] rounded-xl shadow-xl border border-border overflow-hidden z-50">
          {routing.locales.map((loc) => {
            const lang = LANGUAGES[loc]
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-start',
                  loc === locale
                    ? 'bg-[#FF6B00]/10 text-[#FF6B00] font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                )}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.native}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
