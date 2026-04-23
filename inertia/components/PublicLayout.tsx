import { ReactNode } from 'react'
import Navbar from '../pages/home/components/Navbar'
import CTASection from '../pages/home/components/CTASection'
import Footer from '../pages/home/components/Footer'

interface PublicLayoutProps {
  children: ReactNode
  settings?: Record<string, any>
}

export default function PublicLayout({ children, settings }: PublicLayoutProps) {
  return (
    <div className="relative bg-white">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <CTASection settings={settings} />
      <Footer settings={settings} />
    </div>
  )
}
