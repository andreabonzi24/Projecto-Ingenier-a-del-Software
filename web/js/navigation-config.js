/**
 * navigation-config.js - Configuración centralizada de navegación
 * Define rutas, menús y estructura de navegación para todos los roles
 */

// ==============================================
// DEFINICIÓN DE ROLES Y TIPOS DE USUARIO
// ==============================================

const USER_ROLES = {
    GUEST: 'guest',
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    MEDICAL_CENTER: 'medical_center',
    ADMIN: 'admin'
};

// ==============================================
// CONFIGURACIÓN DE NAVEGACIÓN POR ROL
// ==============================================

const NAVIGATION_MENUS = {
    // Navegación para invitados (no autenticados)
    guest: {
        type: 'top',
        logo: {
            text: 'Plataforma de Citas Médicas',
            href: 'index.html',
            icon: 'local_hospital'
        },
        items: [
            {
                id: 'home',
                text: 'Inicio',
                href: 'index.html',
                icon: 'home'
            },
            {
                id: 'features',
                text: 'Características',
                href: 'index.html#caracteristicas',
                icon: 'star'
            },
            {
                id: 'how-it-works',
                text: 'Cómo funciona',
                href: 'index.html#ventajas',
                icon: 'info'
            },
            {
                id: 'help',
                text: 'Ayuda',
                href: '__faq.html',
                icon: 'help_outline'
            }
        ],
        actions: [
            {
                type: 'primary',
                text: 'Iniciar sesión',
                href: 'medical_appointment_login_page.html',
                icon: 'login'
            }
        ]
    },

    // Navegación para pacientes
    patient: {
        type: 'top-with-sidebar',
        logo: {
            text: 'Plataforma de Citas Médicas',
            href: 'patient_dashboard.html',
            icon: 'local_hospital'
        },
        items: [
            {
                id: 'dashboard',
                text: 'Mi Dashboard',
                href: 'patient_dashboard.html',
                icon: 'dashboard',
                badge: null
            },
            {
                id: 'new-appointment',
                text: 'Nueva Cita',
                href: 'book_new_appointment.html',
                icon: 'calendar_add_on',
                highlight: true
            },
            {
                id: 'appointments',
                text: 'Mis Citas',
                href: 'patient_dashboard.html#appointments',
                icon: 'event',
                badge: '2'
            },
            {
                id: 'medical-history',
                text: 'Historial Médico',
                href: 'patient_dashboard.html#history',
                icon: 'description'
            },
            {
                id: 'notifications',
                text: 'Notificaciones',
                href: 'notification_center.html',
                icon: 'notifications',
                badge: '3'
            },
            {
                id: 'help',
                text: 'Ayuda',
                href: '__faq.html',
                icon: 'help_outline'
            }
        ],
        userMenu: [
            {
                text: 'Mi Perfil',
                href: 'patient_dashboard.html#profile',
                icon: 'person'
            },
            {
                text: 'Configuración',
                href: 'patient_dashboard.html#settings',
                icon: 'settings'
            },
            {
                text: 'Cerrar sesión',
                href: '#',
                icon: 'logout',
                action: 'logout'
            }
        ]
    },

    // Navegación para médicos
    doctor: {
        type: 'sidebar',
        logo: {
            text: 'Panel Médico',
            href: 'doctor_dashboard.html',
            icon: 'medical_services'
        },
        items: [
            {
                id: 'dashboard',
                text: 'Dashboard',
                href: 'doctor_dashboard.html',
                icon: 'dashboard',
                description: 'Vista general'
            },
            {
                id: 'medical-orders',
                text: 'Órdenes Médicas',
                href: 'doctor_dashboard.html#orders',
                icon: 'receipt_long',
                badge: '12',
                description: 'Gestionar órdenes'
            },
            {
                id: 'patient-appointments',
                text: 'Citas de Pacientes',
                href: 'doctor_dashboard.html#appointments',
                icon: 'calendar_month',
                badge: '5',
                description: 'Agenda del día'
            },
            {
                id: 'availability',
                text: 'Mi Disponibilidad',
                href: 'doctor_dashboard.html#availability',
                icon: 'schedule',
                description: 'Configurar horarios'
            },
            {
                id: 'patients',
                text: 'Mis Pacientes',
                href: 'doctor_dashboard.html#patients',
                icon: 'group',
                description: 'Historial de pacientes'
            },
            {
                id: 'profile',
                text: 'Mi Perfil',
                href: 'doctor_dashboard.html#profile',
                icon: 'person'
            },
            {
                id: 'support',
                text: 'Soporte',
                href: '__faq.html',
                icon: 'support_agent'
            }
        ],
        userMenu: [
            {
                text: 'Ver como paciente',
                href: 'patient_dashboard.html',
                icon: 'swap_horiz'
            },
            {
                text: 'Configuración',
                href: 'doctor_dashboard.html#settings',
                icon: 'settings'
            },
            {
                text: 'Cerrar sesión',
                href: '#',
                icon: 'logout',
                action: 'logout'
            }
        ]
    },

    // Navegación para centros médicos
    medical_center: {
        type: 'sidebar',
        logo: {
            text: 'Centro Médico',
            href: 'medical_center_dashboard.html',
            icon: 'domain'
        },
        items: [
            {
                id: 'dashboard',
                text: 'Dashboard',
                href: 'medical_center_dashboard.html',
                icon: 'dashboard',
                description: 'Vista general'
            },
            {
                id: 'availability',
                text: 'Disponibilidad',
                href: 'medical_center_dashboard.html#availability',
                icon: 'event_available',
                description: 'Gestionar horarios'
            },
            {
                id: 'professionals',
                text: 'Profesionales',
                href: 'medical_center_dashboard.html#professionals',
                icon: 'medical_services',
                badge: '24',
                description: 'Personal médico'
            },
            {
                id: 'appointments',
                text: 'Citas',
                href: 'medical_center_dashboard.html#appointments',
                icon: 'calendar_month',
                description: 'Todas las citas'
            },
            {
                id: 'reports',
                text: 'Reportes',
                href: 'medical_center_dashboard.html#reports',
                icon: 'assessment',
                description: 'Estadísticas'
            },
            {
                id: 'settings',
                text: 'Configuración',
                href: 'medical_center_dashboard.html#settings',
                icon: 'settings'
            }
        ],
        userMenu: [
            {
                text: 'Información del Centro',
                href: 'medical_center_dashboard.html#info',
                icon: 'info'
            },
            {
                text: 'Ayuda',
                href: '__faq.html',
                icon: 'help_outline'
            },
            {
                text: 'Cerrar sesión',
                href: '#',
                icon: 'logout',
                action: 'logout'
            }
        ]
    },

    // Navegación para administradores
    admin: {
        type: 'sidebar',
        logo: {
            text: 'Panel Administrador',
            href: 'administrator_dashboard.html',
            icon: 'admin_panel_settings'
        },
        items: [
            {
                id: 'dashboard',
                text: 'Resumen General',
                href: 'administrator_dashboard.html',
                icon: 'dashboard',
                description: 'Vista global del sistema'
            },
            {
                id: 'metrics',
                text: 'Métricas del Sistema',
                href: 'administrator_dashboard.html#metrics',
                icon: 'monitoring',
                description: 'Analytics y KPIs'
            },
            {
                id: 'users',
                text: 'Gestión de Usuarios',
                href: 'patient_dashboard.html',
                icon: 'group',
                badge: '1,234',
                description: 'Usuarios y roles'
            },
            {
                id: 'centers',
                text: 'Gestión de Centros',
                href: 'medical_center_dashboard.html',
                icon: 'local_hospital',
                description: 'Centros médicos'
            },
            {
                id: 'analytics',
                text: 'Analytics Avanzado',
                href: 'healthcare_analytics_dashboard.html',
                icon: 'bar_chart',
                description: 'Reportes detallados'
            },
            {
                id: 'audit',
                text: 'Auditorías y Logs',
                href: 'administrator_dashboard.html#audit',
                icon: 'receipt_long',
                description: 'Registro de actividad'
            },
            {
                id: 'settings',
                text: 'Configuración',
                href: 'administrator_dashboard.html#settings',
                icon: 'settings',
                description: 'Configuración global'
            },
            {
                id: 'support',
                text: 'Soporte',
                href: '__faq.html',
                icon: 'support_agent'
            }
        ],
        userMenu: [
            {
                text: 'Mi Perfil',
                href: 'administrator_dashboard.html#profile',
                icon: 'person'
            },
            {
                text: 'Configuración Avanzada',
                href: 'administrator_dashboard.html#advanced',
                icon: 'tune'
            },
            {
                text: 'Cerrar sesión',
                href: '#',
                icon: 'logout',
                action: 'logout'
            }
        ]
    }
};

