// Inicio de sesión
document.getElementById("loginForm").onsubmit = (event) => {
    event.preventDefault();
    const loginUserName = document.getElementById("loginUserName").value;
    const loginPassword = document.getElementById("loginPassword").value;

    if (!loginUserName || !loginPassword) {
        alert("Por favor, ingresa tu nombre de usuario y contraseña.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Usuarios cargados desde localStorage:", users); // Verifica si los datos son correctos

    const user = users.find(u => u.userName === loginUserName && u.password === loginPassword);
    console.log("Usuario encontrado:", user); // Verifica si el usuario se encuentra

    if (user) {
        // Guarda el usuario activo en localStorage
        localStorage.setItem("activeUser", JSON.stringify(user));
        alert("Inicio de sesión exitoso!");

        // Redirige a index.html
        window.location.replace("index.html");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
};

// Verificar restricciones según el rol del usuario activo
function checkUserRestrictions() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser) return;

    if (activeUser.role === "normal") {
        restrictNormalUserFeatures();
    } else {
        enableAdminFeatures();
    }
}

// Restringir funciones para usuarios normales
function restrictNormalUserFeatures() {
    document.getElementById("addUserBtn").style.display = "none"; // Ejemplo para ocultar botón de añadir usuario
    // Puedes añadir más restricciones aquí
}

// Habilitar funciones completas para administradores
function enableAdminFeatures() {
    document.getElementById("addUserBtn").style.display = "block"; // Hacer visibles los botones o funciones restringidas
    // Agrega más funciones específicas de admin si es necesario
}

// Función para agregar usuarios
function addUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Usuarios guardados:", users); // Verifica que los usuarios estén bien guardados
    renderUserList();
}

// Renderizar lista de usuarios
function renderUserList() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${user.userName} - ${user.role}`;
        userList.appendChild(li);
    });
}

// Cargar lista de usuarios y verificar restricciones al cargar la página
window.addEventListener('load', () => {
    renderUserList();
    checkUserRestrictions(); // Verifica restricciones del usuario activo si hay sesión iniciada
});



// Inicio de sesión
document.getElementById("loginForm").onsubmit = (event) => {
    event.preventDefault();
    const loginUserName = document.getElementById("loginUserName").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Usuarios cargados desde localStorage:", users); // Verifica si los datos son correctos
    
    const user = users.find(u => u.userName === loginUserName && u.password === loginPassword);
    console.log("Usuario encontrado:", user); // Verifica si el usuario se encuentra

    if (user) {
        // Guarda el usuario activo en localStorage
        localStorage.setItem("activeUser", JSON.stringify(user));
        alert("Inicio de sesión exitoso!");

        const activeUser = JSON.parse(localStorage.getItem("activeUser"));
        if (activeUser) {
            // Ya hay un usuario activo, redirigir directamente al index
            window.location.replace("index.html");
        }
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
};
// Verificar restricciones según el rol del usuario activo
function checkUserRestrictions() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser) return;

    if (activeUser.role === "normal") {
        restrictNormalUserFeatures();
    } else {
        enableAdminFeatures();
    }
}

// Restringir funciones para usuarios normales
function restrictNormalUserFeatures() {
    document.getElementById("addUserBtn").style.display = "none"; // Ejemplo para ocultar botón de añadir usuario
    // Puedes añadir más restricciones aquí
}

// Habilitar funciones completas para administradores
function enableAdminFeatures() {
    document.getElementById("addUserBtn").style.display = "block"; // Hacer visibles los botones o funciones restringidas
    // Agrega más funciones específicas de admin si es necesario
}

// Ejemplo de función restringida
function someRestrictedFunction() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser || activeUser.role !== "admin") {
        alert("No tienes permiso para realizar esta acción.");
        return;
    }
    // Lógica de la función si es un "admin"
}