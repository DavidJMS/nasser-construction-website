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
  Divider,
  Avatar,
} from 'antd'
import {
  Edit3,
  Trash2,
  Plus,
  Save,
  Type,
  Hash,
  Folders,
  Tag as TagIcon,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'
import { router } from '@inertiajs/react'
import { useState } from 'react'

const { Text } = Typography

interface ProjectImage {
  id: number
  url: string
}

interface Project {
  id: number
  title: string
  category: string
  description: string
  link: string
  order: number
  imageUrl: string
  images: ProjectImage[]
}

interface ProjectsFormProps {
  projects: Project[]
}

export function ProjectsForm({ projects }: ProjectsFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form] = Form.useForm()

  const showModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      // Prepare file lists for Ant Design Upload
      const values = {
        ...project,
        imageUrl: project.imageUrl ? [{ url: project.imageUrl, name: 'Cover' }] : [],
        gallery: project.images?.map((img) => ({ url: img.url, name: `Image ${img.id}` })) || [],
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
      // Create FormData to handle multi-file upload
      const formData = new FormData()

      // Basic fields
      formData.append('title', values.title)
      formData.append('category', values.category)
      formData.append('description', values.description || '')
      formData.append('link', values.link || '')
      formData.append('order', String(values.order || 0))

      // Single file upload (Cover)
      if (values.imageUrl?.[0]?.originFileObj) {
        formData.append('imageUrl', values.imageUrl[0].originFileObj)
      }

      // Multi file upload (Gallery)
      if (values.gallery) {
        values.gallery.forEach((file: any) => {
          if (file.originFileObj) {
            formData.append('gallery[]', file.originFileObj)
          }
        })
      }

      if (editingProject) {
        formData.append('_method', 'PATCH')
        router.post(`/admin/projects/${editingProject.id}`, formData, {
          onSuccess: () => setIsModalOpen(false),
          forceFormData: true,
        })
      } else {
        router.post('/admin/projects', formData, {
          onSuccess: () => setIsModalOpen(false),
          forceFormData: true,
        })
      }
    })
  }

  const handleDelete = (id: number) => {
    router.delete(`/admin/projects/${id}`)
  }

  const modalItems = [
    {
      key: 'info',
      label: (
        <Space>
          <Edit3 size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Información</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-4">
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'El título es obligatorio' }]}
          >
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ej: Condominio Las Palmas"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Categoría"
            rules={[{ required: true, message: 'La categoría es obligatoria' }]}
          >
            <Input
              prefix={<TagIcon size={14} className="text-gray-400" />}
              placeholder="Ej: Residencial"
            />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea rows={4} placeholder="Descripción del proyecto..." />
          </Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="link" label="Enlace">
              <Input
                prefix={<LinkIcon size={14} className="text-gray-400" />}
                placeholder="URL externa"
              />
            </Form.Item>
            <Form.Item name="order" label="Prioridad">
              <InputNumber
                prefix={<Hash size={14} className="text-gray-400" />}
                min={0}
                className="w-full"
                placeholder="0"
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
          <span className="text-[10px] font-bold uppercase tracking-wider">Multimedia</span>
        </Space>
      ),
      children: (
        <div className="pt-4 space-y-6">
          <div>
            <Text strong className="text-[10px] uppercase text-gray-400 mb-2 block">
              Imagen de Portada
            </Text>
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
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="text-gray-400" size={34} />
                  <Text type="secondary" className="mt-2 text-xs">
                    Principal
                  </Text>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <Divider className="my-4" />

          <div>
            <Text strong className="text-[10px] uppercase text-gray-400 mb-2 block">
              Galería del Proyecto
            </Text>
            <Form.Item
              name="gallery"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
              className="mb-0"
            >
              <Upload
                listType="picture-card"
                multiple
                beforeUpload={() => false}
                className="editor-upload-small"
              >
                <div className="flex flex-col items-center justify-center">
                  <Plus className="text-gray-400" size={24} />
                  <Text type="secondary" className="mt-2 text-[10px]">
                    Añadir Fotos
                  </Text>
                </div>
              </Upload>
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
          <Folders size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Proyectos</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text strong className="text-[10px] uppercase text-gray-400 tracking-widest">
              Galería de Proyectos
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
                    title="¿Deseas eliminar este proyecto?"
                    onConfirm={() => handleDelete(project.id)}
                    okText="Eliminar"
                    cancelText="Cancelar"
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
        title={
          <Space className="pt-2">
            <Folders size={16} className="text-navy-900" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        centered
        width={420}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} className="rounded-xl">
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="bg-navy-900 rounded-xl"
            icon={<Save size={14} />}
          >
            {editingProject ? 'Actualizar' : 'Crear'}
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
