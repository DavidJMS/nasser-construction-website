import { Button, Space, Typography } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export function AboutUsHeader({ form, isPending }: { form: any; isPending: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
      }}
    >
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Configuración About Us
        </Title>
        <Text type="secondary">Personaliza la sección de historia y características</Text>
      </div>
      <Space size="middle">
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={isPending}
          onClick={() => form.submit()}
        >
          Guardar Cambios
        </Button>
      </Space>
    </div>
  )
}
