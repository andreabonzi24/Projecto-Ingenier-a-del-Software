/**
 * common.js - Funciones comunes y utilidades para la Plataforma de Citas Médicas
 * Incluye validaciones de formularios y funciones auxiliares
 */

// ==============================================
// VALIDACIONES DE FORMULARIOS
// ==============================================

/**
 * Valida un campo de email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida un campo de contraseña
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima (default: 8)
 * @returns {object} - {valid: boolean, message: string}
 */
function validatePassword(password, minLength = 8) {
    if (password.length < minLength) {
        return {
            valid: false,
            message: `La contraseña debe tener al menos ${minLength} caracteres`
        };
    }
    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: 'La contraseña debe contener al menos una letra mayúscula'
        };
    }
    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            message: 'La contraseña debe contener al menos una letra minúscula'
        };
    }
    if (!/[0-9]/.test(password)) {
        return {
            valid: false,
            message: 'La contraseña debe contener al menos un número'
        };
    }
    return { valid: true, message: 'Contraseña válida' };
}

/**
 * Valida un número de tarjeta sanitaria (formato español)
 * @param {string} cardNumber - Número de tarjeta sanitaria
 * @returns {boolean} - true si el formato es válido
 */
function validateHealthCardNumber(cardNumber) {
    // Acepta números de 10-16 dígitos
    const regex = /^\d{10,16}$/;
    return regex.test(cardNumber.replace(/\s/g, ''));
}

/**
 * Valida un campo de teléfono (formato español e internacional)
 * @param {string} phone - Número de teléfono
 * @returns {boolean} - true si el teléfono es válido
 */
function validatePhone(phone) {
    // Acepta formatos: +34 123456789, 123456789, 123 456 789
    const regex = /^(\+34|0034)?[\s]?[6-9]\d{8}$/;
    return regex.test(phone.replace(/\s/g, ''));
}

/**
 * Muestra un mensaje de error en un campo de formulario
 * @param {HTMLElement} input - Campo de entrada
 * @param {string} message - Mensaje de error
 */
function showError(input, message) {
    // Eliminar errores previos
    removeError(input);
    
    // Crear elemento de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    // Añadir clase de error al input
    input.classList.add('border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-gray-300', 'focus:ring-primary');
    
    // Insertar mensaje después del input
    input.parentElement.appendChild(errorDiv);
}

/**
 * Elimina el mensaje de error de un campo
 * @param {HTMLElement} input - Campo de entrada
 */
function removeError(input) {
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
    input.classList.remove('border-red-500', 'focus:ring-red-500');
    input.classList.add('border-gray-300', 'dark:border-gray-600');
}

/**
 * Muestra un mensaje de éxito
 * @param {string} message - Mensaje de éxito
 * @param {number} duration - Duración en ms (default: 3000)
 */
function showSuccessMessage(message, duration = 3000) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    
    const container = document.createElement('div');
    container.className = 'flex items-center gap-2';
    
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'check_circle';
    
    const text = document.createElement('span');
    text.textContent = message; // Usar textContent para prevenir XSS
    
    container.appendChild(icon);
    container.appendChild(text);
    successDiv.appendChild(container);
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.classList.add('animate-fade-out');
        setTimeout(() => successDiv.remove(), 300);
    }, duration);
}

/**
 * Muestra un mensaje de error global
 * @param {string} message - Mensaje de error
 * @param {number} duration - Duración en ms (default: 3000)
 */
function showErrorMessage(message, duration = 3000) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    
    const container = document.createElement('div');
    container.className = 'flex items-center gap-2';
    
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'error';
    
    const text = document.createElement('span');
    text.textContent = message; // Usar textContent para prevenir XSS
    
    container.appendChild(icon);
    container.appendChild(text);
    errorDiv.appendChild(container);
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.classList.add('animate-fade-out');
        setTimeout(() => errorDiv.remove(), 300);
    }, duration);
}

// ==============================================
// VALIDACIÓN DE FORMULARIO DE LOGIN
// ==============================================

/**
 * Valida el formulario de login
 * @param {Event} event - Evento de submit
 * @returns {boolean} - true si el formulario es válido
 */
