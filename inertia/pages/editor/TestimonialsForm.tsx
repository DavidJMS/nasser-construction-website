import {
  Typography,
  List,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Rate,
  Avatar,
  Tabs,
  InputNumber,
  Upload,
} from 'antd'
import { Edit3, Trash2, Save, User, Briefcase, Hash, Quote, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import type Testimonial from '#models/testimonial'
import { toUploadFileList } from '~/utils/upload'

const { Text } = Typography

export function TestimonialsForm({
  testimonials: ssrTestimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [form] = Form.useForm()

  const { data: testimonialsData } = useQuery(api.testimonials.index.queryOptions())
  const testimonials = testimonialsData?.data ?? ssrTestimonials

  const storeMutation = useMutation(
    api.testimonials.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Testimonial created' })
        queryClient.invalidateQueries(api.testimonials.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error creating testimonial' }),
    })
  )

  const updateMutation = useMutation(
    api.testimonials.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Testimonial updated' })
        queryClient.invalidateQueries(api.testimonials.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating testimonial' }),
    })
  )

  const deleteMutation = useMutation(
    api.testimonials.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Testimonial deleted' })
        queryClient.invalidateQueries(api.testimonials.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error deleting testimonial' }),
    })
  )

  const showModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      form.setFieldsValue({
        ...testimonial,
        avatar_url: toUploadFileList(testimonial.avatarUrl),
      })
    } else {
      setEditingTestimonial(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const body: any = { ...values }

      if (values.avatar_url?.[0]?.originFileObj) {
        body.avatar_url = values.avatar_url[0].originFileObj
      } else {
        delete body.avatar_url
      }

      if (editingTestimonial) {
        updateMutation.mutate({
          params: { id: editingTestimonial.id },
          body,
        })
      } else {
        storeMutation.mutate({ body })
      }
    })
  }

  const fileList = Form.useWatch('avatar_url', form) || []

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ params: { id } })
  }

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
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Author is required' }]}
          >
            <Input
              prefix={<User size={14} className="text-gray-400" />}
              placeholder="Ex: John Doe"
            />
          </Form.Item>
          <Form.Item name="role" label="Role / Company">
            <Input
              prefix={<Briefcase size={14} className="text-gray-400" />}
              placeholder="Ex: Client"
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="Testimonial"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <Input.TextArea rows={4} placeholder="Write the testimonial here..." />
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
            name="avatar_url"
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
                  <User className="text-gray-400" size={34} />
                  <Text type="secondary" className="mt-2">
                    Profile Image
                  </Text>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Form.Item name="rating" label="Rating" initialValue={5}>
              <Rate className="text-sm" />
            </Form.Item>
            <Form.Item name="order" label="Priority">
              <InputNumber
                prefix={<Hash size={14} className="text-gray-400" />}
                min={0}
                style={{ width: '100%' }}
                placeholder="0"
              />
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
          <Quote size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Testimonials</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text type="secondary" className="uppercase">
              Client Reviews
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Add
            </Button>
          </div>

          <List
            dataSource={testimonials}
            rowKey="id"
            renderItem={(testimonial) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(testimonial)}
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete this testimonial?"
                    onConfirm={() => handleDelete(testimonial.id)}
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
                      src={testimonial.avatarUrl}
                      icon={<User size={16} />}
                      className="bg-navy-100 text-navy-900 border border-navy-200"
                    />
                  }
                  title={<Text className="text-xs font-bold">{testimonial.author}</Text>}
                  description={
                    <Text type="secondary" className="text-[10px] line-clamp-1">
                      {testimonial.role || 'Client'}
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
            {editingTestimonial ? 'Update' : 'Create'}
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
