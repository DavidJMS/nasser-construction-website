const features = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    description: 'We make sure your new windows and doors fit perfectly and function properly.',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    description:
      'Our windows and doors are designed to be energy efficient, which can help you save on your energy bills in the long run.',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    description:
      'Our team has in-depth technical knowledge and is up to date with the latest technologies and trends in windows and doors.',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5.172a1 1 0 01.586-.897l14.142-6.101a1 1 0 011.238.414l2.97 4.95a1 1 0 01-.137 1.25l-2.829 2.828a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.414l.707-.707a1 1 0 00-.063-1.488l-6.364-4.243a1 1 0 00-1.237.126l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 01.126-1.414l.707-.707a1 1 0 000-1.414l-2.122-2.122zM12 18v3m0 0h.01M12 21h3m-3 0H9"
        />
      </svg>
    ),
    description: 'Personalized service and expert advice to help customers choose the best options.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose" className="relative py-32 overflow-hidden flex items-center min-h-[600px]">
      {/* Background with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/why-choose-bg.png"
          alt="Architectural background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-normal text-white max-w-4xl mx-auto">
            Quality, efficiency and service tailored to your needs
          </h2>
        </div>

        {/* Features Grid (2x2) */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="text-white shrink-0">
                {feature.icon}
              </div>
              <p className="text-[17px] text-white leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
