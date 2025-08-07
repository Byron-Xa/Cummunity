// composables/useModal.js
import { ref } from 'vue'

// Estado global del modal
const isModalOpenDesktop = ref(false)

export function useModalDesktop() {
  const openModalDesktop = () => {
    isModalOpenDesktop.value = true
    document.body.style.overflow = 'hidden' // Prevenir scroll del body
  }

  const closeModalDesktop = () => {
    isModalOpenDesktop.value = false
    document.body.style.overflow = '' // Restaurar scroll del body
  }

  return {
    isModalOpenDesktop,
    openModalDesktop,
    closeModalDesktop
  }
}