import {
  Typography,
  List,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Tabs,
  Upload,
  Avatar,
  InputNumber,
} from 'antd'
import { Edit3, Trash2, Save, Type, Link as LinkIcon, Image as ImageIcon, Megaphone } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import type Cta from '#models/cta'
import { toUploadFileList } from '~/utils/upload'

const { Text } = Typography

export function CTAForm({ ctas: ssrCtas }: { ctas?: Cta[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCta, setEditingCta] = useState<Cta | null>(null)
  const [form] = Form.useForm()

  const { data: ctasData } = useQuery(api.cta.index.queryOptions())
  const ctas = ctasData?.data ?? ssrCtas ?? []

  const storeMutation = useMutation(
    api.cta.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'CTA created' })
        queryClient.invalidateQueries(api.cta.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error creating CTA' }),
    })
  )

  const updateMutation = useMutation(
    api.cta.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'CTA updated' })
        queryClient.invalidateQueries(api.cta.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating CTA' }),
    })
  )

  const deleteMutation = useMutation(
    api.cta.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'CTA deleted' })
        queryClient.invalidateQueries(api.cta.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error deleting CTA' }),
    })
  )

  const showModal = (cta?: Cta) => {
    if (cta) {
      setEditingCta(cta)
      form.setFieldsValue({
        ...cta,
        image_url: toUploadFileList(cta.imageUrl),
      })
    } else {
      setEditingCta(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const body: any = {
        badge: values.badge || '',
        title: values.title || '',
        description: values.description || '',
        buttonText: values.buttonText || '',
        buttonLink: values.buttonLink || '',
      }

      if (values.image_url?.[0]?.originFileObj) {
        body.image_url = values.image_url[0].originFileObj
      } else {
        delete body.image_url
      }

      if (values.order !== undefined) {
        body.order = values.order
      }

      if (editingCta) {
        updateMutation.mutate({
          params: { id: editingCta.id },
          body,
        })
      } else {
        storeMutation.mutate({ body })
      }
    })
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ params: { id } })
  }

  const fileList = Form.useWatch('image_url', form) || []

  const modalItems = [
    {
      key: 'info',
      label: (
        <Space>
          <Edit3 size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Information</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item name="badge" label="Badge">
            <Input
              prefix={<Megaphone size={14} className="text-gray-400" />}
              placeholder="Ex: Get Started"
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input.TextArea rows={2} placeholder="Ex: Ready to start your project?" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Tell visitors what to do next..." />
          </Form.Item>
          <Form.Item name="buttonText" label="Button Text">
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ex: Contact Us"
            />
          </Form.Item>
          <Form.Item name="buttonLink" label="Button Link">
            <Input
              prefix={<LinkIcon size={14} className="text-gray-400" />}
              placeholder="Ex: /contact"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'media',
      label: (
        <Space>
          <ImageIcon size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Media</span>
        </Space>
      ),
      children: (
        <div>
          <Form.Item
            name="image_url"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
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
                  <Text type="secondary" className="mt-2">
                    Background Image
                  </Text>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className="mt-4">
            <Form.Item name="order" label="Priority">
              <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
            </Form.Item>
          </div>
        </div>
      ),
    },
  ]

  const items = [
    {
      key: 'list',
      label: (
        <Space>
          <Megaphone size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">CTAs</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text type="secondary" className="uppercase">
              Call to Actions
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Add
            </Button>
          </div>

          <List
            dataSource={ctas}
            rowKey="id"
            renderItem={(cta) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(cta)}
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete this CTA?"
                    onConfirm={() => handleDelete(cta.id)}
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                  >
                    <Button size="small" type="text" danger icon={<Trash2 size={14} />} />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size="large"
                      src={cta.imageUrl}
                      icon={<Megaphone size={16} />}
                      className="rounded-lg bg-gray-200 border border-gray-100"
                    />
                  }
                  title={<Text className="text-xs font-bold">{cta.title || 'Untitled CTA'}</Text>}
                  description={
                    <Text type="secondary" className="text-[10px]">
                      {cta.buttonText || 'No button'} {cta.badge && `• ${cta.badge}`}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="p-0">
      <Tabs defaultActiveKey="list" type="card" size="small" centered items={items} />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden
        centered
        width={420}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} className="rounded-xl">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="bg-navy-900 rounded-xl"
            icon={<Save size={14} />}
          >
            {editingCta ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-2">
          <Tabs defaultActiveKey="info" size="small" items={modalItems} />
        </Form>
      </Modal>
    </div>
  )
}