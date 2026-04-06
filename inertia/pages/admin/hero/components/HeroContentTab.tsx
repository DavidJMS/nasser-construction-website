import { Divider, Flex, Form, Input, Space, Typography } from 'antd'
import { EditOutlined, GlobalOutlined } from '@ant-design/icons'
import { Sparkles } from 'lucide-react'

const { Title, Text } = Typography

export function HeroContentTab() {
  return (
    <div style={{ padding: 8 }}>
      <Flex vertical style={{ marginBottom: 32 }} gap={10}>
        <Space align="center" size="small" style={{ marginBottom: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: '#e0f2fe',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0ea5e9',
            }}
          >
            <EditOutlined />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Contenido Principal
          </Title>
        </Space>
        <Text type="secondary">
          Actualiza los textos principales que verán tus usuarios al entrar.
        </Text>
      </Flex>

      <Form.Item name="badge" label="Badge / Etiqueta Superior">
        <Input prefix={<Sparkles size={16} />} placeholder="Ej: Premium Security" />
      </Form.Item>

      <Form.Item name="title" label="Título Principal (H1)">
        <Input.TextArea rows={3} placeholder="Escribe un título impactante..." />
      </Form.Item>

      <Form.Item name="description" label="Descripción / Subtítulo">
        <Input.TextArea rows={4} placeholder="Describe brevemente tu valor..." />
      </Form.Item>

      <Divider style={{ margin: '32px 0' }} />

      <div style={{ marginBottom: 20 }}>
        <Text
          strong
          style={{ color: '#64748b', fontSize: 13, textTransform: 'uppercase' }}
        >
          Estadísticas Rápidas
        </Text>
      </div>
      <Form.Item name="statsText" label="Texto de Prueba Social">
        <Input prefix={<GlobalOutlined />} placeholder="Ej: 500+ Clientes Felices" />
      </Form.Item>
    </div>
  )
}
