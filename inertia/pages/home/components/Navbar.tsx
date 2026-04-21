import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Edit3, Eye, LogOut } from 'lucide-react'
import { usePage, router } from '@inertiajs/react'
import { useEditor } from '../hooks/useEditor'
import { Button, Tooltip } from 'antd'

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'WINDOWS', href: '#products' },
  { label: 'DOORS', href: '#products' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'PROJECTS', href: '#products' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = usePage<any>().props
  const { isEditing, setIsEditing } = useEditor()
  const anchorBase = typeof window !== 'undefined' && window.location.pathname !== '/' ? '/' : ''
  const resolvedLinks = navLinks.map((link) => ({ ...link, href: `${anchorBase}${link.href}` }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    router.post('/logout')
  }

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled || isEditing
          ? 'glass shadow-sm py-2 border-b border-white/10'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a href={`${anchorBase}#home`} className="flex items-center gap-1 shrink-0 group">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-8 sm:h-9 transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav — centered links */}
          <div className="hidden lg:flex items-center gap-8">
            {resolvedLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-bold text-gray-800 hover:text-navy-900 tracking-wider transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Section: Auth & Edit Mode */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center bg-gray-100/80 backdrop-blur-md rounded-full p-1 border border-gray-200">
                <Button
                  shape="round"
                  type="default"
                  icon={
                    isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />
                  }
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase transition-all ${
                    isEditing
                      ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isEditing ? 'VER SITIO' : 'EDITAR'}
                </Button>

                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Tooltip title="Cerrar Sesión">
                  <Button
                    shape="round"
                    type="text"
                    icon={<LogOut className="w-4 h-4" />}
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  />
                </Tooltip>
              </div>
            )}

            {/* Contact button */}
            <div className="hidden lg:flex items-center">
              <a
                href={`${anchorBase}#contact`}
                className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white text-[12px] font-bold tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-navy-900/20 active:scale-95 cursor-pointer"
              >
                CONTACT US
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
          >
            <div className="px-6 py-8 space-y-4">
              {resolvedLinks.map((link, idx) => (
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-bold text-gray-800 hover:text-navy-900 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                href={`${anchorBase}#contact`}
                onClick={() => setMobileOpen(false)}
                className="block mt-6 text-center px-5 py-3 bg-navy-900 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer"
              >
                CONTACT US
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
