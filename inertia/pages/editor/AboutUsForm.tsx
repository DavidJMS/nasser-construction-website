import { useMutation, useQuery } from '@tanstack/react-query'
import { toUploadFileList } from '~/utils/upload'
import { sileo } from 'sileo'
import { useEditor } from '~/pages/home/hooks/useEditor'
import React, { useEffect, useState } from 'react'
import {
  Typography,
  Input,
  Tabs,
  Form,
  Upload,
  Space,
  Button,
  List,
  Modal,
  Popconfirm,
  InputNumber,
} from 'antd'
import { api, queryClient } from '~/utils/client'
import { EditOutlined, PictureOutlined, UnorderedListOutlined } from '@ant-design/icons'
import {
  Hash,
  Image,
  Layout,
  Link,
  MousePointer2,
  Sparkles,
  Trash2,
  Save,
  Type,
  Layers,
  Edit3,
} from 'lucide-react'
import { icons } from 'lucide-react'
import { IconSelect } from '~/components/IconSelect'
import type AboutUsFeature from '#models/about_us_feature'
import type AboutUs from '#models/about_us'

const { Text } = Typography

const normFile = (e: any) => {
  if (Array.isArray(e)) return e
  return e?.fileList
}

export function AboutUsForm({ aboutUs: ssrAboutUs }: { aboutUs: AboutUs }) {
  const [form] = Form.useForm()
  const [featureForm] = Form.useForm()
  const { registerSaveAction } = useEditor()
  const image1 = Form.useWatch('image1', form)
  const image2 = Form.useWatch('image2', form)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<AboutUsFeature | null>(null)

  const { data: aboutUsData } = useQuery(api.aboutUs.show.queryOptions())
  const aboutUs = aboutUsData?.data ?? ssrAboutUs
  const features = aboutUs?.features || []

  // Feature Mutations
  const storeFeatureMutation = useMutation(
    api.aboutUsFeatures.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Característica añadida' })
        queryClient.invalidateQueries(api.aboutUs.show.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) =>
        sileo.error({ title: err?.message || 'Error al añadir característica' }),
    })
  )

  const updateFeatureMutation = useMutation(
    api.aboutUsFeatures.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Característica actualizada' })
        queryClient.invalidateQueries(api.aboutUs.show.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) =>
        sileo.error({ title: err?.message || 'Error al actualizar característica' }),
    })
  )

  const deleteFeatureMutation = useMutation(
    api.aboutUsFeatures.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Característica eliminada' })
        queryClient.invalidateQueries(api.aboutUs.show.queryOptions())
      },
      onError: (err: any) =>
        sileo.error({ title: err?.message || 'Error al eliminar característica' }),
    })
  )

  const showModal = (feature?: AboutUsFeature) => {
    if (feature) {
      setEditingFeature(feature)
      featureForm.setFieldsValue(feature)
    } else {
      setEditingFeature(null)
      featureForm.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleModalOk = () => {
    featureForm.validateFields().then((values) => {
      if (editingFeature) {
        updateFeatureMutation.mutate({
          params: { id: editingFeature.id },
          body: values,
        })
      } else {
        storeFeatureMutation.mutate({ body: values })
      }
    })
  }

  const handleDeleteFeature = (id: number) => {
    deleteFeatureMutation.mutate({ params: { id } })
  }

  const { mutate, isPending } = useMutation(
    api.aboutUs.update.mutationOptions({
      onSuccess: (result: any) => {
        sileo.success({ title: result?.message || 'About Us actualizado' })
        queryClient.invalidateQueries(api.aboutUs.show.queryOptions())
        const updated = result?.data
        if (updated) {
          form.setFieldsValue({
            ...updated,
            image1: toUploadFileList(updated.image1),
            image2: toUploadFileList(updated.image2),
          })
        }
      },
      onError: (error: any) => {
        sileo.error({ title: error?.message || 'Error al actualizar About Us' })
      },
    })
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  useEffect(() => {
    if (!aboutUs) return
    form.setFieldsValue({
      ...aboutUs,
      image1: toUploadFileList(aboutUs.image1),
      image2: toUploadFileList(aboutUs.image2),
    })
  }, [aboutUs, form])

  const onFinish = (values: any) => {
    mutate({
      body: {
        ...values,
        image1: values.image1?.[0]?.originFileObj,
        image2: values.image2?.[0]?.originFileObj,
      },
    })
  }

  const items = [
    {
      key: 'content',
      label: (
        <Space>
          <EditOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Contenido</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="categoryTag" label="Etiqueta Superior">
            <Input prefix={<Sparkles size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="titleMain" label="Título Principal">
            <Input
              prefix={<Layout size={14} className="text-gray-400" />}
              placeholder="Ej: Especialistas en"
            />
          </Form.Item>
          <Form.Item name="titleHighlight" label="Texto Resaltado">
            <Input
              prefix={<Layout size={14} className="text-gray-400" />}
              placeholder="Ej: Puertas de Seguridad"
            />
          </Form.Item>
          <Form.Item name="titleSuffix" label="Texto Final">
            <Input
              prefix={<Layout size={14} className="text-gray-400" />}
              placeholder="Ej: para tu hogar"
            />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'features',
      label: (
        <Space>
          <UnorderedListOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Características</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text className="uppercase" type="secondary">
              Gestionar Características
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Añadir
            </Button>
          </div>

          <List
            dataSource={features}
            rowKey="id"
            renderItem={(feature: AboutUsFeature) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(feature)}
                  />,
                  <Popconfirm
                    title="¿Deseas eliminar esta característica?"
                    onConfirm={() => handleDeleteFeature(feature.id)}
                    okText="Eliminar"
                    cancelText="Cancelar"
                    okButtonProps={{ danger: true }}
                  >
                    <Button size="small" type="text" danger icon={<Trash2 size={14} />} />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-all">
                      {feature.icon && (icons as any)[feature.icon] ? (
                        React.createElement((icons as any)[feature.icon], { size: 20 })
                      ) : (
                        <Layers size={20} />
                      )}
                    </div>
                  }
                  title={feature.title}
                  description={feature.description}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: 'buttons',
      label: (
        <Space>
          <MousePointer2 size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Botones</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4 flex flex-col gap-4">
          <div>
            <Text strong className="uppercase text-gray-400 mb-3 block">
              Botón de Acción
            </Text>
            <Form.Item name="buttonText" label="Texto" className="mb-2">
              <Input prefix={<MousePointer2 size={14} className="text-gray-400" />} />
            </Form.Item>
            <Form.Item name="buttonLink" label="Enlace" className="mb-0">
              <Input prefix={<Link size={14} className="text-gray-400" />} />
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      key: 'media',
      label: (
        <Space>
          <PictureOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Imágenes</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-6">
          <div className="space-y-2">
            <Form.Item
              name="image1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="mb-0"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                className="editor-upload-small"
              >
                {(image1?.length || 0) < 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <Image className="text-gray-400" size={34} />
                    <Text type="secondary" className="mt-2 text-xs">
                      Imagen Principal
                    </Text>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              name="image2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="mb-0"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                className="editor-upload-small"
              >
                {(image2?.length || 0) < 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <Image className="text-gray-400" size={34} />
                    <Text type="secondary" className="mt-2 text-xs">
                      Imagen Secundaria
                    </Text>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-0">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="h-full">
          <Tabs defaultActiveKey="content" type="card" size="small" centered items={items} />
        </div>
      </Form>

      <Modal
        title={
          <Space className="pt-2">
            <Edit3 size={16} className="text-navy-900" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {editingFeature ? 'Editar Característica' : 'Nueva Característica'}
            </span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden
        centered
        width={400}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} className="rounded-xl">
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalOk}
            className="bg-navy-900 rounded-xl"
            icon={<Save size={14} />}
          >
            {editingFeature ? 'Actualizar' : 'Crear'}
          </Button>,
        ]}
      >
        <Form form={featureForm} layout="vertical" className="mt-6">
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'El título es obligatorio' }]}
          >
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ej: Compromiso de Calidad"
            />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea rows={4} placeholder="Describe el punto clave..." />
          </Form.Item>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item className="col-span-2" name="icon" label="Icono">
              <IconSelect placeholder="Ej: Shield" />
            </Form.Item>
            <Form.Item name="order" label="Prioridad">
              <InputNumber
                prefix={<Hash size={14} className="text-gray-400" />}
                min={0}
                style={{ width: '100%' }}
                placeholder="0"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
