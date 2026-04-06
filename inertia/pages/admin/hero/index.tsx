import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Upload,
  Flex,
} from 'antd'
import {
  SaveOutlined,
  PictureOutlined,
  LinkOutlined,
  EditOutlined,
  GlobalOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { MousePointer2, Sparkles } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/utils/client'
import { sileo } from 'sileo'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'

const { Title, Text } = Typography

interface Hero {
  id: number
  badge: string | null
  title: string | null
  description: string | null
  primaryButtonText: string | null
  primaryButtonLink: string | null
  secondaryButtonText: string | null
  secondaryButtonLink: string | null
  statsText: string | null
  image1: string | null
  image2: string | null
  image3: string | null
}

interface Props {
  hero: Hero
}

const SECTION_NAV = [
  { key: 'content', label: 'Contenido', icon: <EditOutlined /> },
  { key: 'buttons', label: 'Botones y Enlaces', icon: <MousePointer2 size={18} /> },
  { key: 'media', label: 'Imágenes y Assets', icon: <PictureOutlined /> },
]

export default function HeroAdminIndex({ hero }: Props) {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState('content')

  // Watch file lists to hide upload button when full
  const images = Form.useWatch('images', form)

  const initialValues = useMemo(
    () => ({
      ...hero,
      images: [
        ...(hero.image1
          ? [{ uid: '-1', name: '01. Principal', status: 'done', url: hero.image1 }]
          : []),
        ...(hero.image2
          ? [{ uid: '-2', name: '02. Superpuesta', status: 'done', url: hero.image2 }]
          : []),
        ...(hero.image3
          ? [{ uid: '-3', name: '03. Flotante', status: 'done', url: hero.image3 }]
          : []),
      ],
    }),
    [hero]
  )

  const { mutate: updateHero, isPending } = useMutation(
    api.adminHero.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Sección Hero actualizada con éxito' })
      },
      onError: (error: any) => {
        sileo.error({
          title: 'Error de Guardado',
          description:
            error.response?.data?.message || 'Error técnico al procesar la actualización',
        })
      },
    })
  )

  const onFinish = (values: any) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(values).forEach((key) => {
      if (key === 'images') {
        const fileList = values[key] || []
        // Map by index: 0 -> image1, 1 -> image2, 2 -> image3
        if (fileList[0]) formData.append('image1', fileList[0].originFileObj || fileList[0].url)
        if (fileList[1]) formData.append('image2', fileList[1].originFileObj || fileList[1].url)
        if (fileList[2]) formData.append('image3', fileList[2].originFileObj || fileList[2].url)
      } else if (
        !['image1', 'image2', 'image3'].includes(key) &&
        values[key] !== null &&
        values[key] !== undefined
      ) {
        formData.append(key, values[key])
      }
    })

    updateHero({
      body: formData,
    } as any)
  }

  const customStyles = `
    .hero-upload-card .ant-upload-select {
      width: calc((100% - 32px) / 3) !important;
      height: 200px !important;
      border-radius: 16px !important;
      background: #f8fafc !important;
      border: 2px dashed #e2e8f0 !important;
      transition: border-color 0.2s, background-color 0.2s !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .hero-upload-card .ant-upload-select:hover {
      border-color: #07427E !important;
      background: #f1f5f9 !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-container {
      width: calc((100% - 32px) / 3) !important;
      height: 200px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 16px !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item {
      width: 100% !important;
      height: 100% !important;
      border-radius: 16px !important;
      padding: 0 !important;
      border: none !important;
      background: #fff;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-info {
      border-radius: 16px !important;
      height: 100% !important;
      width: 100% !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-thumbnail {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-thumbnail img {
      object-fit: cover !important;
      height: 100% !important;
      width: 100% !important;
      display: block !important;
    }
    /* Hide the select box if max items reached to avoid empty dashed boxes */
    .hero-upload-card.max-reached .ant-upload-select {
      display: none !important;
    }
  `

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  }

  return (
    <div
      className="admin-editor-container"
      style={{ minHeight: 'calc(100vh - 120px)', background: '#f8fafc', padding: '0 24px 40px' }}
    >
      <style>{customStyles}</style>

      {/* Header Premium */}
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

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        size="large"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          {/* Navigation Sidebar-like Card */}
          <div style={{ position: 'sticky', top: 24, height: 'fit-content' }}>
            <Card
              bordered={false}
              style={{ borderRadius: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            >
              <div style={{ marginBottom: 20, padding: '0 12px' }}>
                <Text
                  type="secondary"
                  strong
                  style={{ fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  Componentes
                </Text>
              </div>
              <Space direction="vertical" style={{ width: '100%' }} size={4}>
                {SECTION_NAV.map((nav) => (
                  <div
                    key={nav.key}
                    onClick={() => setActiveTab(nav.key)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'all 0.2s ease',
                      background: activeTab === nav.key ? '#07427E' : 'transparent',
                      color: activeTab === nav.key ? '#fff' : '#64748b',
                      fontWeight: 600,
                      boxShadow:
                        activeTab === nav.key ? '0 4px 12px rgba(7, 66, 126, 0.15)' : 'none',
                    }}
                  >
                    {nav.icon}
                    {nav.label}
                  </div>
                ))}
              </Space>
            </Card>
          </div>

          {/* Main Editor Card */}
          <Card
            bordered={false}
            style={{
              borderRadius: 24,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
              minHeight: 600,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)',
              width: '100%',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeTab} {...fadeIn}>
                {activeTab === 'content' && (
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
                )}

                {activeTab === 'buttons' && (
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
                )}

                {activeTab === 'media' && (
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
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Form>
    </div>
  )
}
