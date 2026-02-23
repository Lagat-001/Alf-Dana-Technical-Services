import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { MessageCircle, Mail, MapPin, Clock, Phone } from 'lucide-react'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'

interface FooterProps {
  locale: string
}

export function Footer({ locale: _locale }: FooterProps) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tServices = useTranslations('services')

  const serviceLinks = [
    { key: 'ac', href: '/services#ac' },
    { key: 'plumbing', href: '/services#plumbing' },
    { key: 'electrical', href: '/services#electrical' },
    { key: 'painting', href: '/services#painting' },
    { key: 'carpentry', href: '/services#carpentry' },
    { key: 'tiling', href: '/services#tiling' },
    { key: 'cleaning', href: '/services#cleaning' },
    { key: 'maintenance', href: '/services#maintenance' },
  ]

  return (
    <footer className="bg-[#0A2540] text-white">
      <div className="container-brand py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center">
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
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white">ALF DANA</div>
                <div className="text-xs text-[#FF6B00]">TECHNICAL SERVICES</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{t('tagline')}</p>
            <a
              href={getGenericWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t('whatsapp_label')}
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              {t('quick_links')}
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: tNav('home') },
                { href: '/services', label: tNav('services') },
                { href: '/projects', label: tNav('projects') },
                { href: '/about', label: tNav('about') },
                { href: '/contact', label: tNav('contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#FF6B00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              {t('services_label')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 hover:text-[#FF6B00] transition-colors"
                  >
                    {tServices(`${s.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              {t('contact_label')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">052 849 4331</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                <a
                  href={getGenericWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-[#25D366] transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00B4D8] mt-0.5 shrink-0" />
                <a
                  href="mailto:info@alfdana.ae"
                  className="text-sm text-white/70 hover:text-[#00B4D8] transition-colors"
                >
                  info@alfdana.ae
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">Dubai, UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#00B4D8] mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">
                  Mon–Sat: 8AM–8PM
                  <br />
                  Sun: 9AM–5PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">{t('copyright')}</p>
          <p className="text-xs text-white/50">
            🇦🇪 Serving all Emirates
          </p>
        </div>
      </div>
    </footer>
  )
}
