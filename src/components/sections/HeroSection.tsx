import { useTranslations } from 'next-intl'
import { Shield, Clock, Star, Wrench, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'

export function HeroSection() {
  const t = useTranslations('hero')

  const trustBadges = [
    { icon: Shield, label: t('trust_licensed') },
    { icon: Clock, label: t('trust_support') },
    { icon: Star, label: t('trust_experience') },
    { icon: Wrench, label: t('trust_projects') },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-brand" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -end-20 w-96 h-96 bg-[#FF6B00]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -start-20 w-80 h-80 bg-[#00B4D8]/20 rounded-full blur-3xl" />

      <div className="container-brand relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5 rounded-full">
            {t('badge')}
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 break-words">
            {(() => {
              const title = t('title')
              const words = title.split(' ')
              // For single-word languages (Chinese), render all in gradient
              if (words.length <= 2) return <span className="text-gradient-brand">{title}</span>
              const mid = Math.ceil(words.length / 2)
              return (
                <>
                  {words.slice(0, mid).join(' ')}{' '}
                  <span className="text-gradient-brand">{words.slice(mid).join(' ')}</span>
                </>
              )
            })()}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Button variant="brandAccent" size="xl" className="gap-2 font-semibold" asChild>
              <a href={getGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                {t('cta_primary')}
              </a>
            </Button>
            <Button
              variant="brandOutline"
              size="xl"
              className="gap-2 font-semibold border-white text-white hover:bg-white hover:text-[#0A2540]"
              asChild
            >
              <Link href="/services">
                {t('cta_secondary')}
                <ArrowRight className="w-5 h-5 rtl-flip" />
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="glass-card flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium"
              >
                <badge.icon className="w-4 h-4 text-[#FF6B00]" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 start-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
