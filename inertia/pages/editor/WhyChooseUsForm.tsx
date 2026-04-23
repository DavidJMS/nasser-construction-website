import {
  Typography,
  List,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Tabs,
} from 'antd'
import { Edit3, Trash2, Save, Type, Hash, ListFilter, Layers } from 'lucide-react'
import { icons } from 'lucide-react'
import React, { useState } from 'react'
import { IconSelect } from '~/components/IconSelect'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import type WhyChoose from '#models/why_choose'

const { Text } = Typography

export function WhyChooseUsForm({ features: ssrFeatures }: { features: WhyChoose[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<WhyChoose | null>(null)
  const [form] = Form.useForm()

  const { data: featuresData } = useQuery(api.whyChooses.index.queryOptions())
  const features = featuresData?.data ?? ssrFeatures

  const storeMutation = useMutation(
    api.whyChooses.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Feature created' })
        queryClient.invalidateQueries(api.whyChooses.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error creating feature' }),
    })
  )

  const updateMutation = useMutation(
    api.whyChooses.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Feature updated' })
        queryClient.invalidateQueries(api.whyChooses.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating feature' }),
    })
  )

  const deleteMutation = useMutation(
    api.whyChooses.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Feature deleted' })
        queryClient.invalidateQueries(api.whyChooses.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error deleting feature' }),
    })
  )

  const showModal = (feature?: WhyChoose) => {
    if (feature) {
      setEditingFeature(feature)
      form.setFieldsValue(feature)
    } else {
      setEditingFeature(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const body = {
        ...values,
        icon: values.icon ? values.icon : null,
        order: values.order ?? undefined,
      }
      if (editingFeature) {
        updateMutation.mutate({
          params: { id: editingFeature.id },
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

  const items = [
    {
      key: 'list',
      label: (
        <Space>
          <ListFilter size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Features</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text className="uppercase" type="secondary">
              Manage Features
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Add
            </Button>
          </div>

          <List
            dataSource={features}
            rowKey="id"
            renderItem={(feature) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(feature)}
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete this feature?"
                    onConfirm={() => handleDelete(feature.id)}
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
                    <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-all">
                      {feature.icon && (icons as any)[feature.icon] ? (
                        React.createElement((icons as any)[feature.icon], { size: 20 })
                      ) : (
                        <Layers size={20} />
                      )}
                    </div>
                  }
                  title={<Text className="text-xs font-bold">{feature.title}</Text>}
                  description={
                    <Text type="secondary" className="text-[10px] line-clamp-1">
                      {feature.description}
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
              {editingFeature ? 'Edit Feature' : 'New Feature'}
            </span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden
        centered
        width={400}
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
            {editingFeature ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Title is required' },
              { min: 3, message: 'Title must have at least 3 characters' },
            ]}
          >
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ex: Expert Team"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Description is required' },
              { min: 10, message: 'Description must have at least 10 characters' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Describe this feature in an attractive way..." />
          </Form.Item>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item className="col-span-2" name="icon" label="Icon">
              <IconSelect placeholder="Ex: ShieldCheck" />
            </Form.Item>
            <Form.Item name="order" label="Priority">
              <InputNumber
                prefix={<Hash size={14} className="text-gray-400" />}
                min={0}
                placeholder="0"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
