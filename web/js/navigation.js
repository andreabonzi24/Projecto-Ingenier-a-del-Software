/**
 * navigation.js - Configuración de navegación para la Plataforma de Citas Médicas
 * Define la estructura de menús según el tipo de usuario
 */

// ==============================================
// CONFIGURACIÓN DE NAVEGACIÓN
// ==============================================

const NAVIGATION_CONFIG = {
    // Navegación para página de inicio (no autenticado)
    landing: [
        { text: 'Inicio', href: 'index.html', id: 'inicio' },
        { text: 'Características', href: 'index.html#caracteristicas', id: 'caracteristicas' },
        { text: 'Cómo funciona', href: 'index.html#ventajas', id: 'ventajas' },
        { text: 'Ayuda', href: '__faq.html', id: 'ayuda' }
    ],
    
    // Navegación para pacientes
    patient: [
        { text: 'Mi Dashboard', href: 'patient_dashboard.html', icon: 'dashboard' },
        { text: 'Nueva Cita', href: 'book_new_appointment.html', icon: 'calendar_add_on' },
        { text: 'Mis Citas', href: 'patient_dashboard.html#appointments', icon: 'calendar_month' },
        { text: 'Notificaciones', href: 'notification_center.html', icon: 'notifications' },
        { text: 'Ayuda', href: '__faq.html', icon: 'help_outline' }
    ],
    
    // Navegación para doctores
    doctor: [
        { text: 'Dashboard', href: 'doctor_dashboard.html', icon: 'dashboard' },
        { text: 'Citas de Pacientes', href: 'doctor_dashboard.html#appointments', icon: 'calendar_month' },
        { text: 'Órdenes Médicas', href: 'doctor_dashboard.html#orders', icon: 'receipt_long' },
        { text: 'Disponibilidad', href: 'doctor_dashboard.html#availability', icon: 'schedule' },
        { text: 'Soporte', href: '__faq.html', icon: 'support_agent' }
    ],
    
    // Navegación para administradores
    admin: [
        { text: 'Dashboard', href: 'administrator_dashboard.html', icon: 'dashboard' },
        { text: 'Gestión de Usuarios', href: 'patient_dashboard.html', icon: 'group' },
        { text: 'Centros Médicos', href: 'medical_center_dashboard.html', icon: 'local_hospital' },
        { text: 'Analytics', href: 'healthcare_analytics_dashboard.html', icon: 'bar_chart' },
        { text: 'Configuración', href: 'administrator_dashboard.html#settings', icon: 'settings' }
    ]
};

// ==============================================
// ENLACES DEL FOOTER
// ==============================================

const FOOTER_LINKS = [
    { text: 'Política de Privacidad', href: 'privacy_policy.html' },
    { text: 'Términos de Servicio', href: 'terms_of_service.html' },
    { text: 'Contacto', href: '__faq.html#contact' },
    { text: 'Ayuda', href: '__faq.html' }
];

// ==============================================
// FUNCIONES DE NAVEGACIÓN
// ==============================================

/**
 * Obtiene el tipo de usuario actual (simulado)
 * En producción, esto vendría del estado de sesión/token
 * @returns {string} - Tipo de usuario: 'landing', 'patient', 'doctor', 'admin'
 */
function getCurrentUserType() {
    // Detectar por la página actual
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage.includes('doctor')) return 'doctor';
    if (currentPage.includes('administrator') || currentPage.includes('admin')) return 'admin';
    if (currentPage.includes('patient') || currentPage.includes('book') || currentPage.includes('notification')) return 'patient';
    
    return 'landing';
}

/**
 * Genera el HTML de la barra de navegación
 * @param {string} userType - Tipo de usuario
 * @returns {string} - HTML de la navegación
 */
