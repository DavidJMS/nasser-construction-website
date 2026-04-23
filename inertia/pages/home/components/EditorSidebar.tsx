import { X, Settings, Layout, Save } from 'lucide-react'
import { useEditor } from '../hooks/useEditor'
import { HeroForm } from '../../editor/HeroForm'
import { AboutUsForm } from '../../editor/AboutUsForm'
import { ServicesForm } from '../../editor/ServicesForm'
import { ProjectsForm } from '../../editor/ProjectsForm'
import { TestimonialsForm } from '../../editor/TestimonialsForm'
import { CTAForm } from '../../editor/CTAForm'
import { FooterForm } from '../../editor/FooterForm'
import { WhyChooseUsForm } from '../../editor/WhyChooseUsForm'
import { Button, Tooltip, ConfigProvider, Drawer } from 'antd'
import type Hero from '#models/hero'
import type WhyChoose from '#models/why_choose'
import type Cta from '#models/cta'
import type Testimonial from '#models/testimonial'
import type AboutUs from '#models/about_us'
import type Service from '#models/service'
import type Project from '#models/project'
import type Footer from '#models/footer'

interface EditorSidebarProps {
  heroData?: Hero
  aboutUsData?: AboutUs
  services?: Service[]
  projects?: Project[]
  testimonials?: Testimonial[]
  cta?: Cta
  footerData?: Footer
  whyChooseData?: WhyChoose[]
}

export function EditorSidebar({
  heroData,
  aboutUsData,
  services,
  projects,
  testimonials,
  cta,
  footerData,
  whyChooseData,
}: EditorSidebarProps) {
  const { isEditing, setIsEditing, selectedSection, setSelectedSection, saveAction, isSaving } =
    useEditor()

  if (!isEditing) return null

  const renderContent = () => {
    switch (selectedSection) {
      case 'hero':
        return <HeroForm hero={heroData as any} />
      case 'about_us':
        return <AboutUsForm aboutUs={aboutUsData as any} />
      case 'services':
        return <ServicesForm services={services as any} />
      case 'projects':
        return <ProjectsForm projects={projects as any} />
      case 'testimonials':
        return <TestimonialsForm testimonials={testimonials as any} />
      case 'cta':
        return <CTAForm cta={cta as any} />
      case 'footer':
        return <FooterForm footer={footerData as any} />
      case 'none':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
            <Layout className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">Select a section to edit</p>
          </div>
        )
      case 'why_choose_us':
        return <WhyChooseUsForm features={whyChooseData as any} />
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#07427e',
          borderRadius: 10,
        },
        components: {
          Button: {
            borderRadius: 20,
          },
        },
      }}
    >
      <Drawer
        closable={false}
        placement="left"
        mask={false}
        onClose={() => setIsEditing(false)}
        open={isEditing}
        extra={
          <Tooltip title="Finish Editing">
            <Button
              type="text"
              icon={<X className="w-4 h-4" />}
              onClick={() => setIsEditing(false)}
            />
          </Tooltip>
        }
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center shadow-lg shadow-navy-900/20">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Editor Nasser
                </h3>
                <p className="text-gray-500 text-xs">
                  {selectedSection !== 'none' ? `Editando: ${selectedSection}` : 'Admin Panel'}
                </p>
              </div>
            </div>
          </div>
        }
        footer={
          <div className="py-2 flex items-center justify-center gap-4">
            <Button
              type="default"
              icon={<X className="w-4 h-4" />}
              onClick={() => setSelectedSection('none')}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              icon={<Save className="w-4 h-4" />}
              loading={isSaving}
              disabled={!saveAction}
              onClick={() => saveAction?.()}
            >
              Save
            </Button>
          </div>
        }
      >
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">{renderContent()}</div>
      </Drawer>
    </ConfigProvider>
  )
}
