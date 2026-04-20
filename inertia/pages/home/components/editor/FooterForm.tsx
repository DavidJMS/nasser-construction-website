import { Form, Input, Space, Tabs } from 'antd'
import { EditOutlined, GlobalOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { router } from '@inertiajs/react'
import { useEditor } from '../../hooks/useEditor'
import { Globe, Link as LinkIcon } from 'lucide-react'

interface FooterFormProps {
  settings?: Record<string, any>
}

export function FooterForm({ settings }: FooterFormProps) {
  const { registerSaveAction } = useEditor()
  const [form] = Form.useForm()
  const [isPending, setIsPending] = useState(false)

  const initialValues = useMemo(
    () => ({
      footer_brand_title: settings?.footer_brand_title ?? 'NASSER',
      footer_brand_subtitle: settings?.footer_brand_subtitle ?? 'Doors & Windows',
      footer_description:
        settings?.footer_description ??
        'Premium custom-made doors and windows with professional installation.',
      footer_copyright:
        settings?.footer_copyright ?? '© 2026 Nasser Doors & Windows. All rights reserved.',
      footer_crafted: settings?.footer_crafted ?? 'Crafted with {heart} in Orlando',
      footer_social_facebook: settings?.footer_social_facebook ?? '#',
      footer_social_x: settings?.footer_social_x ?? '#',
      footer_social_instagram: settings?.footer_social_instagram ?? '#',
      footer_social_linkedin: settings?.footer_social_linkedin ?? '#',
    }),
    [settings]
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  const onFinish = (values: any) => {
    setIsPending(true)
    router.post(
      '/admin/settings/update-all',
      { settings: values },
      {
        onFinish: () => setIsPending(false),
      }
    )
  }

  const items = [
    {
      key: 'general',
      label: (
        <Space>
          <EditOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">General</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="footer_brand_title" label="Marca (Título)">
            <Input prefix={<Globe size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="footer_brand_subtitle" label="Marca (Subtítulo)">
            <Input />
          </Form.Item>
          <Form.Item name="footer_description" label="Descripción">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="footer_copyright" label="Copyright">
            <Input />
          </Form.Item>
          <Form.Item name="footer_crafted" label="Texto secundario">
            <Input />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'social',
      label: (
        <Space>
          <GlobalOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Social</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="footer_social_facebook" label="Facebook URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="footer_social_x" label="X (Twitter) URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="footer_social_instagram" label="Instagram URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="footer_social_linkedin" label="LinkedIn URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
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
        <Tabs defaultActiveKey="general" type="card" size="small" centered items={items} />
      </Form>
    </div>
  )
}
