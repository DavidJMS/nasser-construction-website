import { Form, Input, Space, Tabs, Upload, Typography } from 'antd'
import { EditOutlined, PictureOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import { toUploadFileList } from '~/utils/upload'

interface CTAFormProps {
  settings?: Record<string, any>
}

export function CTAForm({ settings: ssrSettings }: CTAFormProps) {
  const { registerSaveAction } = useEditor()
  const [form] = Form.useForm()

  const { data: settingsData } = useQuery(api.settings.index.queryOptions())
  const settings = settingsData?.data ?? ssrSettings

  const { mutate, isPending } = useMutation(
    api.settings.update.mutationOptions({
      onSuccess: (result: any) => {
        sileo.success({ title: result?.message || 'CTA actualizado' })
        queryClient.invalidateQueries(api.settings.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error al actualizar CTA' }),
    })
  )

  const { Text } = Typography

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  useEffect(() => {
    if (!settings) return
    form.setFieldsValue({
      cta_badge: settings?.cta_badge,
      cta_title: settings?.cta_title,
      cta_description: settings?.cta_description,
      cta_button_text: settings?.cta_button_text,
      cta_button_link: settings?.cta_button_link,
      cta_image: settings?.cta_image,
      cta_image_upload: toUploadFileList(settings?.cta_image),
    })
  }, [settings, form])

  const onFinish = (values: any) => {
    const body: any = {
      settings: {
        cta_badge: values.cta_badge || '',
        cta_title: values.cta_title || '',
        cta_description: values.cta_description || '',
        cta_button_text: values.cta_button_text || '',
        cta_button_link: values.cta_button_link || '',
      },
    }

    if (values.cta_image_upload?.[0]?.originFileObj) {
      body.cta_image = values.cta_image_upload[0].originFileObj
    } else if (values.cta_image) {
      body.settings.cta_image = values.cta_image
    }

    mutate({ body })
  }

  const fileList = Form.useWatch('cta_image_upload', form) || []

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
          <Form.Item name="cta_badge" label="Badge">
            <Input prefix={<Sparkles size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="cta_title" label="Título">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="cta_description" label="Descripción">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="cta_button_text" label="Texto del Botón">
            <Input />
          </Form.Item>
          <Form.Item name="cta_button_link" label="Enlace del Botón">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'media',
      label: (
        <Space>
          <PictureOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Imagen</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="cta_image" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="cta_image_upload"
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
              {fileList.length < 1 && (
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="text-gray-400" size={34} />
                  <Text type="secondary" className="mt-2 text-xs">
                    Subir Imagen
                  </Text>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className="pt-1">
            <Text type="secondary" className="text-[11px]">
              Se guarda como URL en configuración. Formatos: jpg/png/webp/gif.
            </Text>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-0">
      <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
        <Tabs defaultActiveKey="content" type="card" size="small" centered items={items} />
      </Form>
    </div>
  )
}
