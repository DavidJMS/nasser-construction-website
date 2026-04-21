import { motion } from 'framer-motion'
import Navbar from '../home/components/Navbar'
import Footer from '../home/components/Footer'
import { CheckCircle2 } from 'lucide-react'

interface AboutPageProps {
  aboutUs?: any
  settings?: Record<string, any>
}

export default function AboutPage({ aboutUs, settings }: AboutPageProps) {
  const image1 = aboutUs?.image1 || '/images/about-house.png'
  const title = 'About Us'

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24">
        <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
          <img src={image1} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/70" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                {aboutUs?.description ||
                  'A trusted subcontractor specialized in window and door installation services for contractors, property managers, and builders.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {aboutUs?.longDescription ||
                  'We bring speed, consistency, and clean execution to every project, with crews trained to integrate seamlessly into your workflow.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {aboutUs?.closingLine || "Let's build efficiently — together."}
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={image1} alt="About" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Built for Contractors</h2>
            <p className="mt-3 text-sm text-gray-200/80">
              We understand what matters on a jobsite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Meeting Deadlines',
                text: 'We coordinate to fit your schedule and keep progress moving.',
              },
              {
                title: 'Passing Inspections',
                text: 'Clean installation and attention to detail to help you pass the first time.',
              },
              {
                title: 'Maintaining Clean Installs',
                text: 'We respect your site: organized work, protected finishes, clear handoff.',
              },
              {
                title: 'Coordinating with Other Trades',
                text: 'We integrate smoothly with other crews and keep communication clear.',
              },
              {
                title: 'Clear Communication and Reporting',
                text: 'Daily updates when needed, quick responses, and transparent expectations.',
              },
              {
                title: 'Consistent Quality',
                text: 'Repeatable processes and trained crews for reliable results.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white"
              >
                <div className="text-sm font-bold tracking-wide">{card.title}</div>
                <div className="mt-2 text-sm text-gray-200/80 leading-relaxed">{card.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="/images/door-panel.png" alt="Capacity" className="w-full h-auto object-cover" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-navy-900 tracking-tight">
                Capacity & Reliability
              </h3>
              <ul className="mt-6 space-y-3 text-gray-700">
                {[
                  'Multiple installation crews',
                  'Consistent labor availability',
                  'On-time scheduling',
                  'Code-compliant installations',
                  'High-quality materials and finishing standards',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-navy-900 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  )
}

