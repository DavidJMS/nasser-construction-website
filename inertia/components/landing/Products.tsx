import { FC, ReactNode } from 'react'

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
  <div className="mb-20">
    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
      <div className="flex items-center gap-3">
        <div className="text-navy-900">{icon}</div>
        <h3 className="text-2xl font-medium text-gray-900">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-navy-900 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-navy-900 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <div
          key={i}
          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Arrow Icon Top-Right */}
          <div className="absolute top-4 right-4">
            <svg
              className="w-5 h-5 text-gray-900 opacity-60 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
          {/* Bottom Badge */}
          <div className="absolute bottom-6 left-6">
            <div className="bg-white/95 backdrop-blur-sm px-5 py-3 rounded-md shadow-sm">
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function Products() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-medium text-navy-900 mb-6">Our Projects</h2>
          <p className="text-[17px] text-gray-700 leading-relaxed">
            Custom solutions executed with expertise.
            <br />
            Explore our project gallery and see the quality of our finished products.
          </p>
        </div>

        {/* Doors Section */}
        <ProjectSection
          title="Doors"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="3" width="16" height="18" rx="1" />
            </svg>
          }
          projects={doorProjects}
        />

        {/* Windows Section */}
        <ProjectSection
          title="Windows"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm0 9h7v7h-7v-7zm-9 0h7v7H4v-7z" />
            </svg>
          }
          projects={windowProjects}
        />
      </div>
    </section>
  )
}
