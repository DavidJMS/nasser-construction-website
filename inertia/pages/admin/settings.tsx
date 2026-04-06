import {
  Typography,
  Button,
  Space,
  Form,
  Input,
  Breadcrumb,
  Card,
  Divider,
  Switch,
  message
} from 'antd'
import { SaveOutlined, GlobalOutlined, InfoCircleOutlined, LayoutOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title, Text } = Typography

interface Setting {
  id: number
  key: string
  value: string
  group: string
}

interface Props {
  settings: Setting[]
}

export default function Settings({ settings }: Props) {
  const [form] = Form.useForm()

  // Agrupar configuraciones por su campo 'group'
  const initialValues = settings.reduce((acc, current) => {
    acc[current.key] = current.value
    return acc
  }, {} as any)

  const onFinish = (values: any) => {
    // En una implementación real, enviaríamos cada cambio o un batch
    // Para simplificar, asumiremos que el backend maneja el mapeo de keys
    router.post('/admin/settings/update-all', { settings: values }, {
        onSuccess: () => message.success('Configuración guardada correctamente')
    })
  }

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Configuración</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Ajustes del Sitio</Title>
        <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
          Guardar Cambios
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Card title={<span><GlobalOutlined /> General</span>} bordered={false} style={{ marginBottom: 24 }}>
          <Form.Item name="site_name" label="Nombre del Sitio">
            <Input placeholder="Ej: Nasser Construction" />
          </Form.Item>
          <Form.Item name="contact_email" label="Email de Contacto">
            <Input placeholder="contacto@nasser.com" />
          </Form.Item>
          <Form.Item name="contact_phone" label="Teléfono de Contacto">
            <Input placeholder="+1 234 567 890" />
          </Form.Item>
        </Card>

        <Card title={<span><LayoutOutlined /> Sección Hero</span>} bordered={false} style={{ marginBottom: 24 }}>
          <Form.Item name="hero_title" label="Título Principal">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="hero_subtitle" label="Subtítulo">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Card>

        <Card title={<span><InfoCircleOutlined /> Sobre Nosotros</span>} bordered={false}>
          <Form.Item name="about_text" label="Texto Principal">
            <Input.TextArea rows={6} />
          </Form.Item>
          <Divider />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>Habilitar sección de contacto en el pie de página</Text>
            <Form.Item name="enable_footer_contact" valuePropName="checked" noStyle>
               <Switch />
            </Form.Item>
          </Space>
        </Card>
      </Form>
    </div>
  )
}
