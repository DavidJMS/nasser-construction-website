import { Divider, Flex, Form, Space, Typography, Upload } from 'antd'
import { PictureOutlined, PlusOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface HeroMediaTabProps {
  images: any[]
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

export function HeroMediaTab({ images }: HeroMediaTabProps) {
  return (
    <div style={{ padding: 8 }}>
      <Flex vertical style={{ marginBottom: 32 }} gap={10}>
        <Space align="center" size="small" style={{ marginBottom: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: '#dcfce7',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
            }}
          >
            <PictureOutlined />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Galería de imagenes
          </Title>
        </Space>
        <Text type="secondary">
          Gestiona las 3 imágenes del Hero en orden: <b>Principal</b>,{' '}
          <b>Superpuesta</b> y <b>Decorativa</b>.
        </Text>
      </Flex>

      <div
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 24,
          border: '1px solid #f1f5f9',
          textAlign: 'center',
        }}
      >
        <Form.Item
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload
            listType="picture-card"
            maxCount={3}
            beforeUpload={() => false}
            className={`hero-upload-card ${(images?.length || 0) >= 3 ? 'max-reached' : ''}`}
          >
            {(images?.length || 0) < 3 && (
              <div style={{ padding: 8 }}>
                <PlusOutlined style={{ fontSize: 24, color: '#07427E' }} />
                <div style={{ marginTop: 12, fontWeight: 500, color: '#64748b' }}>
                  Agregar Imagen
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div
          style={{
            marginTop: 24,
            padding: '16px 24px',
            background: '#f8fafc',
            borderRadius: 16,
            display: 'inline-block',
          }}
        >
          <Space size="large">
            <Text type="secondary">
              <span style={{ color: '#07427E', fontWeight: 600 }}>01</span> Principal
            </Text>
            <Divider type="vertical" />
            <Text type="secondary">
              <span style={{ color: '#07427E', fontWeight: 600 }}>02</span>{' '}
              Superpuesta
            </Text>
            <Divider type="vertical" />
            <Text type="secondary">
              <span style={{ color: '#07427E', fontWeight: 600 }}>03</span> Decorativa
            </Text>
          </Space>
        </div>
      </div>
    </div>
  )
}
