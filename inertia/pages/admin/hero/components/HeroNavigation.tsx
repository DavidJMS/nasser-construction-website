import { Menu } from 'antd'
import { EditOutlined, PictureOutlined } from '@ant-design/icons'
import { MousePointer2 } from 'lucide-react'

interface HeroNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function HeroNavigation({ activeTab, setActiveTab }: HeroNavigationProps) {
  return (
    <div
      style={{
        background: 'white',
        padding: '16px',
        borderRadius: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        alignSelf: 'start',
      }}
    >
      <Menu
        mode="vertical"
        selectedKeys={[activeTab]}
        onClick={({ key }) => setActiveTab(key)}
        style={{ border: 'none', background: 'transparent' }}
        items={[
          { key: 'content', label: 'Contenido', icon: <EditOutlined /> },
          { key: 'buttons', label: 'Botones y Enlaces', icon: <MousePointer2 size={18} /> },
          { key: 'media', label: 'Imágenes y Assets', icon: <PictureOutlined /> },
        ]}
      />
    </div>
  )
}
