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
            // Projects section data
            constructionProgress: 0,
            targetProgress: 75,
            currentFloor: 0,
            maxFloors: 3,
            sparkleCount: 0,
            craneAngle: 0,
            workerPositions: [
                { x: 20, y: 0, active: false },
                { x: 200, y: 0, active: false },
                { x: 120, y: 0, active: false }
            ],
            constructionMessages: [
                "Inicializando proyecto...",
                "Estableciendo fundaciones...",
                "Construyendo primer piso...",
                "Levantando segundo piso...",
                "Completando tercer piso...",
                "Añadiendo detalles finales...",
                "¡Casi listo!"
            ],
            currentMessage: 0,
            isConstructionActive: false,
            subscribers: 0,
            showNotification: false,
            projectTypes: [
                { name: "Aplicaciones Web", icon: "🌐", progress: 80 },
                { name: "Herramientas Desktop", icon: "💻", progress: 65 },
                { name: "APIs y Servicios", icon: "⚡", progress: 90 },
                { name: "Soluciones Móviles", icon: "📱", progress: 45 }
            ],
            currentProjectIndex: 0
        }
    },
    computed: {
        progressPercentage() {
            return Math.min(this.constructionProgress, 100);
        },
        currentProjectType() {
            return this.projectTypes[this.currentProjectIndex];
        }
    },
    mounted() {
        const loadingTime = Math.floor(Math.random() * 100) + 500;
        setTimeout(() => {
            this.isLoading = false;
            // Pequeño delay adicional para asegurar que el DOM esté listo
            setTimeout(() => {
                this.initializeConstruction();
            }, 100);
        }, loadingTime);
    },
    methods: {
        initializeConstruction() {
            // Start construction animation after a delay
            setTimeout(() => {
                this.startConstruction();
            }, 1000);
            
            // Rotate through project types
            setInterval(() => {
                this.rotateProjectTypes();
            }, 4000);
            
            // Animate crane
            this.animateCrane();
            
            // Generate random sparkles
            setInterval(() => {
                this.generateSparkles();
            }, 800);
        },

        startConstruction() {
            this.isConstructionActive = true;
            this.animateProgress();
            this.buildFloors();
            this.activateWorkers();
        },

        animateProgress() {
            const progressInterval = setInterval(() => {
                if (this.constructionProgress < this.targetProgress) {
                    this.constructionProgress += Math.random() * 3 + 1;
                    
                    // Update construction message
                    const messageIndex = Math.floor((this.constructionProgress / this.targetProgress) * this.constructionMessages.length);
                    if (messageIndex !== this.currentMessage && messageIndex < this.constructionMessages.length) {
                        this.currentMessage = messageIndex;
                    }
                } else {
                    this.constructionProgress = this.targetProgress;
                    clearInterval(progressInterval);
                }
            }, 200);
        },

        buildFloors() {
            const floorInterval = setInterval(() => {
                if (this.currentFloor < this.maxFloors) {
                    this.currentFloor++;
                    
                    // Add visual effect when floor is built
                    this.addFloorEffect(this.currentFloor);
                } else {
                    clearInterval(floorInterval);
                }
            }, 2000);
        },

        addFloorEffect(floorNumber) {
            // Create temporary sparkle effect for new floor
            const floorElement = document.querySelector(`.floor-${floorNumber}`);
            if (floorElement) {
                floorElement.classList.add('building-effect');
                setTimeout(() => {
                    floorElement.classList.remove('building-effect');
                }, 1000);
            }
            
            // Generate extra sparkles
            this.generateSparkles(5);
        },

        activateWorkers() {
            this.workerPositions.forEach((worker, index) => {
                setTimeout(() => {
                    worker.active = true;
                    this.animateWorker(index);
                }, index * 1000);
            });
        },

        animateWorker(workerIndex) {
            const worker = this.workerPositions[workerIndex];
            const baseX = worker.x;
            
            setInterval(() => {
                const randomMovement = (Math.random() - 0.5) * 30;
                worker.x = baseX + randomMovement;
                worker.y = Math.sin(Date.now() * 0.003 + workerIndex) * 5;
            }, 100);
        },

        animateCrane() {
            setInterval(() => {
                this.craneAngle = Math.sin(Date.now() * 0.001) * 10;
            }, 50);
        },

        generateSparkles(count = 1) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.sparkleCount++;
                    // Create sparkle element
                    this.createSparkle();
                }, i * 200);
            }
        },

        createSparkle() {
            const sparklesContainer = document.querySelector('.sparkles');
            if (!sparklesContainer) {
                console.log('Sparkles container not found');
                return;
            }
            
            const sparkle = document.createElement('div');
            sparkle.className = 'dynamic-sparkle';
            sparkle.style.left = Math.random() * 400 + 'px';
            sparkle.style.top = Math.random() * 200 + 'px';
            
            sparklesContainer.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        },

        rotateProjectTypes() {
            this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projectTypes.length;
        },

        notifyMe() {
            this.subscribers++;
            this.showNotification = true;
            
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
            
            // Simulate email subscription
            console.log('Usuario suscrito a notificaciones');
        },

        showPreview() {
            // Create modal or redirect to preview
            alert('¡Pronto tendremos un adelanto disponible!');
        },

        // Interactive hover effects
        onConstructionHover() {
            // Speed up animations temporarily
            document.documentElement.style.setProperty('--animation-speed', '0.5s');
        },

        onConstructionLeave() {
            // Reset animation speed
            document.documentElement.style.setProperty('--animation-speed', '2s');
        }
    },

    beforeUnmount() {
        // Clean up intervals
        clearInterval();
    }
}
</script>

