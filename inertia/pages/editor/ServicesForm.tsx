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
import type Service from '#models/service'

const { Text } = Typography

export function ServicesForm({ services: ssrServices }: { services: Service[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [form] = Form.useForm()

  const { data: servicesData } = useQuery(api.services.index.queryOptions())
  const services = servicesData?.data ?? ssrServices

  const storeMutation = useMutation(
    api.services.store.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Servicio creado' })
        queryClient.invalidateQueries(api.services.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error al crear servicio' }),
    })
  )

  const updateMutation = useMutation(
    api.services.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Servicio actualizado' })
        queryClient.invalidateQueries(api.services.index.queryOptions())
        setIsModalOpen(false)
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error al actualizar servicio' }),
    })
  )

  const deleteMutation = useMutation(
    api.services.destroy.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Servicio eliminado' })
        queryClient.invalidateQueries(api.services.index.queryOptions())
      },
      onError: (err: any) => sileo.error({ title: err?.message || 'Error al eliminar servicio' }),
    })
  )

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
      const body = {
        ...values,
        icon: values.icon ? values.icon : null,
        order: values.order ?? undefined,
      }
      if (editingService) {
        updateMutation.mutate({
          params: { id: editingService.id },
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
          <span className="text-[10px] font-bold uppercase tracking-wider">Servicios</span>
        </Space>
      ),
      children: (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-6">
            <Text className="uppercase" type="secondary">
              Gestionar Servicios
            </Text>
            <Button type="primary" size="small" onClick={() => showModal()}>
              Añadir
            </Button>
          </div>

          <List
            dataSource={services}
            rowKey="id"
            renderItem={(service) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    type="text"
                    icon={<Edit3 size={14} className="text-navy-600" />}
                    onClick={() => showModal(service)}
                  />,
                  <Popconfirm
                    title="¿Deseas eliminar este servicio?"
                    onConfirm={() => handleDelete(service.id)}
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
                    <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-all">
                      {service.icon && (icons as any)[service.icon] ? (
                        React.createElement((icons as any)[service.icon], { size: 20 })
                      ) : (
                        <Layers size={20} />
                      )}
                    </div>
                  }
                  title={<Text className="text-xs font-bold">{service.title}</Text>}
                  description={
                    <Text type="secondary" className="text-[10px] line-clamp-1">
                      {service.description}
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
              {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
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
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="bg-navy-900 rounded-xl"
            icon={<Save size={14} />}
          >
            {editingService ? 'Actualizar' : 'Crear'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item
            name="title"
            label="Título"
            rules={[
              { required: true, message: 'El título es obligatorio' },
              { min: 3, message: 'El título debe tener al menos 3 caracteres' },
            ]}
          >
            <Input
              prefix={<Type size={14} className="text-gray-400" />}
              placeholder="Ej: Construcción Residencial"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              { required: true, message: 'La descripción es obligatoria' },
              { min: 10, message: 'La descripción debe tener al menos 10 caracteres' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Describe el servicio de forma atractiva..." />
          </Form.Item>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item className="col-span-2" name="icon" label="Icono">
              <IconSelect placeholder="Ej: HardHat" />
            </Form.Item>
            <Form.Item name="order" label="Prioridad">
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
