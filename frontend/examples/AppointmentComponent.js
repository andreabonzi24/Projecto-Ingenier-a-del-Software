/**
 * AppointmentComponent.js
 * 
 * Example Vanilla JavaScript component demonstrating how to consume
 * the appointments API for the Medical Appointments Platform.
 * 
 * This component shows:
 * - Fetching appointments from the API
 * - Rendering appointment data
 * - Creating new appointments
 * - Error handling
 */

class AppointmentComponent {
  constructor(containerId, apiBaseUrl = 'http://localhost:3000/api') {
    this.container = document.getElementById(containerId);
    this.apiBaseUrl = apiBaseUrl;
    this.appointments = [];
    this.token = localStorage.getItem('authToken') || null;
  }

  /**
   * Initialize the component
   */
  async init() {
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    this.render();
    await this.fetchAppointments();
  }

  /**
   * Get authorization headers for API requests
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Fetch appointments from the API
   */
  async fetchAppointments() {
    try {
      this.showLoading();

      const response = await fetch(`${this.apiBaseUrl}/appointments`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.appointments = data.appointments || data || [];
      this.renderAppointments();
    } catch (error) {
      this.showError(`Error loading appointments: ${error.message}`);
    }
  }

  /**
   * Create a new appointment
   */
  async createAppointment(appointmentData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/appointments`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment');
      }

      const newAppointment = await response.json();
      this.appointments.push(newAppointment);
      this.renderAppointments();
      this.showSuccess('Appointment created successfully!');
      return newAppointment;
    } catch (error) {
      this.showError(`Error creating appointment: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cancel an appointment
   */
  async cancelAppointment(appointmentId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      this.appointments = this.appointments.filter(apt => apt.id !== appointmentId);
      this.renderAppointments();
      this.showSuccess('Appointment cancelled successfully!');
    } catch (error) {
      this.showError(`Error cancelling appointment: ${error.message}`);
    }
  }

  /**
   * Render the component structure
   */
  render() {
    this.container.innerHTML = `
      <div class="appointment-component">
        <h2>My Appointments</h2>
        <div id="appointments-messages" class="messages"></div>
        <div id="appointments-list" class="appointments-list">
          <p>Loading appointments...</p>
        </div>
        <div class="appointment-form">
          <h3>Book New Appointment</h3>
          <form id="new-appointment-form">
            <div class="form-group">
              <label for="doctor">Doctor:</label>
              <input type="text" id="doctor" name="doctor" required>
            </div>
            <div class="form-group">
              <label for="date">Date:</label>
              <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
              <label for="time">Time:</label>
              <input type="time" id="time" name="time" required>
            </div>
            <div class="form-group">
              <label for="reason">Reason:</label>
              <textarea id="reason" name="reason" rows="3"></textarea>
            </div>
            <button type="submit" class="btn-primary">Book Appointment</button>
          </form>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Attach event listeners to form
   */
  attachEventListeners() {
    const form = this.container.querySelector('#new-appointment-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const appointmentData = {
          doctor: formData.get('doctor'),
          date: formData.get('date'),
          time: formData.get('time'),
          reason: formData.get('reason')
        };
        await this.createAppointment(appointmentData);
        form.reset();
      });
    }
  }

  /**
   * Render the appointments list
   */
  renderAppointments() {
    const listContainer = this.container.querySelector('#appointments-list');
    
    if (this.appointments.length === 0) {
      listContainer.innerHTML = '<p class="no-appointments">No appointments scheduled.</p>';
      return;
    }

    const appointmentsHtml = this.appointments.map(apt => `
      <div class="appointment-card" data-id="${apt.id || apt._id}">
        <div class="appointment-info">
          <h4>Dr. ${this.escapeHtml(apt.doctor || apt.doctorName || 'Unknown')}</h4>
          <p class="date">${this.formatDate(apt.date)}</p>
          <p class="time">${this.escapeHtml(apt.time || 'Time TBD')}</p>
          <p class="status ${this.escapeHtml(apt.status || 'pending')}">${this.escapeHtml(apt.status || 'Pending')}</p>
          ${apt.reason ? `<p class="reason">${this.escapeHtml(apt.reason)}</p>` : ''}
        </div>
        <div class="appointment-actions">
          <button class="btn-cancel" data-appointment-id="${apt.id || apt._id}">
            Cancel
          </button>
        </div>
      </div>
    `).join('');

    listContainer.innerHTML = appointmentsHtml;
    this.attachCancelListeners();
  }

  /**
   * Attach cancel button event listeners
   */
  attachCancelListeners() {
    const cancelButtons = this.container.querySelectorAll('.btn-cancel');
    cancelButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const appointmentId = e.target.dataset.appointmentId;
        this.cancelAppointment(appointmentId);
      });
    });
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    if (typeof text !== 'string') {
      return text;
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    if (!dateString) {
      return 'Date TBD';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Show loading state
   */
  showLoading() {
    const listContainer = this.container.querySelector('#appointments-list');
    if (listContainer) {
      listContainer.innerHTML = '<div class="loading">Loading appointments...</div>';
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    const messagesContainer = this.container.querySelector('#appointments-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = `<div class="error-message">${message}</div>`;
      setTimeout(() => {
        messagesContainer.innerHTML = '';
      }, 5000);
    }
    console.error(message);
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    const messagesContainer = this.container.querySelector('#appointments-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = `<div class="success-message">${message}</div>`;
      setTimeout(() => {
        messagesContainer.innerHTML = '';
      }, 3000);
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppointmentComponent;
}

/*
 * Usage Example:
 * 
 * HTML:
 * <div id="appointments-container"></div>
 * <script src="AppointmentComponent.js"></script>
 * <script>
 *   const appointmentComponent = new AppointmentComponent('appointments-container');
 *   appointmentComponent.init();
 * </script>
 */
