import { Breadcrumb, Button, Space, Typography } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { FormInstance } from 'antd/es/form'

const { Title } = Typography

interface HeroHeaderProps {
  form: FormInstance
  isPending: boolean
}

export function HeroHeader({ form, isPending }: HeroHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        marginBottom: 32,
      }}
    >
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Breadcrumb
          items={[
            { title: <a href="/admin">Dashboard</a> },
            { title: <a href="/admin/hero">Landing Page</a> },
            { title: 'Editor Hero' },
          ]}
        />
        <Title level={2} style={{ margin: '8px 0 0', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Sección Hero
        </Title>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
        <Space size="middle">
          <Button
            size="large"
            onClick={() => form.submit()}
            loading={isPending}
            icon={<SaveOutlined />}
            style={{
              borderRadius: 12,
              backgroundColor: '#07427E',
              borderColor: '#07427E',
              color: '#fff',
              height: 52,
              padding: '0 32px',
              fontWeight: 600,
              boxShadow: '0 10px 15px -3px rgba(7, 66, 126, 0.25)',
            }}
          >
            Publicar Cambios
          </Button>
        </Space>
      </motion.div>
    </div>
  )
}
