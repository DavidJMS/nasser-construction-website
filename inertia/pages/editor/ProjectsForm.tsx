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
  Upload,
  Avatar,
} from 'antd'
import {
  Edit3,
  Trash2,
  Save,
  Type,
  Hash,
  Folders,
  Tag as TagIcon,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api, queryClient } from '~/utils/client'
import { sileo } from 'sileo'
import { useState } from 'react'
import type Project from '#models/project'
import { PictureOutlined } from '@ant-design/icons'

const { Text } = Typography

export function ProjectsForm({ projects: ssrProjects }: { projects: Project[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form] = Form.useForm()
  const imageUrl = Form.useWatch('imageUrl', form)

  const { data: projectsData } = useQuery(api.projects.index.queryOptions())
  const projects = projectsData?.data ?? ssrProjects

  const storeMutation = useMutation(
    api.projects.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Project created' })
        queryClient.invalidateQueries(api.projects.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error creating project' }),
    })
  )

  const updateMutation = useMutation(
    api.projects.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Project updated' })
        queryClient.invalidateQueries(api.projects.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error updating project' }),
    })
  )

  const deleteMutation = useMutation(
    api.projects.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Project deleted' })
        queryClient.invalidateQueries(api.projects.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error deleting project' }),
    })
  )

  const showModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      // Prepare file lists for Ant Design Upload
      const values = {
        ...project,
        imageUrl: project.imageUrl ? [{ url: project.imageUrl, name: 'Cover' }] : [],
        gallery:
          project.images?.map((img) => ({ url: img.url, name: `Image ${img.id}`, id: img.id })) ||
          [],
      }
      form.setFieldsValue(values)
    } else {
      setEditingProject(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const body: any = {
        title: values.title,
        category: values.category,
        description: values.description || '',
        link: values.link || '',
        order: Number(values.order || 0),
        imageUrl: values.imageUrl?.[0]?.originFileObj,
      }

      // Handle Gallery
      if (values.gallery) {
        body.gallery = values.gallery
          .filter((f: any) => f.originFileObj)
          .map((f: any) => f.originFileObj)
        body.keep_gallery_ids = values.gallery.filter((f: any) => f.id).map((f: any) => f.id)
      }

      if (editingProject) {
        updateMutation.mutate({
          params: { id: editingProject.id },
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
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ej: Condominio Las Palmas"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Category is required' }]}
          >
            <Input
              prefix={<TagIcon size={14} className="text-gray-400" />}
              placeholder="Ej: Residencial"
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Description..." />
          </Form.Item>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item className="col-span-2" name="link" label="Link">
              <Input prefix={<LinkIcon size={14} className="text-gray-400" />} placeholder="URL" />
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
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              className="editor-upload-small"
              multiple={false}
            >
              {(imageUrl?.length || 0) < 1 && (
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="text-gray-400" size={34} />
                  <Text type="secondary" className="mt-2 ">
                    Cover Image
                  </Text>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="gallery"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload listType="picture" multiple beforeUpload={() => false}>
              <Button icon={<PictureOutlined />}>Add Photos</Button>
            </Upload>
          </Form.Item>
        </div>
      ),
    },
  ]

  const items = [
    {
      key: 'list',
      label: (
        <Space>
          <Folders size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Projects</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text type="secondary" className="uppercase">
              Gallery of Projects
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Add
            </Button>
          </div>

          <List
            dataSource={projects}
            rowKey="id"
            renderItem={(project) => (
              <List.Item
                className="px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl mb-3 hover:bg-white hover:border-gray-200 transition-all group"
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(project)}
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete this project?"
                    onConfirm={() => handleDelete(project.id)}
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
                      src={project.imageUrl}
                      icon={<ImageIcon size={16} />}
                      className="rounded-lg bg-gray-200 border border-gray-100"
                    />
                  }
                  title={<Text className="text-xs font-bold">{project.title}</Text>}
                  description={
                    <Space size={4} className="opacity-70">
                      <TagIcon size={10} className="text-gray-400" />
                      <Text className="text-[10px] uppercase tracking-wider font-semibold">
                        {project.category}
                      </Text>
                    </Space>
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
            {editingProject ? 'Update' : 'Create'}
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
