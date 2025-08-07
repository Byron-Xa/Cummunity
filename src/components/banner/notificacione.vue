<script>
export default {
    name: 'NotificationBanner',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '¿Permitir notificaciones?'
        },
        subtitle: {
            type: String,
            default: 'Recibe actualizaciones importantes del sistema'
        },
        acceptText: {
            type: String,
            default: 'Permitir'
        },
        dismissText: {
            type: String,
            default: 'Ahora no'
        },
        position: {
            type: String,
            default: 'bottom', // 'top' o 'bottom'
            validator: (value) => ['top', 'bottom'].includes(value)
        }
    },
    emits: ['accept', 'dismiss'],
    methods: {
        handleAccept() {
            this.$emit('accept')
        },
        handleDismiss() {
            this.$emit('dismiss')
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition :name="position === 'bottom' ? 'slide-up' : 'slide-down'" :appear="true">
            <div v-if="show" 
                 :class="[
                    'fixed left-4 right-4 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl rounded-2xl border border-white/20',
                    position === 'top' ? 'top-4' : 'bottom-4'
                 ]">
                <div class="max-w-full mx-auto px-6 py-4">
                    <div class="flex items-center justify-between">
                        <!-- Contenido del banner -->
                        <div class="flex items-center space-x-4">
                            <div class="text-3xl animate-bounce">🔔</div>
                            <div>
                                <p class="font-bold text-base">{{ title }}</p>
                                <p class="text-sm opacity-90">{{ subtitle }}</p>
                            </div>
                        </div>
                        
                        <!-- Botones de acción -->
                        <div class="flex space-x-3">
                            <button @click="handleAccept"
                                    class="bg-white text-indigo-600 hover:bg-gray-100 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                {{ acceptText }}
                            </button>
                            <button @click="handleDismiss"
                                    class="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 border border-white/30">
                                {{ dismissText }}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Indicador de progreso opcional -->
                <div class="h-1 bg-white/20">
                    <div class="h-full bg-white/40 animate-pulse"></div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Transiciones para posición superior */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

/* Transiciones para posición inferior */
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

/* Animación con rebote para entrada desde abajo */
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

/* Responsive design */
@media (max-width: 640px) {
    .flex.items-center.justify-between {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
    
    .flex.space-x-2 {
        justify-content: center;
        margin: 0;
        gap: 0.5rem;
    }
}
</style>