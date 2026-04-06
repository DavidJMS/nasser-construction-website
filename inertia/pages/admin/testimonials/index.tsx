import { useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Breadcrumb,
  Popconfirm,
  Rate,
  Avatar
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title, Text } = Typography

interface Testimonial {
  id: number
  author: string
  role: string
  content: string
  avatar_url: string
  rating: number
  order: number
}

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialsIndex({ testimonials }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [form] = Form.useForm()

  const showModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      form.setFieldsValue(testimonial)
    } else {
      setEditingTestimonial(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingTestimonial) {
        router.patch(`/admin/testimonials/${editingTestimonial.id}`, values, {
          onSuccess: () => setIsModalOpen(false)
        })
      } else {
        router.post('/admin/testimonials', values, {
          onSuccess: () => setIsModalOpen(false)
        })
      }
    })
  }

  const handleDelete = (id: number) => {
    router.delete(`/admin/testimonials/${id}`)
  }

  const columns = [
    {
      title: 'Autor',
      dataIndex: 'author',
      key: 'author',
      render: (_: string, record: Testimonial) => (
        <Space>
          <Avatar src={record.avatar_url} icon={<UserOutlined />} />
          <div>
            <Text type="secondary">{record.role}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: '40%',
    },
    {
      title: 'Calificación',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Testimonial) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Editar</Button>
          <Popconfirm
            title="¿Eliminar testimonio?"
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
        <Breadcrumb.Item>Testimonios</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestión de Testimonios</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Nuevo Testimonio
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={testimonials}
        rowKey="id"
        bordered
      />

      <Modal
        title={editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="author"
            label="Autor"
            rules={[{ required: true, message: 'Ingresa el nombre del cliente' }]}
          >
            <Input placeholder="Ej: Juan Pérez" />
          </Form.Item>
          <Form.Item name="role" label="Rol / Empresa">
            <Input placeholder="Ej: Director de Proyecto" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Testimonio"
            rules={[{ required: true, message: 'Ingresa el comentario' }]}
          >
            <Input.TextArea rows={4} placeholder="Escribe el testimonio aquí..." />
          </Form.Item>
          <Form.Item name="rating" label="Calificación" initialValue={5}>
            <Rate />
          </Form.Item>
          <Form.Item name="avatar_url" label="URL del Avatar (Opcional)">
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
