import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesGrid preview />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  )
}
