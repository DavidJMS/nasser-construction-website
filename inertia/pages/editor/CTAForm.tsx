import { EditOutlined, PictureOutlined } from '@ant-design/icons'
import { Form, Input, Space, Tabs, Typography, Upload } from 'antd'
import { Image, Link, Megaphone, MousePointer2, Sparkles } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toUploadFileList } from '~/utils/upload'
import { sileo } from 'sileo'
import { useEditor } from '~/pages/home/hooks/useEditor'
import { useEffect } from 'react'
import type Cta from '#models/cta'
import { api, queryClient } from '~/utils/client'

const { Text } = Typography

export function CTAForm({ cta }: { cta?: Cta | null }) {
  const [form] = Form.useForm()
  const { setIsEditing, registerSaveAction } = useEditor()
  const imageUrl = Form.useWatch('imageUrl', form)

  const handleSuccess = (result: any, defaultMessage: string) => {
    sileo.success({ title: result?.message || defaultMessage })
    queryClient.invalidateQueries(api.cta.index.queryOptions())
    const data = result?.data
    if (data) {
      form.setFieldsValue({
        ...data,
        imageUrl: toUploadFileList(data.imageUrl),
      })
    }
  }

  const handleError = (error: any, defaultMessage: string) => {
    sileo.error({ title: error?.message || defaultMessage })
  }

  const { mutate: updateCta, isPending: isUpdating } = useMutation(
    api.cta.update.mutationOptions({
      onSuccess: (result) => handleSuccess(result, 'CTA updated successfully'),
      onError: (error) => handleError(error, 'Error updating CTA'),
    })
  )

  const { mutate: storeCta, isPending: isStoring } = useMutation(
    api.cta.store.mutationOptions({
      onSuccess: (result) => handleSuccess(result, 'CTA created successfully'),
      onError: (error) => handleError(error, 'Error creating CTA'),
    })
  )

  const isPending = isUpdating || isStoring

  useEffect(() => {
    registerSaveAction(() => form.submit(), isPending)
    return () => registerSaveAction(null, false)
  }, [form, isPending, registerSaveAction])

  useEffect(() => {
    if (!cta) return
    setIsEditing(true)
    form.setFieldsValue({
      ...cta,
      imageUrl: toUploadFileList((cta as any)?.imageUrl),
    })
  }, [cta, form, setIsEditing])

  const onFinish = (values: any) => {
    const body = {
      ...values,
      imageUrl: values.imageUrl?.[0]?.originFileObj,
      order: values.order ?? 0,
    }

    if (cta?.id) {
      updateCta({
        params: { id: cta.id },
        body,
      })
    } else {
      storeCta({ body })
    }
  }

  const items = [
    {
      key: 'content',
      label: (
        <Space>
          <EditOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Content</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="badge" label="Badge">
            <Input prefix={<Sparkles size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'button',
      label: (
        <Space>
          <MousePointer2 size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Button</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="buttonText" label="Button Text">
            <Input prefix={<Megaphone size={14} className="text-gray-400" />} />
          </Form.Item>
          <Form.Item name="buttonLink" label="Button Link">
            <Input prefix={<Link size={14} className="text-gray-400" />} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'media',
      label: (
        <Space>
          <PictureOutlined className="text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Media</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-6">
          <div className="space-y-2">
            <Form.Item
              name="imageUrl"
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
                {(imageUrl?.length || 0) < 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <Image className="text-gray-400" size={34} />
                    <Text type="secondary" className="mt-2">
                      Background Image
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
