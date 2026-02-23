import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const t = useTranslations('testimonials')

  const testimonials = [
    { key: '1', rating: 5 },
    { key: '2', rating: 5 },
    { key: '3', rating: 5 },
  ]

  return (
    <section className="section-pad bg-background">
      <div className="container-brand">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.key}
              className="relative bg-white dark:bg-[#0d2a4a] rounded-2xl p-7 shadow-sm border border-border"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#FF6B00]/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                &quot;{t(`${item.key}.text`)}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2540] to-[#00B4D8] flex items-center justify-center text-white font-bold text-sm">
                  {t(`${item.key}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0A2540] dark:text-white">
                    {t(`${item.key}.name`)}
                  </div>
                  <div className="text-xs text-muted-foreground">{t(`${item.key}.location`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
