'use client'

import { useEffect } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  locale: string
  navLinks: { href: string; label: string }[]
  pathname: string
}

export function MobileMenu({ open, onClose, navLinks, pathname }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div className="absolute inset-y-0 end-0 w-80 max-w-full bg-white dark:bg-[#0A2540] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <div className="font-bold text-[#0A2540] dark:text-white">ALF DANA</div>
            <div className="text-xs text-[#FF6B00]">TECHNICAL SERVICES</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-[#FF6B00] bg-[#FF6B00]/10 font-semibold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-6 border-t border-border">
          <Button variant="whatsapp" className="w-full gap-2" asChild>
            <a href={getGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </Button>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            052 849 4331
          </div>
        </div>
      </div>
    </div>
  )
}