<template>
    <div class="min-h-screen w-full bg-gradient-to-r from-blue-600 via-teal-300 to-blue-500 relative">
        <!-- Loading Screen -->
        <div v-if="isLoading"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-700 to-secondary-500 transition-opacity duration-300">
            <div class="flex flex-col items-center space-y-4">
                <img src="../../public/Systems.png" alt="Cargando..." class="w-16 h-16 animate-spin" />
                <p class="text-white font-medium text-lg">Cargando...</p>
            </div>
        </div>

        <!-- Notification Toast -->
        <div v-if="showNotification" class="animate-slide-below fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 animate-bounce">
            <div class="flex items-center space-x-2">
                <span>✅</span>
                <span>¡Te notificaremos cuando esté listo!</span>
            </div>
        </div>

        <!-- Main Content -->
        <div v-if="!isLoading" class="main-content visible">
            <Escritorio />
            <!-- Desktop Content with Projects Section -->
            <div class="desktop-content pt-16">
                <!-- Projects Section -->
                <section class="projects-section py-20 px-6">
                    <div class="max-w-6xl mx-auto">
                        <!-- Header -->
                        <div class="text-center mb-12">
                            <h2 class="animate-slide-below-1 text-5xl font-bold text-white mb-4 animate-pulse">Proyectos de Software</h2>
                            <p class="animate-slide-below-2 text-xl text-white/90">{{ constructionMessages[currentMessage] }}</p>
                        </div>
                        <!-- Project Types Carousel -->
                        <div class="animate-slide-below-1 project-types-carousel mb-8">
                            <div class="project-type-card">
                                <div class="project-icon">{{ currentProjectType.icon }}</div>
                                <h3 class="project-name">{{ currentProjectType.name }}</h3>
                                <div class="mini-progress">
                                    <div class="mini-progress-fill" 
                                         :style="{ width: currentProjectType.progress + '%' }"></div>
                                </div>
                                <span class="progress-text">{{ currentProjectType.progress }}% Completado</span>
                            </div>
                        </div>
                        <!-- Coming Soon Content -->
                        <div class="coming-soon-content text-center">
                            <h3 class="animate-slide-below-2 text-3xl font-bold text-white mb-6">¡Muy Pronto Disponible!</h3>
                            <p class=" animate-slide-below-1 text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                                Estamos desarrollando una suite completa de herramientas y aplicaciones de software. 
                                Cada proyecto está siendo construido con las últimas tecnologías y mejores prácticas.
                            </p>
                            <!-- Interactive Progress Bar -->
                            <div class="animate-slide-below-2 progress-container mb-8">
                                <div class="progress-bar">
                                    <div class="progress-fill" 
                                         :style="{ width: progressPercentage + '%' }">
                                        <div class="progress-shine"></div>
                                    </div>
                                </div>
                                <p class="animate-slide-below-1 text-white/80 mt-3 text-lg font-semibold">
                                    Progreso General: {{ Math.round(progressPercentage) }}%
                                </p>
                            </div>
                            <!-- Interactive Buttons -->
                            <div class="animate-slide-below-2 cta-buttons">
                                <button @click="showPreview" class="btn-secondary ml-4">
                                    <span>Ver Adelanto</span>
                                    <span class="btn-arrow">→</span>
                                </button>
                            </div>
                            <!-- Stats -->
                            <div class="stats-grid mt-12">
                                <div class="animate-slide-below-2 stat-item">
                                    <div class="stat-number">{{ projectTypes.length }}</div>
                                    <div class="stat-label">Tipos de Proyectos</div>
                                </div>
                                <div class="animate-slide-below-2 stat-item">
                                    <div class="stat-number">{{ Math.round(progressPercentage) }}%</div>
                                    <div class="stat-label">Completado</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    </div>
