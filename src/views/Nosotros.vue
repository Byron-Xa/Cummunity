<script>
import Footer from '../components/Footer.vue'
import Escritorio from '../components/Escritorio.vue'

export default {
    components: {
        Footer,
        Escritorio,
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
}
</script>
<template>
    <div class="min-h-screen w-full bg-gradient-to-r from-blue-100 via-teal-200 to-blue-400 relative">
        <!-- Navegación con efecto scroll -->
        <div v-if="isLoading"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-500 transition-opacity duration-300">
            <div class="flex flex-col items-center space-y-4">
                <img src="../../public/Systems.png" alt="Cargando..." class="w-16 h-16 animate-spin" />
                <p class="text-white font-medium text-lg">Cargando...</p>
            </div>
        </div>
        <div v-if="!isLoading" :class="['main-content', { 'visible': showContent }]">
            <Escritorio />
            <!-- Sección Hero -->

            <section class="container relative pt-22 pb-20 px-4">
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div class="service-card from-primary-500 rounded-lg shadow-md overflow-hidden transition duration-300 border-primary-600 border-2 animate-slide-from-left">
                        <div class="p-4 sm:p-5 md:p-6">
                            <div
                                class="service-icon h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-primary-100 mx-auto">
                                <i data-lucide="shield-user" class="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"></i>
                            </div>
                            <h3
                                class="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-primary-800 font-desing">
                                Misión
                            </h3>
                            <div class="text-gray-600 text-center text-sm sm:text-base space-y-2 sm:space-y-3">
                                <p>Desarrollamos soluciones tecnológicas integrales que conectan y protegen comunidades
                                    a través de aplicaciones web, móviles y de escritorio innovadoras, complementadas
                                    con sistemas de videovigilancia de última generación.</p>
                                <p>Nos dedicamos a crear herramientas digitales que fortalecen la comunicación, mejoran
                                    la seguridad y optimizan la gestión comunitaria, brindando un servicio personalizado
                                    y confiable a nuestros clientes.</p>
                            </div>
                        </div>
                    </div>
                    <div class="service-card from-primary-500 rounded-lg shadow-md overflow-hidden transition duration-300 border-primary-600 border-2 animate-slide-from-right">
                        <div class="p-4 sm:p-5 md:p-6">
                            <div
                                class="service-icon h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-primary-100 mx-auto">
                                <i data-lucide="eye" class="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"></i>
                            </div>
                            <h3
                                class="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-primary-800 font-desing">
                                Visión
                            </h3>
                            <div class="text-gray-600 text-center text-sm sm:text-base space-y-2 sm:space-y-3">
                                <p>Ser la empresa líder en el desarrollo de ecosistemas tecnológicos comunitarios en la
                                    región, reconocida por transformar la manera en que las comunidades se conectan,
                                    comunican y se protegen.</p>
                                <p>Aspiramos a ser el socio tecnológico de confianza que impulse el crecimiento digital
                                    y la seguridad de organizaciones, condominios, empresas y comunidades residenciales.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    </div>
</template>
