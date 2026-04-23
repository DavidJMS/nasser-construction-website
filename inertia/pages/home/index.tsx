import { AnimatePresence } from 'framer-motion'
import { useHomeLoading } from './hooks/useHomeLoading'
import { EditorProvider } from './hooks/useEditor'
import { EditorSidebar } from './components/EditorSidebar'
import { EditableSection } from './components/EditableSection'
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
import { useQuery } from '@tanstack/react-query'
import { api } from '~/utils/client'

export default function Home({
  hero,
  services,
  projects,
  testimonials,
  aboutUs,
  footer,
  cta,
  whyChoose,
}: any) {
  const { loading } = useHomeLoading()

  const { data: heroData } = useQuery(api.heros.show.queryOptions())
  const { data: aboutUsData } = useQuery(api.aboutUs.show.queryOptions())
  const { data: projectsData } = useQuery(api.projects.index.queryOptions())
  const { data: servicesData } = useQuery(api.services.index.queryOptions())
  const { data: testimonialsData } = useQuery(api.testimonials.index.queryOptions())
  const { data: ctasData } = useQuery(api.cta.show.queryOptions())
  const { data: footerData } = useQuery(api.footers.show.queryOptions())
  const { data: whyChooseData } = useQuery(api.whyChooses.index.queryOptions())

  return (
    <EditorProvider>
      <AnimatePresence mode="wait">{loading && <Preloader key="preloader" />}</AnimatePresence>

      <div className="relative">
        <EditorSidebar
          heroData={heroData?.data ?? hero}
          aboutUsData={aboutUsData?.data ?? aboutUs}
          services={servicesData?.data ?? services}
          projects={projectsData?.data ?? projects}
          testimonials={testimonialsData?.data ?? testimonials}
          cta={ctasData?.data ?? cta}
          footerData={footerData?.data ?? footer}
          whyChooseData={whyChooseData?.data ?? whyChoose}
        />

        <Navbar />

        <EditableSection section="hero" title="Hero Section">
          <Hero data={heroData?.data ?? hero} />
        </EditableSection>

        <EditableSection section="about_us" title="About Us">
          <AboutUs data={aboutUsData?.data ?? aboutUs} />
        </EditableSection>

        <EditableSection section="services" title="Our Services">
          <Services data={servicesData?.data ?? services} />
        </EditableSection>

        <EditableSection section="why_choose_us" title="Why Choose Us">
          <WhyChooseUs features={whyChooseData?.data ?? whyChoose} />
        </EditableSection>
        <EditableSection section="projects" title="Recent Projects">
          <Products data={projectsData?.data ?? projects} />
        </EditableSection>

        <EditableSection section="testimonials" title="Client Testimonials">
          <Testimonials data={testimonialsData?.data ?? testimonials} />
        </EditableSection>

        <EditableSection section="cta" title="Contact">
          <CTASection cta={ctasData?.data ?? cta} />
        </EditableSection>
        <EditableSection section="footer" title="Footer">
          <Footer footer={footerData?.data ?? footer} />
        </EditableSection>
      </div>
    </EditorProvider>
  )
}
