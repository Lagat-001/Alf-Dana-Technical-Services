'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  scrolled?: boolean
}

export function ThemeToggle({ scrolled }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const active = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
    setTheme(active)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      className={cn(
        'p-2 rounded-lg transition-colors',
        scrolled
          ? 'text-[#0A2540] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
          : 'text-white hover:bg-white/10'
      )}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
