/**
 * DOCTOR DASHBOARD MODULE
 * Gestiona la funcionalidad completa del dashboard del médico
 */

import { appointmentsAPI, authAPI, escapeHtml, showNotification, handleApiError } from '../api.js';

class DoctorDashboard {
    constructor() {
        this.currentDoctor = null;
        this.appointments = [];
        this.medicalOrders = [];
        this.patients = [];
        this.conversations = [];
        this.messages = {};
        this.activeConversation = null;
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadDoctorData();
            await this.loadAppointments();
            this.loadMedicalOrders(); // TODO: Requires backend endpoint
            this.loadPatients(); // TODO: Requires backend endpoint
            this.loadConversations(); // TODO: Requires backend endpoint
            this.setupEventListeners();
            this.setupHashNavigation();
        } catch (error) {
            console.error('Error al inicializar dashboard del médico:', error);
            handleApiError(error);
        }
    }
    
    // ========================================
    // BACKEND CONNECTION - GET /api/auth/me
    // ========================================
    async loadDoctorData() {
        try {
            const response = await authAPI.getMe();
            this.currentDoctor = response.data;
            
            // Actualizar UI
            const welcomeText = document.querySelector('h1');
            if (welcomeText && this.currentDoctor.name) {
                welcomeText.textContent = `Bienvenido/a, Dr. ${escapeHtml(this.currentDoctor.name)}`;
            }
            
        } catch (error) {
            console.error('Error al cargar datos del médico:', error);
            if (error.message?.includes('401')) {
                window.location.href = 'medical_appointment_login_page.html';
            }
        }
    }
    
    // ========================================
    // BACKEND CONNECTION - GET /api/appointments
    // ========================================
    async loadAppointments() {
        try {
            const tbody = document.getElementById('appointments-table-body');
            if (!tbody) return;
            
            // Loading state
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    </td>
                </tr>
            `;
            
            const response = await appointmentsAPI.list();
            this.appointments = response.data.appointments || [];
            
            // Filtrar solo citas de este médico
            const myAppointments = this.appointments.filter(apt => {
                if (apt.doctorId) {
                    return apt.doctorId === this.currentDoctor?.userId || apt.doctorId === this.currentDoctor?.id;
                }
                return true;
            });
            
            // Ordenar por fecha (próximas primero)
            myAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            this.renderAppointmentsCalendar(myAppointments);
            this.updateKPICounters(myAppointments);
            
        } catch (error) {
            console.error('Error al cargar citas:', error);
            const tbody = document.getElementById('appointments-table-body');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center py-12">
                            <p class="text-gray-500">No se pudieron cargar las citas</p>
                            <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Reintentar</button>
                        </td>
                    </tr>
                `;
            }
        }
    }
    
    renderAppointmentsCalendar(appointments) {
        const container = document.getElementById('appointments-calendar');
        if (!container) return;
        
        if (appointments.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300">event_available</span>
                    <p class="mt-4 text-gray-500">No tienes citas programadas</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = appointments.map(apt => {
            const date = new Date(apt.date);
            const statusColors = {
                'programada': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                'completada': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                'cancelada': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            };
            
            return `
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-gray-900 dark:text-white">${escapeHtml(apt.patientName || 'Paciente')}</h3>
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[apt.status] || statusColors.programada}">
                            ${escapeHtml(apt.status || 'Programada')}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${date.toLocaleDateString('es-ES')} - ${escapeHtml(apt.time || '00:00')}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(apt.specialty || 'Consulta')}</p>
                    ${apt.status === 'programada' ? `
                        <button onclick="doctorDashboard.markAsCompleted('${apt.id}')" class="mt-2 w-full px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                            Marcar como atendida
                        </button>
                    ` : ''}
                </div>
            `;
        }).join(''); // XSS-SAFE
    }
    
    updateKPICounters(appointments) {
        // Contar citas por estado
        const today = new Date().toDateString();
        const todayAppointments = appointments.filter(apt => 
            new Date(apt.date).toDateString() === today
        );
        
        const completed = appointments.filter(apt => apt.status === 'completada').length;
        const pending = appointments.filter(apt => apt.status === 'programada').length;
        
        // Actualizar counters en UI
        const todayCounter = document.getElementById('today-appointments-count');
        const completedCounter = document.getElementById('completed-appointments-count');
        const pendingCounter = document.getElementById('pending-appointments-count');
        
        if (todayCounter) todayCounter.textContent = todayAppointments.length;
        if (completedCounter) completedCounter.textContent = completed;
        if (pendingCounter) pendingCounter.textContent = pending;
    }
    
    // ========================================
    // BACKEND CONNECTION - PATCH /api/appointments/:id/status
    // ========================================
    async markAsCompleted(appointmentId) {
        try {
            await appointmentsAPI.updateStatus(appointmentId, 'completada');
            showNotification('Cita marcada como completada', 'success');
            await this.loadAppointments(); // Recargar
        } catch (error) {
            console.error('Error al actualizar cita:', error);
            showNotification('Error al actualizar la cita', 'error');
        }
    }
    
    // ========================================
    // ÓRDENES MÉDICAS - TODO: Requires POST /api/medical-orders
    // ========================================
    loadMedicalOrders() {
        // Datos simulados mientras se implementa el endpoint
        this.medicalOrders = [
            { id: 'ORD001', patient: 'María García', test: 'Análisis de Sangre Completo', date: '2025-10-28', status: 'pendiente' },
            { id: 'ORD002', patient: 'Juan Pérez', test: 'Resonancia Magnética', date: '2025-10-29', status: 'completada' }
        ];
        
        this.renderOrders();
    }
    
    renderOrders() {
        const tbody = document.getElementById('orders-table-body');
        if (!tbody) return;
        
        const filtered = this.medicalOrders.filter(order => {
            const searchTerm = (document.getElementById('order-search')?.value || '').toLowerCase();
            const statusFilter = document.getElementById('order-status-filter')?.value || 'all';
            
            const matchesSearch = order.patient.toLowerCase().includes(searchTerm) || 
                                 order.test.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        tbody.innerHTML = filtered.map(order => {
            let priorityIcon = '';
            if (order.test.includes('Resonancia') || order.test.includes('Magnética')) {
                priorityIcon = '<span class="material-symbols-outlined text-red-500 text-xl" title="Urgente">priority_high</span>';
            } else if (order.test.includes('Sangre') || order.test.includes('Orina')) {
                priorityIcon = '<span class="material-symbols-outlined text-blue-500 text-xl" title="Programada">schedule</span>';
            } else {
                priorityIcon = '<span class="material-symbols-outlined text-orange-500 text-xl" title="Normal">radio_button_unchecked</span>';
            }
            
            return `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                            ${priorityIcon}
                            <span class="text-gray-900 dark:text-gray-200 font-medium">${escapeHtml(order.id)}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4">${escapeHtml(order.patient)}</td>
                    <td class="px-6 py-4">${escapeHtml(order.test)}</td>
                    <td class="px-6 py-4">${escapeHtml(order.date)}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 rounded-full text-xs ${order.status === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${escapeHtml(order.status)}
                        </span>
                    </td>
                </tr>
            `;
        }).join(''); // XSS-SAFE
        
        // TODO: Conectar a backend cuando esté disponible
        // const response = await apiRequest('/medical-orders');
        // this.medicalOrders = response.data.orders;
    }
    
    async createMedicalOrder(orderData) {
        // TODO: Requires POST /api/medical-orders endpoint
        console.log('TODO: Implementar endpoint POST /api/medical-orders', orderData);
        showNotification('Funcionalidad pendiente: requiere endpoint de backend', 'info');
    }
    
    // ========================================
    // PACIENTES - TODO: Requires GET /api/users/patients
    // ========================================
    loadPatients() {
        // Simulado mientras se implementa endpoint
        this.patients = [
            { id: 1, name: 'María García', age: 34, lastVisit: '15 Oct 2025', condition: 'Control de rutina' },
            { id: 2, name: 'Juan Pérez', age: 28, lastVisit: '20 Oct 2025', condition: 'Seguimiento post-operatorio' }
        ];
        
        this.renderPatients();
    }
    
    renderPatients() {
        const container = document.getElementById('patients-list');
        if (!container) return;
        
        container.innerHTML = this.patients.map(patient => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3 mb-4">
                    <div class="bg-primary/20 rounded-full size-12 flex items-center justify-center">
                        <span class="material-symbols-outlined text-primary">person</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900 dark:text-white">${escapeHtml(patient.name)}</h3>
                        <p class="text-sm text-gray-500">${escapeHtml(patient.age)} años</p>
                    </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Última visita:</strong> ${escapeHtml(patient.lastVisit)}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Condición:</strong> ${escapeHtml(patient.condition)}</p>
                <button class="mt-4 text-primary font-bold hover:underline text-sm">Ver historial completo</button>
            </div>
        `).join(''); // XSS-SAFE
    }
    
    // ========================================
    // MENSAJERÍA - TODO: Requires GET/POST /api/messages
    // ========================================
    loadConversations() {
        // Simulado
        this.conversations = [
            { id: 1, patient: 'María García', lastMessage: 'Gracias por la atención', time: new Date(Date.now() - 600000), unread: true },
            { id: 2, patient: 'Juan Pérez', lastMessage: 'Consulta sobre medicación', time: new Date(Date.now() - 3600000), unread: false }
        ];
        
        this.renderConversations();
    }
    
    renderConversations() {
        const container = document.getElementById('conversations-list');
        if (!container) return;
        
        container.innerHTML = this.conversations.map(conv => `
            <div onclick="doctorDashboard.openConversation(${conv.id})" 
                 class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${conv.unread ? 'bg-primary/5' : ''}">
                <div class="flex items-start gap-3">
                    <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center">
                        <span class="material-symbols-outlined text-primary text-sm">person</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-sm text-gray-900 dark:text-white">${escapeHtml(conv.patient)}</h4>
                        ${conv.unread ? '<span class="w-2 h-2 bg-red-500 rounded-full"></span>' : ''}
                        <p class="text-xs text-gray-500 mt-1">${escapeHtml(conv.lastMessage)}</p>
                    </div>
                </div>
            </div>
        `).join(''); // XSS-SAFE
    }
    
    openConversation(convId) {
        this.activeConversation = convId;
        this.renderMessages(convId);
        // TODO: Marcar como leída con PATCH /api/messages/:id/read
    }
    
    renderMessages(convId) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        // Simulado
        const msgs = this.messages[convId] || [
            { from: 'patient', text: 'Hola doctor, tengo una consulta', time: new Date() },
            { from: 'doctor', text: '¡Hola! Claro, dime', time: new Date() }
        ];
        
        container.innerHTML = msgs.map(msg => {
            const isDoctor = msg.from === 'doctor';
            return `
                <div class="flex ${isDoctor ? 'justify-end' : 'justify-start'}">
                    <div class="${isDoctor ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'} p-3 rounded-lg max-w-[70%]">
                        <p class="text-sm">${escapeHtml(msg.text)}</p>
                        <p class="text-xs mt-1 ${isDoctor ? 'text-white/70' : 'text-gray-500'}">${msg.time.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                </div>
            `;
        }).join(''); // XSS-SAFE
    }
    
    sendDoctorMessage() {
        const input = document.getElementById('doctor-message-input');
        if (!input || !input.value.trim()) return;
        
        const text = input.value.trim();
        
        // TODO: POST /api/messages
        console.log('TODO: Enviar mensaje al backend:', text);
        showNotification('Funcionalidad pendiente: requiere endpoint de mensajería', 'info');
        
        input.value = '';
    }
    
    // ========================================
    // NAVEGACIÓN Y EVENT LISTENERS
    // ========================================
    showSection(sectionId) {
        document.querySelectorAll('.section, [id$="-section"]').forEach(section => {
            section.classList.add('hidden');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }
    
    setupHashNavigation() {
        const handleHash = () => {
            const hash = window.location.hash.substring(1) || 'dashboard';
            this.showSection(hash);
        };
        
        handleHash();
        window.addEventListener('hashchange', handleHash);
    }
    
    setupEventListeners() {
        // Filtros de órdenes
        const searchInput = document.getElementById('order-search');
        const statusFilter = document.getElementById('order-status-filter');
        
        if (searchInput) searchInput.addEventListener('input', () => this.renderOrders());
        if (statusFilter) statusFilter.addEventListener('change', () => this.renderOrders());
        
        // Enviar mensaje
        const sendBtn = document.getElementById('send-doctor-message');
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendDoctorMessage());
    }
}

// Inicializar
let doctorDashboard;

document.addEventListener('DOMContentLoaded', () => {
    doctorDashboard = new DoctorDashboard();
});

window.doctorDashboard = doctorDashboard;

export default DoctorDashboard;