// ==============================================
// MAPEO DE PÁGINAS A ROLES
// ==============================================

const PAGE_ROLE_MAP = {
    'index.html': USER_ROLES.GUEST,
    'medical_appointment_landing_page.html': USER_ROLES.GUEST,
    'medical_appointment_login_page.html': USER_ROLES.GUEST,
    'password_recovery.html': USER_ROLES.GUEST,
    '__faq.html': USER_ROLES.GUEST, // Accesible para todos
    'privacy_policy.html': USER_ROLES.GUEST,
    
    'patient_dashboard.html': USER_ROLES.PATIENT,
    'book_new_appointment.html': USER_ROLES.PATIENT,
    'notification_center.html': USER_ROLES.PATIENT,
    'online_payment_screen.html': USER_ROLES.PATIENT,
    
    'doctor_dashboard.html': USER_ROLES.DOCTOR,
    
    'administrator_dashboard.html': USER_ROLES.ADMIN,
    'healthcare_analytics_dashboard.html': USER_ROLES.ADMIN
};

// ==============================================
// CONFIGURACIÓN DE BREADCRUMBS
// ==============================================

const BREADCRUMB_CONFIG = {
    'index.html': [
        { text: 'Inicio', href: 'index.html' }
    ],
    'patient_dashboard.html': [
        { text: 'Inicio', href: 'patient_dashboard.html' },
        { text: 'Mi Dashboard', href: 'patient_dashboard.html' }
    ],
    'book_new_appointment.html': [
        { text: 'Inicio', href: 'patient_dashboard.html' },
        { text: 'Mi Dashboard', href: 'patient_dashboard.html' },
        { text: 'Nueva Cita', href: 'book_new_appointment.html' }
    ],
    'notification_center.html': [
        { text: 'Inicio', href: 'patient_dashboard.html' },
        { text: 'Notificaciones', href: 'notification_center.html' }
    ],
    'doctor_dashboard.html': [
        { text: 'Inicio', href: 'doctor_dashboard.html' },
        { text: 'Dashboard', href: 'doctor_dashboard.html' }
    ],
    'medical_center_dashboard.html': [
        { text: 'Inicio', href: 'medical_center_dashboard.html' },
        { text: 'Dashboard', href: 'medical_center_dashboard.html' }
    ],
    'administrator_dashboard.html': [
        { text: 'Inicio', href: 'administrator_dashboard.html' },
        { text: 'Panel Administrador', href: 'administrator_dashboard.html' }
    ],
    '__faq.html': [
        { text: 'Inicio', href: 'index.html' },
        { text: 'Centro de Ayuda', href: '__faq.html' }
    ]
};

