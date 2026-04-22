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
} from 'antd'
import {
  Edit3,
  Trash2,
  Plus,
  Save,
  User,
  Briefcase,
  Link as LinkIcon,
  Hash,
  Quote,
} from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import type Testimonial from '#models/testimonial'

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
      onError: (err: any) =>
        sileo.error({ title: err?.message || 'Error updating testimonial' }),
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
      // Map avatarUrl to avatar_url for the form if validator expects snake_case
      form.setFieldsValue({
        ...testimonial,
        avatar_url: testimonial.avatarUrl,
      })
    } else {
      setEditingTestimonial(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingTestimonial) {
        updateMutation.mutate({
          params: { id: editingTestimonial.id },
          body: values,
        })
      } else {
        storeMutation.mutate({ body: values })
      }
    })
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ params: { id } })
  }

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
            <Text strong className="text-[10px] uppercase text-gray-400 tracking-widest">
              Client Reviews
            </Text>
            <Button
              type="primary"
              size="small"
              icon={<Plus size={14} />}
              onClick={() => showModal()}
              className="bg-navy-900 rounded-full text-[10px] font-bold px-4 flex items-center gap-1 h-7"
            >
              NUEVO
            </Button>
          </div>

          <List
            dataSource={testimonials}
            rowKey="id"
            renderItem={(testimonial) => (
              <List.Item
                className="px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl mb-3 hover:bg-white hover:border-gray-200 transition-all group"
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
        title={
          <Space className="pt-2">
            <Edit3 size={16} className="text-navy-900" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
            </span>
          </Space>
        }
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
        <Form form={form} layout="vertical" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <Form.Item
            name="content"
            label="Testimonial"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <Input.TextArea rows={4} placeholder="Write the testimonial here..." />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="rating" label="Rating" initialValue={5}>
              <Rate className="text-sm" />
            </Form.Item>
            <Form.Item name="order" label="Priority">
              <InputNumber
                prefix={<Hash size={14} className="text-gray-400" />}
                min={0}
                className="w-full"
                placeholder="0"
              />
            </Form.Item>
          </div>
          <Form.Item name="avatar_url" label="Profile Image URL">
            <Input
              prefix={<LinkIcon size={14} className="text-gray-400" />}
              placeholder="https://..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
