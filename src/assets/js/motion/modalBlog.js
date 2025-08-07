import { ref } from 'vue'

const isWebPagesModalOpen = ref(false)

export function useWebPagesModal() {
  const openWebPagesModal = () => {
    isWebPagesModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeWebPagesModal = () => {
    isWebPagesModalOpen.value = false
    document.body.style.overflow = ''
  }
  
  return {
    isWebPagesModalOpen,
    openWebPagesModal,
    closeWebPagesModal
  }
}