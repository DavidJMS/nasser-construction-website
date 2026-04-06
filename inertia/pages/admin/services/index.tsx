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
import { PlusOutlined, EditOutlined, DeleteOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title } = Typography

interface Service {
  id: number
  title: string
  description: string
  icon: string
  order: number
}

interface Props {
  services: Service[]
}

export default function ServicesIndex({ services }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [form] = Form.useForm()

  const showModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      form.setFieldsValue(service)
    } else {
      setEditingService(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingService) {
        router.patch(`/admin/services/${editingService.id}`, values, {
          onSuccess: () => setIsModalOpen(false)
        })
      } else {
        router.post('/admin/services', values, {
          onSuccess: () => setIsModalOpen(false)
        })
      }
    })
  }

  const handleDelete = (id: number) => {
    router.delete(`/admin/services/${id}`)
  }

  const columns = [
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: (text: string) => <Tag color="gold">{text || <CustomerServiceOutlined />}</Tag>
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Orden',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: Service, b: Service) => a.order - b.order,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Service) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Editar</Button>
          <Popconfirm
            title="¿Eliminar servicio?"
            description="Esta acción no se puede deshacer."
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
        <Breadcrumb.Item>Servicios</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestión de Servicios</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Nuevo Servicio
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        bordered
      />

      <Modal
        title={editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Ingresa el título del servicio' }]}
          >
            <Input placeholder="Ej: Construcción Residencial" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'Ingresa una descripción' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe brevemente el servicio..." />
          </Form.Item>
          <Form.Item name="icon" label="Clase del Icono (Lucide)">
            <Input placeholder="Ej: hard-hat, construction..." />
          </Form.Item>
          <Form.Item name="order" label="Orden de visualización" initialValue={0}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
