import { Typography } from 'antd'
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'

const { Title, Text } = Typography

export default function Dashboard() {
  const { user } = usePage<Data.SharedProps>().props

  return (
    <div>
      <Title level={2}>Bienvenido, {user?.fullName || 'Administrador'}</Title>
      <Text type="secondary">Gestiona el contenido de Nasser Construction desde aquí.</Text>
    </div>
  )
}
