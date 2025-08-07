// composables/useModal.js
import { ref } from 'vue'

// Estado global del modal
const isModalOpenMovil = ref(false)

export function useModalMovil() {
  const openModalMovil = () => {
    isModalOpenMovil.value = true
    document.body.style.overflow = 'hidden' // Prevenir scroll del body
  }

  const closeModalMovil = () => {
    isModalOpenMovil.value = false
    document.body.style.overflow = '' // Restaurar scroll del body
  }

  return {
    isModalOpenMovil,
    openModalMovil,
    closeModalMovil
  }
}