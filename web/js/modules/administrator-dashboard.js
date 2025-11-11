/**
 * ADMINISTRATOR DASHBOARD MODULE
 * Gestiona CRUD completo de usuarios y centros médicos
 */

import { usersAPI, centersAPI, authAPI, escapeHtml, showNotification, handleApiError } from '../api.js';

class AdministratorDashboard {
    constructor() {
        this.currentAdmin = null;
        this.users = [];
        this.centers = [];
        this.roles = [
            { id: 'paciente', name: 'Paciente', description: 'Puede reservar, ver y cancelar sus propias citas' },
            { id: 'medico', name: 'Médico', description: 'Gestiona su propia agenda, citas y ve historial de pacientes' },
            { id: 'admin_centro', name: 'Admin de Centro', description: 'Gestiona profesionales y citas de un centro específico' },
            { id: 'admin_sistema', name: 'Admin del Sistema', description: 'Acceso total al panel, gestión de usuarios y centros' }
        ];
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadAdminData();
            await this.loadUsers();
            await this.loadCenters();
            this.setupEventListeners();
            this.setupHashNavigation();
            this.renderRoles();
        } catch (error) {
            console.error('Error al inicializar dashboard de administrador:', error);
            handleApiError(error);
        }
    }
    
    // ========================================
    // BACKEND CONNECTION - GET /api/auth/me
    // ========================================
    async loadAdminData() {
        try {
            const response = await authAPI.getMe();
            this.currentAdmin = response.data;
            
            // Verificar que sea admin
            if (!this.currentAdmin.role?.includes('admin')) {
                showNotification('Acceso no autorizado', 'error');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                return;
            }
            
            // Actualizar UI
            const welcomeText = document.querySelector('h1');
            if (welcomeText && this.currentAdmin.name) {
                welcomeText.textContent = `Panel de Administración - ${escapeHtml(this.currentAdmin.name)}`;
            }
            
        } catch (error) {
            console.error('Error al cargar datos del administrador:', error);
            window.location.href = 'medical_appointment_login_page.html';
        }
    }
    
    // ========================================
    // USUARIOS - CRUD COMPLETO
    // ========================================
    
    // GET /api/users
    async loadUsers() {
        try {
            const tbody = document.getElementById('users-table-body');
            if (!tbody) return;
            
            // Loading state
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    </td>
                </tr>
            `;
            
            const response = await usersAPI.list();
            this.users = response.data.users || [];
            
            this.renderUsers();
            
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            const tbody = document.getElementById('users-table-body');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-12 text-gray-500">
                            No se pudieron cargar los usuarios
                            <button onclick="administratorDashboard.loadUsers()" class="ml-4 px-4 py-2 bg-primary text-white rounded-lg">Reintentar</button>
                        </td>
                    </tr>
                `;
            }
        }
    }
    
    renderUsers() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;
        
        // Filtrar por búsqueda
        const searchTerm = (document.getElementById('user-search')?.value || '').toLowerCase();
        const filtered = this.users.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
        );
        
        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-12 text-gray-500">
                        No se encontraron usuarios
                    </td>
                </tr>
            `;
            return;
        }
        
        const roleColors = {
            "Médico": "bg-primary/20 text-primary",
            "medico": "bg-primary/20 text-primary",
            "Paciente": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
            "paciente": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
            "Admin de Centro": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
            "admin_centro": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
            "Admin del Sistema": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
            "admin_sistema": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
        };
        
        tbody.innerHTML = filtered.map(user => `
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="px-6 py-4 font-medium">${escapeHtml(user.name)}</td>
                <td class="px-6 py-4">${escapeHtml(user.email)}</td>
                <td class="px-6 py-4">
                    <span class="${roleColors[user.role] || 'bg-gray-100 text-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded-full">
                        ${escapeHtml(user.role)}
                    </span>
                </td>
                <td class="px-6 py-4">${escapeHtml(user.specialty || '-')}</td>
                <td class="px-6 py-4">${escapeHtml(user.lastAccess || 'N/A')}</td>
                <td class="px-6 py-4 text-right">
                    <button onclick="administratorDashboard.openEditUserModal('${user.id}')" class="p-2 rounded-full hover:bg-primary/20">
                        <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button onclick="administratorDashboard.deleteUser('${user.id}')" class="p-2 rounded-full hover:bg-red-500/20">
                        <span class="material-symbols-outlined text-lg text-red-500">delete</span>
                    </button>
                </td>
            </tr>
        `).join(''); // XSS-SAFE: Todos los campos sanitizados
    }
    
    // POST /api/users
    async createUser(event) {
        event?.preventDefault();
        
        const name = document.getElementById('add-user-name')?.value;
        const email = document.getElementById('add-user-email')?.value;
        const password = document.getElementById('add-user-password')?.value;
        const role = document.getElementById('add-user-role')?.value;
        const specialty = document.getElementById('add-user-specialty')?.value;
        
        if (!name || !email || !password || !role) {
            showNotification('Completa todos los campos obligatorios', 'error');
            return;
        }
        
        try {
            const userData = {
                name,
                email,
                password,
                role
            };
            
            if (role === 'medico' && specialty) {
                userData.specialty = specialty;
            }
            
            await usersAPI.create(userData);
            showNotification('Usuario creado correctamente', 'success');
            this.closeModal('modal-add-user');
            await this.loadUsers(); // Recargar tabla
            
            // Limpiar formulario
            document.getElementById('form-add-user')?.reset();
            
        } catch (error) {
            console.error('Error al crear usuario:', error);
            if (error.message.includes('email')) {
                showNotification('Este email ya está registrado', 'error');
            } else {
                showNotification('Error al crear usuario', 'error');
            }
        }
    }
    
    // PUT /api/users/:id
    async updateUser(event) {
        event?.preventDefault();
        
        const userId = document.getElementById('edit-user-id')?.value;
        const name = document.getElementById('edit-user-name')?.value;
        const email = document.getElementById('edit-user-email')?.value;
        const role = document.getElementById('edit-user-role')?.value;
        const specialty = document.getElementById('edit-user-specialty')?.value;
        
        if (!userId || !name || !email || !role) {
            showNotification('Completa todos los campos obligatorios', 'error');
            return;
        }
        
        try {
            const userData = { name, email, role };
            
            if (role === 'medico' && specialty) {
                userData.specialty = specialty;
            }
            
            await usersAPI.update(userId, userData);
            showNotification('Usuario actualizado correctamente', 'success');
            this.closeModal('modal-edit-user');
            await this.loadUsers();
            
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            showNotification('Error al actualizar usuario', 'error');
        }
    }
    
    openEditUserModal(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;
        
        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-user-name').value = user.name;
        document.getElementById('edit-user-email').value = user.email;
        document.getElementById('edit-user-role').value = user.role;
        document.getElementById('edit-user-specialty').value = user.specialty || '';
        
        // Mostrar campo de especialidad si es médico
        const specialtyField = document.getElementById('edit-specialty-field');
        if (specialtyField) {
            specialtyField.style.display = user.role === 'medico' ? 'block' : 'none';
        }
        
        this.openModal('modal-edit-user');
    }
    
    // DELETE /api/users/:id
    async deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;
        
        if (!confirm(`¿Estás seguro de eliminar a ${user.name}?`)) return;
        
        try {
            await usersAPI.delete(userId);
            showNotification('Usuario eliminado correctamente', 'success');
            await this.loadUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            if (error.message.includes('yourself')) {
                showNotification('No puedes eliminarte a ti mismo', 'error');
            } else {
                showNotification('Error al eliminar usuario', 'error');
            }
        }
    }
    
    // ========================================
    // CENTROS MÉDICOS - CRUD COMPLETO
    // ========================================
    
    // GET /api/centers
    async loadCenters() {
        try {
            const tbody = document.getElementById('centers-table-body');
            if (!tbody) return;
            
            // Loading state
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    </td>
                </tr>
            `;
            
            const response = await centersAPI.list();
            this.centers = response.data.centers || [];
            
            this.renderCenters();
            
        } catch (error) {
            console.error('Error al cargar centros:', error);
            const tbody = document.getElementById('centers-table-body');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center py-12 text-gray-500">
                            No se pudieron cargar los centros
                            <button onclick="administratorDashboard.loadCenters()" class="ml-4 px-4 py-2 bg-primary text-white rounded-lg">Reintentar</button>
                        </td>
                    </tr>
                `;
            }
        }
    }
    
    renderCenters() {
        const tbody = document.getElementById('centers-table-body');
        if (!tbody) return;
        
        // Filtrar por búsqueda
        const searchTerm = (document.getElementById('center-search')?.value || '').toLowerCase();
        const filtered = this.centers.filter(center =>
            center.name.toLowerCase().includes(searchTerm) ||
            center.address.toLowerCase().includes(searchTerm)
        );
        
        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-12 text-gray-500">
                        No se encontraron centros
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = filtered.map(center => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="px-4 py-4 font-medium text-gray-900 dark:text-white">${escapeHtml(center.name)}</td>
                <td class="px-4 py-4 text-gray-600 dark:text-gray-400">${escapeHtml(center.type || 'Hospital')}</td>
                <td class="px-4 py-4 text-gray-600 dark:text-gray-400">${escapeHtml(center.address)}</td>
                <td class="px-4 py-4 text-gray-600 dark:text-gray-400">${escapeHtml(Array.isArray(center.services) ? center.services.join(', ') : center.services)}</td>
                <td class="px-4 py-4">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${center.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}">
                        ${escapeHtml(center.status || 'Activo')}
                    </span>
                </td>
                <td class="px-4 py-4 text-right">
                    <button onclick="administratorDashboard.openEditCenterModal('${center.id}')" class="text-primary hover:text-primary/80" title="Editar">
                        <span class="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button onclick="administratorDashboard.toggleCenterStatus('${center.id}')" class="text-primary hover:text-primary/80 ml-2" title="${center.status === 'Activo' ? 'Desactivar' : 'Activar'}">
                        <span class="material-symbols-outlined text-xl">${center.status === 'Activo' ? 'toggle_on' : 'toggle_off'}</span>
                    </button>
                    <button onclick="administratorDashboard.deleteCenter('${center.id}')" class="text-red-500 hover:text-red-600 ml-2" title="Eliminar">
                        <span class="material-symbols-outlined text-xl">delete</span>
                    </button>
                </td>
            </tr>
        `).join(''); // XSS-SAFE
    }
    
    // POST /api/centers
    async createCenter(event) {
        event?.preventDefault();
        
        const name = document.getElementById('add-center-name')?.value;
        const type = document.getElementById('add-center-type')?.value;
        const address = document.getElementById('add-center-address')?.value;
        const services = document.getElementById('add-center-services')?.value;
        
        if (!name || !type || !address || !services) {
            showNotification('Completa todos los campos', 'error');
            return;
        }
        
        try {
            const centerData = {
                name,
                type,
                address,
                services: services.split(',').map(s => s.trim()),
                status: 'Activo'
            };
            
            await centersAPI.create(centerData);
            showNotification('Centro creado correctamente', 'success');
            this.closeModal('modal-add-center');
            await this.loadCenters();
            
            document.getElementById('form-add-center')?.reset();
            
        } catch (error) {
            console.error('Error al crear centro:', error);
            showNotification('Error al crear centro', 'error');
        }
    }
    
    // PUT /api/centers/:id
    async updateCenter(event) {
        event?.preventDefault();
        
        const centerId = document.getElementById('edit-center-id')?.value;
        const name = document.getElementById('edit-center-name')?.value;
        const type = document.getElementById('edit-center-type')?.value;
        const address = document.getElementById('edit-center-address')?.value;
        const services = document.getElementById('edit-center-services')?.value;
        
        if (!centerId || !name || !type || !address || !services) {
            showNotification('Completa todos los campos', 'error');
            return;
        }
        
        try {
            const centerData = {
                name,
                type,
                address,
                services: services.split(',').map(s => s.trim())
            };
            
            await centersAPI.update(centerId, centerData);
            showNotification('Centro actualizado correctamente', 'success');
            this.closeModal('modal-edit-center');
            await this.loadCenters();
            
        } catch (error) {
            console.error('Error al actualizar centro:', error);
            showNotification('Error al actualizar centro', 'error');
        }
    }
    
    openEditCenterModal(centerId) {
        const center = this.centers.find(c => c.id === centerId);
        if (!center) return;
        
        document.getElementById('edit-center-id').value = center.id;
        document.getElementById('edit-center-name').value = center.name;
        document.getElementById('edit-center-type').value = center.type || '';
        document.getElementById('edit-center-address').value = center.address;
        document.getElementById('edit-center-services').value = Array.isArray(center.services) 
            ? center.services.join(', ') 
            : center.services;
        
        this.openModal('modal-edit-center');
    }
    
    // PATCH /api/centers/:id/status (toggle)
    async toggleCenterStatus(centerId) {
        const center = this.centers.find(c => c.id === centerId);
        if (!center) return;
        
        try {
            await centersAPI.toggleStatus(centerId);
            showNotification(`Centro ${center.status === 'Activo' ? 'desactivado' : 'activado'}`, 'success');
            await this.loadCenters();
        } catch (error) {
            console.error('Error al cambiar estado del centro:', error);
            showNotification('Error al cambiar estado', 'error');
        }
    }
    
    // DELETE /api/centers/:id
    async deleteCenter(centerId) {
        const center = this.centers.find(c => c.id === centerId);
        if (!center) return;
        
        if (!confirm(`¿Estás seguro de eliminar ${center.name}?`)) return;
        
        try {
            await centersAPI.delete(centerId);
            showNotification('Centro eliminado correctamente', 'success');
            await this.loadCenters();
        } catch (error) {
            console.error('Error al eliminar centro:', error);
            showNotification('Error al eliminar centro', 'error');
        }
    }
    
    // ========================================
    // ROLES Y PERMISOS
    // ========================================
    renderRoles() {
        const container = document.getElementById('roles-list');
        if (!container) return;
        
        container.innerHTML = this.roles.map(role => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">${escapeHtml(role.name)}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">${escapeHtml(role.description)}</p>
                <span class="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">${escapeHtml(role.id)}</span>
            </div>
        `).join(''); // XSS-SAFE
    }
    
    // ========================================
    // MODALES Y NAVEGACIÓN
    // ========================================
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
    
    showSection(sectionId) {
        document.querySelectorAll('[id$="-section"]').forEach(section => {
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
        // Búsqueda de usuarios
        const userSearch = document.getElementById('user-search');
        if (userSearch) {
            userSearch.addEventListener('input', () => this.renderUsers());
        }
        
        // Búsqueda de centros
        const centerSearch = document.getElementById('center-search');
        if (centerSearch) {
            centerSearch.addEventListener('input', () => this.renderCenters());
        }
        
        // Formularios
        const formAddUser = document.getElementById('form-add-user');
        if (formAddUser) {
            formAddUser.addEventListener('submit', (e) => this.createUser(e));
        }
        
        const formEditUser = document.getElementById('form-edit-user');
        if (formEditUser) {
            formEditUser.addEventListener('submit', (e) => this.updateUser(e));
        }
        
        const formAddCenter = document.getElementById('form-add-center');
        if (formAddCenter) {
            formAddCenter.addEventListener('submit', (e) => this.createCenter(e));
        }
        
        const formEditCenter = document.getElementById('form-edit-center');
        if (formEditCenter) {
            formEditCenter.addEventListener('submit', (e) => this.updateCenter(e));
        }
        
        // Mostrar campo especialidad si rol es médico
        const addRoleSelect = document.getElementById('add-user-role');
        if (addRoleSelect) {
            addRoleSelect.addEventListener('change', (e) => {
                const specialtyField = document.getElementById('add-specialty-field');
                if (specialtyField) {
                    specialtyField.style.display = e.target.value === 'medico' ? 'block' : 'none';
                }
            });
        }
        
        const editRoleSelect = document.getElementById('edit-user-role');
        if (editRoleSelect) {
            editRoleSelect.addEventListener('change', (e) => {
                const specialtyField = document.getElementById('edit-specialty-field');
                if (specialtyField) {
                    specialtyField.style.display = e.target.value === 'medico' ? 'block' : 'none';
                }
            });
        }
    }
}

// Inicializar
let administratorDashboard;

document.addEventListener('DOMContentLoaded', () => {
    administratorDashboard = new AdministratorDashboard();
});

window.administratorDashboard = administratorDashboard;

export default AdministratorDashboard;
