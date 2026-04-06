import { Form, Input, Button, Card, Typography } from 'antd'
import { Head } from '@inertiajs/react'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/utils/client'
import { router } from '@inertiajs/react'
import { sileo } from 'sileo'

const { Title, Text } = Typography

export default function Login() {
  const { mutate: login, isPending } = useMutation(
    api.session.store.mutationOptions({
      onSuccess: () => {
        router.visit('/admin')
      },
      onError: (error: any) => {
        sileo.error({ title: error.response?.data?.message })
      },
    })
  )

  const onFinish = (values: any) => {
    console.log(values)
    login({
      body: values,
    })
  }

  return (
    <>
      <Head title="Acceso Administrativo" />
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        {/* Decorative background circle */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(23, 161, 212, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '10%',
            right: '20%',
            filter: 'blur(60px)',
          }}
        />

        <Card
          style={{
            width: 420,
            background: 'rgba(30, 41, 59, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(33, 112, 197, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          styles={{ body: { padding: '40px 32px' } }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            {/* Logo placeholder - replace with actual logo */}
            <div
              style={{
                width: 64,
                height: 64,
                background: '#1759d4ff',
                borderRadius: 16,
                margin: '0 auto 24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                color: '#fff',
                boxShadow: '0 0 20px rgba(42, 76, 189, 0.4)',
              }}
            >
              N
            </div>
            <Title level={2} style={{ margin: 0, color: '#fff' }}>
              Portal Nasser
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Bienvenido al panel administrativo
            </Text>
          </div>

          <Form layout="vertical" size="large" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su correo electrónico',
                  type: 'email',
                },
              ]}
              label={<span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Correo Electrónico</span>}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.45)' }} />}
                placeholder="ejemplo@nasser.com"
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese su contraseña',
                },
              ]}
              label={<span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Contraseña</span>}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.45)' }} />}
                placeholder="••••••••"
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 32 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isPending}
                icon={<LoginOutlined />}
                style={{
                  height: 48,
                  fontSize: 16,
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #4150b2ff 0%, #2a81d2ff 100%)',
                  border: 'none',
                }}
              >
                Iniciar Sesión
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                © 2026 Nasser Doors & Windows. Todos los derechos reservados.
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </>
  )
}
