import { useTranslations } from 'next-intl'
import { MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'

export function CTABanner() {
  const tHero = useTranslations('hero')
  const tContact = useTranslations('contact')

  return (
    <section className="relative overflow-hidden bg-[#0A2540] py-16 md:py-20">
      {/* Decorative */}
      <div className="absolute top-0 end-0 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 start-0 w-60 h-60 bg-[#00B4D8]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-brand relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          Contact us today for a free quote. We respond within 1 hour.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="brandAccent" size="xl" className="gap-2 font-semibold" asChild>
            <a href={getGenericWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              {tHero('cta_primary')}
            </a>
          </Button>
          <Button
            variant="brandOutline"
            size="xl"
            className="gap-2 font-semibold border-white text-white hover:bg-white hover:text-[#0A2540]"
            asChild
          >
            <Link href="/contact">
              <Phone className="w-5 h-5" />
              {tContact('title')}
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-white/50 text-sm">
          📞 052 849 4331 &nbsp;|&nbsp; 🇦🇪 All Emirates
        </div>
      </div>
    </section>
  )
}