function validateLoginForm(event) {
    event.preventDefault();
    
    let isValid = true;
    const form = event.target;
    
    // Validar email o tarjeta sanitaria
    const emailInput = form.querySelector('#email, input[name="email"], input[type="text"]');
    if (emailInput) {
        const value = emailInput.value.trim();
        
        if (value === '') {
            showError(emailInput, 'Este campo es obligatorio');
            isValid = false;
        } else if (!validateEmail(value) && !validateHealthCardNumber(value)) {
            showError(emailInput, 'Introduce un email válido o número de tarjeta sanitaria');
            isValid = false;
        } else {
            removeError(emailInput);
        }
    }
    
    // Validar contraseña
    const passwordInput = form.querySelector('#password, input[name="password"], input[type="password"]');
    if (passwordInput) {
        const value = passwordInput.value;
        
        if (value === '') {
            showError(passwordInput, 'Este campo es obligatorio');
            isValid = false;
        } else if (value.length < 6) {
            showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        } else {
            removeError(passwordInput);
        }
    }
    
    // Si el formulario es válido, mostrar mensaje de éxito (simulado)
    if (isValid) {
        showSuccessMessage('Iniciando sesión...');
        // Aquí se haría la llamada al backend
        setTimeout(() => {
            // Simular redirección
            console.log('Formulario válido - redireccionar al dashboard');
        }, 1500);
    }
    
    return isValid;
}

// ==============================================
// UTILIDADES GENERALES
// ==============================================

/**
 * Formatea una fecha al formato español
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Formatea una hora al formato español
 * @param {Date} date - Fecha con hora a formatear
 * @returns {string} - Hora formateada
 */
function formatTime(date) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
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
 * Cierra el menú móvil al hacer clic fuera de él
 */
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    
    if (mobileMenu && !mobileMenu.contains(event.target) && 
        menuButton && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});

/**
 * Toggle visibilidad de contraseña
 * @param {HTMLElement} button - Botón de toggle
 */
function togglePasswordVisibility(button) {
    const input = button.closest('div').querySelector('input');
    const icon = button.querySelector('.material-symbols-outlined');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility';
    } else {
        input.type = 'password';
        icon.textContent = 'visibility_off';
    }
}

// ==============================================
// NUEVO: MODO OSCURO GLOBAL
// ==============================================

/**
 * Inicializa el modo oscuro basado en preferencias guardadas
 */
