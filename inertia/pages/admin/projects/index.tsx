import { useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Breadcrumb,
  Popconfirm,
  Tag
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title, Text } = Typography

interface Project {
  id: number
  title: string
  category: string
  link: string
  order: number
}

interface Props {
  projects: Project[]
}

export default function ProjectsIndex({ projects }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form] = Form.useForm()

  const showModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      form.setFieldsValue(project)
    } else {
      setEditingProject(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingProject) {
        router.patch(`/admin/projects/${editingProject.id}`, values, {
          onSuccess: () => setIsModalOpen(false)
        })
      } else {
        router.post('/admin/projects', values, {
          onSuccess: () => setIsModalOpen(false)
        })
      }
    })
  }

  const handleDelete = (id: number) => {
    router.delete(`/admin/projects/${id}`)
  }

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Enlace',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => <Text type="secondary">{link || '-'}</Text>
    },
    {
      title: 'Orden',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: Project, b: Project) => a.order - b.order,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Project) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Editar</Button>
          <Popconfirm
            title="¿Eliminar proyecto?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Proyectos</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestión de Proyectos</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Nuevo Proyecto
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        rowKey="id"
        bordered
      />

      <Modal
        title={editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Ingresa el nombre del proyecto' }]}
          >
            <Input placeholder="Ej: Condominio Las Palmas" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Categoría"
            rules={[{ required: true, message: 'Ingresa la categoría' }]}
          >
            <Input placeholder="Ej: Residencial, Comercial..." />
          </Form.Item>
          <Form.Item name="link" label="Enlace (Link)">
            <Input placeholder="URL externa opcional" />
          </Form.Item>
          <Form.Item name="order" label="Orden de visualización" initialValue={0}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
