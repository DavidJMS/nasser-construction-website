import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, createElement } from 'react'
import { Focus, icons } from 'lucide-react'
import { useEditor } from '../hooks/useEditor'

const defaultFeatures = [
  {
    id: 1,
    icon: 'Focus',
    title: 'Perfect Fit',
    description: 'We make sure your new windows and doors fit perfectly and function properly.',
    order: 1,
  },
  {
    id: 2,
    icon: 'Zap',
    title: 'Energy Efficient',
    description:
      'Our windows and doors are designed to be energy efficient, helping you save on your energy bills.',
    order: 2,
  },
  {
    id: 3,
    icon: 'ShieldCheck',
    title: 'Expert Knowledge',
    description: 'Our team has in-depth technical knowledge of the latest technologies and trends.',
    order: 3,
  },
  {
    id: 4,
    icon: 'Headphones',
    title: 'Personalized Service',
    description:
      'Personalized service and expert advice to help customers choose the best options.',
    order: 4,
  },
]

interface Feature {
  id?: number
  icon: string | null
  title: string
  description: string
  order: number | null
}

export default function WhyChooseUs({ features }: { features?: Feature[] }) {
  const { isEditing } = useEditor()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const y = useTransform(springScroll, [0, 1], ['-30%', '30%'])

  const displayFeatures = features?.length ? features : defaultFeatures

  return (
    <section
      id="why-choose"
      ref={containerRef}
      className={`relative py-20 overflow-hidden flex items-center min-h-[350px] bg-navy-950 ${isEditing ? 'pointer-events-none' : ''}`}
    >
      {/* Background with aggressive parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          style={{ y, scale: 1.5 }}
          src="/images/why-choose-bg.png"
          alt="Architectural background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-950/90 via-navy-950/40 to-navy-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-8 uppercase tracking-[0.3em] text-gray-500 font-bold text-xs">
            <span className="w-8 h-px bg-gray-600" />
            Excellence as Standard
            <span className="w-8 h-px bg-gray-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight tracking-tight">
            Quality, efficiency and <br />
            <span className="text-gray-400">service tailored</span> to your needs
          </h2>
        </motion.div>

        {/* Features Grid (Staggered) */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
          {displayFeatures.map((feature, i) => {
            const IconComponent = feature.icon ? (icons as any)[feature.icon] : Focus
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                key={feature.id || feature.title}
                className="flex items-start gap-8 group p-6 rounded-3xl hover:bg-white/5 transition-colors duration-500 cursor-pointer"
              >
                <div className="text-gray-100 shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:scale-110 shadow-xl shadow-black/20">
                  {IconComponent ? (
                    createElement(IconComponent, { className: 'w-8 h-8 md:w-10 md:h-10' })
                  ) : (
                    <Focus className="w-8 h-8 md:w-10 md:h-10" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-gray-300 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-[15px] text-gray-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
