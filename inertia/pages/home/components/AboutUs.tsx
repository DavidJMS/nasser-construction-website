import { motion } from 'framer-motion'
import { Award, ShieldCheck, Users, Hammer, ArrowRight } from 'lucide-react'

interface AboutUsData {
  categoryTag?: string | null
  titleMain?: string | null
  titleHighlight?: string | null
  titleSuffix?: string | null
  description?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  image1?: string | null
  image2?: string | null
}

interface AboutUsProps {
  data?: AboutUsData
}

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'award':
    case 'experience':
      return <Award className="w-8 h-8" />
    case 'shieldcheck':
    case 'quality':
      return <ShieldCheck className="w-8 h-8" />
    case 'hammer':
    case 'installation':
      return <Hammer className="w-8 h-8" />
    case 'users':
    case 'customer':
      return <Users className="w-8 h-8" />
    default:
      return <Award className="w-8 h-8" />
  }
}

export default function AboutUs({ data }: AboutUsProps) {
  const categoryTag = data?.categoryTag || 'Our Story'
  const titleMain = data?.titleMain || 'Excellence in'
  const titleHighlight = data?.titleHighlight || 'Door & Window'
  const titleSuffix = data?.titleSuffix || 'Installation'
  const description =
    data?.description ||
    'Nasser Construction: Efficiency and capability in Orlando, a subcontractor specializing in door and window installation for the professional sector.'
  const buttonText = data?.buttonText || 'DISCOVER MORE'
  const buttonLink = data?.buttonLink || '#contact'
  const image1 = data?.image1 || '/images/about-house.png'
  const image2 = data?.image2 || '/images/window-install.png'
  const features = [
    {
      id: 1,
      title: 'Experience',
      description: '+20 Years of experience in the industry',
      icon: 'award',
    },
    {
      id: 2,
      title: 'Quality',
      description: 'Products of the highest quality',
      icon: 'shieldcheck',
    },
    {
      id: 3,
      title: 'Certified Installation',
      description: 'Team of highly trained installers',
      icon: 'hammer',
    },
    {
      id: 4,
      title: 'Customer care',
      description: 'We provide exceptional service',
      icon: 'users',
    },
  ]

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Images Layout */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-[90%] rounded-2xl overflow-hidden shadow-2xl relative z-10 group">
              <img
                src={image1}
                alt="Construction detail"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-10 -right-4 w-[55%] rounded-2xl overflow-hidden border-8 border-white shadow-2xl z-20 group"
            >
              <img
                src={image2}
                alt="Window detail"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-gray-400/20 to-transparent" />
            </motion.div>

            {/* Accent background decoration */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gray-100 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pl-0 lg:pl-10 mt-16 lg:mt-0"
          >
            <div className="flex items-center gap-2 mb-6 uppercase tracking-[0.2em] text-gray-500 font-bold text-xs">
              <span className="w-8 h-px bg-gray-400" />
              {categoryTag}
            </div>

            <h3 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {titleMain} <span className="text-gray-600">{titleHighlight}</span> {titleSuffix}
            </h3>

            <div className="mb-10 text-lg leading-relaxed text-gray-600 max-w-xl">
              {description}
            </div>

            <motion.a
              whileHover={{ x: 5 }}
              href={buttonLink}
              className="inline-flex gap-3 items-center text-navy-900 font-bold uppercase text-[12px] tracking-[0.2em] group"
            >
              {buttonText}
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all group-hover:bg-navy-900 group-hover:text-white group-hover:border-navy-900">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={feature.title}
              className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm text-navy-900 mb-6 flex items-center justify-center transition-all group-hover:bg-navy-900 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3">
                {getIcon(feature.icon)}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[180px] uppercase tracking-wider">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
