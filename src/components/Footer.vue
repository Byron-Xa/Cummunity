<script>
import { useModal } from '../assets/js/motion/modal.js'
import { useWebPagesModal } from '../assets/js/motion/modalBlog.js'
import { useModalAplicacion } from '../assets/js/motion/modalAplicacion'
import { useModalMovil } from '../assets/js/motion/modalMovil'
import { useModalDesktop } from '../assets/js/motion/modalDesktop'
import Movil from '../components/Informacion/Movil.vue'
import PaguinasWeb from '../components/Informacion/PaginasWeb.vue'
import AplicacionesWeb from '../components/Informacion/AplicacionesWeb.vue'
import AplicacionesMoviles from '../components/Informacion/AplicacionesMoviles.vue'
import Desktop from '../components/Informacion/Desktop.vue'
export default {
    name: 'Footer',
    components: {
        AplicacionesWeb,
        AplicacionesMoviles,
        PaguinasWeb,
        Movil,
        Desktop
    },
    data() {
        return {
            contact: {
                name: 'Byron Xavier Casa',
                phone: '0998871749'
            },
        }
    },
    computed: {
        isMobile() {
            return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }
    },
    methods: {
        abrirWhatsApp() {
            let message = 'Hola! quiero contactarte con usted para discutir sobre el proyecto de Software.';

            window.open(`https://wa.me/593${this.contact.phone.substring(1)}?text=${encodeURIComponent(message)}`, '_blank')
        },
        
        // Método alternativo más simple
        contactarWhatsApp() {
            const url = `https://wa.me/${this.contactInfo.phone}?text=${encodeURIComponent(this.contactInfo.message)}`;
            window.open(url, '_blank');
        }
    },
    setup() {
        const { isModalOpenDesktop, openModalDesktop, closeModalDesktop } = useModalDesktop();
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
            closeModalMovil,
            isModalOpenDesktop,
            openModalDesktop,
            closeModalDesktop
        }
    }
}
</script>
<template>
    <footer>
        <div class="container mx-auto px-4 md:px-6 py-10">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 flex items-center font-desing">
                        <i data-lucide="code" class="mr-2 h-6 w-6"></i>
                        Community System
                    </h3>
                    <p class="text-primary-300">Soluciones tecnológicas a medida para impulsar tu negocio en la era
                        digital.</p>
                    <div class="mt-4 flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=100085289624577" class="text-primary-300 hover:text-primary-100 transition">
                            <i data-lucide="facebook" class="h-5 w-5"></i>
                        </a>
                        <a href="#" class="text-primary-300 hover:text-primary-100 transition">
                            <i data-lucide="twitter" class="h-5 w-5"></i>
                        </a>
                        <a href="#" class="text-primary-300 hover:text-primary-100 transition">
                            <i data-lucide="instagram" class="h-5 w-5"></i>
                        </a>
                        <a href="#" class="text-primary-300 hover:text-primary-100 transition">
                            <i data-lucide="linkedin" class="h-5 w-5"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 font-desing">Servicios</h4>
                    <ul class="space-y-2 text-primary-300">
                        <li><button @click="openModal" class="hover:text-primary-100 transition">Páginas Web</button>
                        </li>
                        <li><button @click="openWebPagesModal" class="hover:text-primary-100 transition">Blogs</button>
                        </li>
                        <li><button @click="openModalAplicacion" class="hover:text-primary-100 transition">Aplicaciones
                                Web</button></li>
                        <li><button @click="openModalMovil" class="hover:text-primary-100 transition">Aplicaciones
                                Móviles</button></li>
                        <li><button @click="openModalDesktop" class="hover:text-primary-100 transition">Desktop</button></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 font-desing">Enlaces rápidos</h4>
                    <ul class="space-y-2 text-primary-300">
                        <li><a href="servicios" class="hover:text-primary-100 transition">Inicio</a></li>
                        <li><a href="nosotros" class="hover:text-primary-100 transition">Sobre Nosotros</a></li>
                        <li><a href="proyectos" class="hover:text-primary-100 transition">Proyectos</a></li>
                        <li><a href="contactos" class="hover:text-primary-100 transition">Contacto</a></li>
                        <li><a href="noticias" class="hover:text-primary-100 transition">Noticias</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 font-desing">Contacto</h4>
                    <ul class="space-y-3 text-primary-300">
                        <li class="flex items-start">
                            <i data-lucide="map-pin" class="h-5 w-5 mr-2 mt-1"></i>
                            <span>Av. 15 de Agosto y Victor Guaytacama</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="phone" class="h-5 w-5 mr-2 mt-1"></i>
                            <span>+593 998 877 1749</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="mail" class="h-5 w-5 mr-2 mt-1"></i>
                            <span>sanchezbyron988@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-primary-800 mt-8 pt-8 text-center text-primary-300">
                <p>&copy; 2025 Community System Software. Todos los derechos reservados.</p>
            </div>
        </div>
        <AplicacionesWeb />
        <AplicacionesMoviles />
        <PaguinasWeb />
        <Movil />
        <Desktop />
        <!-- Botón flotante de WhatsApp -->
        <div v-if="!isLoading" class="fixed bottom-6 right-6 z-40">
            <button @click="abrirWhatsApp"
                class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
            </button>
        </div>
    </footer>
</template>

<style scoped></style>
