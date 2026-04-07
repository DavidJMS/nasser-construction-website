import { Form, Input, Row, Col, Typography, InputNumber } from 'antd'

const { Title, Text } = Typography

export function AboutUsFeaturesTab() {
  return (
    <div style={{ padding: '24px' }}>
      <header style={{ marginBottom: 32 }}>
        <Title level={4}>Características (Features)</Title>
        <Text type="secondary">Personaliza las 4 tarjetas de valor en la parte inferior</Text>
      </header>

      <Form.List name="features">
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{ marginBottom: 40, background: '#f8fafc', padding: 24, borderRadius: 16 }}
              >
                <Row gutter={24}>
                  <Col span={4}>
                    <Form.Item {...restField} label="Orden" name={[name, 'order']}>
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item
                      {...restField}
                      label="Título de la Característica"
                      name={[name, 'title']}
                      rules={[{ required: true, message: 'Ingrese un título' }]}
                    >
                      <Input placeholder="Ej: Experiencia" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      label="Descripción Corta"
                      name={[name, 'description']}
                    >
                      <Input placeholder="Ej: +20 Años en la industria" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      label="Icono (Lucide)"
                      name={[name, 'icon']}
                      tooltip="Ingrese el nombre del icono de Lucide (Award, ShieldCheck, Hammer, Users, etc.)"
                    >
                      <Input placeholder="Award" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </div>
  )
}
