/**
 * PATIENT DASHBOARD MODULE
 * Gestiona la funcionalidad completa del dashboard del paciente
 */

import { appointmentsAPI, authAPI, escapeHtml, showNotification, handleApiError } from '../api.js';

class PatientDashboard {
    constructor() {
        this.currentUser = null;
        this.appointments = [];
        this.userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
        
        this.REWARD_LEVELS = {
            bronze: { name: 'Bronce', emoji: '🥉', min: 0, max: 99 },
            silver: { name: 'Plata', emoji: '🥈', min: 100, max: 249 },
            gold: { name: 'Oro', emoji: '🥇', min: 250, max: 499 },
            platinum: { name: 'Platino', emoji: '💎', min: 500, max: Infinity }
        };
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadUserData();
            await this.loadAppointments();
            this.updateRewardsDisplay();
            this.setupEventListeners();
            this.setupHashNavigation();
        } catch (error) {
            console.error('Error al inicializar dashboard:', error);
            handleApiError(error);
        }
    }
    
    // ========================================
    // BACKEND CONNECTION - GET /api/auth/me
    // ========================================
    async loadUserData() {
        try {
            const response = await authAPI.getMe();
            this.currentUser = response.data;
            
            // Actualizar UI con datos del usuario
            const welcomeText = document.querySelector('h1');
            if (welcomeText && this.currentUser.name) {
                welcomeText.textContent = `¡Bienvenido/a, ${escapeHtml(this.currentUser.name)}!`;
            }
            
            // Si el backend devuelve puntos, usarlos; si no, usar localStorage
            if (typeof this.currentUser.points === 'number') {
                this.userPoints = this.currentUser.points;
                localStorage.setItem('userPoints', this.userPoints);
            }
            
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            // Si falla, redirigir a login
            if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                window.location.href = 'medical_appointment_login_page.html';
            }
        }
    }
    
    // ========================================
    // BACKEND CONNECTION - GET /api/appointments
    // ========================================
    async loadAppointments() {
        try {
            const appointmentsContainer = document.querySelector('#appointments .space-y-4');
            if (!appointmentsContainer) return;
            
            // Loading state
            appointmentsContainer.innerHTML = `
                <div class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            `;
            
            const response = await appointmentsAPI.list();
            this.appointments = response.data.appointments || [];
            
            // Filtrar solo citas del usuario actual
            const myAppointments = this.appointments.filter(apt => {
                // Si el backend devuelve patientId, usarlo; si no, mostrar todas
                if (apt.patientId) {
                    return apt.patientId === this.currentUser?.userId || apt.patientId === this.currentUser?.id;
                }
                return true;
            });
            
            // Ordenar por fecha (próximas primero)
            myAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            this.renderAppointments(myAppointments);
            
        } catch (error) {
            console.error('Error al cargar citas:', error);
            const appointmentsContainer = document.querySelector('#appointments .space-y-4');
            if (appointmentsContainer) {
                appointmentsContainer.innerHTML = `
                    <div class="text-center py-12">
                        <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">event_busy</span>
                        <p class="mt-4 text-gray-500 dark:text-gray-400">No se pudieron cargar las citas</p>
                        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                            Reintentar
                        </button>
                    </div>
                `;
            }
        }
    }
    
    renderAppointments(appointments) {
        const container = document.querySelector('#appointments .space-y-4');
        if (!container) return;
        
        if (appointments.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">event_available</span>
                    <p class="mt-4 text-gray-500 dark:text-gray-400">No tienes citas programadas</p>
                    <button onclick="window.location.href='book_new_appointment.html'" class="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold">
                        Reservar Primera Cita
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = appointments.map((apt, index) => {
            const date = new Date(apt.date);
            const day = date.getDate();
            const month = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
            const isPrimary = index === 0; // Primera cita destacada
            
            return `
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg ${isPrimary ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20' : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'}">
                    <div class="flex items-start gap-4 flex-1">
                        <div class="${isPrimary ? 'bg-primary/20' : 'bg-gray-200 dark:bg-gray-600'} rounded-lg p-3 min-w-[60px] text-center">
                            <p class="text-2xl font-bold ${isPrimary ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}">${day}</p>
                            <p class="text-xs ${isPrimary ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}">${month}</p>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-[#0e1b1b] dark:text-white">
                                ${escapeHtml(apt.doctorName || 'Doctor')} - ${escapeHtml(apt.specialty || 'Consulta')}
                            </h3>
                            <p class="text-sm text-[#4d9997] dark:text-gray-400 mt-1">
                                ${escapeHtml(apt.centerName || apt.center || 'Centro Médico')} - ${escapeHtml(apt.time || '00:00')}
                            </p>
                            <p class="text-sm text-[#4d9997] dark:text-gray-400">
                                ${escapeHtml(apt.reason || 'Consulta general')}
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="patientDashboard.viewAppointmentDetails('${apt.id}')" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                            Ver detalles
                        </button>
                        <button onclick="patientDashboard.cancelAppointment('${apt.id}')" class="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
        }).join(''); // XSS-SAFE: Todos los datos sanitizados con escapeHtml
    }
    
    viewAppointmentDetails(appointmentId) {
        const apt = this.appointments.find(a => a.id === appointmentId);
        if (!apt) return;
        
        // Aquí podrías abrir un modal con más detalles
        showNotification(`Detalles de cita: ${apt.doctorName} - ${apt.date}`, 'info');
        // TODO: Implementar modal de detalles completo
    }
    
    // ========================================
    // BACKEND CONNECTION - DELETE /api/appointments/:id
    // ========================================
    async cancelAppointment(appointmentId) {
        if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) return;
        
        try {
            await appointmentsAPI.cancel(appointmentId);
            showNotification('Cita cancelada correctamente', 'success');
            
            // Recargar citas
            await this.loadAppointments();
            
        } catch (error) {
            console.error('Error al cancelar cita:', error);
            showNotification('Error al cancelar la cita. Intenta de nuevo.', 'error');
        }
    }
    
    // ========================================
    // SISTEMA DE PUNTOS Y RECOMPENSAS
    // ========================================
    updateRewardsDisplay() {
        // Actualizar puntos mostrados
        const pointsElements = document.querySelectorAll('[id*="points"]');
        pointsElements.forEach(el => {
            if (el.id.includes('points') && !el.id.includes('progress')) {
                el.textContent = this.userPoints;
            }
        });
        
        localStorage.setItem('userPoints', this.userPoints);
        
        // Determinar nivel actual
        let currentLevel = null;
        for (let [key, level] of Object.entries(this.REWARD_LEVELS)) {
            if (this.userPoints >= level.min && this.userPoints <= level.max) {
                currentLevel = level;
                break;
            }
        }
        
        // Actualizar UI de nivel
        if (currentLevel) {
            const levelElement = document.getElementById('current-level');
            if (levelElement) {
                levelElement.textContent = `Nivel: ${currentLevel.emoji} ${currentLevel.name}`;
            }
            
            // Calcular progreso
            const nextLevelMin = currentLevel.name === 'Platino' ? 1000 : currentLevel.max + 1;
            const progress = ((this.userPoints - currentLevel.min) / (nextLevelMin - currentLevel.min)) * 100;
            
            const progressBars = document.querySelectorAll('[id*="progress-bar"]');
            progressBars.forEach(bar => {
                bar.style.width = `${Math.min(progress, 100)}%`;
            });
            
            const pointsToNextElements = document.querySelectorAll('[id*="points-to-next"]');
            const pointsNeeded = nextLevelMin - this.userPoints;
            pointsToNextElements.forEach(el => {
                el.textContent = pointsNeeded > 0 ? pointsNeeded : 0;
            });
        }
    }
    
    addPoints(amount) {
        this.userPoints += amount;
        this.updateRewardsDisplay();
        showNotification(`¡Has ganado ${amount} puntos!`, 'success');
        
        // TODO: Sincronizar con backend cuando esté disponible
        // await apiRequest('/users/points', { method: 'PATCH', body: JSON.stringify({ points: amount }) });
    }
    
    redeemPoints() {
        const pointsToRedeem = 100;
        const discount = 5;
        
        if (this.userPoints < pointsToRedeem) {
            showNotification(`Necesitas al menos ${pointsToRedeem} puntos para canjear`, 'error');
            return;
        }
        
        if (!confirm(`¿Canjear ${pointsToRedeem} puntos por ${discount}€ de descuento?`)) return;
        
        this.userPoints -= pointsToRedeem;
        this.updateRewardsDisplay();
        showNotification(`¡Has canjeado ${discount}€ de descuento!`, 'success');
        
        // TODO: Aplicar descuento en próximo pago
    }
    
    // ========================================
    // NAVEGACIÓN ENTRE SECCIONES
    // ========================================
    showSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección solicitada
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Actualizar navegación activa
        this.updateActiveNav(sectionId);
    }
    
    updateActiveNav(sectionId) {
        // Actualizar enlaces del menú (si hay navegación lateral/superior)
        document.querySelectorAll('nav a, aside a').forEach(link => {
            link.classList.remove('active', 'font-bold', 'text-primary', 'bg-primary/10');
            
            const href = link.getAttribute('href');
            if (href && href.includes(`#${sectionId}`)) {
                link.classList.add('active', 'font-bold', 'text-primary', 'bg-primary/10');
            }
        });
    }
    
    setupHashNavigation() {
        // Manejar navegación por hash
        const handleHash = () => {
            const hash = window.location.hash.substring(1); // Quitar el #
            
            if (hash) {
                this.showSection(hash);
            } else {
                this.showSection('dashboard');
            }
        };
        
        // Ejecutar al cargar y al cambiar hash
        handleHash();
        window.addEventListener('hashchange', handleHash);
    }
    
    // ========================================
    // EVENT LISTENERS
    // ========================================
    setupEventListeners() {
        // Botón de canjear puntos
        const redeemBtn = document.getElementById('redeem-points-btn');
        if (redeemBtn) {
            redeemBtn.addEventListener('click', () => this.redeemPoints());
        }
        
        // Simular ganar puntos (para testing)
        const testPointsBtn = document.getElementById('test-add-points');
        if (testPointsBtn) {
            testPointsBtn.addEventListener('click', () => this.addPoints(10));
        }
    }
}

// Inicializar cuando el DOM esté listo
let patientDashboard;

document.addEventListener('DOMContentLoaded', () => {
    patientDashboard = new PatientDashboard();
});

// Exportar para uso global (para botones onclick en HTML)
window.patientDashboard = patientDashboard;

export default PatientDashboard;
