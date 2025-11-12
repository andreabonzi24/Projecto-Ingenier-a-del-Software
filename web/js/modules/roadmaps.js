// API Configuration
const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let currentProject = null;
let currentRoadmap = null;
let authToken = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProjects();
});

// Authentication
function checkAuth() {
    authToken = localStorage.getItem('token');
    if (!authToken) {
        window.location.href = 'medical_appointment_login_page.html';
        return;
    }
    
    fetch(`${API_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.data;
            document.getElementById('userName').textContent = currentUser.name;
        } else {
            logout();
        }
    })
    .catch(() => logout());
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'medical_appointment_login_page.html';
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayProjects(data.data);
        } else {
            showError('Error al cargar proyectos');
        }
    } catch (error) {
        showError('Error de conexión al cargar proyectos');
    }
}

function displayProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    
    if (projects.length === 0) {
        projectsList.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-road text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No tienes proyectos aún</p>
                <button onclick="showCreateProjectModal()" class="mt-4 text-blue-600 hover:text-blue-700">
                    Crear tu primer proyecto
                </button>
            </div>
        `;
        return;
    }
    
    projectsList.innerHTML = projects.map(project => `
        <div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer" 
             onclick="openProject('${project._id}')">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">${project.title}</h3>
                    <span class="status-badge ${getStatusColor(project.status)}">
                        ${getStatusLabel(project.status)}
                    </span>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${project.description || 'Sin descripción'}</p>
                <div class="mb-4">
                    <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso</span>
                        <span class="font-semibold">${project.statistics.progressPercentage}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full transition-all" 
                             style="width: ${project.statistics.progressPercentage}%"></div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        <i class="fas fa-calendar mr-1"></i>
                        <span>${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <i class="fas fa-users mr-1"></i>
                        <span>${project.team.length + 1}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusColor(status) {
    const colors = {
        'planning': 'bg-gray-100 text-gray-700',
        'active': 'bg-blue-100 text-blue-700',
        'on_hold': 'bg-yellow-100 text-yellow-700',
        'completed': 'bg-green-100 text-green-700',
        'cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || colors['planning'];
}

function getStatusLabel(status) {
    const labels = {
        'planning': 'Planificando',
        'active': 'Activo',
        'on_hold': 'En Pausa',
        'completed': 'Completado',
        'cancelled': 'Cancelado'
    };
    return labels[status] || 'Planificando';
}

// Create Project Modal
function showCreateProjectModal() {
    document.getElementById('createProjectModal').classList.remove('hidden');
    document.getElementById('createProjectModal').classList.add('flex');
}

function hideCreateProjectModal() {
    document.getElementById('createProjectModal').classList.add('hidden');
    document.getElementById('createProjectModal').classList.remove('flex');
    document.getElementById('createProjectForm').reset();
}

async function createProject(event) {
    event.preventDefault();
    
    const title = document.getElementById('projectTitleInput').value;
    const description = document.getElementById('projectDescriptionInput').value;
    const startDate = document.getElementById('projectStartDate').value;
    const endDate = document.getElementById('projectEndDate').value;
    
    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ title, description, startDate, endDate })
        });
        
        const data = await response.json();
        
        if (data.success) {
            hideCreateProjectModal();
            loadProjects();
            showSuccess('Proyecto creado exitosamente');
        } else {
            showError(data.message || 'Error al crear proyecto');
        }
    } catch (error) {
        showError('Error de conexión al crear proyecto');
    }
}

// Open Project
async function openProject(projectId) {
    try {
        const [projectResponse, roadmapResponse] = await Promise.all([
            fetch(`${API_URL}/projects/${projectId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            }),
            fetch(`${API_URL}/projects/${projectId}/roadmap`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
        ]);
        
        const projectData = await projectResponse.json();
        const roadmapData = await roadmapResponse.json();
        
        if (projectData.success && roadmapData.success) {
            currentProject = projectData.data;
            currentRoadmap = roadmapData.data;
            showRoadmapView();
        } else {
            showError('Error al cargar proyecto');
        }
    } catch (error) {
        showError('Error de conexión al cargar proyecto');
    }
}

