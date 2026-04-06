import { Typography, Row, Col, Card, Statistic, Breadcrumb } from 'antd'
import {
  ProjectOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'

const { Title, Text } = Typography

export default function Dashboard() {
  const { user } = usePage<Data.SharedProps>().props

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Bienvenido, {user?.fullName || 'Administrador'}</Title>
      <Text type="secondary">Gestiona el contenido de Nasser Construction desde aquí.</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Servicios"
              value={6}
              precision={0}
              valueStyle={{ color: '#eab308' }}
              prefix={<CustomerServiceOutlined />}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Proyectos"
              value={12}
              precision={0}
              valueStyle={{ color: '#eab308' }}
              prefix={<ProjectOutlined />}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Testimonios"
              value={4}
              precision={0}
              valueStyle={{ color: '#eab308' }}
              prefix={<CommentOutlined />}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Actividad Reciente" style={{ marginTop: 24 }} bordered={false}>
        <Text>Aquí podrás ver los últimos cambios realizados en el sitio.</Text>
      </Card>
    </div>
  )
}
