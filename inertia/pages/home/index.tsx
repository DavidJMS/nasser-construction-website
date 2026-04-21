import { AnimatePresence } from 'framer-motion'
import { HomeProps } from './types'
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
  settings,
}: HomeProps) {
  const { loading } = useHomeLoading()

  const { data: heroData } = useQuery(api.heros.show.queryOptions())
  const { data: aboutUsData } = useQuery(api.aboutUs.show.queryOptions())
  const { data: projectsData } = useQuery(api.projects.index.queryOptions())
  const { data: servicesData } = useQuery(api.services.index.queryOptions())
  const { data: testimonialsData } = useQuery(api.testimonials.index.queryOptions())
  const { data: settingsData } = useQuery(api.settings.index.queryOptions())

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
          settings={settingsData?.data ?? settings}
        />

        <Navbar />

        <EditableSection section="hero" title="Sección Hero">
          <Hero data={heroData?.data ?? hero} />
        </EditableSection>

        <EditableSection section="about_us" title="Sobre Nosotros">
          <AboutUs data={aboutUsData?.data ?? aboutUs} />
        </EditableSection>

        <EditableSection section="services" title="Nuestros Servicios">
          <Services data={servicesData?.data ?? services} />
        </EditableSection>

        <WhyChooseUs />

        <EditableSection section="projects" title="Proyectos Recientes">
          <Products data={projectsData?.data ?? projects} />
        </EditableSection>

        <EditableSection section="testimonials" title="Testimonios de Clientes">
          <Testimonials data={testimonialsData?.data ?? testimonials} />
        </EditableSection>

        <EditableSection section="cta" title="CTA / Contacto">
          <CTASection settings={settingsData?.data ?? settings} />
        </EditableSection>
        <EditableSection section="footer" title="Footer">
          <Footer settings={settingsData?.data ?? settings} />
        </EditableSection>
      </div>
    </EditorProvider>
  )
}