function showRoadmapView() {
    document.getElementById('projectsListSection').classList.add('hidden');
    document.getElementById('roadmapViewSection').classList.remove('hidden');
    
    document.getElementById('projectTitle').textContent = currentProject.title;
    document.getElementById('projectDates').textContent = 
        `${new Date(currentProject.startDate).toLocaleDateString()} - ${new Date(currentProject.endDate).toLocaleDateString()}`;
    
    const statusEl = document.getElementById('projectStatus');
    statusEl.textContent = getStatusLabel(currentProject.status);
    statusEl.className = 'status-badge ' + getStatusColor(currentProject.status);
    
    document.getElementById('projectProgress').textContent = `${currentProject.statistics.progressPercentage}%`;
    
    displayRoadmap();
}

function showProjectsList() {
    document.getElementById('roadmapViewSection').classList.add('hidden');
    document.getElementById('projectsListSection').classList.remove('hidden');
    currentProject = null;
    currentRoadmap = null;
    loadProjects();
}

// Display Roadmap
function displayRoadmap() {
    displayMilestones();
    displayGanttChart();
}

function displayMilestones() {
    const milestonesList = document.getElementById('milestonesList');
    
    if (currentProject.milestones.length === 0) {
        milestonesList.innerHTML = '<p class="text-gray-500 text-sm">No hay milestones definidos</p>';
        return;
    }
    
    milestonesList.innerHTML = currentProject.milestones
        .sort((a, b) => a.order - b.order)
        .map(milestone => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" ${milestone.completed ? 'checked' : ''} 
                           onclick="toggleMilestone('${milestone._id}')"
                           class="w-5 h-5 text-blue-600 rounded">
                    <div>
                        <p class="font-semibold text-gray-800 ${milestone.completed ? 'line-through' : ''}">${milestone.title}</p>
                        ${milestone.description ? `<p class="text-sm text-gray-600">${milestone.description}</p>` : ''}
                    </div>
                </div>
                <div class="text-right">
                    ${milestone.dueDate ? `
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-calendar mr-1"></i>
                            ${new Date(milestone.dueDate).toLocaleDateString()}
                        </p>
                    ` : ''}
                    ${milestone.completed ? `
                        <p class="text-xs text-green-600">
                            <i class="fas fa-check mr-1"></i>
                            Completado ${new Date(milestone.completedAt).toLocaleDateString()}
                        </p>
                    ` : ''}
                </div>
            </div>
        `).join('');
}

function displayGanttChart() {
    const ganttChart = document.getElementById('ganttChart');
    
    if (currentRoadmap.tasks.length === 0) {
        ganttChart.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No hay tareas en el proyecto</p>';
        return;
    }
    
    // Calculate timeline range
    const projectStart = new Date(currentRoadmap.project.startDate);
    const projectEnd = new Date(currentRoadmap.project.endDate);
    const totalDays = Math.ceil((projectEnd - projectStart) / (1000 * 60 * 60 * 24));
    
    ganttChart.innerHTML = currentRoadmap.tasks.map(task => {
        const taskStart = task.startDate ? new Date(task.startDate) : projectStart;
        const taskEnd = task.dueDate ? new Date(task.dueDate) : projectEnd;
        
        const startOffset = Math.ceil((taskStart - projectStart) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24));
        
        const startPercent = (startOffset / totalDays) * 100;
        const widthPercent = (duration / totalDays) * 100;
        
        const priorityColors = {
            'low': '#94a3b8',
            'medium': '#3b82f6',
            'high': '#f97316',
            'urgent': '#ef4444'
        };
        
        return `
            <div class="gantt-row">
                <div class="px-4">
                    <p class="font-semibold text-sm text-gray-800">${task.title}</p>
                    <p class="text-xs text-gray-600">
                        ${task.assignees.length > 0 ? task.assignees[0].name : 'Sin asignar'}
                    </p>
                </div>
                <div class="relative px-4" style="height: 40px;">
                    <div class="gantt-bar" 
                         style="position: absolute; left: ${startPercent}%; width: ${widthPercent}%; background: ${priorityColors[task.priority]};">
                        ${task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title}
                        ${task.progress > 0 ? ` (${task.progress}%)` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// View Switching
function switchView(viewName) {
    // Update tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        tab.classList.add('text-gray-600');
    });
    
    const activeTab = document.querySelector(`[data-view="${viewName}"]`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-600');
        activeTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    }
    
    // Update content
    document.querySelectorAll('.view-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    if (viewName === 'roadmap') {
        document.getElementById('roadmapContent').classList.remove('hidden');
        displayRoadmap();
    } else if (viewName === 'timeline') {
        document.getElementById('timelineContent').classList.remove('hidden');
        displayTimeline();
    } else if (viewName === 'table') {
        document.getElementById('tableContent').classList.remove('hidden');
        displayTable();
    }
}

// Timeline View
function displayTimeline() {
    const timelineView = document.getElementById('timelineView');
    
    if (currentRoadmap.tasks.length === 0) {
        timelineView.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No hay tareas en el proyecto</p>';
        return;
    }
    
    const tasks = [...currentRoadmap.tasks].sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
        const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
        return dateB - dateA;
    });
    
    timelineView.innerHTML = tasks.map(task => `
        <div class="timeline-item">
            <div class="timeline-dot ${task.status === 'done' ? 'completed' : ''}"></div>
            <div class="bg-white rounded-lg p-4 shadow-sm border">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-semibold text-gray-800">${task.title}</h4>
                    <span class="status-badge ${getTaskStatusColor(task.status)}">
                        ${getTaskStatusLabel(task.status)}
                    </span>
                </div>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                    ${task.startDate ? `
                        <span><i class="fas fa-calendar-plus mr-1"></i>${new Date(task.startDate).toLocaleDateString()}</span>
                    ` : ''}
                    ${task.dueDate ? `
                        <span><i class="fas fa-calendar-check mr-1"></i>${new Date(task.dueDate).toLocaleDateString()}</span>
                    ` : ''}
                    ${task.assignees.length > 0 ? `
                        <span><i class="fas fa-user mr-1"></i>${task.assignees[0].name}</span>
                    ` : ''}
                </div>
                ${task.progress > 0 ? `
                    <div class="mt-3">
                        <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progreso</span>
                            <span>${task.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                            <div class="bg-blue-600 h-1.5 rounded-full" style="width: ${task.progress}%"></div>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function getTaskStatusColor(status) {
    const colors = {
        'todo': 'bg-gray-100 text-gray-700',
        'in_progress': 'bg-blue-100 text-blue-700',
        'review': 'bg-yellow-100 text-yellow-700',
        'done': 'bg-green-100 text-green-700'
    };
    return colors[status] || colors['todo'];
}

function getTaskStatusLabel(status) {
    const labels = {
        'todo': 'Por hacer',
        'in_progress': 'En progreso',
        'review': 'En revisión',
        'done': 'Completado'
    };
    return labels[status] || 'Por hacer';
}

// Table View
function displayTable() {
    const tableBody = document.querySelector('#tasksTable tbody');
    
    if (currentRoadmap.tasks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No hay tareas en el proyecto</td></tr>';
        return;
    }
    
    const priorityLabels = {
        'low': 'Baja',
        'medium': 'Media',
        'high': 'Alta',
        'urgent': 'Urgente'
    };
    
    tableBody.innerHTML = currentRoadmap.tasks.map(task => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">${task.title}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge ${getTaskStatusColor(task.status)}">
                    ${getTaskStatusLabel(task.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-600">${priorityLabels[task.priority]}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-600">
                    ${task.assignees.length > 0 ? task.assignees.map(a => a.name).join(', ') : 'Sin asignar'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                ${task.startDate && task.dueDate ? 
                    `${new Date(task.startDate).toLocaleDateString()} - ${new Date(task.dueDate).toLocaleDateString()}` 
                    : 'Sin fechas'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${task.progress}%"></div>
                    </div>
                    <span class="text-sm text-gray-600">${task.progress}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

// Utility Functions
function showSuccess(message) {
    alert(message);
}

function showError(message) {
    alert(message);
}

function showProjectSettings() {
    alert('Configuración del proyecto - Funcionalidad próximamente');
}

function showCreateMilestoneModal() {
    alert('Crear milestone - Funcionalidad próximamente');
}

async function toggleMilestone(milestoneId) {
    alert('Actualizar milestone - Funcionalidad próximamente');
}
