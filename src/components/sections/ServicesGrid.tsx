import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { getServiceWhatsAppLink } from '@/lib/whatsapp'

const SERVICES = [
  {
    key: 'ac',
    id: 'ac',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    emoji: '❄️',
  },
  {
    key: 'plumbing',
    id: 'plumbing',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
    emoji: '🔧',
  },
  {
    key: 'electrical',
    id: 'electrical',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    emoji: '⚡',
  },
  {
    key: 'painting',
    id: 'painting',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
    emoji: '🎨',
  },
  {
    key: 'carpentry',
    id: 'carpentry',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
    emoji: '🪵',
  },
  {
    key: 'tiling',
    id: 'tiling',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80',
    emoji: '🏗️',
  },
  {
    key: 'cleaning',
    id: 'cleaning',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    emoji: '🧹',
  },
  {
    key: 'maintenance',
    id: 'maintenance',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80',
    emoji: '🏠',
  },
  {
    key: 'glass_buffing',
    id: 'glass-buffing',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94aca9547?w=600&q=80',
    emoji: '🪟',
  },
]

interface ServicesGridProps {
  preview?: boolean // Show only 4 on homepage
}

export function ServicesGrid({ preview = false }: ServicesGridProps) {
  const t = useTranslations('services')

  const services = preview ? SERVICES.slice(0, 4) : SERVICES

  return (
    <section className="section-pad bg-background">
      <div className="container-brand">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.key}
              id={service.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(`${service.key}.name`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Emoji badge */}
                <div className="absolute top-3 start-3 w-9 h-9 bg-white/90 dark:bg-[#0A2540]/90 rounded-xl flex items-center justify-center text-lg shadow-sm">
                  {service.emoji}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-[#0A2540] dark:text-white mb-2">
                  {t(`${service.key}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(`${service.key}.desc`)}
                </p>
                <Button
                  variant="brandAccent"
                  size="sm"
                  className="w-full text-xs font-semibold"
                  asChild
                >
                  <a
                    href={getServiceWhatsAppLink(t(`${service.key}.name`))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('quote_btn')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-10">
            <Button variant="brand" size="lg" className="gap-2 font-semibold" asChild>
              <Link href="/services">
                {t('all')}
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
