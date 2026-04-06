import { AnimatePresence } from 'framer-motion'
import { HomeProps } from './types'
import { useHomeLoading } from './hooks/useHomeLoading'
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
} from './components'

export default function Home({ hero, services, projects, testimonials }: HomeProps) {
  const { loading } = useHomeLoading()

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
