import { ReactNode } from 'react'
import Navbar from '../pages/home/components/Navbar'
import Footer from '../pages/home/components/Footer'
import { CONTACT_EMAIL } from '../utils/legal'

interface LegalPageProps {
  title: string
  footer?: any
  children: ReactNode
}

/**
 * Shared shell for the static text pages (/privacy, /support): same Navbar and
 * Footer as the rest of the public site, with a readable single column.
 */
export default function LegalPage({ title, footer, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24">
        <div className="bg-navy-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-base text-gray-600 leading-relaxed break-words [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-navy-900 [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-5">
          {children}
        </div>
      </section>

      <Footer footer={footer} />
    </div>
  )
}

/** Contact email as a mailto link (plain text while it is still a placeholder). */
export function ContactEmail() {
  if (!CONTACT_EMAIL.includes('@')) return <>{CONTACT_EMAIL}</>

  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-navy-900 underline">
      {CONTACT_EMAIL}
    </a>
  )
}
