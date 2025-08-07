<script lang="ts">
import { is } from 'cypress/types/bluebird'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            plans: [
                { period: '7 días', price: 9.50, isPopular: false },
                { period: '1 mes', price: 11.50, isPopular: false },
                { period: '1 año', price: 16.99, isPopular: true },
                { period: '2 años', price: 24.99, isPopular: false },
                { period: '3 años', price: 37.99, isPopular: false },
                { period: '4 años', price: 42.99, isPopular: false }
            ],
            selectedPlan: null,
            contact: {
                name: 'Byron Xavier Casa',
                phone: '0998871749'
            },
            benefits: [
                'Confianza y respaldo en cada firma',
                'Válida y lista para cualquier trámite',
                'Certificación digital reconocida',
                'Soporte técnico especializado',
                'Integración con múltiples plataformas'
            ]
        }
    },
    computed: {
        bestValue() {
            return this.plans.find(plan => plan.isPopular)
        },
        isMobile() {
            return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }
    },
    mounted() {
        // Seleccionar el plan más popular por defecto
        this.selectedPlan = this.bestValue
        const loadingTime = Math.floor(Math.random() * 100) + 500;

        setTimeout(() => {
            this.isLoading = false;
            this.$nextTick(() => {
                this.setupScrollAnimation();
            });
        }, loadingTime);
    },
    methods: {
        selectPlan(plan: any) {
            this.selectedPlan = plan
        },
        contactUs() {
            let message = 'Hola, estoy interesado en la firma electrónica';

            if (this.selectedPlan) {
                message += `- Plan de ${this.selectedPlan.period}`;
            }
            const endocedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/593${this.contact.phone.substring(1)}?text=${endocedMessage}`, '_blank')
        },
        formatPrice(price: number) {
            return `$${price.toFixed(2)}`
        },
        setupScrollAnimation() {
            const elements = document.querySelectorAll('.scroll-items');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0 });

            elements.forEach(element => observer.observe(element));
        }
    }
})
</script>

<template>
    <div class="min-h-screen w-full bg-gradient-to-r from-blue-300 via-teal-100 to-blue-300 relative">
        <div class="max-w-6xl mx-auto">
            
            <!-- Header Principal -->
            <div class="animate-slide-down text-center mb-16">
                <h1 class=" text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
                    ¿Ya tienes tu
                    <span class="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent block">
                        FIRMA ELECTRÓNICA?
                    </span>
                </h1>
                
                <p class=" text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                    Confianza y respaldo en cada firma digital
                </p>
                
                <div class="scroll-items flex flex-wrap justify-center gap-4">
                    <div class="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                        <i data-lucide="check-circle" class="w-5 h-5 text-green-600" />
                        <span class="text-green-700 font-medium">Certificación Oficial</span>
                    </div>
                    <div class="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                        <i data-lucide="zap" class="w-5 h-5 text-blue-600" />
                        <span class="text-blue-700 font-medium">Activación Inmediata</span>
                    </div>
                </div>
            </div>

            <!-- Planes de Precios -->
            <div class="mb-16">
                <h2 class="scroll-items text-3xl font-bold text-center text-slate-800 mb-12">
                    Elige tu plan perfecto
                </h2>
                
                <div class="scroll-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div 
                        v-for="(plan, index) in plans" 
                        :key="index"
                        @click="selectPlan(plan)"
                        :class="[
                            'relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 transform hover:scale-105',
                            selectedPlan?.period === plan.period 
                                ? 'border-cyan-500 ring-4 ring-cyan-200' 
                                : 'border-gray-200 hover:border-cyan-300',
                            plan.isPopular ? 'ring-2 ring-blue-400' : ''
                        ]"
                    >
                        <!-- Badge Popular -->
                        <div v-if="plan.isPopular" 
                             class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                ⭐ MÁS POPULAR
                            </span>
                        </div>
                        
                        <!-- Duración -->
                        <div class="text-center mb-6">
                            <div class="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl mb-4">
                                <i data-lucide="clock" class="w-6 h-6 mx-auto mb-2" />
                                <span class="text-xl font-bold">{{ plan.period }}</span>
                            </div>
                            
                            <!-- Precio -->
                            <div class="text-4xl font-black text-cyan-600 mb-2">
                                {{ formatPrice(plan.price) }}
                            </div>
                            <p class="text-gray-600">Precio total del período</p>
                        </div>
                        
                        <!-- Checkmark si está seleccionado -->
                        <div v-if="selectedPlan?.period === plan.period" 
                             class="absolute top-4 right-4">
                            <i data-lucide="check-circle" class="w-6 h-6 text-cyan-500" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Beneficios -->
            <div class="bg-white rounded-3xl p-12 shadow-xl mb-16">
                <h3 class="text-3xl font-bold text-center text-slate-800 mb-12">
                    Tu firma electrónica incluye
                </h3>
                
                <div class="scroll-items grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div v-for="(benefit, index) in benefits" :key="index" 
                         class="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div class="bg-green-100 p-2 rounded-full flex-shrink-0">
                            <i data-lucide="check-circle" class="w-6 h-6 text-green-600" />
                        </div>
                        <span class="text-lg text-slate-700 font-medium">{{ benefit }}</span>
                    </div>
                </div>
                
                <div class="scroll-items bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 mt-12 text-white text-center">
                    <i data-lucide="shield" class="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h4 class="text-2xl font-bold mb-2">TU FIRMA válida y lista</h4>
                    <p class="text-xl opacity-90">para cualquier trámite oficial</p>
                </div>
            </div>

            <!-- Contacto y CTA -->
            <div class="scroll-items bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white text-center">
                <h3 class="text-4xl font-bold mb-6">¿Listo para comenzar?</h3>
                <p class="text-xl mb-8 opacity-90">
                    Contacta con nuestro especialista y obtén tu firma electrónica hoy mismo
                </p>
                
                <!-- Información de contacto -->
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <i data-lucide="user" class="w-6 h-6 text-cyan-400" />
                        <span class="text-xl font-semibold">{{ contact.name }}</span>
                    </div>
                    <div class="flex items-center justify-center gap-3">
                        <i data-lucide="phone" class="w-6 h-6 text-green-400" />
                        <span class="text-lg font-mono">{{ contact.phone }}</span>
                    </div>
                </div>
                
                <!-- Botón principal -->
                <button @click="contactUs" 
                        class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-12 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                    <i data-lucide="phone" class="w-6 h-6" />
                    Contactar por WhatsApp
                </button>
                
                <p class="text-sm opacity-70 mt-4">
                    Plan seleccionado: <span class="font-semibold">{{ selectedPlan?.period || 'Ninguno' }}</span>
                    <span v-if="selectedPlan"> - {{ formatPrice(selectedPlan.price) }}</span>
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.float-animation {
    animation: float 3s ease-in-out infinite;
}

.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* Gradientes personalizados */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}
</style>