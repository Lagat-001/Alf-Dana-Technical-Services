import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'
import { AppQuickActions } from '@/components/app/AppQuickActions'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AppQuickActions />
      <StatsBar />
      <ServicesGrid preview />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  )
}