// ==============================================
// CONFIGURACIÓN DE ENLACES DEL FOOTER
// ==============================================

const FOOTER_CONFIG = {
    sections: [
        {
            title: 'Plataforma',
            links: [
                { text: 'Inicio', href: 'index.html' },
                { text: 'Características', href: 'index.html#caracteristicas' },
                { text: 'Cómo funciona', href: 'index.html#ventajas' }
            ]
        },
        {
            title: 'Soporte',
            links: [
                { text: 'Centro de Ayuda', href: '__faq.html' },
                { text: 'Contacto', href: '__faq.html#contact' },
                { text: 'Documentación', href: '__faq.html' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { text: 'Política de Privacidad', href: 'privacy_policy.html' },
                { text: 'Términos de Servicio', href: 'privacy_policy.html' },
                { text: 'Cookies', href: 'privacy_policy.html' }
            ]
        },
        {
            title: 'Síguenos',
            links: [
                { text: '🐦 Twitter', href: 'https://twitter.com', icon: '' },
                { text: '💼 LinkedIn', href: 'https://linkedin.com', icon: '' },
                { text: '📘 Facebook', href: 'https://facebook.com', icon: '' },
                { text: '📸 Instagram', href: 'https://instagram.com', icon: '' }
            ]
        }
    ],
    copyright: 'MIT © 2025 – Plataforma de Citas Médicas',
    disclaimer: 'Proyecto con backend Node.js para gestión centralizada de citas médicas.'
};

// ==============================================
// UTILIDADES
// ==============================================

/**
 * Obtiene el rol del usuario basado en la página actual
 * @returns {string} Rol del usuario
 */
function getCurrentUserRole() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return PAGE_ROLE_MAP[currentPage] || USER_ROLES.GUEST;
}

/**
 * Obtiene la configuración de navegación para el rol actual
 * @param {string} role - Rol del usuario
 * @returns {object} Configuración de navegación
 */
function getNavigationConfig(role = null) {
    const userRole = role || getCurrentUserRole();
    return NAVIGATION_MENUS[userRole] || NAVIGATION_MENUS.guest;
}

/**
 * Obtiene los breadcrumbs para la página actual
 * @returns {array} Array de breadcrumbs
 */
function getCurrentBreadcrumbs() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return BREADCRUMB_CONFIG[currentPage] || [];
}

/**
 * Verifica si un item de menú está activo
 * @param {string} href - URL del item
 * @returns {boolean} True si está activo
 */
function isMenuItemActive(href) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    
    // Limpiar href
    const cleanHref = href.split('#')[0];
    const itemHash = href.includes('#') ? '#' + href.split('#')[1] : '';
    
    // Comparar página
    if (cleanHref && cleanHref !== '#') {
        if (currentPage === cleanHref) {
            // Si no hay hash en el item o coincide el hash
            if (!itemHash || itemHash === currentHash) {
                return true;
            }
        }
    }
    
    // Comparar solo hash si es el mismo archivo
    if (itemHash && itemHash === currentHash) {
        return true;
    }
    
    return false;
}

// Exportar configuraciones (si se usa como módulo)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        USER_ROLES,
        NAVIGATION_MENUS,
        PAGE_ROLE_MAP,
        BREADCRUMB_CONFIG,
        FOOTER_CONFIG,
        getCurrentUserRole,
        getNavigationConfig,
        getCurrentBreadcrumbs,
        isMenuItemActive
    };
}
