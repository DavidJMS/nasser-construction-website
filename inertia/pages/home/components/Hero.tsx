import type Hero from '#models/hero'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function HeroComponent({ data }: { data: Hero }) {
  // Use provided data or fall back to original hardcoded content
  const badge = data?.badge || 'Premium Security Solutions'
  const title = data?.title || 'Custom-made doors and windows with professional installation'
  const description =
    data?.description ||
    'We install security doors and reinforced windows with premium finishes. Invisible security for your peace of mind.'
  const primaryButtonText = data?.primaryButtonText || 'Get a Quote'
  const primaryButtonLink = data?.primaryButtonLink || '#contact'
  const secondaryButtonText = data?.secondaryButtonText || 'View Projects'
  const image1 = data?.image1 || '/images/about-house.png'
  const image2 = data?.image2 || '/images/hero-bg.png'
  const image3 = data?.image3 || '/images/window-product.png'

  return (
    <section id="home" className="relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-gray-100 rounded-full blur-3xl opacity-60 animate-float" />
      <div
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-navy-50 rounded-full blur-3xl opacity-60 animate-float"
        style={{ animationDelay: '-2s' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left — Text (WIDER) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold tracking-widest uppercase mb-6"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {badge}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-gray-900 leading-[1.05] mb-8 tracking-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={primaryButtonLink}
                className="px-8 py-4 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-full shadow-xl shadow-navy-900/10 transition-all flex items-center gap-2 group cursor-pointer"
              >
                {primaryButtonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-gray-900 text-xs font-bold tracking-[0.15em] uppercase rounded-full border border-gray-200 hover:border-gray-400 transition-all cursor-pointer"
              >
                {secondaryButtonText}
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Image Collage (lg:col-span-5) */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] mt-16 lg:mt-0">
            {/* Background Accent Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-navy-100/30 rounded-full blur-[100px] -z-10" />

            {/* Main Image (Grand Villa) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-0 top-10 w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-20 group cursor-pointer"
            >
              <img
                src={image1}
                alt="Luxury Modern Villa"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Secondary Image (Door Detail) — OVERLAPPING */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="absolute -right-4 bottom-12 w-[60%] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white z-30 group cursor-pointer"
            >
              <img
                src={image2}
                alt="Premium Door Detail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-gray-900/10 to-transparent" />
            </motion.div>

            {/* Tertiary Image (Window View) — TOP DECOR */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="absolute top-0 right-0 w-[45%] aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 z-10 group hidden lg:block backdrop-blur-sm cursor-pointer"
            >
              <img
                src={image3}
                alt="Window View"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
