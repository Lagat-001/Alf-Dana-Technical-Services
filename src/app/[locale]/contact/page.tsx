import { useTranslations } from 'next-intl'
import { ContactForm } from '@/components/sections/ContactForm'

function ContactHero() {
  const t = useTranslations('contact')
  return (
    <section className="relative bg-[#0A2540] pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container-brand relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-[#FF6B00]/20 text-[#FF6B00] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          💬 Free Quote
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  )
}
