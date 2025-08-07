<script>
import { useModalDesktop } from '../../assets/js/motion/modalDesktop'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { createIcons, icons } from 'lucide'

export default {
    data(){
        return {
            contactInfo: {
                phone: '+593 98 389 0338',
                message: 'Hola! quiero contactarte con usted para discutir sobre el desarrollo de software desktop personalizado para mi empresa o negocio.'
            }
        }
    },
    computed: {
        isMobile() {
            return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }
    },
    methods: {
        abrirWhatsApp() {
            const { phone, message } = this.contactInfo;
            
            let url;
            if (this.isMobile) {
                // Abre la app nativa en móvil
                url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
            } else {
                // Abre WhatsApp Web en escritorio
                url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            }
            
            window.open(url, '_blank');
        },
        
        // Método alternativo más simple
        contactarWhatsApp() {
            const url = `https://wa.me/${this.contactInfo.phone}?text=${encodeURIComponent(this.contactInfo.message)}`;
            window.open(url, '_blank');
        }
    },
    setup() {
        const { isModalOpenDesktop, closeModalDesktop } = useModalDesktop()

        // Referencias para el scroll
        const scrollContainer = ref(null)
        const topGradient = ref(null)
        const bottomGradient = ref(null)

        // Función para inicializar los iconos
        const initializeIcons = () => {
            nextTick(() => {
                createIcons({
                    icons,
                    "stroke-width": 2.5,
                    nameAttr: "data-lucide",
                });
            });
        };

        // Watch para detectar cuando el modal se abre
        watch(isModalOpenDesktop, (newVal) => {
            if (newVal) {
                initializeIcons();
                setTimeout(handleScroll, 100);
            }
        });

        // Función para manejar el scroll y mostrar/ocultar gradientes
        const handleScroll = () => {
            if (!scrollContainer.value || !topGradient.value || !bottomGradient.value) return

            const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
            
            // Mostrar gradiente superior si no estamos en la parte superior
            if (scrollTop > 10) {
                topGradient.value.classList.add('show')
            } else {
                topGradient.value.classList.remove('show')
            }

            // Mostrar gradiente inferior si no estamos en la parte inferior
            if (scrollTop + clientHeight < scrollHeight - 10) {
                bottomGradient.value.classList.add('show')
            } else {
                bottomGradient.value.classList.remove('show')
            }
        }

        const closeModalOnBackdrop = (event) => {
            if (event.target === event.currentTarget) {
                closeModalDesktop()
            }
        }

        // Manejar la tecla Escape para cerrar el modal
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isModalOpenDesktop.value) {
                closeModalDesktop()
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', handleEscapeKey);
            
            // Inicializar iconos si el modal ya está abierto
            if (isModalOpenDesktop.value) {
                initializeIcons();
            }
            
            // Agregar listener para el scroll
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', handleScroll)
                // Verificar gradientes inicialmente
                setTimeout(handleScroll, 100)
            }
        })

        onUnmounted(() => {
            document.removeEventListener('keydown', handleEscapeKey)
            document.body.style.overflow = ''
            
            // Remover listener del scroll
            if (scrollContainer.value) {
                scrollContainer.value.removeEventListener('scroll', handleScroll)
            }
        })

        return {
            isModalOpenDesktop,
            closeModalDesktop,
            closeModalOnBackdrop,
            scrollContainer,
            topGradient,
            bottomGradient
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isModalOpenDesktop" @click="closeModalOnBackdrop"
                class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-70 backdrop-blur-sm p-2 sm:p-4">
                <Transition name="modal-content">
                    <div v-if="isModalOpenDesktop" @click.stop
                        class="relative w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[40vw] 
                               max-h-[95vh] sm:max-h-[90vh] rounded-lg bg-white shadow-lg flex flex-col mx-auto">
                        <!-- Header -->
                        <div class="flex shrink-0 items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-200">
                            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-800 pr-2">
                                Software Desktop Personalizado
                            </h2>
                            <button @click="closeModalDesktop" 
                                class="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 flex-shrink-0">
                                <i data-lucide="x" class="h-5 w-5 sm:h-6 sm:w-6"></i>
                            </button>
                        </div>

                        <!-- Scrollable Content -->
                        <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 custom-scrollbar scroll-smooth relative" ref="scrollContainer">
                            <!-- Gradient indicators -->
                            <div class="scroll-gradient-top" ref="topGradient"></div>
                            <div class="scroll-gradient-bottom" ref="bottomGradient"></div>
                            
                            <div class="space-y-4 sm:space-y-6">
                                <!-- Descripción principal -->
                                <div>
                                    <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
                                        Desarrollamos aplicaciones de escritorio robustas y eficientes que automatizan procesos, mejoran la productividad 
                                        y se adaptan perfectamente a las necesidades específicas de tu empresa o negocio.
                                    </p>
                                </div>

                                <!-- Características principales -->
                                <div>
                                    <h3 class="text-base sm:text-lg font-semibold text-primary-800 mb-3">¿Qué incluye nuestro servicio?</h3>
                                    <div class="grid grid-cols-1 gap-3">
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="monitor" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Interfaz Intuitiva</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Diseño moderno y fácil de usar para cualquier usuario</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="database" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Base de Datos Integrada</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Almacenamiento seguro y gestión eficiente de información</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="settings" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Automatización de Procesos</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Reducción de tareas manuales y optimización de flujos de trabajo</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="file-text" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Generación de Reportes</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Informes personalizados y exportación en múltiples formatos</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="users" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Control de Usuarios</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Diferentes niveles de acceso y permisos personalizados</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start space-x-3">
                                            <i data-lucide="shield-check" class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mt-0.5 flex-shrink-0" stroke-width="2.5"></i>
                                            <div>
                                                <span class="font-medium text-slate-800 text-sm sm:text-base">Seguridad Avanzada</span>
                                                <p class="text-xs sm:text-sm text-slate-600">Encriptación de datos y respaldos automáticos</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tecnologías que usamos -->
                                <div>
                                    <h3 class="text-base sm:text-lg font-semibold text-primary-800 mb-3">Tecnologías que utilizamos</h3>
                                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="code" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">C#/.NET</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="code" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Java</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="code" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Python</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="database" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">SQL Server</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="database" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">MySQL</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Proceso de desarrollo -->
                                <div>
                                    <h3 class="text-base sm:text-lg font-semibold text-primary-800 mb-3">Proceso de desarrollo</h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                                            <span class="text-slate-700 text-sm sm:text-base">Análisis de requerimientos y procesos actuales</span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                                            <span class="text-slate-700 text-sm sm:text-base">Diseño de arquitectura y base de datos</span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                                            <span class="text-slate-700 text-sm sm:text-base">Desarrollo de módulos y funcionalidades</span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">4</div>
                                            <span class="text-slate-700 text-sm sm:text-base">Pruebas exhaustivas y corrección de errores</span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">5</div>
                                            <span class="text-slate-700 text-sm sm:text-base">Instalación, capacitación y soporte</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tipos de software -->
                                <div>
                                    <h3 class="text-base sm:text-lg font-semibold text-primary-800 mb-3">Tipos de software que desarrollamos</h3>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Sistemas de Inventario</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Gestión de Clientes (CRM)</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Contabilidad y Facturación</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Control de Proyectos</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Recursos Humanos</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Sistemas Educativos</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i data-lucide="check-circle" class="h-3 w-3 sm:h-4 sm:w-4 text-secondary-500 flex-shrink-0"></i>
                                            <span class="text-slate-600">Aplicaciones Médicas</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ventajas del software desktop -->
                                <div class="bg-slate-50 p-3 sm:p-4 rounded-lg">
                                    <h4 class="font-semibold text-slate-800 text-sm sm:text-base mb-2">¿Por qué elegir software desktop?</h4>
                                    <div class="space-y-2 text-xs sm:text-sm text-slate-600">
                                        <div class="flex items-start space-x-2">
                                            <i data-lucide="wifi-off" class="h-3 w-3 text-secondary-500 mt-1 flex-shrink-0"></i>
                                            <span>Funciona sin conexión a internet</span>
                                        </div>
                                        <div class="flex items-start space-x-2">
                                            <i data-lucide="zap" class="h-3 w-3 text-secondary-500 mt-1 flex-shrink-0"></i>
                                            <span>Mayor velocidad y rendimiento</span>
                                        </div>
                                        <div class="flex items-start space-x-2">
                                            <i data-lucide="lock" class="h-3 w-3 text-secondary-500 mt-1 flex-shrink-0"></i>
                                            <span>Control total sobre los datos</span>
                                        </div>
                                        <div class="flex items-start space-x-2">
                                            <i data-lucide="cpu" class="h-3 w-3 text-secondary-500 mt-1 flex-shrink-0"></i>
                                            <span>Aprovecha todos los recursos del sistema</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tiempo de entrega -->
                                <div class="bg-primary-50 p-3 sm:p-4 rounded-lg">
                                    <div class="flex items-center space-x-2 mb-2">
                                        <i data-lucide="clock" class="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0"></i>
                                        <span class="font-semibold text-primary-800 text-sm sm:text-base">Tiempo de desarrollo</span>
                                    </div>
                                    <p class="text-primary-700 text-xs sm:text-sm">Entre 6-12 semanas dependiendo de la complejidad y funcionalidades requeridas</p>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="flex shrink-0 flex-col sm:flex-row items-stretch sm:items-center p-4 sm:p-6 pt-3 sm:pt-4 justify-end border-t border-slate-200 space-y-2 sm:space-y-0 sm:space-x-2">
                            <button @click="closeModalDesktop"
                                class="rounded-md border border-slate-300 py-2.5 sm:py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-50 focus:bg-slate-50 order-2 sm:order-1"
                                type="button">
                                Cerrar
                            </button>
                            <button @click="abrirWhatsApp"
                                class="rounded-md flex items-center justify-center bg-blue-400 text-white border border-transparent py-2.5 sm:py-2 px-4 text-center text-sm transition-all hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none order-1 sm:order-2"
                                type="button">
                                Solicitar Cotización
                            </button>
                        </div>
                        
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
@keyframes slideDown {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@media (max-width: 640px) {
    @keyframes slideUp {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal-content-enter-active,
    .modal-content-leave-active {
        animation: slideUp 0.4s ease-out forwards;
    }
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

@media (min-width: 640px) {
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
    margin: 8px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg, #64748b 0%, #475569 100%);
}

.scroll-smooth {
    scroll-behavior: smooth;
}

.scroll-gradient-top {
    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 15px;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.scroll-gradient-bottom {
    background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15px;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;
}

@media (min-width: 640px) {
    .scroll-gradient-top,
    .scroll-gradient-bottom {
        height: 20px;
    }
}

.scroll-gradient-top.show,
.scroll-gradient-bottom.show {
    opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
    animation: slideDown 0.6s ease-out forwards;
    opacity: 0;
}

@media (min-width: 640px) {
    .modal-content-enter-active,
    .modal-content-leave-active {
        animation: slideDown 0.8s ease-out 0.3s forwards;
    }
}

.modal-content-enter-from,
.modal-content-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
}

@media (hover: none) and (pointer: coarse) {
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    
    button {
        min-height: 44px; 
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .modal-content-enter-active,
    .modal-content-leave-active {
        animation: slideDown 0.7s ease-out 0.2s forwards;
    }
}

@media (max-width: 640px) {
    h2, h3 {
        line-height: 1.3;
    }
    
    .space-y-4 > * + * {
        margin-top: 1rem;
    }
    

    button {
        min-height: 44px;
    }
}

@media (max-width: 926px) and (orientation: landscape) {
    .modal-content {
        max-height: 85vh;
    }
}
</style>