import { ReactNode } from 'react'
import Navbar from '../pages/home/components/Navbar'
import CTASection from '../pages/home/components/CTASection'
import Footer from '../pages/home/components/Footer'

interface PublicLayoutProps {
  children: ReactNode
  footer?: any
  ctas?: any[]
}

export default function PublicLayout({ children, footer, ctas }: PublicLayoutProps) {
  return (
    <div className="relative bg-white">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <CTASection cta={ctas?.[0] ?? null} />
      <Footer footer={footer} />
    </div>
  )
}
