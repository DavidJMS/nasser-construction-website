import { HeroData } from '~/components/landing/Hero'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  Navbar,
  Hero,
  AboutUs,
  Services,
  WhyChooseUs,
  Products,
  Testimonials,
  CTASection,
  Footer,
  Preloader,
} from '~/components/landing'

interface Props {
  hero: any
  services: any[]
  projects: any[]
  testimonials: any[]
}

export default function Home({ hero, services, projects, testimonials }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Artificial delay for smooth entry/exit
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Preloader key="preloader" />}</AnimatePresence>

      <Navbar />
      <Hero data={hero} />
      <AboutUs />
      <Services data={services} />
      <WhyChooseUs />
      <Products data={projects} />
      <Testimonials data={testimonials} />
      <CTASection />
      <Footer />
    </>
  )
}
