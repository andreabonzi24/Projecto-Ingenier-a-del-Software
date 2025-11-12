// API Configuration
const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let currentBoard = null;
let authToken = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadBoards();
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

// Load Boards
async function loadBoards() {
    try {
        const response = await fetch(`${API_URL}/boards`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayBoards(data.data);
        } else {
            showError('Error al cargar tableros');
        }
    } catch (error) {
        showError('Error de conexión al cargar tableros');
    }
}

function displayBoards(boards) {
    const boardsList = document.getElementById('boardsList');
    
    if (boards.length === 0) {
        boardsList.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-columns text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No tienes tableros aún</p>
                <button onclick="showCreateBoardModal()" class="mt-4 text-blue-600 hover:text-blue-700">
                    Crear tu primer tablero
                </button>
            </div>
        `;
        return;
    }
    
    boardsList.innerHTML = boards.map(board => `
        <div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer" 
             onclick="openBoard('${board._id}')">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">${board.title}</h3>
                    <span class="text-xs px-2 py-1 rounded ${getVisibilityColor(board.visibility)}">
                        ${getVisibilityLabel(board.visibility)}
                    </span>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${board.description || 'Sin descripción'}</p>
                <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-columns mr-2"></i>
                        <span>${board.columns.length} columnas</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-users mr-2"></i>
                        <span>${board.members.length + 1} miembros</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getVisibilityColor(visibility) {
    const colors = {
        'private': 'bg-gray-100 text-gray-700',
        'team': 'bg-blue-100 text-blue-700',
        'public': 'bg-green-100 text-green-700'
    };
    return colors[visibility] || colors['private'];
}

function getVisibilityLabel(visibility) {
    const labels = {
        'private': 'Privado',
        'team': 'Equipo',
        'public': 'Público'
    };
    return labels[visibility] || 'Privado';
}

// Create Board Modal
function showCreateBoardModal() {
    document.getElementById('createBoardModal').classList.remove('hidden');
    document.getElementById('createBoardModal').classList.add('flex');
}

function hideCreateBoardModal() {
    document.getElementById('createBoardModal').classList.add('hidden');
    document.getElementById('createBoardModal').classList.remove('flex');
    document.getElementById('createBoardForm').reset();
}

async function createBoard(event) {
    event.preventDefault();
    
    const title = document.getElementById('boardTitle').value;
    const description = document.getElementById('boardDescription').value;
    const visibility = document.getElementById('boardVisibility').value;
    
    try {
        const response = await fetch(`${API_URL}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ title, description, visibility })
        });
        
        const data = await response.json();
        
        if (data.success) {
            hideCreateBoardModal();
            loadBoards();
            showSuccess('Tablero creado exitosamente');
        } else {
            showError(data.message || 'Error al crear tablero');
        }
    } catch (error) {
        showError('Error de conexión al crear tablero');
    }
}

// Open Board
async function openBoard(boardId) {
    try {
        const response = await fetch(`${API_URL}/boards/${boardId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentBoard = data.data;
            showBoardView();
            loadBoardCards();
        } else {
            showError('Error al cargar tablero');
        }
    } catch (error) {
        showError('Error de conexión al cargar tablero');
    }
}

function showBoardView() {
    document.getElementById('boardsListSection').classList.add('hidden');
    document.getElementById('boardViewSection').classList.remove('hidden');
    
    document.getElementById('boardTitle').textContent = currentBoard.title;
    document.getElementById('boardDescription').textContent = currentBoard.description || 'Sin descripción';
    
    displayKanbanBoard();
}

function showBoardsList() {
    document.getElementById('boardViewSection').classList.add('hidden');
    document.getElementById('boardsListSection').classList.remove('hidden');
    currentBoard = null;
    loadBoards();
}

// Display Kanban Board
function displayKanbanBoard() {
    const kanbanBoard = document.getElementById('kanbanBoard');
    
    kanbanBoard.innerHTML = currentBoard.columns.sort((a, b) => a.order - b.order).map(column => `
        <div class="board-column bg-gray-100 rounded-lg p-4 flex-shrink-0" data-column-id="${column._id}">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-800">${column.title}</h3>
                <span class="text-sm text-gray-600" id="count-${column._id}">0</span>
            </div>
            <div class="space-y-3" id="cards-${column._id}" 
                 ondrop="drop(event, '${column._id}')" 
                 ondragover="allowDrop(event)"
                 ondragleave="dragLeave(event)">
                <!-- Cards will be loaded here -->
            </div>
        </div>
    `).join('');
}

// Load Board Cards
async function loadBoardCards() {
    try {
        const response = await fetch(`${API_URL}/boards/${currentBoard._id}/cards`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayCards(data.data);
        } else {
            showError('Error al cargar tarjetas');
        }
    } catch (error) {
        showError('Error de conexión al cargar tarjetas');
    }
}

function displayCards(cards) {
    // Clear all columns
    currentBoard.columns.forEach(column => {
        const container = document.getElementById(`cards-${column._id}`);
        if (container) {
            container.innerHTML = '<p class="text-gray-500 text-sm text-center py-4">Arrastra tarjetas aquí</p>';
        }
    });
    
    // Group cards by column
    const cardsByColumn = {};
    cards.forEach(card => {
        if (!cardsByColumn[card.columnId]) {
            cardsByColumn[card.columnId] = [];
        }
        cardsByColumn[card.columnId].push(card);
    });
    
    // Display cards in their columns
    Object.keys(cardsByColumn).forEach(columnId => {
        const container = document.getElementById(`cards-${columnId}`);
        const columnCards = cardsByColumn[columnId];
        
        if (container && columnCards.length > 0) {
            container.innerHTML = columnCards.map(card => createCardHTML(card)).join('');
        }
        
        // Update count
        const countEl = document.getElementById(`count-${columnId}`);
        if (countEl) {
            countEl.textContent = columnCards.length;
        }
    });
}

function createCardHTML(card) {
    const priorityColors = {
        'low': 'bg-gray-100 text-gray-700',
        'medium': 'bg-blue-100 text-blue-700',
        'high': 'bg-orange-100 text-orange-700',
        'urgent': 'bg-red-100 text-red-700'
    };
    
    return `
        <div class="card-item bg-white rounded-lg shadow-sm p-4 border" 
             draggable="true" 
             ondragstart="drag(event, '${card._id}')"
             data-card-id="${card._id}">
            <div class="flex items-start justify-between mb-2">
                <h4 class="font-semibold text-gray-800 text-sm flex-1">${card.title}</h4>
                <span class="text-xs px-2 py-1 rounded ${priorityColors[card.priority]}">
                    ${card.priority}
                </span>
            </div>
            ${card.description ? `<p class="text-gray-600 text-xs mb-3">${card.description}</p>` : ''}
            <div class="flex items-center justify-between text-xs text-gray-600">
                ${card.dueDate ? `
                    <span><i class="fas fa-calendar mr-1"></i>${new Date(card.dueDate).toLocaleDateString()}</span>
                ` : '<span></span>'}
                ${card.assignees.length > 0 ? `
                    <span><i class="fas fa-user mr-1"></i>${card.assignees.length}</span>
                ` : ''}
            </div>
        </div>
    `;
}

// Drag and Drop
function drag(event, cardId) {
    event.dataTransfer.setData('cardId', cardId);
    event.target.classList.add('dragging');
}

function allowDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

function dragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

async function drop(event, columnId) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    const cardId = event.dataTransfer.getData('cardId');
    
    try {
        const response = await fetch(`${API_URL}/cards/${cardId}/move`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ columnId, order: 0 })
        });
        
        const data = await response.json();
        
        if (data.success) {
            loadBoardCards();
        } else {
            showError('Error al mover tarjeta');
        }
    } catch (error) {
        showError('Error de conexión al mover tarjeta');
    }
    
    // Remove dragging class
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
}

