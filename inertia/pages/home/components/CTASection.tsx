import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-premium pt-20 pb-0 px-10 md:px-24 shadow-2xl shadow-navy-900/20 cursor-pointer"
        >
          {/* Decorative Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Floating Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-400 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32 animate-float" />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-navy-400 rounded-full blur-[80px] opacity-20 -ml-24 -mb-24 animate-float"
            style={{ animationDelay: '-3s' }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl pb-20 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-gray-100 text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Expert Installations
              </motion.div>

              <h2 className="text-4xl md:text-[56px] font-bold text-white leading-[1.05] mb-8 tracking-tight">
                Installation experts <br />
                at your service.
              </h2>
              <p className="text-lg md:text-xl text-gray-200/80 leading-relaxed mb-12 max-w-sm mx-auto lg:mx-0">
                Get a quote tailored to your needs and secure the investment of a lifetime.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-navy-900 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all rounded-2xl shadow-xl"
                >
                  Get a Quote
                  <Send className="w-4 h-4" />
                </motion.a>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-gray-700 bg-gray-800"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-300">Join 500+ homeowners</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:flex items-end self-end">
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="w-full flex justify-end -mb-4 -mr-20"
              >
                <img
                  src="/images/cta-doors-fan.png"
                  alt="Modern doors showcase"
                  className="w-[120%] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
