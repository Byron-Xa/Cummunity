<script>
import Footer from '../components/Footer.vue'
import Escritorio from '../components/Escritorio.vue'
export default {
    components: {
        Footer,
        Escritorio
    },
    data() {
        return {
            isLoading: true,
        }
    },
    computed: {

    },
    mounted() {
        const loadingTime = Math.floor(Math.random() * 100) + 500;

        setTimeout(() => {
            this.isLoading = false;
        }, loadingTime);
    },
    methods: {

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
             <div class="desktop-content pt-16">
            </div>
        <Footer />
        </div>
    </div>
</template>
<style scoped></style>