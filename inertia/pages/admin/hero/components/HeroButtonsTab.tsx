import { Col, Flex, Form, Input, Row, Space, Typography } from 'antd'
import { EditOutlined, LinkOutlined } from '@ant-design/icons'
import { MousePointer2 } from 'lucide-react'

const { Title, Text } = Typography

export function HeroButtonsTab() {
  return (
    <div style={{ padding: 8 }}>
      <Flex vertical style={{ marginBottom: 32 }} gap={10}>
        <Space align="center" size="small" style={{ marginBottom: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: '#fef3c7',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d97706',
            }}
          >
            <MousePointer2 size={18} />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Botones
          </Title>
        </Space>
        <Text type="secondary">
          Configura los botones de acción principal del Hero.
        </Text>
      </Flex>

      <Row gutter={24}>
        <Col span={12}>
          <div
            style={{
              background: '#f8fafc',
              padding: 24,
              borderRadius: 20,
              border: '1px solid #f1f5f9',
            }}
          >
            <Text
              strong
              style={{
                display: 'block',
                marginBottom: 20,
                fontSize: 13,
                textTransform: 'uppercase',
                color: '#64748b',
              }}
            >
              Botón Principal
            </Text>
            <Form.Item name="primaryButtonText" label="Texto a mostrar">
              <Input prefix={<EditOutlined />} />
            </Form.Item>
            <Form.Item name="primaryButtonLink" label="Acción de enlace">
              <Input prefix={<LinkOutlined />} />
            </Form.Item>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: '#f8fafc',
              padding: 24,
              borderRadius: 20,
              border: '1px solid #f1f5f9',
            }}
          >
            <Text
              strong
              style={{
                display: 'block',
                marginBottom: 20,
                fontSize: 13,
                textTransform: 'uppercase',
                color: '#64748b',
              }}
            >
              Botón Secundario
            </Text>
            <Form.Item name="secondaryButtonText" label="Texto a mostrar">
              <Input prefix={<EditOutlined />} />
            </Form.Item>
            <Form.Item name="secondaryButtonLink" label="Acción de enlace">
              <Input prefix={<LinkOutlined />} />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  )
}
