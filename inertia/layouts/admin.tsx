import { ReactNode, useEffect, useState } from 'react'
import { Layout, Menu, theme, Avatar, Dropdown, Button, Space, Typography } from 'antd'
import {
  DashboardOutlined,
  ProjectOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Link, router, usePage } from '@inertiajs/react'
import { sileo } from 'sileo'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = usePage<any>().props as any
  const [collapsed, setCollapsed] = useState(false)
  const { url } = usePage()

  useEffect(() => {
    sileo.success({ title: 'Bienvenido al portal Nasser' })
  }, [usePage().url])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleLogout = () => {
    router.post('/logout')
  }

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link href="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/hero',
      icon: <ProjectOutlined />,
      label: <Link href="/admin/hero">Sección Hero</Link>,
    },
    {
      key: '/admin/services',
      icon: <CustomerServiceOutlined />,
      label: <Link href="/admin/services">Servicios</Link>,
    },
    {
      key: '/admin/projects',
      icon: <ProjectOutlined />,
      label: <Link href="/admin/projects">Proyectos</Link>,
    },
    {
      key: '/admin/testimonials',
      icon: <CommentOutlined />,
      label: <Link href="/admin/testimonials">Testimonios</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">Configuración</Link>,
    },
  ]

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Mi Perfil',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Cerrar Sesión',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={260}>
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            overflow: 'hidden',
          }}
        >
          <Title level={4} style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
            {collapsed ? 'NC' : 'Nasser Admin'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[url]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 24,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          <Space size="large">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Text>{user?.fullName || user?.email}</Text>
                <Avatar icon={<UserOutlined />} src={user?.avatarUrl} />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'initial',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
