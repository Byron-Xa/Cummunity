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
            this.$nextTick(() => {
                this.setupScrollAnimation();
            });
        }, loadingTime);

    },
    methods: {
        setupScrollAnimation() {
            const elements = document.querySelectorAll('.scroll-items');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 });

            elements.forEach(element => observer.observe(element));
        }
    }
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
            <section class="relative pt-32 pb-20 px-4">
                <div class="container mx-auto text-center relative z-10">
                    <div class="mb-8">
                        <h1 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 animate-slide-down">
                            Community System Software
                        </h1>
                        <p
                            class="text-xl md:text-2xl via-purple-400 max-w-3xl mx-auto leading-relaxed animate-slide-down-delay-1">
                            Transformamos tus ideas en <span class="text-grid-500 font-semibold">soluciones
                                digitales</span>
                        </p>
                        <div class="flex justify-center items-center px-4 py-2 animate-slide-down-delay-2">
                            <img src="../../public/Systems.png" alt="Logo" class="h-35 w-40">
                        </div>
                    </div>
                </div>
            </section>
            <section class="relative">
                <div class="container mx-auto px-4 sm:px-6 md:px-8">
                    <div class="max-w-6xl mx-auto">
                        <!-- Grid de estadísticas -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <!-- Proyectos Exitosos -->
                            <div
                                class="animate-slide-below bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-primary-300 shadow-xl">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4">
                                    <i data-lucide="check-circle"
                                        class="w-8 h-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                                </div>
                                <div class="text-4xl font-bold text-primary-700 mb-2 counter" data-target="50">1</div>
                                <div class="text-primary-600 font-medium">Proyectos Exitosos</div>
                                <div class="text-sm text-primary-500 mt-2">Apps web, móviles y desktop</div>
                            </div>

                            <!-- Clientes Satisfechos -->
                            <div
                                class=" animate-slide-below-1 bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-secondary-300 shadow-xl">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full mb-4">
                                    <i data-lucide="heart" class="h-8 w-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                                </div>
                                <div class="text-4xl font-bold text-secondary-700 mb-2">100%</div>
                                <div class="text-secondary-600 font-medium">Clientes Satisfechos</div>
                                <div class="text-sm text-secondary-500 mt-2">Calidad garantizada</div>
                            </div>

                            <!-- Soporte Técnico -->
                            <div
                                class="animate-slide-below-2 bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-primary-300 shadow-xl">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full mb-4">
                                    <i data-lucide="clock" class="w-8 h-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                                </div>
                                <div class="text-4xl font-bold text-primary-700 mb-2">24/7</div>
                                <div class="text-primary-600 font-medium">Soporte Técnico</div>
                                <div class="text-sm text-primary-500 mt-2">Siempre disponibles</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-10 bg-gradient-to-b from-primary-200 to-primary-300 bg-opacity-50">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Título de sección -->
                    <div class="scroll-items text-center mb-16">
                        <h2
                            class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-secondary-700 mb-4">
                            Nuestros Servicios
                        </h2>
                        <p class="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
                            Desarrollamos soluciones tecnológicas completas adaptadas a las necesidades específicas de
                            tu empresa
                        </p>
                    </div>

                    <!-- Grid de servicios -->
                    <div class="scroll-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <!-- Desarrollo Web -->
                        <div
                            class="group bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-35 transition-all duration-300 transform hover:scale-105 border border-primary-300 shadow-xl">
                            <div
                                class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                <i data-lucide="globe" class="w-8 h-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-primary-800 mb-4">Desarrollo Web</h3>
                            <p class="text-primary-600 mb-6 leading-relaxed text-sm sm:text-base">
                                Aplicaciones web modernas, responsivas y escalables utilizando las últimas tecnologías y
                                frameworks.
                            </p>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/react.png" alt="React"
                                            class="w-12 h-12 rounded-full mx-auto mb-4 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            React - Biblioteca JavaScript para crear interfaces de usuario dinámicas y
                                            componentes reutilizables
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">React</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/vues.png" alt="Vue"
                                            class="w-12 h-12 rounded-full mx-auto mb-4 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Vue.js - Framework progresivo para construir interfaces de usuario
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Vue</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/laravels.png" alt="Laravel"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Laravel - Framework PHP elegante para desarrollo web con arquitectura MVC y
                                            herramientas avanzadas
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Laravel</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/angulars.png" alt="Angular"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Angular - Plataforma de desarrollo para crear aplicaciones web escalables
                                            con TypeScript
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Angular</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/codeigniter.png" alt="CodeIgniter"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            CodeIgniter - Framework PHP ligero y poderoso para desarrollo web rápido con
                                            footprint pequeño
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">CodeIgniter</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/django.png" alt="Django"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Django - Framework web de Python para desarrollo rápido y limpio con
                                            filosofía "Don't Repeat Yourself"
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Django</span>
                                </div>
                            </div>
                        </div>

                        <!-- Desarrollo Móvil -->
                        <div class="scroll-items group bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-35 transition-all duration-300 transform hover:scale-105 border border-secondary-300 shadow-xl">
                            <div
                                class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                <i data-lucide="smartphone" class="w-8 h-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-secondary-800 mb-4">Desarrollo Móvil</h3>
                            <p class="text-secondary-600 mb-6 leading-relaxed">
                                Apps nativas e híbridas para iOS y Android con experiencias de usuario excepcionales.
                            </p>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/futter.png" alt="Flutter"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Flutter - Kit de desarrollo UI de Google para crear aplicaciones
                                            multiplataforma desde una sola base de código
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Flutter</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/Kotlin.png" alt="Kotlin"
                                            class="w-12 h-12 rounded-full mx-auto mb-4 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Kotlin - Lenguaje moderno y conciso para desarrollo Android y aplicaciones
                                            multiplataforma
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Kotlin</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/swift.png" alt="Swift"
                                            class="w-12 h-12 rounded-full mx-auto mb-4 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Swift - Lenguaje de programación moderno y seguro de Apple para desarrollo
                                            iOS, macOS y aplicaciones nativas
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Swift</span>
                                </div>
                            </div>
                        </div>

                        <!-- Desarrollo Desktop -->
                        <div class="scroll-items group bg-opacity-25 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-35 transition-all duration-300 transform hover:scale-105 border border-primary-300 shadow-xl md:col-span-2 lg:col-span-1">
                            <div
                                class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                <i data-lucide="monitor" class="w-8 h-8 text-secondary-500 mr-2 mt-0.5 center"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-primary-800 mb-4">Desarrollo Desktop</h3>
                            <p class="text-primary-600 mb-6 leading-relaxed">
                                Aplicaciones de escritorio potentes y eficientes para Windows, macOS y Linux.
                            </p>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/Microsoft-dotNET.png" alt="Microsoft"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            .NET Framework - Plataforma de desarrollo de Microsoft para crear
                                            aplicaciones robustas y escalables
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">Microsoft</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/JavaFX.png" alt="JavaFX"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            JavaFX - Plataforma de aplicaciones cliente para crear interfaces gráficas
                                            ricas en Java
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block">JavaFX</span>
                                </div>
                                <div class="text-center">
                                    <div class="tooltip-container">
                                        <img src="../../public/Kivy.png" alt="Kivy"
                                            class="w-12 h-12 rounded-full mx-auto mb-2 tech-img bg-white shadow-md">
                                        <div class="animated-tooltip">
                                            Kivy - Framework Python para desarrollo de aplicaciones multiplataforma con
                                            interfaces táctiles
                                        </div>
                                    </div>
                                    <span class="text-xs text-primary-500 font-medium block"> Kivy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-10 bg-gradient-to-r from-primary-600 to-secondary-500 relative overflow-hidden">
                <div class="absolute inset-0 bg-black opacity-10"></div>
                <div class="scroll-items container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
                        ¿Listo para transformar tu idea en realidad?
                    </h2>
                    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Contacta con nuestro equipo de expertos y descubre cómo podemos ayudarte a alcanzar tus
                        objetivos digitales.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            class="bg-white text-primary-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Solicitar Consulta Gratuita
                        </button>
                        <button
                            class="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300">
                            Ver Casos de Éxito
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    </div>
</template>
