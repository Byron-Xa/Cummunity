<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { createIcons, icons } from 'lucide'
import router from '@/router'
export default {
    setup() {
        const isScrolled = ref(false)
        const isMobileMenuOpen = ref(false)

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 50
        }

        const handleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value
        }

        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false
        }

        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById('movil-menu')
            const movilButton = document.getElementById('movil-button')

            if (mobileMenu && movilButton &&
                !movilButton.contains(event.target) &&
                !mobileMenu.contains(event.target)) {
                closeMobileMenu()
            }
        }

        onMounted(() => {
            createIcons({
                icons,
                "stroke-width": 1.5,
                nameAttr: "data-lucide",
            });
            window.addEventListener('scroll', handleScroll)
            document.addEventListener('click', handleClickOutside)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })

        return {
            isScrolled,
            isMobileMenuOpen,
            handleMobileMenu,
            closeMobileMenu
        }
    }
}
</script>

<template>
    <nav :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out', isScrolled ? 'bg-gradient-to-r from-blue-700 via-teal-400 to-cyan-300 shadow-lg backdrop-blur-sm border-b-4 border-white/20 rounded-t-lg mx-4 mt-2 rounded-xl' : 'bg-transparent']">
        <div class="max-w-7xl mx-auto px-4 border-x border-white/20">
            <div class="flex justify-between items-center py-4">
                <!-- Logo/Imagen a la izquierda -->
                <div class="flex items-center">
                    <router-link :to="{ name: 'home' }" class="router-link group relative flex items-center px-4 py-1 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105">
                        <img src="../../public/software.png" alt="Logo" class="h-10 w-40">
                    </router-link>
                </div>

                <!-- Enlaces a la derecha -->
                <ul class="hidden md:flex space-x-2 lg:space-x-4">
                    <li class="nav-item">
                        <router-link :to="{ name: 'servicios' }"
                            class="router-link group relative flex items-center px-4 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
                            :class="isScrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                                : 'text-blue-800 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm'">
                            <i data-lucide="home"
                                class="h-4 w-4 lg:h-5 lg:w-5 mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span class="relative">
                                Inicio
                                <span
                                    class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'noticias' }"
                            class="router-link group relative flex items-center px-4 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
                            :class="isScrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                                : 'text-blue-800 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm'">
                            <i data-lucide="bell-plus"
                                class="h-4 w-4 lg:h-5 lg:w-5 mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span class="relative">
                                Noticias
                                <span
                                    class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'nosotros' }"
                            class="router-link group relative flex items-center px-4 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
                            :class="isScrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                                : 'text-blue-800 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm'">
                            <i data-lucide="users-round"
                                class="h-4 w-4 lg:h-5 lg:w-5 mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span class="relative">
                                Sobre Nosotros
                                <span
                                    class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'proyectos' }"
                            class="router-link group relative flex items-center px-4 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
                            :class="isScrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                                : 'text-blue-800 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm'">
                            <i data-lucide="briefcase"
                                class="h-4 w-4 lg:h-5 lg:w-5 mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span class="relative">
                                Proyectos
                                <span
                                    class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contactos' }"
                            class="router-link group relative flex items-center px-4 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
                            :class="isScrolled
                                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                                : 'text-blue-800 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm'">
                            <i data-lucide="mail"
                                class="h-4 w-4 lg:h-5 lg:w-5 mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span class="relative">
                                Contacto
                                <span
                                    class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </router-link>
                    </li>
                </ul>

                <!-- Botón hamburguesa -->
                <button 
                    id="movil-button" 
                    @click="handleMobileMenu"
                    :class="['md:hidden p-2 rounded-lg transition-all duration-200 transform hover:scale-105', isScrolled ? 'text-white hover:bg-white/20' : 'text-blue-800 hover:bg-blue-100']"
                    aria-label="Toggle mobile menu">
                    <div class="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                        <span
                            :class="['block h-0.5 w-6 bg-current transition-all duration-300 transform', isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '']"></span>
                        <span
                            :class="['block h-0.5 w-6 bg-current transition-all duration-300', isMobileMenuOpen ? 'opacity-0' : 'opacity-100']"></span>
                        <span
                            :class="['block h-0.5 w-6 bg-current transition-all duration-300 transform', isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : '']"></span>
                    </div>
                </button>
            </div>

            <!-- Menú móvil con animación -->
            <Transition 
                name="mobile-menu"
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in"
                enter-from-class="opacity-0 transform -translate-y-4 scale-95"
                enter-to-class="opacity-100 transform translate-y-0 scale-100"
                leave-from-class="opacity-100 transform translate-y-0 scale-100"
                leave-to-class="opacity-0 transform -translate-y-4 scale-95">
                <div 
                    v-show="isMobileMenuOpen"
                    id="movil-menu" 
                    class="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 origin-top">
                    <div class="bg-gradient-to-br from-blue-700 via-teal-400 to-cyan-300 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl overflow-hidden">
                        <ul class="py-4 ul-nav">
                            <li class="item-nav">
                                <router-link :to="{ name: 'servicios' }" @click="closeMobileMenu"
                                    class="flex items-center px-6 py-4 text-white hover:bg-white/20 transition-all duration-200 transform hover:translate-x-2 link-router">
                                    <i data-lucide="home" class="h-5 w-5 mr-3"></i>
                                    <span class="font-medium text-nav">Inicio</span>
                                </router-link>
                            </li>
                            <li class="item-nav">
                                <router-link :to="{ name: 'noticias' }" @click="closeMobileMenu"
                                    class="flex items-center px-6 py-4 text-white hover:bg-white/20 transition-all duration-200 transform hover:translate-x-2 link-router">
                                    <i data-lucide="bell-plus" class="h-5 w-5 mr-3"></i>
                                    <span class="font-medium text-nav">Noticias</span>
                                </router-link>
                            </li>
                            <li class="item-nav">
                                <router-link :to="{ name: 'nosotros' }" @click="closeMobileMenu"
                                    class="flex items-center px-6 py-4 text-white hover:bg-white/20 transition-all duration-200 transform hover:translate-x-2 link-router">
                                    <i data-lucide="users-round" class="h-5 w-5 mr-3"></i>
                                    <span class="font-medium text-nav">Sobre Nosotros</span>
                                </router-link>
                            </li>
                            <li class="item-nav">
                                <router-link :to="{ name: 'proyectos' }" @click="closeMobileMenu"
                                    class="flex items-center px-6 py-4 text-white hover:bg-white/20 transition-all duration-200 transform hover:translate-x-2 link-router">
                                    <i data-lucide="briefcase" class="h-5 w-5 mr-3"></i>
                                    <span class="font-medium text-nav">Proyectos</span>
                                </router-link>
                            </li>
                            <li class="item-nav">
                                <router-link :to="{ name: 'contactos' }" @click="closeMobileMenu"
                                    class="flex items-center px-6 py-4 text-white hover:bg-white/20 transition-all duration-200 transform hover:translate-x-2 link-router">
                                    <i data-lucide="mail" class="h-5 w-5 mr-3"></i>
                                    <span class="font-medium text-nav">Contacto</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<style scoped>
</style>