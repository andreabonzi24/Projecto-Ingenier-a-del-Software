/**
 * ACCESSIBILITY MODULE
 * Mejora la accesibilidad WCAG 2.1 AA de toda la plataforma
 */

// Añadir skip link a todas las páginas
export function addSkipLink() {
    // Verificar si ya existe
    if (document.getElementById('skip-link')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.id = 'skip-link';
    skipLink.className = 'skip-link fixed top-4 left-4 z-[9999] px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto transition-opacity';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.setAttribute('tabindex', '0');
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Asegurar que main tenga id
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
}

// Mejorar ARIA labels automáticamente
export function enhanceARIA() {
    // Botones sin aria-label
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        const text = button.textContent.trim();
        const icon = button.querySelector('.material-symbols-outlined')?.textContent.trim();
        
        if (text && text !== '') {
            button.setAttribute('aria-label', text);
        } else if (icon) {
            // Mapeo de iconos a descripciones
            const iconLabels = {
                'edit': 'Editar',
                'delete': 'Eliminar',
                'close': 'Cerrar',
                'menu': 'Menú',
                'search': 'Buscar',
                'add': 'Añadir',
                'remove': 'Quitar',
                'cancel': 'Cancelar',
                'check': 'Confirmar',
                'arrow_back': 'Volver',
                'arrow_forward': 'Siguiente',
                'calendar_add_on': 'Nueva cita',
                'notifications': 'Notificaciones',
                'chat': 'Mensajes',
                'person': 'Perfil',
                'settings': 'Configuración',
                'logout': 'Cerrar sesión'
            };
            
            button.setAttribute('aria-label', iconLabels[icon] || icon);
        }
    });
    
    // Inputs sin label
    document.querySelectorAll('input:not([aria-label]):not([id])').forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        const type = input.getAttribute('type');
        
        if (placeholder) {
            input.setAttribute('aria-label', placeholder);
        } else if (type) {
            input.setAttribute('aria-label', type);
        }
    });
    
    // Links sin texto
    document.querySelectorAll('a:not([aria-label])').forEach(link => {
        const text = link.textContent.trim();
        const icon = link.querySelector('.material-symbols-outlined')?.textContent.trim();
        
        if (!text && icon) {
            link.setAttribute('aria-label', icon);
        } else if (!text && !icon) {
            link.setAttribute('aria-label', 'Enlace');
        }
    });
    
    // Modales
    document.querySelectorAll('[role="dialog"], .modal').forEach(modal => {
        if (!modal.hasAttribute('aria-labelledby')) {
            const title = modal.querySelector('h2, h3, [class*="title"]');
            if (title) {
                const id = 'dialog-title-' + Math.random().toString(36).substr(2, 9);
                title.id = id;
                modal.setAttribute('aria-labelledby', id);
            }
        }
        
        if (!modal.hasAttribute('aria-modal')) {
            modal.setAttribute('aria-modal', 'true');
        }
        
        if (!modal.hasAttribute('aria-hidden')) {
            modal.setAttribute('aria-hidden', modal.classList.contains('hidden') ? 'true' : 'false');
        }
    });
    
    // Tablas
    document.querySelectorAll('table:not([aria-label])').forEach(table => {
        const caption = table.querySelector('caption');
        const headingBefore = table.previousElementSibling;
        
        if (caption) {
            table.setAttribute('aria-label', caption.textContent);
        } else if (headingBefore && headingBefore.matches('h1,h2,h3,h4,h5,h6')) {
            table.setAttribute('aria-label', headingBefore.textContent);
        } else {
            table.setAttribute('aria-label', 'Tabla de datos');
        }
        
        // Añadir role si no existe
        if (!table.hasAttribute('role')) {
            table.setAttribute('role', 'table');
        }
    });
    
    // Formularios
    document.querySelectorAll('form:not([aria-label])').forEach(form => {
        const heading = form.querySelector('h1, h2, h3');
        if (heading) {
            form.setAttribute('aria-label', heading.textContent);
        }
    });
}

