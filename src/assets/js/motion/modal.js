// composables/useModal.js
import { ref } from 'vue'

// Estado global del modal
const isModalOpen = ref(false)

export function useModal() {
  const openModal = () => {
    isModalOpen.value = true
    document.body.style.overflow = 'hidden' // Prevenir scroll del body
  }

  const closeModal = () => {
    isModalOpen.value = false
    document.body.style.overflow = '' // Restaurar scroll del body
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}