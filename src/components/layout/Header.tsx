'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Menu } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher'
import { ThemeToggle } from '@/components/features/ThemeToggle'
import { AppInstallButton } from '@/components/features/AppInstallButton'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/about', label: t('about') },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/95 dark:bg-[#0A2540]/95 backdrop-blur-md shadow-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="container-brand">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center">
                <GearIcon />
              </div>
              <div className="hidden sm:block">
                <div
                  className={cn(
                    'font-bold text-base leading-tight transition-colors',
                    scrolled ? 'text-[#0A2540] dark:text-white' : 'text-white'
                  )}
                >
                  ALF DANA
                </div>
                <div
                  className={cn(
                    'text-xs leading-tight transition-colors',
                    scrolled ? 'text-[#FF6B00]' : 'text-[#FF6B00]'
                  )}
                >
                  TECHNICAL SERVICES
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                      : scrolled
                        ? 'text-[#0A2540] dark:text-white hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} scrolled={scrolled} />
              <ThemeToggle scrolled={scrolled} />
              <AppInstallButton variant="header" scrolled={scrolled} />
              <Button
                variant="brandAccent"
                size="sm"
                className="hidden md:inline-flex text-xs font-semibold"
                asChild
              >
                <a href={getGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  {t('contact')}
                </a>
              </Button>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'lg:hidden p-3 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                  scrolled
                    ? 'text-[#0A2540] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                )}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        navLinks={navLinks}
        pathname={pathname}
      />
    </>
  )
}

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
