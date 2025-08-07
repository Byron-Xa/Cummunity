<script>
import { ref } from 'vue'
import Footer from '../components/Footer.vue'
import Escritorio from '../components/Escritorio.vue'
import { useModal  } from '../assets/js/motion/modal.js'
import { useWebPagesModal } from '../assets/js/motion/modalBlog.js'
import { useModalAplicacion } from '../assets/js/motion/modalAplicacion'
import { useModalMovil } from '../assets/js/motion/modalMovil'
import Movil from '../components/Informacion/Movil.vue'
import PaguinasWeb from '../components/Informacion/PaginasWeb.vue'
import AplicacionesWeb from '../components/Informacion/AplicacionesWeb.vue'
import AplicacionesMoviles from '../components/Informacion/AplicacionesMoviles.vue'
import Noticias from './Noticias.vue'

export default {
    components: {
        Footer,
        Escritorio,
        AplicacionesWeb,
        AplicacionesMoviles,
        PaguinasWeb,
        Movil,
        Noticias
    },
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        const loadingTime = Math.floor(Math.random() * 100) + 500;

        setTimeout(() => {
            this.isLoading = false;
        }, loadingTime);
    },
    setup() {
        const { isModalOpenMovil, openModalMovil, closeModalMovil } = useModalMovil();
        const { isModalOpenAplicacion, openModalAplicacion, closeModalAplicacion } = useModalAplicacion();
        const { isWebPagesModalOpen, openWebPagesModal, closeWebPagesModal } = useWebPagesModal();
        const { isModalOpen, openModal, closeModal } = useModal()
        return {
            isModalOpen,
            openModal,
            closeModal,
            isWebPagesModalOpen,
            openWebPagesModal,
            closeWebPagesModal,
            isModalOpenAplicacion,
            openModalAplicacion,
            closeModalAplicacion,
            isModalOpenMovil,
            openModalMovil,
            closeModalMovil
        }
    }
}
</script>
<template>
    <div class="min-h-screen w-full bg-gradient-to-r from-blue-600 via-teal-300 to-blue-500 relative">
        <div v-if="isLoading"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-500 transition-opacity duration-300">
            <div class="flex flex-col items-center space-y-4">
                <img src="../../public/Systems.png" alt="Cargando..." class="w-16 h-16 animate-spin" />
                <p class="text-white font-medium text-lg">Cargando...</p>
            </div>
        </div>
        <div v-if="!isLoading" :class="['main-content', { 'visible': showContent }]">
            <Escritorio />
            <div class="desktop-content pt-16">
                <section class="relative pt-32 pb-20 px-4">
                    <h1
                        class="main-title text-4xl md:text-5xl font-bold text-center text-primary-800 mb-4 animate-slide-up animate-slide-down">
                        Nuestros <span class="text-primary-600">Servicios</span>
                    </h1>
                    <div class="container mx-auto px-4 md:px-6 text-center">
                        <p class="md:text-xl max-w-3xl mx-auto animate-slide-down-delay-1">Soluciones tecnológicas a
                            medida para potenciar el
                            crecimiento de tu negocio. Desarrollamos con pasión y precisión para convertir tus ideas en
                            realidad.</p>
                    </div>
                </section>

                <!-- Servicios principales -->
                <section class="py-16 container mx-auto px-4 md:px-6">
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Páginas Web -->
                        <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 animate-slide-from-left">
                            <div class="p-6">
                                <div class="service-icon h-16 w-16 rounded-full flex items-center justify-center mb-6 text-primary-100 mx-auto">
                                    <i data-lucide="layout-dashboard" class="h-8 w-8"></i>
                                </div>
                                <h3 class="text-xl font-bold text-center mb-4 text-primary-800 font-desing">Páginas Web
                                </h3>
                                <p class="text-gray-600 text-center">Diseñamos sitios web atractivos, responsivos y
                                    optimizados para convertir visitantes en clientes.</p>
                                <ul class="mt-4 space-y-2 text-gray-600">
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Diseño personalizado</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Adaptable a todos los dispositivos</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Optimización SEO</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-6 pb-6">
                                <button @click="openModal" class="block text-center bg-primary-600 hover:bg-primary-700 text-primary-100 py-2 px-4 rounded-md transition">Más
                                    información</button>
                            </div>
                        </div>

                        <!-- Blogs -->
                        <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 animate-slide-from-left">
                            <div class="p-6">
                                <div
                                    class="service-icon h-16 w-16 rounded-full flex items-center justify-center mb-6 text-primary-100 mx-auto">
                                    <i data-lucide="file-text" class="h-8 w-8"></i>
                                </div>
                                <h3 class="text-xl font-bold text-center mb-4 text-primary-800 font-desing">Blogs</h3>
                                <p class="text-gray-600 text-center">Plataformas de contenido optimizadas para atraer
                                    tráfico y posicionar tu marca como referente en tu sector.</p>
                                <ul class="mt-4 space-y-2 text-gray-600">
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle" class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>CMS personalizados</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle" class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Estrategias de contenido</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Integración con redes sociales</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-6 pb-6">
                                <button @click="openWebPagesModal"
                                    class="block text-center bg-primary-600 hover:bg-primary-700 text-primary-100 py-2 px-4 rounded-md transition">Más
                                    información</button>
                            </div>
                        </div>

                        <!-- Aplicaciones Web -->
                        <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 animate-slide-from-right">
                            <div class="p-6">
                                <div
                                    class="service-icon h-16 w-16 rounded-full flex items-center justify-center mb-6 text-primary-100 mx-auto">
                                    <i data-lucide="monitor" class="h-8 w-8"></i>
                                </div>
                                <h3 class="text-xl font-bold text-center mb-4 text-primary-800 font-desing">Aplicaciones
                                    Web</h3>
                                <p class="text-gray-600 text-center">Desarrollo de aplicaciones web a medida que
                                    optimizan y automatizan procesos empresariales.</p>
                                <ul class="mt-4 space-y-2 text-gray-600">
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle" class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Desarrollo frontend y backend</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle" class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Integración con sistemas existentes</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Soluciones en la nube</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-6 pb-6">
                                <button @click="openModalAplicacion"
                                    class="block text-center bg-primary-600 hover:bg-primary-700 text-primary-100 py-2 px-4 rounded-md transition">Más
                                    información</button>
                            </div>
                        </div>

                        <!-- Aplicaciones Móviles -->
                        <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 animate-slide-from-right">
                            <div class="p-6">
                                <div
                                    class="service-icon h-16 w-16 rounded-full flex items-center justify-center mb-6 text-primary-100 mx-auto">
                                    <i data-lucide="smartphone" class="h-8 w-8"></i>
                                </div>
                                <h3 class="text-xl font-bold text-center mb-4 text-primary-800 font-desing">Aplicaciones
                                    Móviles</h3>
                                <p class="text-gray-600 text-center">Apps nativas y multiplataforma para iOS y Android
                                    que conectan con tu audiencia donde quiera que esté.</p>
                                <ul class="mt-4 space-y-2 text-gray-600">
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Desarrollo iOS y Android</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Aplicaciones híbridas</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i data-lucide="check-circle"
                                            class="h-5 w-5 text-secondary-500 mr-2 mt-0.5"></i>
                                        <span>Mantenimiento y actualizaciones</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-6 pb-6">
                                <button @click="openModalMovil"
                                    class="block text-center bg-primary-600 hover:bg-primary-700 text-primary-100 py-2 px-4 rounded-md transition">Más
                                    información</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
        <AplicacionesWeb />
        <AplicacionesMoviles />
        <PaguinasWeb />
        <Movil />
    </div>
</template>