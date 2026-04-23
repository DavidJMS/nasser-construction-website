import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Head, usePage } from '@inertiajs/react'
import { api } from '~/utils/client'
import { ArrowUpRight } from 'lucide-react'
import PublicLayout from '~/layouts/public_layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

interface PageProps {
  footer: any
  ctas: any[]
}

export default function ProjectDetail({ footer, ctas }: PageProps) {
  const { url } = usePage()
  const projectId = Number(url.split('/').at(-1))

  const { data: projectResponse } = useQuery(
    api.projects.show.queryOptions({ params: { id: projectId.toString() } })
  )
  const { data: allProjectsResponse } = useQuery(api.projects.index.queryOptions())

  const project = projectResponse?.data
  const allProjects = allProjectsResponse?.data || []
  const similarProjects = allProjects
    .filter((p: any) => p.id !== projectId && p.category === project?.category)
    .slice(0, 3)

  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    if (project?.imageUrl) {
      setActiveImage(project.imageUrl)
    }
  }, [project?.id, project?.imageUrl])

  return (
    <PublicLayout footer={footer} ctas={ctas}>
      <Head title={project?.title || 'Project Details'} />

      {project ? (
        <div className="bg-white pb-24">
          {/* Banner Section */}
          <div className="pt-20 lg:pt-24">
            <div className="relative h-[250px] md:h-[350px] w-full">
              <div className="absolute inset-0 bg-[#0d2a4a]/70 z-10" />
              <img
                src="/images/hero-bg.png"
                alt="Projects Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                  Projects
                </h1>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            {/* Header / Intro */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{project.title}</h2>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {project.category || "Engineered of Orlando's climate"}
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                {project.description ||
                  'Lorem ipsum dolor sit amet consectetur. Cursus diam pulvinar ante hendrerit. Massa consequat sed sit arcu. Sed pellentesque ut ut turpis nec nisl gravida. Non sed proin facilisis accumsan bibendum cras. Morbi vitae odio vitae nibh phasellus at leo. Mauris sit diam eu pharetra in pulvinar eu arcu.'}
              </p>
            </div>

            {/* Main Image */}
            <div className="rounded-[2rem] overflow-hidden mb-6 aspect-[16/9] max-w-4xl mx-auto shadow-md">
              <img
                src={activeImage || project.imageUrl || '/images/door-panel.png'}
                alt={project.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Gallery Slider */}
            {project.images && project.images.length > 0 && (
              <div className="mb-20 relative">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={2}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  pagination={{ clickable: true }}
                  className="project-gallery-swiper"
                >
                  {project.images.map((img: any) => (
                    <SwiperSlide key={img.id}>
                      <div
                        className={`aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${activeImage === img.url ? 'ring-4 ring-[#0d2a4a] scale-[0.98]' : ''}`}
                        onClick={() => setActiveImage(img.url)}
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Similar Projects Section */}
            <div className="border-t border-gray-100 pt-16">
              <div className="grid md:grid-cols-3 gap-6">
                {similarProjects.length > 0 ? (
                  similarProjects.map((p: any) => (
                    <a
                      key={p.id}
                      href={`/project/${p.id}`}
                      className="group block relative aspect-[4/3.5] bg-[#d1d5db] rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          alt=""
                        />
                      )}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-gray-800 shadow-sm max-w-[80%]">
                          {p.title}
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors mt-1" />
                      </div>
                    </a>
                  ))
                ) : (
                  // Placeholders if no other projects exist
                  <>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="group relative aspect-[4/3.5] bg-[#d1d5db] rounded-[20px] overflow-hidden"
                      >
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <div className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-gray-800 shadow-sm max-w-[80%]">
                            {i === 1
                              ? 'Hurricane Resistant Impact Windows'
                              : i === 2
                                ? 'Sliding Window'
                                : 'Single Hung window'}
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-gray-600 mt-1" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#0d2a4a] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </PublicLayout>
  )
}
