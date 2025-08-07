// composables/useModal.js
import { ref } from 'vue'

// Estado global del modal
const isModalOpenAplicacion = ref(false)

export function useModalAplicacion() {
  const openModalAplicacion = () => {
    isModalOpenAplicacion.value = true
    document.body.style.overflow = 'hidden' // Prevenir scroll del body
  }

  const closeModalAplicacion = () => {
    isModalOpenAplicacion.value = false
    document.body.style.overflow = '' // Restaurar scroll del body
  }

  return {
    isModalOpenAplicacion,
    openModalAplicacion,
    closeModalAplicacion
  }
}