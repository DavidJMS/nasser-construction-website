import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, Layout, LayoutGrid } from 'lucide-react'

interface Product {
  image: string
  title: string
}

const doorProjects: Product[] = [
  { image: '/images/door-panel.png', title: 'Hurricane Resistant Impact Doors' },
  { image: '/images/sliding-door.png', title: 'Sliding Patio Doors' },
  { image: '/images/door-panel.png', title: 'Single Hung Entry Doors' },
]

const windowProjects: Product[] = [
  { image: '/images/window-product.png', title: 'Hurricane Resistant Impact Windows' },
  { image: '/images/sliding-door.png', title: 'Sliding Windows' },
  { image: '/images/window-product.png', title: 'Single Hung Windows' },
]

const ProjectSection: FC<{ title: string; icon: ReactNode; projects: Product[] }> = ({
  title,
  icon,
  projects,
}) => (
  <div className="mb-24">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between mb-10 border-b border-gray-100 pb-8"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 text-gray-600 rounded-2xl">{icon}</div>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-full text-gray-400 hover:text-gray-800 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-full text-gray-400 hover:text-gray-800 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          key={i}
          className="group relative aspect-4/5 bg-gray-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Arrow Icon Top-Right */}
          <div className="absolute top-6 right-6 translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 bg-gray-800 text-white rounded-2xl flex items-center justify-center shadow-xl">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <h4 className="text-lg font-bold text-white leading-tight">{project.title}</h4>
              <div className="mt-3 flex items-center gap-2 text-gray-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Project Details
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

export default function Products({ data }: { data: any[] }) {
  const normalizedProjects = Array.isArray(data)
    ? data
        .map((project: any) => ({
          image: project?.imageUrl || project?.image || project?.image_url || '/images/door-panel.png',
          title: project?.title || '',
          category: project?.category || '',
        }))
        .filter((project) => project.title)
    : []

  const doorProjectsFromData = normalizedProjects.filter(
    (project) => /door/i.test(project.category) || /door/i.test(project.title)
  )

  const windowProjectsFromData = normalizedProjects.filter(
    (project) => /window/i.test(project.category) || /window/i.test(project.title)
  )

  const doorProjectsFinal = doorProjectsFromData.length ? doorProjectsFromData : doorProjects
  const windowProjectsFinal = windowProjectsFromData.length ? windowProjectsFromData : windowProjects

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold tracking-widest uppercase mb-4">
            Project Showcase
          </div>
          <h2 className="text-4xl font-bold text-navy-900 mb-6 tracking-tight">
            Our Recent Projects
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Custom solutions executed with expertise.
            <br className="hidden sm:block" />
            Explore our project gallery and see the quality of our finished products.
          </p>
        </motion.div>

        {/* Doors Section */}
        <ProjectSection
          title="Premium Doors"
          icon={<LayoutGrid className="w-6 h-6" />}
          projects={doorProjectsFinal}
        />

        {/* Windows Section */}
        <ProjectSection
          title="Modern Windows"
          icon={<Layout className="w-6 h-6" />}
          projects={windowProjectsFinal}
        />
      </div>
    </section>
  )
}
