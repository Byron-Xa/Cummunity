import { ref, computed } from 'vue'

export function useNotifications() {
    const notificationPermission = ref('default')
    const showBanner = ref(false)
    const hasShownBanner = ref(false)

    // Computed properties
    const canShowNotification = computed(() => {
        return !hasShownBanner.value && 
               notificationPermission.value === 'default' && 
               'Notification' in window
    })

    const isSupported = computed(() => {
        return 'Notification' in window
    })

    // Inicializar el state
    const initNotifications = () => {
        if ('Notification' in window) {
            notificationPermission.value = Notification.permission
        }
        
        // Verificar si ya se mostró en esta sesión
        const dismissed = sessionStorage.getItem('notificationDismissed')
        if (dismissed) {
            hasShownBanner.value = true
        }
    }

    // Mostrar banner de solicitud
    const showNotificationBanner = () => {
        if (canShowNotification.value) {
            showBanner.value = true
            hasShownBanner.value = true
        }
    }

    // Ocultar banner
    const hideBanner = () => {
        showBanner.value = false
    }

    // Solicitar permisos
    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission()
            notificationPermission.value = permission
            hideBanner()
            
            if (permission === 'granted') {
                sendWelcomeNotification()
                return { success: true, message: '¡Perfecto! Ahora recibirás notificaciones importantes.' }
            } else if (permission === 'denied') {
                return { success: false, message: 'Notificaciones bloqueadas. Puedes habilitarlas en la configuración del navegador.' }
            }
        } catch (error) {
            console.error('Error al solicitar permisos:', error)
            return { success: false, message: 'Error al solicitar permisos de notificación.' }
        }
    }

    // Rechazar notificaciones
    const dismissNotification = () => {
        hideBanner()
        sessionStorage.setItem('notificationDismissed', 'true')
    }

    // Enviar notificación de bienvenida
    const sendWelcomeNotification = () => {
        if (notificationPermission.value === 'granted') {
            new Notification('¡Bienvenido a nuestro sistema!', {
                body: 'Ahora recibirás notificaciones importantes y actualizaciones.',
                icon: '../../public/Systems.png',
                badge: '../../public/Systems.png',
                tag: 'welcome'
            })
        }
    }

    // Enviar notificación personalizada
    const sendNotification = (title, options = {}) => {
        if (notificationPermission.value === 'granted') {
            const defaultOptions = {
                icon: '/Systems.png',
                badge: '/Systems.png',
                requireInteraction: false,
                ...options
            }
            
            return new Notification(title, defaultOptions)
        } else {
            console.warn('No se puede enviar notificación. Permisos no otorgados.')
            return null
        }
    }

    // Enviar notificación de actualización del sistema
    const sendSystemUpdate = (message) => {
        return sendNotification('Actualización del Sistema', {
            body: message,
            tag: 'system-update',
            requireInteraction: true
        })
    }

    // Enviar notificación de alerta
    const sendAlert = (message, urgent = false) => {
        return sendNotification('⚠️ Alerta del Sistema', {
            body: message,
            tag: 'alert',
            requireInteraction: urgent,
            silent: !urgent
        })
    }

    // Verificar y mostrar banner automáticamente
    const autoShowBanner = (delay = 3000) => {
        setTimeout(() => {
            if (canShowNotification.value) {
                showNotificationBanner()
            }
        }, delay)
    }

    return {
        // Estado reactivo
        notificationPermission,
        showBanner,
        hasShownBanner,
        
        // Computed
        canShowNotification,
        isSupported,
        
        // Métodos
        initNotifications,
        showNotificationBanner,
        hideBanner,
        requestPermission,
        dismissNotification,
        sendNotification,
        sendSystemUpdate,
        sendAlert,
        autoShowBanner
    }
}