import { Form, Card } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { AboutUsProps } from './types'
import { useAboutUsForm } from './hooks/use_about_us_form'
import { AboutUsHeader } from './components/AboutUsHeader'
import { AboutUsNavigation } from './components/AboutUsNavigation'
import { AboutUsContentTab } from './components/AboutUsContentTab'
import { AboutUsFeaturesTab } from './components/AboutUsFeaturesTab'
import { AboutUsMediaTab } from './components/AboutUsMediaTab'

export default function AboutUsAdminIndex({ aboutUs }: AboutUsProps) {
  const [activeTab, setActiveTab] = useState('content')
  const { form, initialValues, onFinish, isPending } = useAboutUsForm(aboutUs)

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  }

  return (
    <div
      className="admin-editor-container"
      style={{ minHeight: 'calc(100vh - 120px)', padding: '0 24px 40px' }}
    >
      <AboutUsHeader form={form} isPending={isPending} />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        size="large"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          <AboutUsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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
                {activeTab === 'content' && <AboutUsContentTab />}
                {activeTab === 'features' && <AboutUsFeaturesTab />}
                {activeTab === 'media' && <AboutUsMediaTab />}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Form>
    </div>
  )
}
