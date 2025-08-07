import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Servicios from '../views/Servicios.vue'
import Nosotros from '../views/Nosotros.vue'
import Contactos from '../views/Contactos.vue'
import Noticias from '../views/Noticias.vue'
import Proyectos from '../views/Proyectos.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: Servicios,
    },
    {
      path: '/noticias',
      name: 'noticias',
      component: Noticias,
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: Nosotros,
    },
    {
      path: '/contactos',
      name: 'contactos',
      component: Contactos,
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: Proyectos,
    },
  ],
})

export default router
