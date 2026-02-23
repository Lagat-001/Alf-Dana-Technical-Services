import { useTranslations } from 'next-intl'

export function StatsBar() {
  const t = useTranslations('stats')

  const stats = [
    { value: '500+', label: t('projects') },
    { value: '10+', label: t('experience') },
    { value: '1000+', label: t('clients') },
    { value: '24/7', label: t('support') },
  ]

  return (
    <section className="bg-[#0A2540] dark:bg-[#061524] py-12">
      <div className="container-brand">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
