import { Form, Input, Space, Tabs, Upload, Typography } from 'antd'
import { EditOutlined, PictureOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { router } from '@inertiajs/react'
import { useEditor } from '../../hooks/useEditor'
import { Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react'

interface CTAFormProps {
  settings?: Record<string, any>
}

export function CTAForm({ settings }: CTAFormProps) {
  const { registerSaveAction } = useEditor()
  const [form] = Form.useForm()
  const [isPending, setIsPending] = useState(false)

  const { Text } = Typography

  const initialValues = useMemo(
    () => ({
      cta_badge: settings?.cta_badge ?? 'Expert Installations',
      cta_title: settings?.cta_title ?? 'Installation experts at your service.',
      cta_description:
        settings?.cta_description ??
        'Get a quote tailored to your needs and secure the investment of a lifetime.',
      cta_button_text: settings?.cta_button_text ?? 'Get a Quote',
      cta_button_link: settings?.cta_button_link ?? '#contact',
      cta_image: settings?.cta_image ?? '/images/cta-doors-fan.png',
      cta_image_upload: settings?.cta_image
        ? [{ uid: '-1', name: 'CTA', status: 'done', url: settings?.cta_image }]
        : [],
    }),
    [settings]
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  const onFinish = (values: any) => {
    setIsPending(true)
    const formData = new FormData()

    formData.append('settings[cta_badge]', values.cta_badge || '')
    formData.append('settings[cta_title]', values.cta_title || '')
    formData.append('settings[cta_description]', values.cta_description || '')
    formData.append('settings[cta_button_text]', values.cta_button_text || '')
    formData.append('settings[cta_button_link]', values.cta_button_link || '')

    // Keep old image string if no new file is uploaded
    if (typeof values.cta_image === 'string') {
      formData.append('settings[cta_image]', values.cta_image)
    }

    const fileList = values.cta_image_upload
    if (fileList && fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('cta_image', fileList[0].originFileObj)
    }

    router.post('/admin/settings/update-all', formData, {
      forceFormData: true,
      onSuccess: () => {
        router.reload({ only: ['settings'] })
      },
      onFinish: () => setIsPending(false),
    })
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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        size="middle"
      >
        <Tabs defaultActiveKey="content" type="card" size="small" centered items={items} />
      </Form>
    </div>
  )
}
