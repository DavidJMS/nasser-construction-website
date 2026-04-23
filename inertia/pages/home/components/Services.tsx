import { motion } from 'framer-motion'
import { Zap, Home, Volume2, Maximize, ArrowRight } from 'lucide-react'
import { icons } from 'lucide-react'

const services = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'High Energy Efficiency Windows',
    description:
      'Our windows act as a thermal shield, keeping the heat in during winter and the coolness in during summer.',
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: 'Security and Designer Doors',
    description: 'Available in a wide range of premium finishes and materials.',
  },
  {
    icon: <Volume2 className="w-5 h-5" />,
    title: 'Professional Acoustic Insulation',
    description: 'We reduce noise pollution from traffic and the neighborhood.',
  },
  {
    icon: <Maximize className="w-5 h-5" />,
    title: 'Glass Enclosures and Curtains',
    description: 'Transform your terrace or balcony into a functional room year-round.',
  },
]

export default function Services({ data }: { data: any[] }) {
  const servicesFromData = Array.isArray(data)
    ? data
        .map((service: any) => {
          const Icon = service.icon ? (icons as any)[service.icon] : null
          return {
            Icon,
            fallbackIcon: <Zap className="w-5 h-5" />,
            title: service?.title || '',
            description: service?.description || '',
          }
        })
        .filter((service) => service.title)
    : []

  const servicesFinal = servicesFromData.length ? servicesFromData : services

  return (
    <section id="services" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold text-navy-900 mb-6 tracking-tight">Our Services</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Specialists in the installation of doors and windows designed to provide security, style
            and comfort to your home or business
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesFinal.map((service: any, idx: number) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={service.title}
              className="group relative bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
            >
              {/* Hover background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 bg-navy-900 text-white rounded-2xl flex items-center justify-center mb-8 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gray-800 shadow-lg shadow-navy-900/10">
                {service.Icon ? (
                  <service.Icon className="w-5 h-5" />
                ) : service.fallbackIcon ? (
                  service.fallbackIcon
                ) : (
                  service.icon
                )}
              </div>

              <h3 className="text-xl font-bold text-navy-900 mb-4 leading-tight group-hover:text-gray-800 transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mb-8 grow">
                {service.description}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-navy-700 hover:text-navy-950 transition-colors group/link uppercase"
              >
                View details
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
