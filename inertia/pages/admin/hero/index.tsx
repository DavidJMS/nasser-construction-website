import { Form, Card } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HeroProps } from './types'
import { heroAdminStyles } from './styles/heroStyles'
import { useHeroForm } from './hooks/useHeroForm'
import { HeroHeader } from './components/HeroHeader'
import { HeroNavigation } from './components/HeroNavigation'
import { HeroContentTab } from './components/HeroContentTab'
import { HeroButtonsTab } from './components/HeroButtonsTab'
import { HeroMediaTab } from './components/HeroMediaTab'

export default function HeroAdminIndex({ hero }: HeroProps) {
  const [activeTab, setActiveTab] = useState('content')
  const { form, initialValues, onFinish, isPending } = useHeroForm(hero)

  // Watch file lists to hide upload button when full
  const images = Form.useWatch('images', form)

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  }

  return (
    <div
      className="admin-editor-container"
      style={{ minHeight: 'calc(100vh - 120px)', background: '#f8fafc', padding: '0 24px 40px' }}
    >
      <style>{heroAdminStyles}</style>

      <HeroHeader form={form} isPending={isPending} />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        size="large"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          <HeroNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Editor Card */}
          <Card
            bordered={false}
            style={{
              borderRadius: 24,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
              minHeight: 600,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)',
              width: '100%',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeTab} {...fadeIn}>
                {activeTab === 'content' && <HeroContentTab />}
                {activeTab === 'buttons' && <HeroButtonsTab />}
                {activeTab === 'media' && <HeroMediaTab images={images} />}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Form>
    </div>
  )
}
