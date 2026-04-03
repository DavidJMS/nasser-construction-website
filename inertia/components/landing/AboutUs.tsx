const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: 'Experience',
    description: '+20 Years of experience in the industry',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Quality',
    description: 'Products of the highest quality',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
    title: 'Certified Installation',
    description: 'Team of highly trained installers',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: 'Customer care',
    description: 'We provide exceptional service',
  },
]

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Images Layout */}
          <div className="relative">
            <div className="w-[88%] rounded-lg overflow-hidden shadow-sm">
              <img
                src="/images/about-house.png"
                alt="Construction detail"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-0 w-[52%] rounded-lg overflow-hidden border-[6px] border-white shadow-xl">
              <img
                src="/images/window-install.png"
                alt="Window detail"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pl-0 lg:pl-16 mt-16 lg:mt-0">
            <h3 className="text-3xl font-medium text-gray-900 mb-8 font-sans">
              About Us
            </h3>

            <div className="mb-10 text-[15px] leading-[1.8] text-gray-800 max-w-xl">
              <span className="font-bold">Nasser Construction:</span> Efficiency and capability in Orlando, a subcontractor specializing in door and window installation for the professional sector. Capable of managing large projects and complex renovations, we combine consistent workmanship with high-quality standards to build efficiently alongside you.
            </div>

            <a
              href="#contact"
              className="inline-flex border border-navy-900 rounded-[2px] px-7 py-2.5 items-center justify-center text-navy-900 font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-navy-900 hover:text-white transition-all duration-300"
            >
              VIEW MORE
            </a>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 rounded-2xl group"
            >
              <div className="text-navy-900 mb-6 flex items-center justify-center">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                {feature.title}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-[150px] uppercase tracking-wider">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