// Create Card Modal
function showCreateCardModal() {
    if (!currentBoard) return;
    
    // Populate column dropdown
    const columnSelect = document.getElementById('cardColumn');
    columnSelect.innerHTML = currentBoard.columns.map(column => 
        `<option value="${column._id}">${column.title}</option>`
    ).join('');
    
    document.getElementById('createCardModal').classList.remove('hidden');
    document.getElementById('createCardModal').classList.add('flex');
}

function hideCreateCardModal() {
    document.getElementById('createCardModal').classList.add('hidden');
    document.getElementById('createCardModal').classList.remove('flex');
    document.getElementById('createCardForm').reset();
}

async function createCard(event) {
    event.preventDefault();
    
    const title = document.getElementById('cardTitle').value;
    const description = document.getElementById('cardDescription').value;
    const columnId = document.getElementById('cardColumn').value;
    const priority = document.getElementById('cardPriority').value;
    const dueDate = document.getElementById('cardDueDate').value;
    
    try {
        const response = await fetch(`${API_URL}/boards/${currentBoard._id}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ 
                title, 
                description, 
                columnId, 
                priority,
                dueDate: dueDate || undefined
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            hideCreateCardModal();
            loadBoardCards();
            showSuccess('Tarjeta creada exitosamente');
        } else {
            showError(data.message || 'Error al crear tarjeta');
        }
    } catch (error) {
        showError('Error de conexión al crear tarjeta');
    }
}

// Utility Functions
function showSuccess(message) {
    // Simple alert for now, can be replaced with toast notification
    alert(message);
}

function showError(message) {
    // Simple alert for now, can be replaced with toast notification
    alert(message);
}

function showBoardSettings() {
    alert('Configuración del tablero - Funcionalidad próximamente');
}