function generateNavbar(userType = null) {
    const type = userType || getCurrentUserType();
    const navItems = NAVIGATION_CONFIG[type] || NAVIGATION_CONFIG.landing;
    const isAuthenticated = type !== 'landing';
    
    const navHTML = navItems.map(item => {
        if (item.icon) {
            return `
                <a class="text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors" href="${item.href}">
                    ${item.text}
                </a>
            `;
        } else {
            return `<a class="text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors" href="${item.href}">${item.text}</a>`;
        }
    }).join('');
    
    const authButton = isAuthenticated 
        ? `
            <div class="flex items-center gap-3">
                <button onclick="window.location.href='notification_center.html'" class="flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors">
                    <span class="material-symbols-outlined">notifications</span>
                </button>
                <button onclick="logout()" class="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                    <span class="truncate">Cerrar sesión</span>
                </button>
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all" style='background-image: url("https://ui-avatars.com/api/?name=User&background=0c7e7c&color=fff")' onclick="window.location.href='patient_dashboard.html'"></div>
            </div>
        `
        : `
            <button onclick="window.location.href='medical_appointment_login_page.html'" class="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                <span class="truncate">Iniciar sesión</span>
            </button>
        `;
    
    return `
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/30 px-4 sm:px-6 lg:px-10 py-3 sticky top-0 bg-background-light dark:bg-background-dark z-50">
            <div class="flex items-center gap-4 text-primary">
                <span class="material-symbols-outlined text-2xl">local_hospital</span>
                <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer" onclick="window.location.href='index.html'">Plataforma de Citas Médicas</h2>
            </div>
            <nav class="hidden md:flex items-center gap-8 text-[#0e1b1b] dark:text-gray-300">
                ${navHTML}
            </nav>
            ${authButton}
            <button data-mobile-menu-button onclick="toggleMobileMenu()" class="md:hidden flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors">
                <span class="material-symbols-outlined">menu</span>
            </button>
        </header>
        
        <!-- Menú móvil -->
        <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-background-dark border-b border-primary/20 dark:border-primary/30 px-4 py-4 flex flex-col gap-3">
            ${navItems.map(item => `
                <a class="text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors py-2" href="${item.href}">
                    ${item.icon ? `<span class="material-symbols-outlined text-base mr-2">${item.icon}</span>` : ''}
                    ${item.text}
                </a>
            `).join('')}
            ${isAuthenticated ? `
                <button onclick="logout()" class="mt-2 flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal">
                    Cerrar sesión
                </button>
            ` : `
                <button onclick="window.location.href='medical_appointment_login_page.html'" class="mt-2 flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal">
                    Iniciar sesión
                </button>
            `}
        </div>
    `;
}

/**
 * Genera el HTML del footer
 * @returns {string} - HTML del footer
 */
function generateFooter() {
    const linksHTML = FOOTER_LINKS.map(link => 
        `<a class="text-sm text-[#4d9997] dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors" href="${link.href}">${link.text}</a>`
    ).join('');
    
    return `
        <footer class="w-full mt-10 md:mt-20 py-8 border-t border-solid border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">local_hospital</span>
                        <p class="text-sm text-[#4d9997] dark:text-gray-400">MIT © 2025 – Plataforma de Citas Médicas</p>
                    </div>
                    <div class="flex flex-wrap gap-4 justify-center">
                        ${linksHTML}
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-xs text-[#4d9997] dark:text-gray-500">
                        Proyecto con backend Node.js para gestión centralizada de citas médicas. 
                        Todos los datos son de prueba.
                    </p>
                </div>
            </div>
        </footer>
    `;
}

/**
 * Función de logout - Unificada para todos los dashboards
 * ✅ CORRECCIÓN FINAL: Redirige a index.html y evita volver atrás
 */
function logout() {
    // Limpiar completamente el localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    // Opcional: Mostrar mensaje
    if (typeof showSuccessMessage === 'function') {
        showSuccessMessage('Sesión cerrada correctamente');
    } else {
        alert('Sesión cerrada correctamente');
    }
    
    // Limpiar el historial para prevenir volver atrás
    window.history.pushState(null, '', window.location.href);
    
    // Redirigir a la página principal usando replace() para evitar navegación hacia atrás
    setTimeout(() => {
        window.location.replace('/index.html');
    }, 500);
}

/**
 * Inserta la navegación y el footer en la página actual
 */
function initNavigation() {
    // Insertar navbar al inicio del body
    const body = document.body;
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = generateNavbar();
    
    // Buscar el primer elemento que no sea script
    const firstElement = body.querySelector(':not(script)');
    if (firstElement) {
        body.insertBefore(navbarContainer.firstElementChild, firstElement);
        if (navbarContainer.children.length > 1) {
            body.insertBefore(navbarContainer.children[0], firstElement.nextSibling);
        }
    }
    
    // Insertar footer al final del body
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = generateFooter();
    body.appendChild(footerContainer.firstElementChild);
}

// Inicializar navegación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

/**
 * ✅ INICIALIZACIÓN AUTOMÁTICA DE BOTONES DE LOGOUT
 * Añade listeners a todos los botones de cerrar sesión
 */
document.addEventListener('DOMContentLoaded', function() {
    // Buscar todos los botones con clases o IDs de logout
    const logoutButtons = document.querySelectorAll('.logout-button, #logoutBtn, [onclick*="logout"]');
    
    logoutButtons.forEach(button => {
        // Remover onclick inline si existe
        button.removeAttribute('onclick');
        
        // Añadir evento click
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
    
    console.log(`✅ Inicializados ${logoutButtons.length} botones de logout`);
});
