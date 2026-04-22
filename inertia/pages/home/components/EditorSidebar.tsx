import { X, Settings, Layout, Save } from 'lucide-react'
import { useEditor } from '../hooks/useEditor'
import { HeroForm } from '../../editor/HeroForm'
import { AboutUsForm } from '../../editor/AboutUsForm'
import { ServicesForm } from '../../editor/ServicesForm'
import { ProjectsForm } from '../../editor/ProjectsForm'
import { TestimonialsForm } from '../../editor/TestimonialsForm'
import { CTAForm } from '../../editor/CTAForm'
import { FooterForm } from '../../editor/FooterForm'
import { Button, Tooltip, ConfigProvider, Drawer } from 'antd'
import type Hero from '#models/hero'

interface EditorSidebarProps {
  heroData?: Hero
  aboutUsData?: any
  services?: any
  projects?: any
  testimonials?: any
  settings?: Record<string, any>
}

export function EditorSidebar({
  heroData,
  aboutUsData,
  services,
  projects,
  testimonials,
  settings,
}: EditorSidebarProps) {
  const { isEditing, setIsEditing, selectedSection, setSelectedSection, saveAction, isSaving } =
    useEditor()

  if (!isEditing) return null

  const renderContent = () => {
    switch (selectedSection) {
      case 'hero':
        return <HeroForm hero={heroData as any} />
      case 'about_us':
        return <AboutUsForm aboutUs={aboutUsData} />
      case 'services':
        return <ServicesForm services={services} />
      case 'projects':
        return <ProjectsForm projects={projects} />
      case 'testimonials':
        return <TestimonialsForm testimonials={testimonials} />
      case 'cta':
        return <CTAForm settings={settings} />
      case 'footer':
        return <FooterForm settings={settings} />
      case 'none':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
            <Layout className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">Select a section to edit</p>
          </div>
        )
      default:
        return (
          <div className="p-8 text-center text-gray-400">
            <p>Section in development: {selectedSection}</p>
          </div>
        )
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
                  {selectedSection !== 'none'
                    ? `Editando: ${selectedSection}`
                    : 'Admin Panel'}
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
