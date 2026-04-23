import { Form, Input, Button, Card, Typography, Image, Flex } from 'antd'
import { Head } from '@inertiajs/react'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/utils/client'
import { router } from '@inertiajs/react'
import { sileo } from 'sileo'

const { Text } = Typography

export default function Login() {
  const { mutate: login, isPending } = useMutation(
    api.session.store.mutationOptions({
      onSuccess: () => {
        router.visit('/')
      },
      onError: (error: any) => {
        sileo.error({ title: error.response?.data?.message })
      },
    })
  )

  const onFinish = (values: any) => {
    login({
      body: values,
    })
  }

  return (
    <>
      <Head title="Admin Access" />
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
          <Flex vertical gap={20} align="center" style={{ marginBottom: 40 }}>
            <Image height={40} width={120} src="/images/logo.png" alt="Logo" />
            <Text type="secondary" style={{ fontSize: 16, color: '#fff' }}>
              Welcome to the admin panel
            </Text>
          </Flex>

          <Form layout="vertical" size="large" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email address',
                  type: 'email',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.45)' }} />}
                placeholder="ejemplo@nasser.com"
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.45)' }} />}
                placeholder="••••••••"
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
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
              >
                Login
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 13, color: '#fff' }}>
                © 2026 Nasser Construction. All rights reserved.
              </Text>
            </div>
          </Form>
        </Card>
      </div>
    </>
  )
}
