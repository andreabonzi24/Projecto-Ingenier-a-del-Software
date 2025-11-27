/**
 * Example: Appointment Component (Vanilla JavaScript)
 *
 * This file demonstrates how to create a simple component
 * that fetches and displays appointments from the API.
 *
 * Usage:
 *   <div id="appointments-container"></div>
 *   <script src="AppointmentComponent.js"></script>
 *   <script>
 *     const component = new AppointmentComponent('appointments-container');
 *     component.init();
 *   </script>
 */

class AppointmentComponent {
  /**
   * Create an Appointment Component
   * @param {string} containerId - The ID of the container element
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.apiBaseUrl = options.apiBaseUrl || '/api';
    this.appointments = [];
    this.loading = false;
    this.error = null;
  }

  /**
   * Initialize the component
   */
  async init() {
    this.render();
    await this.fetchAppointments();
  }

  /**
   * Get the authentication token from storage
   * @returns {string|null}
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Fetch appointments from the API
   */
  async fetchAppointments() {
    this.loading = true;
    this.error = null;
    this.render();

    try {
      const token = this.getAuthToken();

      const response = await fetch(`${this.apiBaseUrl}/appointments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.appointments = data.appointments || data.data || data;
      this.loading = false;
      this.render();
    } catch (error) {
      this.error = error.message;
      this.loading = false;
      this.render();
      console.error('Error fetching appointments:', error);
    }
  }

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string}
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Get status badge class
   * @param {string} status - Appointment status
   * @returns {string}
   */
  getStatusClass(status) {
    const statusClasses = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-600';
  }

  /**
   * Render the component
   */
  render() {
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    // Loading state
    if (this.loading) {
      this.container.innerHTML = `
        <div class="flex items-center justify-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span class="ml-3 text-gray-600">Cargando citas...</span>
        </div>
      `;
      return;
    }

    // Error state
    if (this.error) {
      this.container.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-700">Error: ${this.error}</span>
          </div>
          <button onclick="this.parentElement.parentElement.__component.fetchAppointments()" 
                  class="mt-3 text-sm text-red-600 hover:text-red-800 underline">
            Reintentar
          </button>
        </div>
      `;
      this.container.__component = this;
      return;
    }

    // Empty state
    if (this.appointments.length === 0) {
      this.container.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p>No hay citas programadas</p>
        </div>
      `;
      return;
    }

    // Appointments list
    const appointmentsHtml = this.appointments.map(appointment => `
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">
              ${appointment.specialty || appointment.type || 'Consulta Médica'}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              ${appointment.doctorName || 'Doctor asignado'}
            </p>
            <p class="text-sm text-gray-500 mt-2">
              📅 ${this.formatDate(appointment.date || appointment.scheduledAt)}
            </p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium ${this.getStatusClass(appointment.status)}">
            ${appointment.status || 'Pendiente'}
          </span>
        </div>
        ${appointment.notes ? `
          <p class="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
            📝 ${appointment.notes}
          </p>
        ` : ''}
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="space-y-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Mis Citas</h2>
          <button onclick="this.parentElement.parentElement.parentElement.__component.fetchAppointments()" 
                  class="text-sm text-primary hover:text-accent underline">
            🔄 Actualizar
          </button>
        </div>
        ${appointmentsHtml}
      </div>
    `;
    this.container.__component = this;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppointmentComponent;
}
