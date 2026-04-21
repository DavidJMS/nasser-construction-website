import { useMutation, useQuery } from '@tanstack/react-query'
import { toUploadFileList } from '~/utils/upload'
import { sileo } from 'sileo'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { useEffect } from 'react'
import { Typography, Input, Tabs, Form, Upload, Space, Button } from 'antd'
import { api, queryClient } from '~/utils/client'
import { EditOutlined, PictureOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Hash, Image, Layout, Link, MousePointer2, Plus, Sparkles, Trash2 } from 'lucide-react'

const { Text } = Typography

interface AboutUsFormProps {
  aboutUs: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) return e
  return e?.fileList
}

export function AboutUsForm({ aboutUs: ssrAboutUs }: AboutUsFormProps) {
  const [form] = Form.useForm()
  const { registerSaveAction } = useEditor()
  const image1 = Form.useWatch('image1', form)
  const image2 = Form.useWatch('image2', form)

  const { data: aboutUsData } = useQuery(api.aboutUs.show.queryOptions())
  const aboutUs = aboutUsData?.data ?? ssrAboutUs

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
          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Text strong className="text-[10px] uppercase text-gray-400 tracking-widest">
                    Lista de Características
                  </Text>
                  <Button
                    type="primary"
                    size="small"
                    icon={<Plus size={14} />}
                    onClick={() => add()}
                    className="bg-navy-900 rounded-full text-[10px] font-bold px-4 flex items-center gap-1 h-7"
                  >
                    AÑADIR
                  </Button>
                </div>
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="p-4 bg-gray-50 border border-gray-100 rounded-2xl relative group"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<Trash2 size={14} />}
                        onClick={() => remove(name)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        size="small"
                      />
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        label="Título"
                        rules={[{ required: true, message: 'Título requerido' }]}
                        className="mb-2"
                      >
                        <Input size="small" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        label="Descripción"
                        className="mb-2"
                      >
                        <Input.TextArea rows={2} size="small" />
                      </Form.Item>
                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, 'icon']}
                          label="Icono"
                          className="mb-0"
                        >
                          <Input size="small" placeholder="Ej: Shield, Zap..." />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'order']}
                          label="Orden"
                          className="mb-0"
                        >
                          <Input size="small" prefix={<Hash size={12} />} />
                        </Form.Item>
                      </div>
                      <Form.Item {...restField} name={[name, 'id']} hidden>
                        <Input />
                      </Form.Item>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Form.List>
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
    </div>
  )
}
