/**
 * MÓDULO DE API
 * Maneja todas las llamadas al backend
 */

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : '/api';

/**
 * SANITIZACIÓN: Escape HTML para prevenir XSS
 * CRÍTICO: Usar siempre que se inserte contenido de usuario en el DOM
 */
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper para hacer requests HTTP
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== AUTENTICACIÓN ====================

const authAPI = {
  /**
   * Registro de nuevo usuario
   */
  async register(userData) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Login de usuario
   */
  async login(email, password) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Obtener usuario actual
   */
  async getMe() {
    return await apiRequest('/auth/me');
  },

  /**
   * Logout
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'medical_appointment_login_page.html';
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Obtener usuario del localStorage
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Verificar rol del usuario
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
};

// ==================== CITAS ====================

const appointmentsAPI = {
  /**
   * Crear nueva cita
   */
  async create(appointmentData) {
    return await apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  },

  /**
   * Listar citas (según rol del usuario)
   */
  async list() {
    return await apiRequest('/appointments');
  },

  /**
   * Obtener cita por ID
   */
  async getById(id) {
    return await apiRequest(`/appointments/${id}`);
  },

  /**
   * Actualizar estado de cita
   */
  async updateStatus(id, status) {
    return await apiRequest(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  /**
   * Cancelar cita
   */
  async cancel(id) {
    return await apiRequest(`/appointments/${id}`, {
      method: 'DELETE'
    });
  }
};

// ==================== CENTROS MÉDICOS ====================

const centersAPI = {
  /**
   * Listar todos los centros
   */
  async list(filters = {}) {
    const params = new URLSearchParams(filters);
    return await apiRequest(`/centers?${params}`);
  },

  /**
   * Obtener centro por ID
   */
  async getById(id) {
    return await apiRequest(`/centers/${id}`);
  },

  /**
   * Crear nuevo centro (solo admins)
   */
  async create(centerData) {
    return await apiRequest('/centers', {
      method: 'POST',
      body: JSON.stringify(centerData)
    });
  },

  /**
   * Actualizar centro
   */
  async update(id, updates) {
    return await apiRequest(`/centers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  /**
   * Cambiar estado de centro
   */
  async toggleStatus(id) {
    return await apiRequest(`/centers/${id}/status`, {
      method: 'PATCH'
    });
  },

  /**
   * Eliminar centro
   */
  async delete(id) {
    return await apiRequest(`/centers/${id}`, {
      method: 'DELETE'
    });
  }
};

// ==================== USUARIOS ====================

const usersAPI = {
  /**
   * Listar todos los usuarios (solo admins)
   */
  async list() {
    return await apiRequest('/users');
  },

  /**
   * Listar médicos
   */
  async listDoctors(specialty = null) {
    const params = specialty ? `?specialty=${encodeURIComponent(specialty)}` : '';
    return await apiRequest(`/users/doctors${params}`);
  },

  /**
   * Obtener usuario por ID
   */
  async getById(id) {
    return await apiRequest(`/users/${id}`);
  },

  /**
   * Actualizar usuario
   */
  async update(id, updates) {
    return await apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  /**
   * Eliminar usuario (solo admins)
   */
  async delete(id) {
    return await apiRequest(`/users/${id}`, {
      method: 'DELETE'
    });
  }
};

// ==================== PROTECCIÓN DE RUTAS ====================

/**
 * Protege una página verificando autenticación
 * ✅ Mejorado: Previene navegación hacia atrás después de logout
 */
function protectPage(requiredRole = null) {
  // Prevenir navegación hacia atrás si no hay token
  if (!authAPI.isAuthenticated()) {
    // Reemplazar historial para evitar volver atrás
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, '', window.location.href);
    };
    window.location.replace('medical_appointment_login_page.html');
    return false;
  }

  if (requiredRole && !authAPI.hasRole(requiredRole)) {
    alert('No tienes permiso para acceder a esta página');
    authAPI.logout();
    return false;
  }

  // Si está autenticado, prevenir volver atrás al login
  window.history.pushState(null, '', window.location.href);
  window.onpopstate = function() {
    window.history.pushState(null, '', window.location.href);
  };

  return true;
}

/**
 * Redirige según el rol del usuario
 */
function redirectToDashboard() {
  const user = authAPI.getCurrentUser();
  if (!user) {
    window.location.href = 'medical_appointment_login_page.html';
    return;
  }

  const dashboards = {
    'paciente': 'patient_dashboard.html',
    'medico': 'doctor_dashboard.html',
    'admin_centro': 'medical_center_dashboard.html',
    'admin_sistema': 'administrator_dashboard.html'
  };

  const targetDashboard = dashboards[user.role] || 'patient_dashboard.html';
  console.log(`Redirigiendo usuario con rol "${user.role}" a: ${targetDashboard}`);
  window.location.href = targetDashboard;
}

// ==================== NOTIFICACIONES ====================

/**
 * Muestra una notificación al usuario
 */
function showNotification(message, type = 'info') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };

  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
  // SEGURIDAD: Usar textContent para prevenir XSS
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== MANEJO DE ERRORES ====================

/**
 * Maneja errores de la API y muestra mensaje al usuario
 */
function handleApiError(error) {
  console.error('Error de API:', error);
  
  if (error.message.includes('401') || error.message.includes('403')) {
    showNotification('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
    authAPI.logout();
  } else {
    showNotification(error.message || 'Error al conectar con el servidor', 'error');
  }
}

// ==================== EXPORTAR ====================

// Si estamos en un entorno con módulos, exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    authAPI,
    appointmentsAPI,
    centersAPI,
    usersAPI,
    escapeHtml,
    protectPage,
    redirectToDashboard,
    showNotification,
    handleApiError
  };
}
