import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

type EditorSection =
  | 'hero'
  | 'about_us'
  | 'services'
  | 'projects'
  | 'testimonials'
  | 'cta'
  | 'footer'
  | 'none'

interface EditorContextType {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  selectedSection: EditorSection
  setSelectedSection: (section: EditorSection) => void
  saveAction: (() => void) | null
  isSaving: boolean
  registerSaveAction: (action: (() => void) | null, loading?: boolean) => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSection, setSelectedSection] = useState<EditorSection>('none')
  const [saveAction, setSaveAction] = useState<(() => void) | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const registerSaveAction = useCallback(
    (action: (() => void) | null, loading: boolean = false) => {
      setSaveAction(() => action)
      setIsSaving(loading)
    },
    []
  )

  const handleSetSelectedSection = useCallback((section: EditorSection) => {
    setSelectedSection(section)
    setSaveAction(null)
    setIsSaving(false)
  }, [])

  return (
    <EditorContext.Provider
      value={{
        isEditing,
        setIsEditing,
        selectedSection,
        setSelectedSection: handleSetSelectedSection,
        saveAction,
        isSaving,
        registerSaveAction,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (context === undefined) {
    // Return a safe fallback for public pages that use components like Navbar and Footer
    return {
      isEditing: false,
      setIsEditing: () => {
        // If they try to edit from a public page, redirect them to the home editor
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      },
      selectedSection: 'none' as EditorSection,
      setSelectedSection: () => {},
      saveAction: null,
      isSaving: false,
      registerSaveAction: () => {},
    }
  }
  return context
}
