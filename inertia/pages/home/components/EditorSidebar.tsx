import { X, Settings, Layout, Save } from 'lucide-react'
import { useEditor } from '../hooks/useEditor'
import { HeroForm } from './editor/HeroForm'
import { AboutUsForm } from './editor/AboutUsForm'
import { ServicesForm } from './editor/ServicesForm'
import { ProjectsForm } from './editor/ProjectsForm'
import { TestimonialsForm } from './editor/TestimonialsForm'
import { CTAForm } from './editor/CTAForm'
import { FooterForm } from './editor/FooterForm'
import { Button, Tooltip, ConfigProvider, Drawer } from 'antd'
import { HeroData } from './Hero'

interface EditorSidebarProps {
  heroData?: HeroData
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
            <p className="text-sm font-medium">Selecciona una sección en la página para editarla</p>
          </div>
        )
      default:
        return (
          <div className="p-8 text-center text-gray-400">
            <p>Sección en desarrollo: {selectedSection}</p>
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
          <Tooltip title="Terminar Edición">
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
                    : 'Panel Administrativo'}
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
              Cancelar
            </Button>

            <Button
              type="primary"
              icon={<Save className="w-4 h-4" />}
              loading={isSaving}
              disabled={!saveAction}
              onClick={() => saveAction?.()}
            >
              Guardar
            </Button>
          </div>
        }
      >
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">{renderContent()}</div>
      </Drawer>

      {/* Helper styles for hiding sidebar items that don't fit well */}
      <style>{`
        .admin-editor-container {
          padding: 24px !important;
          min-height: auto !important;
        }
        .admin-editor-container h3 {
          font-size: 16px !important;
        }
        .admin-editor-container .ant-card {
          border-radius: 12px !important;
          box-shadow: none !important;
          border: 1px solid #f0f0f0 !important;
        }
        .admin-editor-container > div:first-child {
          padding: 0 0 16px 0 !important;
        }
        /* Hide complex navigation if sidebar is too small */
        @media (max-width: 400px) {
          .admin-editor-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }

        .editor-collapse .ant-collapse-header {
          padding: 16px 24px !important;
          background: #fcfcfc;
          border-bottom: 1px solid #f0f0f0 !important;
        }
        .editor-collapse .ant-collapse-content-box {
          padding: 24px !important;
        }
        .editor-table .ant-table-thead > tr > th {
          background: #f8fafc !important;
          font-size: 10px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: #64748b !important;
        }
        .editor-upload .ant-upload-select {
          width: 80px !important;
          height: 80px !important;
          border-radius: 12px !important;
          border: 2px dashed #e2e8f0 !important;
          background: #f8fafc !important;
        }
        .editor-upload-small .ant-upload-select,
        .editor-upload-small .ant-upload-list-item-container,
        .editor-upload-small .ant-upload-list-item {
          width: 100% !important;
          height: 300px !important;
          border-radius: 12px !important;
          margin: 0 0 16px 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        .editor-upload-small .ant-upload-select {
          border: 2px dashed #e2e8f0 !important;
          background: #f8fafc !important;
        }
        .editor-upload-small .ant-upload-list-item-info,
        .editor-upload-small .ant-upload-list-item-thumbnail,
        .editor-upload-small .ant-upload-list-item-thumbnail img {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          display: block !important;
          object-fit: cover !important;
          padding: 0 !important;
          inset: 0 !important;
        }
        .editor-upload-small .ant-upload-list-item::before {
          width: 100% !important;
          height: 100% !important;
          left: 0 !important;
          top: 0 !important;
        }
        .editor-upload-small .ant-upload-list-item-actions {
          width: 100% !important;
          height: 100% !important;
          left: 0 !important;
          top: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 12px !important;
          padding: 0 !important;
          background: rgba(0, 0, 0, 0.4) !important;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .editor-upload-small .ant-upload-list-item:hover .ant-upload-list-item-actions {
          opacity: 1 !important;
        }

        .editor-tabs .ant-tabs-nav {
          margin-bottom: 0 !important;
        }
        .editor-tabs .ant-tabs-tab {
          padding: 12px 0 !important;
          margin: 0 !important;
        }
        .editor-tabs .ant-tabs-tab-btn {
          color: #64748b !important;
          transition: all 0.3s !important;
        }
        .editor-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #07427e !important;
        }
        .editor-tabs .ant-tabs-ink-bar {
          background: #07427e !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0 !important;
        }
      `}</style>
    </ConfigProvider>
  )
}