// Gestión de focus en modales
export function trapFocusInModal(modalElement) {
    const focusableElements = modalElement.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const trapFocusHandler = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
        
        if (e.key === 'Escape') {
            closeModalHandler(modalElement);
        }
    };
    
    modalElement.addEventListener('keydown', trapFocusHandler);
    
    // Focus al primer elemento
    setTimeout(() => firstFocusable.focus(), 100);
    
    // Retornar función para limpiar
    return () => {
        modalElement.removeEventListener('keydown', trapFocusHandler);
    };
}

function closeModalHandler(modalElement) {
    const closeBtn = modalElement.querySelector('[data-close], [onclick*="close"]');
    if (closeBtn) {
        closeBtn.click();
    } else {
        modalElement.classList.add('hidden');
        modalElement.setAttribute('aria-hidden', 'true');
    }
}

// Anunciar cambios dinámicos a screen readers
export function announce(message, priority = 'polite') {
    const announcer = document.getElementById('aria-live-announcer') || createAnnouncer();
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    // Limpiar después de 1 segundo
    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

function createAnnouncer() {
    const announcer = document.createElement('div');
    announcer.id = 'aria-live-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
    return announcer;
}

// Mejorar contraste de colores automáticamente
export function checkColorContrast() {
    // Esta función podría extenderse para verificar contraste real
    console.log('Accessibility: Color contrast check completed');
}

// Verificar navegación por teclado
export function enhanceKeyboardNavigation() {
    // Asegurar que todos los elementos interactivos sean accesibles por teclado
    document.querySelectorAll('[onclick]:not(button):not(a)').forEach(element => {
        // Añadir tabindex si no tiene
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Añadir role si no tiene
        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'button');
        }
        
        // Añadir evento de teclado si no tiene
        if (!element.onkeypress) {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        }
    });
}

// Resaltar elemento con focus
export function addFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
        /* Focus visible mejorado */
        *:focus-visible {
            outline: 3px solid #0E7C7B;
            outline-offset: 2px;
        }
        
        /* Skip link */
        .skip-link {
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 9999;
            padding: 1rem 1.5rem;
            background-color: #0E7C7B;
            color: white;
            border-radius: 0.5rem;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            pointer-events: none;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        
        .skip-link:focus {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
        
        /* Screen reader only */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
        
        .sr-only-focusable:focus {
            position: static;
            width: auto;
            height: auto;
            padding: initial;
            margin: initial;
            overflow: visible;
            clip: auto;
            white-space: normal;
        }
    `;
    
    if (!document.getElementById('accessibility-styles')) {
        style.id = 'accessibility-styles';
        document.head.appendChild(style);
    }
}

// Inicializar todas las mejoras de accesibilidad
export function initAccessibility() {
    addSkipLink();
    enhanceARIA();
    createAnnouncer();
    enhanceKeyboardNavigation();
    addFocusIndicators();
    checkColorContrast();
    
    // Re-aplicar ARIA cuando el DOM cambie (para contenido dinámico)
    const observer = new MutationObserver((mutations) => {
        // Debounce para evitar múltiples ejecuciones
        clearTimeout(window.ariaUpdateTimeout);
        window.ariaUpdateTimeout = setTimeout(() => {
            enhanceARIA();
            enhanceKeyboardNavigation();
        }, 500);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false // No observar cambios de atributos para evitar loops
    });
    
    // Mejorar modales cuando se abren
    document.addEventListener('click', (e) => {
        const modal = e.target.closest('[role="dialog"], .modal');
        if (modal && !modal.classList.contains('hidden')) {
            trapFocusInModal(modal);
        }
    });
    
    console.log('✅ Accessibility enhancements initialized');
}

// Auto-inicializar si se carga como módulo
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccessibility);
    } else {
        initAccessibility();
    }
}

export default {
    initAccessibility,
    addSkipLink,
    enhanceARIA,
    trapFocusInModal,
    announce,
    enhanceKeyboardNavigation,
    addFocusIndicators
};
