import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, Layout } from 'lucide-react'
import { useEditor } from '../hooks/useEditor'

interface EditableSectionProps {
  section: 'hero' | 'about_us' | 'services' | 'projects' | 'testimonials' | 'cta' | 'footer'
  children: ReactNode
  title?: string
}

export function EditableSection({ section, children, title }: EditableSectionProps) {
  const { isEditing, selectedSection, setSelectedSection } = useEditor()
  const isSelected = selectedSection === section

  if (!isEditing) return <>{children}</>

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setSelectedSection(section)
      }}
      className={`relative group cursor-pointer transition-all duration-300 ring-2 ring-transparent ${
        isSelected ? 'ring-navy-600 bg-navy-50/10' : 'hover:ring-navy-400 hover:bg-navy-50/5'
      }`}
    >
      {/* Visual Overlay Label */}
      <AnimatePresence>
        {(isSelected || true) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-50 px-3 py-1.5 rounded-t-xl flex items-center gap-2 transition-colors ${
              isSelected
                ? 'bg-navy-600 text-white'
                : 'bg-gray-200 text-gray-600 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {title || section}
            </span>
            <Edit2 className="w-3 h-3 ml-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className={`${isSelected ? 'scale-[0.99] transition-transform' : ''}`}>{children}</div>

      {/* Selected Indicator */}
      {isSelected && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-navy-600 z-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-navy-600 z-50" />
          <div className="absolute top-0 left-0 h-full w-1 bg-navy-600 z-50" />
          <div className="absolute top-0 right-0 h-full w-1 bg-navy-600 z-50" />
        </>
      )}
    </div>
  )
}
