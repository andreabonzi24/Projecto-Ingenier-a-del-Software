/**
 * appointments-manager.js - Sistema de gestión de citas con localStorage
 * Simula un backend para persistencia de datos
 */

// ==============================================
// CLASE PRINCIPAL - APPOINTMENTS MANAGER
// ==============================================

class AppointmentsManager {
    constructor() {
        this.storageKey = 'medical_appointments';
        this.userKey = 'current_user';
        this.appointmentsHistory = 'appointments_history';
    }

    /**
     * Inicializa el sistema de citas
     */
    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.appointmentsHistory)) {
            localStorage.setItem(this.appointmentsHistory, JSON.stringify([]));
        }
    }

    /**
     * Crea una nueva cita
     */
    createAppointment(appointmentData) {
        const appointments = this.getAllAppointments();
        
        const newAppointment = {
            id: this.generateId(),
            ...appointmentData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        appointments.push(newAppointment);
        localStorage.setItem(this.storageKey, JSON.stringify(appointments));
        
        // Añadir al historial
        this.addToHistory('create', newAppointment);
        
        return newAppointment;
    }

    /**
     * Obtiene todas las citas
     */
    getAllAppointments() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Obtiene citas del usuario actual
     */
    getUserAppointments(userId = null) {
        const currentUser = userId || this.getCurrentUser();
        if (!currentUser) return [];
        
        return this.getAllAppointments().filter(apt => apt.userId === currentUser.id);
    }

    /**
     * Obtiene una cita por ID
     */
    getAppointmentById(id) {
        const appointments = this.getAllAppointments();
        return appointments.find(apt => apt.id === id);
    }

    /**
     * Actualiza una cita
     */
    updateAppointment(id, updates) {
        const appointments = this.getAllAppointments();
        const index = appointments.findIndex(apt => apt.id === id);
        
        if (index !== -1) {
            appointments[index] = {
                ...appointments[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(appointments));
            this.addToHistory('update', appointments[index]);
            return appointments[index];
        }
        return null;
    }

    /**
     * Cancela una cita
     */
    cancelAppointment(id) {
        return this.updateAppointment(id, { 
            status: 'cancelled',
            cancelledAt: new Date().toISOString()
        });
    }

    /**
     * Confirma una cita
     */
    confirmAppointment(id) {
        return this.updateAppointment(id, { 
            status: 'confirmed',
            confirmedAt: new Date().toISOString()
        });
    }

    /**
     * Completa una cita
     */
    completeAppointment(id) {
        return this.updateAppointment(id, { 
            status: 'completed',
            completedAt: new Date().toISOString()
        });
    }

    /**
     * Elimina una cita
     */
    deleteAppointment(id) {
        const appointments = this.getAllAppointments();
        const filtered = appointments.filter(apt => apt.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        this.addToHistory('delete', { id });
        return true;
    }

    /**
     * Obtiene citas próximas
     */
    getUpcomingAppointments(userId = null) {
        const appointments = userId ? this.getUserAppointments(userId) : this.getAllAppointments();
        const now = new Date();
        
        return appointments
            .filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate > now && apt.status !== 'cancelled' && apt.status !== 'completed';
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    /**
     * Obtiene citas pasadas
     */
    getPastAppointments(userId = null) {
        const appointments = userId ? this.getUserAppointments(userId) : this.getAllAppointments();
        const now = new Date();
        
        return appointments
            .filter(apt => new Date(apt.date) < now || apt.status === 'completed')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Busca citas
     */
    searchAppointments(query) {
        const appointments = this.getAllAppointments();
        const lowerQuery = query.toLowerCase();
        
        return appointments.filter(apt => 
            apt.specialty?.toLowerCase().includes(lowerQuery) ||
            apt.doctor?.toLowerCase().includes(lowerQuery) ||
            apt.hospital?.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Obtiene estadísticas
     */
    getStats(userId = null) {
        const appointments = userId ? this.getUserAppointments(userId) : this.getAllAppointments();
        
        return {
            total: appointments.length,
            pending: appointments.filter(a => a.status === 'pending').length,
            confirmed: appointments.filter(a => a.status === 'confirmed').length,
            completed: appointments.filter(a => a.status === 'completed').length,
            cancelled: appointments.filter(a => a.status === 'cancelled').length,
            upcoming: this.getUpcomingAppointments(userId).length
        };
    }

    /**
     * Gestión de usuario actual
     */
    getCurrentUser() {
        const userData = localStorage.getItem(this.userKey);
        return userData ? JSON.parse(userData) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem(this.userKey);
    }

    /**
     * Historial de cambios
     */
    addToHistory(action, data) {
        const history = JSON.parse(localStorage.getItem(this.appointmentsHistory) || '[]');
        history.push({
            action,
            data,
            timestamp: new Date().toISOString(),
            user: this.getCurrentUser()?.id || 'anonymous'
        });
        
        // Mantener solo últimos 100 cambios
        if (history.length > 100) {
            history.shift();
        }
        
        localStorage.setItem(this.appointmentsHistory, JSON.stringify(history));
    }

    getHistory() {
        return JSON.parse(localStorage.getItem(this.appointmentsHistory) || '[]');
    }

    /**
     * Utilidades
     */
    generateId() {
        return 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Exportar/Importar datos
     */
    exportData() {
        return {
            appointments: this.getAllAppointments(),
            history: this.getHistory(),
            exportedAt: new Date().toISOString()
        };
    }

    importData(data) {
        if (data.appointments) {
            localStorage.setItem(this.storageKey, JSON.stringify(data.appointments));
        }
        if (data.history) {
            localStorage.setItem(this.appointmentsHistory, JSON.stringify(data.history));
        }
    }

    /**
     * Limpiar datos
     */
    clearAll() {
        if (confirm('¿Estás seguro de que quieres eliminar todas las citas? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.appointmentsHistory);
            this.init();
            return true;
        }
        return false;
    }
}

// ==============================================
// DATOS DE DEMOSTRACIÓN
// ==============================================

function initializeDemoData() {
    const manager = new AppointmentsManager();
    manager.init();
    
    // Solo añadir datos demo si no hay citas
    if (manager.getAllAppointments().length === 0) {
        // Usuario demo
        const demoUser = {
            id: 'user_001',
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            role: 'patient'
        };
        
        manager.setCurrentUser(demoUser);
        
        // Citas demo
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        manager.createAppointment({
            userId: demoUser.id,
            specialty: 'Cardiología',
            doctor: 'Dr. Ana Torres',
            hospital: 'Hospital Universitario',
            date: tomorrow.toISOString().split('T')[0],
            time: '10:00',
            reason: 'Consulta de seguimiento',
            notes: 'Traer resultados de análisis previos'
        });
        
        manager.createAppointment({
            userId: demoUser.id,
            specialty: 'Dermatología',
            doctor: 'Dr. Carlos Ruiz',
            hospital: 'Clínica Central',
            date: nextWeek.toISOString().split('T')[0],
            time: '15:30',
            reason: 'Primera consulta',
            notes: ''
        });
        
        console.log('✅ Datos de demostración inicializados');
    }
}

// ==============================================
// INSTANCIA GLOBAL
// ==============================================

const appointmentsManager = new AppointmentsManager();
appointmentsManager.init();

// Inicializar datos demo al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDemoData);
} else {
    initializeDemoData();
}

// ==============================================
// FUNCIONES AUXILIARES PARA UI
// ==============================================

/**
 * Formatea fecha para mostrar
 */
function formatAppointmentDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Obtiene badge de estado
 */
function getStatusBadge(status) {
    const badges = {
        pending: '<span class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendiente</span>',
        confirmed: '<span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Confirmada</span>',
        completed: '<span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completada</span>',
        cancelled: '<span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelada</span>'
    };
    return badges[status] || badges.pending;
}

/**
 * Renderiza lista de citas
 */
function renderAppointmentsList(containerId, appointments) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (appointments.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">event_busy</span>
                <p class="mt-4 text-gray-600 dark:text-gray-400">No tienes citas ${containerId.includes('upcoming') ? 'próximas' : 'en tu historial'}</p>
                ${containerId.includes('upcoming') ? `
                    <button onclick="window.location.href='book_new_appointment.html'" class="mt-4 px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                        Reservar una cita
                    </button>
                ` : ''}
            </div>
        `;
        return;
    }
    
    container.innerHTML = appointments.map(apt => `
        <div class="appointment-card p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-start gap-4 flex-1">
                    <div class="bg-primary/20 rounded-lg p-3 min-w-[60px] text-center">
                        <p class="text-2xl font-bold text-primary">${new Date(apt.date).getDate()}</p>
                        <p class="text-xs text-primary">${new Date(apt.date).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()}</p>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-bold text-[#0e1b1b] dark:text-white">${apt.doctor} - ${apt.specialty}</h3>
                        <p class="text-sm text-[#4d9997] dark:text-gray-400 mt-1">${apt.hospital} - ${apt.time}</p>
                        <p class="text-sm text-[#4d9997] dark:text-gray-400">${apt.reason || 'Sin motivo especificado'}</p>
                        <div class="mt-2">${getStatusBadge(apt.status)}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                    ${apt.status === 'pending' || apt.status === 'confirmed' ? `
                        <button onclick="viewAppointment('${apt.id}')" class="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                            Ver detalles
                        </button>
                        <button onclick="cancelAppointmentConfirm('${apt.id}')" class="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                            Cancelar
                        </button>
                    ` : `
                        <button onclick="viewAppointment('${apt.id}')" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-[#0e1b1b] dark:text-white text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Ver detalles
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Ver detalles de cita
 */
function viewAppointment(id) {
    const apt = appointmentsManager.getAppointmentById(id);
    if (!apt) return;
    
    alert(`📋 Detalles de la Cita\n\n` +
          `Especialidad: ${apt.specialty}\n` +
          `Doctor: ${apt.doctor}\n` +
          `Hospital: ${apt.hospital}\n` +
          `Fecha: ${formatAppointmentDate(apt.date)}\n` +
          `Hora: ${apt.time}\n` +
          `Estado: ${apt.status}\n` +
          `Motivo: ${apt.reason || 'No especificado'}\n` +
          `Notas: ${apt.notes || 'Sin notas'}`);
}

/**
 * Confirmar cancelación de cita
 */
function cancelAppointmentConfirm(id) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?\n\nTe recomendamos cancelar con al menos 24 horas de antelación.')) {
        appointmentsManager.cancelAppointment(id);
        showSuccessMessage('Cita cancelada correctamente');
        setTimeout(() => location.reload(), 1500);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.appointmentsManager = appointmentsManager;
    window.renderAppointmentsList = renderAppointmentsList;
    window.viewAppointment = viewAppointment;
    window.cancelAppointmentConfirm = cancelAppointmentConfirm;
    window.formatAppointmentDate = formatAppointmentDate;
}
