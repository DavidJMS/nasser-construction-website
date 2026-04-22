import { Form, Input, Space, Tabs } from 'antd'
import { EditOutlined, GlobalOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { Globe, Link as LinkIcon } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'

interface FooterFormProps {
  settings?: Record<string, any>
}

export function FooterForm({ settings: ssrSettings }: FooterFormProps) {
  const { registerSaveAction } = useEditor()
  const [form] = Form.useForm()

  const { data: settingsData } = useQuery(api.settings.index.queryOptions())
  const settings = settingsData?.data ?? ssrSettings

  const { mutate, isPending } = useMutation(
    api.settings.update.mutationOptions({
      onSuccess: (result: any) => {
        sileo.success({ title: result?.message || 'Footer updated' })
        queryClient.invalidateQueries(api.settings.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating Footer' }),
    })
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  useEffect(() => {
    if (!settings) return
    form.setFieldsValue({
      footer_brand_title: settings?.footer_brand_title,
      footer_brand_subtitle: settings?.footer_brand_subtitle,
      footer_description: settings?.footer_description,
      footer_copyright: settings?.footer_copyright,
      footer_crafted: settings?.footer_crafted,
      footer_social_facebook: settings?.footer_social_facebook,
      footer_social_x: settings?.footer_social_x,
      footer_social_instagram: settings?.footer_social_instagram,
      footer_social_linkedin: settings?.footer_social_linkedin,
    })
  }, [settings, form])

  const onFinish = (values: any) => {
    mutate({
      body: { settings: values },
    })
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
          <Form.Item name="footer_brand_title" label="Brand (Title)">
            <Input prefix={<Globe size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="footer_brand_subtitle" label="Brand (Subtitle)">
            <Input />
          </Form.Item>
          <Form.Item name="footer_description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="footer_copyright" label="Copyright">
            <Input />
          </Form.Item>
          <Form.Item name="footer_crafted" label="Secondary Text">
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
      <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
        <Tabs defaultActiveKey="general" type="card" size="small" centered items={items} />
      </Form>
    </div>
  )
}
