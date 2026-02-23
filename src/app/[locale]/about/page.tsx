import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Shield, Star, Zap, Users } from 'lucide-react'
import { StatsBar } from '@/components/sections/StatsBar'
import { CTABanner } from '@/components/sections/CTABanner'

export default function AboutPage() {
  const t = useTranslations('about')

  const values = [
    { icon: Star, key: 'v_quality', color: 'text-[#FF6B00]', bg: 'bg-[#FF6B00]/10' },
    { icon: Shield, key: 'v_integrity', color: 'text-[#0A2540] dark:text-[#00B4D8]', bg: 'bg-[#0A2540]/10 dark:bg-[#00B4D8]/10' },
    { icon: Zap, key: 'v_reliability', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
    { icon: Users, key: 'v_innovation', color: 'text-[#00B4D8]', bg: 'bg-[#00B4D8]/10' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A2540] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-brand relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/20 text-[#FF6B00] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🏢 About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-pad bg-background">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white">{t('story_title')}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{t('story')}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10+', label: 'Years in Business' },
                  { value: '500+', label: 'Projects Done' },
                  { value: '1000+', label: 'Happy Clients' },
                  { value: '7', label: 'Emirates Covered' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-[#0d2a4a] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#FF6B00]">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                alt="ALF DANA Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent" />
              <div className="absolute bottom-6 start-6 end-6">
                <div className="glass-card rounded-xl p-4 text-white">
                  <div className="font-bold text-lg">ALF DANA TECHNICAL SERVICES</div>
                  <div className="text-sm text-white/80">Professional Services Since 2014</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-gray-50 dark:bg-[#061524]">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white mb-6">
              {t('mission_title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t('mission')}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-background">
        <div className="container-brand">
          <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white text-center mb-12">
            {t('values_title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.key}
                className="bg-white dark:bg-[#0d2a4a] rounded-2xl p-7 border border-border text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <v.icon className={`w-7 h-7 ${v.color}`} />
                </div>
                <div className="font-bold text-[#0A2540] dark:text-white">{t(v.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />
      <CTABanner />
    </>
  )
}
