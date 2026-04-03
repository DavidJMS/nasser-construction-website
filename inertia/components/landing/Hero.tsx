export default function Hero() {
  return (
    <section id="home" className="bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight">
              Custom-made doors and windows
              with professional installation
            </h1>

            <p className="mt-5 text-[15px] text-gray-500 leading-relaxed max-w-md">
              We install security doors and reinforced windows with
              premium finishes. Invisible security for your peace of mind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold tracking-wider uppercase rounded transition-colors"
              >
                Get a Quote
              </a>
              <a
                href="#products"
                className="px-6 py-2.5 text-gray-800 text-xs font-bold tracking-wider uppercase rounded border border-gray-300 hover:border-gray-500 transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Right — Image */}
          <div className="flex justify-end">
            <img
              src="/images/about-house.png"
              alt="Custom doors and windows on a modern house"
              className="w-full max-w-lg h-auto object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
