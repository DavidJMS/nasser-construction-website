export default function CTASection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 pt-16 pb-0 px-10 md:px-20 shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center h-full">
            {/* Left Content */}
            <div className="max-w-xl pb-16">
              <h2 className="text-3xl md:text-[44px] font-bold text-white leading-[1.1] mb-6">
                Installation experts at your service.
              </h2>
              <p className="text-lg md:text-[19px] text-white/80 leading-relaxed mb-10 max-w-sm">
                Get a quote tailored to your needs and secure the investment of a lifetime.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-navy-900 text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-gray-50 transition-all rounded-sm shadow-lg"
              >
                Get a Quote
              </a>
            </div>

            {/* Right Image (Fan of doors - White background version) */}
            <div className="relative hidden md:flex items-end h-full self-end">
              <div className="w-full flex justify-end -mb-8 -mr-16 lg:-mr-24">
                <img
                  src="/images/cta-doors-fan-white.png"
                  alt="Modern doors showcase"
                  className="w-[110%] h-auto object-contain transform translate-y-6"
                />
              </div>
            </div>
          </div>

          {/* New subtle brand gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 via-navy-900 to-[#0b59a8] opacity-30 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
