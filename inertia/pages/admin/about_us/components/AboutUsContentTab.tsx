import { Form, Input, Row, Col, Typography, Divider } from 'antd'

const { Title, Text } = Typography

export function AboutUsContentTab() {
  return (
    <div style={{ padding: '24px' }}>
      <header style={{ marginBottom: 32 }}>
        <Title level={4}>Contenido Editorial</Title>
        <Text type="secondary">Gestiona los textos principales de la sección "Nosotros"</Text>
      </header>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Etiqueta Superior"
            name="categoryTag"
            tooltip="Pequeño texto sobre el título"
          >
            <Input placeholder="Ej: Nuestra Historia" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Título: Inicio" name="titleMain">
            <Input placeholder="Excellence in " />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Título: Resaltado" name="titleHighlight">
            <Input placeholder="Door & Window" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Título: Final" name="titleSuffix">
            <Input placeholder=" Installation" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Descripción Principal" name="description">
            <Input.TextArea 
              rows={6} 
              placeholder="Nasser Construction: Efficiency and capability..." 
            />
          </Form.Item>
        </Col>

        <Divider />

        <Col span={12}>
          <Form.Item label="Texto Botón" name="buttonText">
            <Input placeholder="DISCOVER MORE" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Enlace Botón" name="buttonLink">
            <Input placeholder="#contact" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