</template>

<style scoped>
:root {
    --animation-speed: 2s;
}
/* Projects Section Styles */
.projects-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Construction Animation Styles */
.construction-container {
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.construction-container:hover {
    transform: scale(1.05);
}

.construction-scene {
    position: relative;
    width: 500px;
    height: 300px;
}

/* Enhanced Crane Animation */
.crane {
    position: absolute;
    left: 350px;
    top: 20px;
    transform-origin: bottom center;
    transition: transform 0.1s ease;
}

.crane-base {
    width: 10px;
    height: 200px;
    background: linear-gradient(135deg, #4a5568, #2d3748);
    position: relative;
    border-radius: 2px;
}

.crane-arm {
    width: 140px;
    height: 8px;
    background: linear-gradient(135deg, #4a5568, #2d3748);
    position: absolute;
    top: 30px;
    left: -130px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.crane-hook {
    width: 6px;
    height: 60px;
    background: #2d3748;
    position: absolute;
    top: 38px;
    left: -130px;
    border-radius: 3px;
    animation: hookSway var(--animation-speed) ease-in-out infinite;
}

.crane-cable {
    width: 2px;
    height: 50px;
    background: #1a202c;
    position: absolute;
    top: 30px;
    left: -127px;
}

@keyframes hookSway {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(10px) rotate(5deg); }
    75% { transform: translateX(-10px) rotate(-5deg); }
}

/* Enhanced Building */
.building-container {
    position: absolute;
    left: 80px;
    bottom: 50px;
}

.building-base {
    width: 150px;
    height: 25px;
    background: linear-gradient(135deg, #2d3748, #1a202c);
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.building-floor {
    width: 150px;
    height: 40px;
    background: linear-gradient(135deg, #4a5568, #2d3748);
    border: 3px solid #1a202c;
    margin-top: 3px;
    position: relative;
    opacity: 0;
    transform: translateY(30px) scale(0.8);
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 4px;
}

.building-floor.floor-built {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.building-floor.building-effect {
    animation: buildingPulse 1s ease-out;
}

@keyframes buildingPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
}

/* Windows */
.windows {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 0 15px;
}

.window {
    width: 12px;
    height: 15px;
    background: #1a202c;
    border-radius: 2px;
    transition: background 0.3s ease;
}

.window.window-lit {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

/* Enhanced Workers */
.worker {
    width: 12px;
    height: 12px;
    background: #ed8936;
    border-radius: 50%;
    position: absolute;
    transition: all 0.3s ease;
    opacity: 0;
    transform: scale(0);
}

.worker.worker-active {
    opacity: 1;
    transform: scale(1);
    animation: workerBob 1.5s ease-in-out infinite;
}

.worker-hard-hat {
    width: 8px;
    height: 4px;
    background: #ffd700;
    border-radius: 4px 4px 0 0;
    position: absolute;
    top: -2px;
    left: 2px;
}

@keyframes workerBob {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-3px) scale(1.1); }
}

/* Dynamic Sparkles */
.dynamic-sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #ffd700, #ffed4e);
    border-radius: 50%;
    animation: sparkleLife 2s ease-out forwards;
    pointer-events: none;
}

@keyframes sparkleLife {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    20% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg) translateY(-40px);
    }
}

/* Project Types Carousel */
.project-types-carousel {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}

.project-type-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    min-width: 250px;
    transition: all 0.5s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.project-name {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.mini-progress {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.mini-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #48bb78, #38a169);
    border-radius: 3px;
    transition: width 0.8s ease;
}

.progress-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
}

/* Enhanced Progress Bar */
.progress-container {
    max-width: 400px;
    margin: 0 auto;
}

.progress-bar {
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #48bb78, #38a169, #48bb78);
    border-radius: 6px;
    transition: width 0.5s ease;
    position: relative;
}

.progress-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.3), 
        transparent);
    animation: shine 2s infinite;
}

@keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
}

/* Enhanced Buttons */
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-primary:active {
    transform: translateY(-1px);
}

.btn-counter {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
}

.btn-secondary {
    background: transparent;
    color: white;
    padding: 15px 30px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
}

.btn-arrow {
    transition: transform 0.3s ease;
}

.btn-secondary:hover .btn-arrow {
    transform: translateX(5px);
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.stat-item {
    text-align: center;
    color: white;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .construction-scene {
        width: 350px;
        height: 250px;
        transform: scale(0.8);
    }
    
    .cta-buttons {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    
    .btn-secondary {
        margin-left: 0 !important;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .project-type-card {
        min-width: 200px;
        padding: 1.5rem;
    }
}

/* Loading and transition effects */
.main-content {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.main-content.visible {
    opacity: 1;
}
</style>