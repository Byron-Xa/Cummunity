<script>
import Footer from '../components/Footer.vue'
import Escritorio from '../components/Escritorio.vue'
import Noticias from '../components/Informacion/Noticias.vue'

export default {
    components: {
        Footer,
        Escritorio,
        Noticias
    },
    data() {
        return {
            isLoading: true,
            showNotificationBanner: false,
            notificationPermission: 'default', 
            hasShownNotification: false,
            desktopHeight: 64
        }
    },
    computed: {
        showContent() {
            return !this.isLoading
        },
        canShowNotification() {
            return !this.hasShownNotification && 
                   this.notificationPermission === 'default' && 
                   'Notification' in window
        }
    },
    mounted() {
        const loadingTime = Math.floor(Math.random() * 100) + 500;
        
        if ('Notification' in window) {
            this.notificationPermission = Notification.permission;
        }

        setTimeout(() => {
            this.isLoading = false;
            setTimeout(() => {
                if (this.canShowNotification) {
                    this.showNotificationRequest();
                }
            }, 2000); 
        }, loadingTime);
    },
    methods: {
        showNotificationRequest() {
            if (!this.hasShownNotification && this.notificationPermission === 'default') {
                this.showNotificationBanner = true;
                this.hasShownNotification = true;
            }
        },

        async requestNotificationPermission() {
            try {
                const permission = await Notification.requestPermission();
                this.notificationPermission = permission;
                
                if (permission === 'granted') {
                    this.showSuccessMessage('¡Genial! Te enviaremos notificaciones importantes.');
                    this.sendWelcomeNotification();
                } else if (permission === 'denied') {
                    this.showErrorMessage('No se podrán enviar notificaciones. Puedes cambiar esto en la configuración del navegador.');
                }
            } catch (error) {
                console.error('Error al solicitar permisos:', error);
            }
            
            this.hideNotificationBanner();
        },

        dismissNotification() {
            this.hideNotificationBanner();

            sessionStorage.setItem('notificationDismissed', 'true');
        },

        hideNotificationBanner() {
            this.showNotificationBanner = false;
        },

        sendWelcomeNotification() {
            if (this.notificationPermission === 'granted') {
                new Notification('¡Bienvenido a nuestro sistema!', {
                    body: 'Ahora recibirás notificaciones importantes.',
                    icon: '/Systems.png',
                    badge: '/Systems.png'
                });
            }
        },

        sendTestNotification() {
            if (this.notificationPermission === 'granted') {
                new Notification('Notificación de prueba', {
                    body: 'Esta es una notificación de prueba del sistema.',
                    icon: '/Systems.png',
                    badge: '/Systems.png'
                });
            } else {
                this.showNotificationRequest();
            }
        },
    }
}
</script>

<template>
    <div class="min-h-screen w-full bg-gradient-to-r from-blue-300 via-teal-100 to-blue-300 relative">
        
        <Transition name="slide-up">
            <div v-if="showNotificationBanner" class="fixed bottom-4 left-4 right-4 z-30 bg-gradient-to-r from-blue-500 via-teal-200 to-blue-400 text-white shadow-2xl rounded-2xl border border-white/20">
                <div class="max-w-full mx-auto px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="text-3xl animate-bounce">🔔</div>
                            <div>
                                <p class="font-bold text-base">¿Permitir notificaciones?</p>
                                <p class="text-sm opacity-90">Recibe actualizaciones importantes del sistema</p>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button @click="requestNotificationPermission"
                                    class="bg-white text-indigo-600 hover:bg-gray-100 px-5 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105 shadow-lg">
                                Permitir
                            </button>
                            <button @click="dismissNotification"
                                    class="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 border border-white/30">
                                Ahora no
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Pantalla de carga -->
        <div v-if="isLoading"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-500 transition-opacity duration-300">
            <div class="flex flex-col items-center space-y-4">
                <img src="../../public/Systems.png" alt="Cargando..." class="w-16 h-16 animate-spin" />
                <p class="text-white font-medium text-lg">Cargando...</p>
            </div>
        </div>

        <!-- Contenido principal -->
        <div v-if="!isLoading" :class="['main-content', { 'visible': showContent }]">
            <Escritorio />
            <div class="desktop-content pt-16">
                <Noticias />  
            </div>
            <Footer />
        </div>
    </div>
</template>

<style scoped>

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.notification-banner-below-desktop {
    top: 64px;
}

.slide-up-enter-active {
    animation: slideUpBounce 0.6s ease-out;
}

@keyframes slideUpBounce {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    70% {
        transform: translateY(-10px);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.main-content {
    transition: margin-top 0.5s ease-out;
}
</style>