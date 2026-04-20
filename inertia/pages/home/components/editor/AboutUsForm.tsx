import { PictureOutlined, EditOutlined } from '@ant-design/icons'
import { useAboutUsForm } from '../../hooks/useAboutUsForm'
import { Sparkles, Layout, MousePointer2, Link, Image } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import { useEffect } from 'react'
import { Typography, Input, Tabs, Form, Upload, Space } from 'antd'

const { Text } = Typography

interface AboutUsFormProps {
  aboutUs: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) return e
  return e?.fileList
}

export function AboutUsForm({ aboutUs }: AboutUsFormProps) {
  const { form, initialValues, onFinish, isPending } = useAboutUsForm(aboutUs)
  const { registerSaveAction } = useEditor()
  const image1 = Form.useWatch('image1', form)
  const image2 = Form.useWatch('image2', form)

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [isPending, form, registerSaveAction])

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
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <div className="h-full">
          <Tabs defaultActiveKey="content" type="card" size="small" centered items={items} />
        </div>
      </Form>
    </div>
  )
}