function initDarkMode() {
    const darkModePreference = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (darkModePreference === 'dark' || (!darkModePreference && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Toggle del modo oscuro
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
        showSuccessMessage('Modo claro activado ☀️');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
        showSuccessMessage('Modo oscuro activado 🌙');
    }
}

/**
 * Crea el botón de modo oscuro si no existe
 */
function createDarkModeToggle() {
    // Buscar si ya existe el botón
    if (document.getElementById('dark-mode-toggle')) return;
    
    // Crear botón
    const button = document.createElement('button');
    button.id = 'dark-mode-toggle';
    button.className = 'fixed bottom-24 right-6 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all hover:scale-110 z-40';
    button.onclick = toggleDarkMode;
    button.setAttribute('aria-label', 'Toggle dark mode');
    
    const isDark = document.documentElement.classList.contains('dark');
    button.innerHTML = `<span class="material-symbols-outlined text-2xl">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
    
    document.body.appendChild(button);
    
    // Actualizar icono cuando cambia el modo
    const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark');
        button.innerHTML = `<span class="material-symbols-outlined text-2xl">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// ==============================================
// NUEVO: TRANSICIONES FADE-IN GLOBALES
// ==============================================

/**
 * Añade efecto fade-in al main content
 */
function addFadeInEffect() {
    const main = document.querySelector('main, .layout-content-container');
    if (main) {
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        main.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ==============================================
// NUEVO: SKELETON LOADER
// ==============================================

/**
 * Muestra un skeleton loader mientras carga contenido
 * @param {HTMLElement} container - Contenedor donde mostrar el skeleton
 * @param {number} items - Número de items de skeleton a mostrar
 */
function showSkeletonLoader(container, items = 3) {
    const skeletonHTML = Array(items).fill(0).map(() => `
        <div class="animate-pulse bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4 mb-4">
                <div class="bg-gray-300 dark:bg-gray-600 rounded-full h-12 w-12"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = skeletonHTML;
}

/**
 * Muestra un spinner de carga
 * @param {HTMLElement} container - Contenedor donde mostrar el spinner
 * @param {string} message - Mensaje a mostrar
 */
function showLoadingSpinner(container, message = 'Cargando...') {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p class="mt-4 text-gray-600 dark:text-gray-400 font-medium">${message}</p>
        </div>
    `;
}

// ==============================================
// NUEVO: SCROLL SUAVE GLOBAL
// ==============================================

/**
 * Habilita scroll suave para toda la página
 */
function enableSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// ==============================================
// GESTIÓN DE PERFIL DE USUARIO
// ==============================================

/**
 * Carga y muestra los datos del usuario en el perfil
 */
function loadUserProfile() {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
        console.error('No se encontró usuario en localStorage');
        return null;
    }
    
    try {
        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        console.error('Error al parsear datos de usuario:', error);
        // Si el usuario está corrupto, redirigir al login
        localStorage.clear();
        window.location.replace('medical_appointment_login_page.html');
        return null;
    }
}

/**
 * Actualiza los campos del formulario de perfil con datos del usuario
 */
function populateProfileForm() {
    const user = loadUserProfile();
    if (!user) return;
    
    // Actualizar campos comunes
    const fields = {
        'profile-name': user.name || '',
        'profile-email': user.email || '',
        'profile-phone': user.phone || '',
        'profile-id': user.ID || '',
        'profile-role': user.role || '',
        'profile-healthCard': user.healthCard || '',
        'profile-companyCard': user.companyCard || '',
        'profile-specialty': user.specialty || '',
        'profile-licenseNumber': user.licenseNumber || '',
        'profile-centerId': user.centerId || ''
    };
    
    // Actualizar cada campo si existe en el DOM
    Object.keys(fields).forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.value = fields[fieldId];
        }
    });
    
    // Actualizar nombre de usuario en elementos de texto
    const userNameElements = document.querySelectorAll('.user-name-display');
    userNameElements.forEach(el => {
        el.textContent = user.name || 'Usuario';
    });
    
    // Actualizar rol en elementos de texto
    const userRoleElements = document.querySelectorAll('.user-role-display');
    userRoleElements.forEach(el => {
        const roleNames = {
            'paciente': 'Paciente',
            'medico': 'Médico',
            'admin_sistema': 'Administrador del Sistema',
            'admin_centro': 'Administrador de Centro'
        };
        el.textContent = roleNames[user.role] || user.role;
    });
    
    // Actualizar foto de perfil con iniciales
    const userAvatarElements = document.querySelectorAll('.user-avatar');
    userAvatarElements.forEach(el => {
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'US';
        el.style.backgroundImage = `url("https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Usuario')}&background=0c7e7c&color=fff&size=128")`;
    });
}

/**
 * Valida que el usuario esté autenticado y tenga datos válidos
 * Si no, redirige al login
 */
function validateUserSession() {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        console.warn('Sesión inválida o expirada');
        localStorage.clear();
        window.location.replace('medical_appointment_login_page.html');
        return false;
    }
    
    try {
        JSON.parse(userStr);
        return true;
    } catch (error) {
        console.error('Datos de usuario corruptos');
        localStorage.clear();
        window.location.replace('medical_appointment_login_page.html');
        return false;
    }
}

// ==============================================
// INICIALIZACIÓN
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // NUEVO: Inicializar modo oscuro
    initDarkMode();
    createDarkModeToggle();
    
    // NUEVO: Añadir fade-in effect
    addFadeInEffect();
    
    // NUEVO: Habilitar scroll suave
    enableSmoothScroll();
    
    // ✅ NUEVO: Cargar datos de perfil si estamos en un dashboard
    if (window.location.pathname.includes('dashboard')) {
        populateProfileForm();
    }
    
    // Añadir listeners a formularios de login
    const loginForms = document.querySelectorAll('form[data-login-form], form[id*="login"]');
    loginForms.forEach(form => {
        form.addEventListener('submit', validateLoginForm);
    });
    
    // Añadir listeners a botones de mostrar/ocultar contraseña
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');
    passwordToggles.forEach(button => {
        button.addEventListener('click', () => togglePasswordVisibility(button));
    });
    
    // Limpiar errores al escribir en los campos
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => removeError(input));
    });
});
