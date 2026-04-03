const reviews = [
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Sarah Daniels',
  },
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Richard Forks',
  },
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Daniel Petrovich',
  },
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Sarah Mitchell',
  },
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Richard Forks',
  },
  {
    stars: 5,
    text: 'Lorem ipsum dolor sit amet consectetur. Dignissim risus aenean viverra morbi tellus vestibulum. Amet ac tortor quam neque amet sed.',
    author: 'Daniel Petrovich',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Title & Subtext (Col 1-5) */}
          <div className="lg:col-span-5">
            <h2 className="text-[48px] font-bold text-navy-900 leading-[1.05] mb-8">
              What our customers say
            </h2>
            <p className="text-[17px] text-gray-500 font-normal leading-relaxed max-w-sm">
              The trust of those who have already renovated their spaces with us is our greatest
              pride. Discover their experiences.
            </p>
          </div>

          {/* Right Column — Testimonial Grid (Col 6-12) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-12">
            {/* Column 1 */}
            <div className="space-y-12">
              {reviews.slice(0, 3).map((review, i) => (
                <div key={i} className="pb-10 border-b border-gray-100 last:border-0">
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 text-gold-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{review.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-navy-900 font-bold text-[10px]">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[14px] font-bold text-gray-900">{review.author}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Staggered) */}
            <div className="space-y-12 pt-28">
              {reviews.slice(3, 6).map((review, i) => (
                <div key={i} className="pb-10 border-b border-gray-100 last:border-0">
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 text-gold-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{review.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-navy-900 font-bold text-[10px]">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[14px] font-bold text-gray-900">{review.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
