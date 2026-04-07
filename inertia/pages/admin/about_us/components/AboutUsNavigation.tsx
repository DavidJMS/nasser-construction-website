import { Menu } from 'antd'
import { FileTextOutlined, PictureOutlined, AppstoreOutlined } from '@ant-design/icons'

export function AboutUsNavigation({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
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
          { key: 'content', icon: <FileTextOutlined />, label: 'Contenido Editorial' },
          { key: 'features', icon: <AppstoreOutlined />, label: 'Características' },
          { key: 'media', icon: <PictureOutlined />, label: 'Multimedia' },
        ]}
      />
    </div>
  )
}
