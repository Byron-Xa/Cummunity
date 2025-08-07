// utils/modal.js - Plugin global para modal

// Función principal del modal
const openModal = (value) => {
  const modal_overlay = document.querySelector('#modal_overlay')
  const modal = document.querySelector('#modal')
  
  if (!modal_overlay || !modal) {
    console.warn('Modal elements not found. Make sure elements with IDs "modal_overlay" and "modal" exist.')
    return
  }
  
  const modalCl = modal.classList
  const overlayCl = modal_overlay.classList
  
  if (value) {
    // Abrir modal
    overlayCl.remove('hidden')
    // Pequeño delay para que la transición se vea correctamente
    setTimeout(() => {
      modalCl.remove('opacity-0')
      modalCl.remove('-translate-y-full')
      modalCl.remove('scale-150')
    }, 10)
  } else {
    // Cerrar modal
    modalCl.add('opacity-0')
    modalCl.add('-translate-y-full')
    modalCl.add('scale-150')
    
    // Ocultar overlay después de la transición
    setTimeout(() => {
      overlayCl.add('hidden')
    }, 300)
  }
}

// Función para inicializar eventos adicionales del modal
const initModalEvents = () => {
  // Cerrar modal al hacer clic en el overlay
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'modal_overlay') {
      openModal(false)
    }
  })
  
  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal_overlay = document.querySelector('#modal_overlay')
      if (modal_overlay && !modal_overlay.classList.contains('hidden')) {
        openModal(false)
      }
    }
  })
}

// Plugin para Vue
const ModalPlugin = {
  install(app) {
    // Hacer la función disponible globalmente en window
    window.openModal = openModal
    
    // Inicializar eventos cuando Vue esté montado
    app.mixin({
      mounted() {
        // Solo inicializar una vez
        if (!window.modalEventsInitialized) {
          initModalEvents()
          window.modalEventsInitialized = true
        }
      }
    })
    
    // También disponible como método de Vue (opcional)
    app.config.globalProperties.$openModal = openModal
  }
}

// Para usar sin Vue (JavaScript vanilla)
if (typeof window !== 'undefined') {
  window.openModal = openModal
  
  // Auto-inicializar eventos cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalEvents)
  } else {
    initModalEvents()
  }
}

export default ModalPlugin
export { openModal }