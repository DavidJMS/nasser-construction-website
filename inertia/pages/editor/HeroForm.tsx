import { PictureOutlined, EditOutlined } from '@ant-design/icons'
import { Form, Input, Space, Tabs, Typography, Upload } from 'antd'
import { Image, Link, MousePointer2, Sparkles } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toUploadFileList } from '~/utils/upload'
import { sileo } from 'sileo'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { useEffect } from 'react'
import type Hero from '#models/hero'
import { api, queryClient } from '~/utils/client'

const { Text } = Typography

export function HeroForm({ hero }: { hero?: Hero | null }) {
  const [form] = Form.useForm()
  const { setIsEditing, registerSaveAction } = useEditor()
  const image1 = Form.useWatch('image1', form)
  const image2 = Form.useWatch('image2', form)
  const image3 = Form.useWatch('image3', form)

  const { mutate, isPending } = useMutation(
    api.heros.update.mutationOptions({
      onSuccess: (result: any) => {
        sileo.success({ title: result?.message || 'Hero updated successfully' })
        queryClient.invalidateQueries(api.heros.show.queryOptions())
        const updatedHero = result?.data
        if (updatedHero) {
          form.setFieldsValue({
            ...updatedHero,
            image1: toUploadFileList(updatedHero.image1),
            image2: toUploadFileList(updatedHero.image2),
            image3: toUploadFileList(updatedHero.image3),
          })
        }
      },
      onError: (error: any) => {
        sileo.error({ title: error?.message || 'Error al actualizar Hero' })
      },
    })
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [])

  useEffect(() => {
    if (!hero) return
    setIsEditing(true)
    form.setFieldsValue({
      ...hero,
      image1: toUploadFileList((hero as any)?.image1),
      image2: toUploadFileList((hero as any)?.image2),
      image3: toUploadFileList((hero as any)?.image3),
    })
  }, [hero, form, setIsEditing])

  const onFinish = (values: any) => {
    mutate({
      body: {
        ...values,
        image1: values.image1?.[0]?.originFileObj,
        image2: values.image2?.[0]?.originFileObj,
        image3: values.image3?.[0]?.originFileObj,
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
          <Form.Item name="badge" label="Etiqueta Superior">
            <Input prefix={<Sparkles size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="title" label="Título Principal">
            <Input.TextArea rows={3} />
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
        <div className="pt-4 space-y-4 flex flex-col gap-4 ">
          <div>
            <Text strong className="uppercase text-gray-400 mb-3 block">
              Botón Principal
            </Text>
            <Form.Item name="primaryButtonText" label="Texto" className="mb-2">
              <Input prefix={<MousePointer2 size={14} className="text-gray-400" />} />
            </Form.Item>
            <Form.Item name="primaryButtonLink" label="Enlace" className="mb-0">
              <Input prefix={<Link size={14} className="text-gray-400" />} />
            </Form.Item>
          </div>
          <div>
            <Text strong className="uppercase text-gray-400 mb-3 block">
              Botón Secundario
            </Text>
            <Form.Item name="secondaryButtonText" label="Texto" className="mb-2">
              <Input prefix={<MousePointer2 size={14} className="text-gray-400" />} />
            </Form.Item>
            <Form.Item name="secondaryButtonLink" label="Enlace" className="mb-0">
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
          <span className="text-[10px] font-bold uppercase tracking-wider">Multimedia</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-6">
          <div className="space-y-2">
            <Form.Item
              name="image1"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
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
                    <Text type="secondary" className="mt-2">
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
              getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
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
                    <Text type="secondary" className="mt-2">
                      Imagen Superpuesta
                    </Text>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              name="image3"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
              className="mb-0"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                className="editor-upload-small"
              >
                {(image3?.length || 0) < 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <Image className="text-gray-400" size={34} />
                    <Text type="secondary" className="mt-2">
                      Imagen Decorativa
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
      <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
        <div>
          <Tabs defaultActiveKey="content" type="card" size="small" centered items={items} />
        </div>
      </Form>
    </div>
  )
}
