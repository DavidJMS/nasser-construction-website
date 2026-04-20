import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const reviews = [
  {
    stars: 5,
    text: 'Nasser Construction transformed our home with their impeccable window installation. The attention to detail and professionalism were unmatched. Highly recommended!',
    author: 'Sarah Daniels',
    role: 'Homeowner, Orlando',
    avatar_url: '',
  },
  {
    stars: 5,
    text: 'Working with Nasser was seamless. They managed our large-scale door replacement project ahead of schedule and with perfect quality. Truly exceptional workmanship.',
    author: 'Richard Forks',
    role: 'Property Manager',
    avatar_url: '',
  },
  {
    stars: 5,
    text: 'The security doors they installed are both beautiful and incredibly solid. Their team was respectful and did a very clean job. We feel much safer now.',
    author: 'Daniel Petrovich',
    role: 'Villa Owner',
    avatar_url: '',
  },
  {
    stars: 5,
    text: 'Exceptional service from start to finish. The acoustic insulation windows have made a huge difference in our quality of life near the busy main road.',
    author: 'Sarah Mitchell',
    role: 'Resident',
    avatar_url: '',
  },
  {
    stars: 5,
    text: 'Top-tier professionalism. They understand the nuances of high-end builds and provided custom solutions that exceeded our design expectations.',
    author: 'Michael Chen',
    role: 'Interior Designer',
    avatar_url: '',
  },
  {
    stars: 5,
    text: 'A reliable subcontractor that delivers on their promises. Their capacity to handle complex renovations is exactly what we were looking for.',
    author: 'Elena Rodriguez',
    role: 'Real Estate Developer',
    avatar_url: '',
  },
]

export default function Testimonials({ data }: { data: any[] }) {
  const reviewsFromData = Array.isArray(data)
    ? data
        .map((testimonial: any) => ({
          stars: Number(testimonial?.rating ?? 5),
          text: testimonial?.content || '',
          author: testimonial?.author || '',
          role: testimonial?.role || '',
          avatar_url: testimonial?.avatar_url || '',
        }))
        .filter((review) => review.text && review.author)
    : []

  const reviewsFinal = reviewsFromData.length ? reviewsFromData : reviews

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          {/* Left Column — Title & Subtext */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6 uppercase tracking-[0.2em] text-gray-500 font-bold text-xs">
                <span className="w-8 h-px bg-gray-400" />
                Testimonials
              </div>
              <h2 className="text-5xl font-bold text-navy-900 leading-[1.05] mb-8 tracking-tight">
                What our <br />
                <span className="text-gray-600">customers</span> say
              </h2>
              <p className="text-lg text-gray-500 font-normal leading-relaxed max-w-sm mb-10">
                The trust of those who have already renovated their spaces with us is our greatest
                pride. Discover their experiences.
              </p>

              <div className="flex items-center gap-4 mb-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100"
                    >
                      <img src={`https://i.pravatar.cc/150?u=${idx + 20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-navy-900">4.9/5 Rating</div>
                  <div className="text-gray-500 text-xs">From 200+ Reviews</div>
                </div>
              </div>

              {/* Added Image to fill white space */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img
                  src="/images/client-satisfaction.png"
                  alt="Modern Construction"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Testimonial Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-12">
            {/* Column 1 */}
            <div className="space-y-12">
              {reviewsFinal.slice(0, 3).map((review, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="group relative pb-12 border-b border-gray-100 last:border-0 cursor-pointer"
                >
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                  <div className="flex gap-0.5 mb-6 text-gold-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < (review.stars || 5) ? 'fill-current' : 'opacity-30'}`}
                      />
                    ))}
                  </div>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={review.avatar_url || `https://i.pravatar.cc/150?u=${review.author}`}
                        alt={review.author}
                      />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-navy-900">{review.author}</div>
                      <div className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 2 (Staggered) */}
            <div className="space-y-12 lg:pt-32">
              {reviewsFinal.slice(3, 6).map((review, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  key={i}
                  className="group relative pb-12 border-b border-gray-100 last:border-0 cursor-pointer"
                >
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                  <div className="flex gap-0.5 mb-6 text-gold-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < (review.stars || 5) ? 'fill-current' : 'opacity-30'}`}
                      />
                    ))}
                  </div>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={review.avatar_url || `https://i.pravatar.cc/150?u=${review.author}`}
                        alt={review.author}
                      />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-navy-900">{review.author}</div>
                      <div className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
