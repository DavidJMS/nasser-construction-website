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

export default function Home() {
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
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Products />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  )
}
