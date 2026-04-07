import { Form, Row, Col, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export function AboutUsMediaTab() {
  const normFile = (e: any) => {
    if (Array.isArray(e)) return e
    return e?.fileList
  }

  return (
    <div style={{ padding: '24px' }}>
      <header style={{ marginBottom: 32 }}>
        <Title level={4}>Gestión de Medios</Title>
        <Text type="secondary">Actualiza las imágenes decorativas y de apoyo</Text>
      </header>

      <Row gutter={48}>
        <Col span={12}>
          <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, height: '100%' }}>
            <Title level={5} style={{ marginBottom: 16 }}>Imagen Principal (Casa)</Title>
            <Form.Item
              name="image1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              tooltip="Imagen grande proyectada a la izquierda"
            >
              <Upload 
                listType="picture-card" 
                maxCount={1} 
                beforeUpload={() => false}
                accept="image/*"
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Subir Imagen</div>
                </div>
              </Upload>
            </Form.Item>
            <Text type="secondary" style={{ fontSize: '12px' }}>Recomendado: 1200x800px (.png o .webp)</Text>
          </div>
        </Col>

        <Col span={12}>
          <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, height: '100%' }}>
            <Title level={5} style={{ marginBottom: 16 }}>Imagen Secundaria (Instalación)</Title>
            <Form.Item
              name="image2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              tooltip="Imagen pequeña flotante a la derecha"
            >
              <Upload 
                listType="picture-card" 
                maxCount={1} 
                beforeUpload={() => false}
                accept="image/*"
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Subir Imagen</div>
                </div>
              </Upload>
            </Form.Item>
            <Text type="secondary" style={{ fontSize: '12px' }}>Recomendado: 800x600px (.png o .webp)</Text>
          </div>
        </Col>
      </Row>
    </div>
  )
}
