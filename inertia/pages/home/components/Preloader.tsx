import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-navy-950 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.05, 1],
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            scale: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2,
              ease: 'easeInOut',
            },
          }}
          className="mb-12"
        >
          <img
            src="/images/logo.png"
            alt="Nasser Construction Logo"
            className="h-12 md:h-16 w-auto filter brightness-0 invert"
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-[10px] font-bold tracking-[0.4em] uppercase"
          >
            Cargando
          </motion.span>

          {/* Animated Loading Bar */}
          <div className="w-32 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
              className="w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Modern Overlay Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </motion.div>
  )
}
