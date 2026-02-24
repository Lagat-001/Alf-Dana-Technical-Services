import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'
import { AppQuickActions } from '@/components/app/AppQuickActions'
import { AppInstallButton } from '@/components/features/AppInstallButton'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AppQuickActions />
      <AppInstallButton variant="banner" />
      <StatsBar />
      <ServicesGrid preview />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  )
}
