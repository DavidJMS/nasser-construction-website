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

export default function Home({ hero, services, projects, testimonials, aboutUs, settings }: HomeProps) {
  const { loading } = useHomeLoading()

  return (
    <EditorProvider>
      <AnimatePresence mode="wait">{loading && <Preloader key="preloader" />}</AnimatePresence>

      <div className="relative">
        <EditorSidebar
          heroData={hero}
          aboutUsData={aboutUs}
          services={services}
          projects={projects}
          testimonials={testimonials}
          settings={settings}
        />

        <Navbar />

        <EditableSection section="hero" title="Sección Hero">
          <Hero data={hero} />
        </EditableSection>

        <EditableSection section="about_us" title="Sobre Nosotros">
          <AboutUs data={aboutUs} />
        </EditableSection>

        <EditableSection section="services" title="Nuestros Servicios">
          <Services data={services} />
        </EditableSection>

        <WhyChooseUs />

        <EditableSection section="projects" title="Proyectos Recientes">
          <Products data={projects} />
        </EditableSection>

        <EditableSection section="testimonials" title="Testimonios de Clientes">
          <Testimonials data={testimonials} />
        </EditableSection>

        <EditableSection section="cta" title="CTA / Contacto">
          <CTASection settings={settings} />
        </EditableSection>
        <EditableSection section="footer" title="Footer">
          <Footer settings={settings} />
        </EditableSection>
      </div>
    </EditorProvider>
  )
}
