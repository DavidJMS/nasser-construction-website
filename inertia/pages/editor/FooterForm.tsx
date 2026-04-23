import { Form, Input, Space, Tabs } from 'antd'
import { EditOutlined, GlobalOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { Globe, Link as LinkIcon } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'

interface FooterFormProps {
  footer?: Record<string, any> | null
}

export function FooterForm({ footer: ssrFooter }: FooterFormProps) {
  const { registerSaveAction } = useEditor()
  const [form] = Form.useForm()

  const { data: footerData } = useQuery(api.footers.show.queryOptions())
  const footer = footerData?.data ?? ssrFooter

  const { mutate, isPending } = useMutation(
    api.footers.update.mutationOptions({
      onSuccess: (result: any) => {
        sileo.success({ title: result?.message || 'Footer updated' })
        queryClient.invalidateQueries(api.footers.show.queryOptions())
        if (result?.data) {
          form.setFieldsValue(result.data)
        }
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating Footer' }),
    })
  )

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  useEffect(() => {
    if (!footer) return
    form.setFieldsValue(footer)
  }, [footer, form])

  const onFinish = (values: any) => {
    mutate({
      body: values,
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
          <Form.Item name="brandTitle" label="Brand (Title)">
            <Input prefix={<Globe size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="brandSubtitle" label="Brand (Subtitle)">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="copyright" label="Copyright">
            <Input />
          </Form.Item>
          <Form.Item name="crafted" label="Secondary Text">
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
          <Form.Item name="socialFacebook" label="Facebook URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="socialX" label="X (Twitter) URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="socialInstagram" label="Instagram URL">
            <Input prefix={<LinkIcon size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="socialLinkedin" label="LinkedIn URL">
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
