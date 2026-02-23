import { useTranslations } from 'next-intl'
import { Zap, Users, Shield, Star } from 'lucide-react'

export function WhyChooseUs() {
  const t = useTranslations('why')

  const reasons = [
    {
      icon: Zap,
      titleKey: 'fast.title',
      descKey: 'fast.desc',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-500/10',
    },
    {
      icon: Users,
      titleKey: 'expert.title',
      descKey: 'expert.desc',
      color: 'text-[#00B4D8]',
      bg: 'bg-[#00B4D8]/10',
    },
    {
      icon: Shield,
      titleKey: 'licensed.title',
      descKey: 'licensed.desc',
      color: 'text-[#0A2540] dark:text-white',
      bg: 'bg-[#0A2540]/10 dark:bg-white/10',
    },
    {
      icon: Star,
      titleKey: 'quality.title',
      descKey: 'quality.desc',
      color: 'text-[#FF6B00]',
      bg: 'bg-[#FF6B00]/10',
    },
  ]

  return (
    <section className="section-pad bg-gray-50 dark:bg-[#061524]">
      <div className="container-brand">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0d2a4a] rounded-2xl p-7 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${reason.bg} rounded-2xl flex items-center justify-center mb-5`}>
                <reason.icon className={`w-7 h-7 ${reason.color}`} />
              </div>
              <h3 className="font-bold text-[#0A2540] dark:text-white mb-3">
                {t(reason.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(reason.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
