// Variables
let users = JSON.parse(localStorage.getItem('users')) || []; // Cargar usuarios desde localStorage, si existen
let currentPage = 1;
const usersPerPage = 6;



// Después de guardar los usuarios
localStorage.setItem('users', JSON.stringify(users));
console.log("Usuarios guardados en localStorage:", JSON.parse(localStorage.getItem('users')));

// O al cargar los usuarios en cualquier otra parte del código

console.log("Usuarios cargados de localStorage:", users);

// Abrir y cerrar modal
const addUserModal = document.getElementById("addUserModal");
document.getElementById("addUserBtn").onclick = () => addUserModal.style.display = "block";
document.getElementById("closeModal").onclick = () => addUserModal.style.display = "none";
window.onclick = (event) => { if (event.target == addUserModal) addUserModal.style.display = "none"; }

// Agregar usuario
document.getElementById("userForm").onsubmit = (event) => {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    

    // Verificar si el nombre de usuario ya existe
    if (users.some(user => user.userName === userName)) {
        alert("Ya existe un usuario con este nombre.");
        return;
    }

    // Crear el nuevo usuario
    const newUser = { id: Date.now(), userName: userName, password, role, active: true };
    users.push(newUser);

    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar el formulario y cerrar el modal
    document.getElementById("userForm").reset();
    addUserModal.style.display = "none";
    renderUserList();
};

// Buscar usuario
document.getElementById("searchInput").oninput = () => renderUserList();

// Cambiar estado del usuario (activar/desactivar)
function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.active = !user.active;
        // Guardar cambios en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Usuarios guardados en localStorage:", JSON.parse(localStorage.getItem('users')));
    }
    
    renderUserList();
}

// Renderizar lista de usuarios con estilos para el estado
function renderUserList() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const filteredUsers = users.filter(user => user.userName.toLowerCase().includes(searchQuery));

    const start = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(start, start + usersPerPage);

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    paginatedUsers.forEach(user => {
        const userItem = document.createElement("li");

        const statusClass = user.active ? "status-active" : "status-inactive";
        const buttonClass = user.active ? "active" : "inactive";
        const statusText = user.active ? "Activo" : "Inactivo";
        const toggleText = user.active ? "Desactivar" : "Activar";

        userItem.innerHTML = `
            <span>${user.userName} (${user.role}) - <span class="${statusClass}">${statusText}</span></span>
            <button class="toggle-btn ${buttonClass}" onclick="toggleUserStatus(${user.id})">${toggleText}</button>
            <button onclick="deleteUser(${user.id})">Eliminar</button>
        `;
        userList.appendChild(userItem);
    });

    renderPagination(filteredUsers.length);
}

// Eliminar usuario
function deleteUser(userId) {
    users = users.filter(u => u.id !== userId);
    // Guardar cambios en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    renderUserList();
}


// Renderizar controles de paginación
function renderPagination(totalUsers) {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.onclick = () => {
            currentPage = i;
            renderUserList();
        };
        pagination.appendChild(pageButton);
    }
}



// Iniciar la renderización de la lista de usuarios al cargar la página
window.onload = renderUserList;