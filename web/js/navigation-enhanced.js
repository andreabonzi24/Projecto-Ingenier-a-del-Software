/**
 * navigation-enhanced.js - Sistema de navegación mejorado
 * Gestiona navegación dinámica, breadcrumbs, componentes y UX
 */

// ==============================================
// GENERADORES DE COMPONENTES
// ==============================================

/**
 * Genera el HTML del header/navbar basado en configuración
 * @param {object} config - Configuración de navegación
 * @returns {string} HTML del navbar
 */
function generateNavbar(config) {
    const isGuest = config.type === 'top';
    const isSidebar = config.type === 'sidebar';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (isSidebar) {
        // Para usuarios con sidebar, solo mostrar top bar simple
        return generateTopBar(config);
    }
    
    // Navbar completo para guest y patient
    const navItems = config.items.map(item => {
        const isActive = isMenuItemActive(item.href);
        const badge = item.badge ? `<span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">${item.badge}</span>` : '';
        const activeClass = isActive ? 'text-primary font-bold border-b-2 border-primary' : '';
        
        return `
            <a 
                class="nav-item text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors px-2 py-2 ${activeClass}" 
                href="${item.href}"
                ${item.highlight ? 'data-highlight="true"' : ''}
            >
                ${item.text}${badge}
            </a>
        `;
    }).join('');
    
    const actionsHTML = config.actions ? config.actions.map(action => `
        <button 
            onclick="window.location.href='${action.href}'" 
            class="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 ${action.type === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 dark:bg-gray-700 text-[#0e1b1b] dark:text-white hover:bg-gray-300'} text-sm font-bold leading-normal tracking-[0.015em] transition-all"
        >
            <span class="material-symbols-outlined text-base mr-2">${action.icon}</span>
            <span class="truncate">${action.text}</span>
        </button>
    `).join('') : '';
    
    const userMenuHTML = config.userMenu ? generateUserMenu(config.userMenu) : actionsHTML;
    
    return `
        <header class="nav-header sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/30 px-4 sm:px-6 lg:px-10 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-all">
            <div class="flex items-center gap-4 text-primary cursor-pointer" onclick="window.location.href='${config.logo.href}'">
                <span class="material-symbols-outlined text-2xl">${config.logo.icon}</span>
                <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">${config.logo.text}</h2>
            </div>
            
            <nav class="hidden md:flex items-center gap-6 text-[#0e1b1b] dark:text-gray-300">
                ${navItems}
            </nav>
            
            <div class="flex items-center gap-3">
                ${userMenuHTML}
                <button 
                    data-mobile-menu-button 
                    onclick="toggleMobileMenu()" 
                    class="md:hidden flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Menú móvil"
                >
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
        
        <!-- Menú móvil -->
        <div id="mobile-menu" class="mobile-menu hidden md:hidden bg-white dark:bg-background-dark border-b border-primary/20 dark:border-primary/30 px-4 py-4 flex flex-col gap-3 animate-slide-in">
            ${config.items.map(item => {
                const isActive = isMenuItemActive(item.href);
                const badge = item.badge ? `<span class="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">${item.badge}</span>` : '';
                return `
                    <a 
                        class="flex items-center gap-3 text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-primary/10 ${isActive ? 'text-primary bg-primary/10' : ''}" 
                        href="${item.href}"
                    >
                        <span class="material-symbols-outlined text-base">${item.icon}</span>
                        <span class="flex-1">${item.text}</span>
                        ${badge}
                    </a>
                `;
            }).join('')}
            ${config.userMenu ? `
                <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                    ${config.userMenu.map(item => `
                        <a 
                            class="flex items-center gap-3 text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-primary/10" 
                            href="${item.href}"
                            ${item.action ? `onclick="event.preventDefault(); ${item.action}(); return false;"` : ''}
                        >
                            <span class="material-symbols-outlined text-base">${item.icon}</span>
                            ${item.text}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Genera el top bar para layouts con sidebar
 */
function generateTopBar(config) {
    return `
        <header class="nav-header sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/30 px-4 sm:px-6 lg:px-8 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
            <div class="flex items-center gap-4">
                <button 
                    id="sidebar-toggle" 
                    class="lg:hidden flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <span class="material-symbols-outlined">menu</span>
                </button>
                <div class="flex items-center gap-3 text-primary cursor-pointer" onclick="window.location.href='${config.logo.href}'">
                    <span class="material-symbols-outlined text-2xl">${config.logo.icon}</span>
                    <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">${config.logo.text}</h2>
                </div>
            </div>
            
            <div class="flex items-center gap-3">
                <!-- Search (opcional) -->
                <button class="hidden sm:flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span class="material-symbols-outlined">search</span>
                </button>
                
                <!-- Notifications -->
                <button onclick="window.location.href='notification_center.html'" class="flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                ${generateUserMenu(config.userMenu, true)}
            </div>
        </header>
    `;
}

/**
 * Genera el menú de usuario (dropdown)
 */
function generateUserMenu(userMenu, compact = false) {
    if (!userMenu) return '';
    
    return `
        <div class="user-menu-container relative">
            <button 
                id="user-menu-button" 
                class="flex items-center gap-2 rounded-lg h-10 px-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style='background-image: url("https://ui-avatars.com/api/?name=Usuario&background=0c7e7c&color=fff")'></div>
                ${!compact ? '<span class="hidden sm:block text-sm font-medium text-[#0e1b1b] dark:text-white">Usuario</span>' : ''}
                <span class="material-symbols-outlined text-base">expand_more</span>
            </button>
            
            <div 
                id="user-menu-dropdown" 
                class="user-menu-dropdown hidden absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-fade-in"
            >
                ${userMenu.map(item => `
                    <a 
                        href="${item.href}" 
                        class="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${item.action === 'logout' ? 'text-red-600 dark:text-red-400' : 'text-[#0e1b1b] dark:text-white'}"
                        ${item.action ? `onclick="event.preventDefault(); ${item.action}(); return false;"` : ''}
                    >
                        <span class="material-symbols-outlined text-base">${item.icon}</span>
                        ${item.text}
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Genera el sidebar para layouts tipo dashboard
 */
function generateSidebar(config) {
    if (config.type !== 'sidebar') return '';
    
    const currentPage = window.location.pathname.split('/').pop() || '';
    
    return `
        <aside id="sidebar" class="sidebar fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform lg:transform-none transition-transform duration-300 -translate-x-full lg:translate-x-0">
            <div class="flex flex-col h-full">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-3 text-primary">
                        <span class="material-symbols-outlined text-2xl">${config.logo.icon}</span>
                        <h2 class="text-base font-bold">${config.logo.text}</h2>
                    </div>
                    <button 
                        id="sidebar-close" 
                        class="lg:hidden flex items-center justify-center rounded-lg h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <span class="material-symbols-outlined text-base">close</span>
                    </button>
                </div>
                
                <!-- Sidebar Navigation -->
                <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                    ${config.items.map(item => {
                        const isActive = isMenuItemActive(item.href);
                        const badge = item.badge ? `<span class="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">${item.badge}</span>` : '';
                        
                        return `
                            <a 
                                href="${item.href}" 
                                class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-primary/20 text-primary font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}"
                                title="${item.description || item.text}"
                            >
                                <span class="material-symbols-outlined text-xl">${item.icon}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium truncate">${item.text}</p>
                                    ${item.description ? `<p class="text-xs text-gray-500 dark:text-gray-400 truncate">${item.description}</p>` : ''}
                                </div>
                                ${badge}
                            </a>
                        `;
                    }).join('')}
                </nav>
                
                <!-- Sidebar Footer -->
                <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
                        <p>Plataforma de Citas Médicas</p>
                        <p class="mt-1">v1.0.0</p>
                    </div>
                </div>
            </div>
        </aside>
        
        <!-- Sidebar Overlay (mobile) -->
        <div id="sidebar-overlay" class="sidebar-overlay hidden lg:hidden fixed inset-0 bg-black/50 z-30" onclick="toggleSidebar()"></div>
    `;
}

/**
 * Genera los breadcrumbs
 */
function generateBreadcrumbs(breadcrumbs) {
    if (!breadcrumbs || breadcrumbs.length === 0) return '';
    
    return `
        <nav class="breadcrumbs flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-sm" aria-label="Breadcrumb">
            ${breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return `
                    ${index > 0 ? '<span class="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>' : ''}
                    ${isLast ? 
                        `<span class="font-medium text-primary">${crumb.text}</span>` :
                        `<a href="${crumb.href}" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">${crumb.text}</a>`
                    }
                `;
            }).join('')}
        </nav>
    `;
}

/**
 * Genera el footer
 */
function generateFooter() {
    const config = FOOTER_CONFIG;
    
    return `
        <footer class="footer w-full mt-auto py-12 border-t border-solid border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Footer Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    ${config.sections.map(section => `
                        <div>
                            <h3 class="text-base font-bold text-[#0e1b1b] dark:text-white mb-4">${section.title}</h3>
                            <ul class="space-y-2">
                                ${section.links.map(link => `
                                    <li>
                                        <a href="${link.href}" class="text-sm text-[#4d9997] dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors flex items-center gap-2">
                                            ${link.icon ? `<span class="material-symbols-outlined text-base">${link.icon}</span>` : ''}
                                            ${link.text}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Footer Bottom -->
                <div class="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">local_hospital</span>
                        <p class="text-sm text-[#4d9997] dark:text-gray-400">${config.copyright}</p>
                    </div>
                    <p class="text-xs text-[#4d9997] dark:text-gray-500">${config.disclaimer}</p>
                </div>
            </div>
        </footer>
    `;
}

// ==============================================
// FUNCIONES DE INICIALIZACIÓN
// ==============================================

/**
 * Inicializa la navegación en la página
 */
function initializeNavigation() {
    const userRole = getCurrentUserRole();
    const config = getNavigationConfig(userRole);
    const breadcrumbs = getCurrentBreadcrumbs();
    
    // Generar componentes
    const navbarHTML = generateNavbar(config);
    const sidebarHTML = generateSidebar(config);
    const breadcrumbsHTML = generateBreadcrumbs(breadcrumbs);
    const footerHTML = generateFooter();
    
    // Insertar navbar al inicio del body
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Insertar sidebar si es necesario
    if (config.type === 'sidebar') {
        body.insertAdjacentHTML('afterbegin', sidebarHTML);
        
        // Ajustar contenido para sidebar
        const main = body.querySelector('main, .layout-container');
        if (main) {
            main.style.marginLeft = '0';
            main.classList.add('lg:ml-64');
        }
    }
    
    // Insertar breadcrumbs después del header
    if (breadcrumbsHTML) {
        const header = body.querySelector('.nav-header');
        if (header) {
            header.insertAdjacentHTML('afterend', breadcrumbsHTML);
        }
    }
    
    // Insertar footer al final
    body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Inicializar event listeners
    initializeEventListeners();
    
    // Marcar item activo
    highlightActiveMenuItem();
}

/**
 * Inicializa los event listeners
 */
function initializeEventListeners() {
    // User menu dropdown
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = document.getElementById('user-menu-dropdown');
    
    if (userMenuButton && userMenuDropdown) {
        userMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenuDropdown.classList.toggle('hidden');
            userMenuButton.setAttribute('aria-expanded', 
                userMenuDropdown.classList.contains('hidden') ? 'false' : 'true'
            );
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', () => {
            userMenuDropdown.classList.add('hidden');
            userMenuButton.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', toggleSidebar);
    }
    
    // Smooth scroll para anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Actualizar URL
                    history.pushState(null, null, href);
                    // Actualizar item activo
                    highlightActiveMenuItem();
                }
            }
        });
    });
}

/**
 * Toggle del sidebar
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    }
}

/**
 * Toggle del menú móvil
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * Resalta el item de menú activo
 */
function highlightActiveMenuItem() {
    // Actualizar clases de items activos
    document.querySelectorAll('.nav-item, .sidebar-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href && isMenuItemActive(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ==============================================
// INICIALIZACIÓN AUTOMÁTICA
// ==============================================

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

// Actualizar highlighting cuando cambia el hash
window.addEventListener('hashchange', highlightActiveMenuItem);
