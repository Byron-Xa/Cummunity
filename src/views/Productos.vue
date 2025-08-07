<script>
import Escritorio from '../components/Escritorio.vue'
import Footer from '../components/Footer.vue'
export default {
    components: {
        Escritorio,
        Footer
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
    <!-- Loading screen -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-500 transition-opacity duration-300">
        <div class="flex flex-col items-center space-y-4">
            <img src="../../public/Systems.png" alt="Cargando..." class="w-16 h-16 animate-spin" />
            <p class="text-white font-medium text-lg">Cargando...</p>
        </div>
    </div>

    <!-- Main content - now with transition -->
    <div v-if="!isLoading" :class="['main-content', {'visible': showContent}]">
        <div class="w-full fixed top-0 left-0 z-10">
            <Escritorio />
        </div>
        <!-- Additional desktop content can go here -->
        <div class="desktop-content pt-16">
            <!-- Desktop icons or other elements -->
            <div class="logo-animation flex justify-center mb-8">
                <div class="logo-container relative">
                    <div class="logo-circle w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center animate-pulse">
                        <span class="logo-text text-4xl font-bold text-white"></span>
                    </div>
                    <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary-500 animate-bounce"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    /* O el color de fondo que prefieras */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner-container {
    width: 150px;
    height: 150px;
}

.spinner-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.main-content {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
