import { Card, Space, Typography } from 'antd'
import { EditOutlined, PictureOutlined } from '@ant-design/icons'
import { MousePointer2 } from 'lucide-react'

const { Text } = Typography

export const SECTION_NAV = [
  { key: 'content', label: 'Contenido', icon: <EditOutlined /> },
  { key: 'buttons', label: 'Botones y Enlaces', icon: <MousePointer2 size={18} /> },
  { key: 'media', label: 'Imágenes y Assets', icon: <PictureOutlined /> },
]

interface HeroNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function HeroNavigation({ activeTab, setActiveTab }: HeroNavigationProps) {
  return (
    <div style={{ position: 'sticky', top: 24, height: 'fit-content' }}>
      <Card
        bordered={false}
        style={{ borderRadius: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
      >
        <div style={{ marginBottom: 20, padding: '0 12px' }}>
          <Text
            type="secondary"
            strong
            style={{ fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Componentes
          </Text>
        </div>
        <Space direction="vertical" style={{ width: '100%' }} size={4}>
          {SECTION_NAV.map((nav) => (
            <div
              key={nav.key}
              onClick={() => setActiveTab(nav.key)}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s ease',
                background: activeTab === nav.key ? '#07427E' : 'transparent',
                color: activeTab === nav.key ? '#fff' : '#64748b',
                fontWeight: 600,
                boxShadow:
                  activeTab === nav.key ? '0 4px 12px rgba(7, 66, 126, 0.15)' : 'none',
              }}
            >
              {nav.icon}
              {nav.label}
            </div>
          ))}
        </Space>
      </Card>
    </div>
  )
}
