import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const value = useMemo(
    () => ({
      showToast(message) {
        setToast(message)
        window.clearTimeout(ToastProvider.timeoutId)
        ToastProvider.timeoutId = window.setTimeout(() => {
          setToast(null)
        }, 1800)
      },
    }),
    [],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && <div className="toast-message">{toast}</div>}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}

export default ToastProvider
