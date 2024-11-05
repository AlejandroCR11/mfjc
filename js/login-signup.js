

// Manejador del evento 'submit' del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validación simple
    if (username === "" || password === "") {
        showError('login', "Por favor, completa ambos campos.");
        return;
    }

    // Simulación de autenticación
    if (username === "admin" && password === "12345") {
        showWelcomeAnimation("¡Bienvenido!"); // Animación de bienvenida
        if (rememberMe) localStorage.setItem('rememberMe', 'true');
        setTimeout(() => location.href = "index.html", 3000); // Redirección con retardo
    } else {
        showError('login', "Usuario o contraseña incorrectos.");
    }
});

// Función para mostrar mensajes de error en formularios de login y registro
function showError(formType, message) {
    const errorMessage = document.getElementById(`${formType}ErrorMessage`);
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Función para mostrar la animación de bienvenida
function showWelcomeAnimation(message = "¡Bienvenido!") {
    const animationContainer = document.createElement('div');
    animationContainer.id = 'welcomeAnimation';
    animationContainer.style.position = 'fixed';
    animationContainer.style.top = '0';
    animationContainer.style.left = '0';
    animationContainer.style.width = '100%';
    animationContainer.style.height = '100%';
    animationContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    animationContainer.style.display = 'flex';
    animationContainer.style.justifyContent = 'center';
    animationContainer.style.alignItems = 'center';
    animationContainer.style.zIndex = '1000';

    const welcomeMessage = document.createElement('h1');
    welcomeMessage.textContent = message;
    welcomeMessage.style.color = 'white';
    welcomeMessage.style.fontSize = '3em';
    animationContainer.appendChild(welcomeMessage);

    document.body.appendChild(animationContainer);

    setTimeout(() => document.body.removeChild(animationContainer), 3000); // 3 segundos de duración
}

// Recordar sesión
document.getElementById('rememberMe').addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('rememberMe');
    }
});

// Cargar usuario recordado al inicio
window.addEventListener('load', () => {
    if (localStorage.getItem('rememberMe') === 'true') {
        document.getElementById('username').value = 'admin'; // Ajusta 'admin' según el usuario guardado
        document.getElementById('rememberMe').checked = true;
    }
});

// Manejador del formulario de registro
document.getElementById('registerForm').addEventListener('submit', handleRegister);

// Función para alternar entre login y registro con transición
function toggleForm(formType) {
    const loginForm = document.getElementById('loginFormContainer');
    const registerForm = document.getElementById('registerFormContainer');
    loginForm.classList.remove('show');
    registerForm.classList.remove('show');

    setTimeout(() => {
        if (formType === 'register') {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            registerForm.classList.add('show');
        } else {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            loginForm.classList.add('show');
        }
    }, 300); // 300 ms para la transición
}

// Función para manejar el registro
function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        showError('register', 'Todos los campos son obligatorios');
        return;
    }

    if (password !== confirmPassword) {
        showError('register', 'Las contraseñas no coinciden');
        return;
    }

    alert('Registro exitoso');
    toggleForm('login'); // Cambiar al formulario de login

    // Limpiar campos de registro
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
}

function displayError(message) {
    const errorMessage = document.getElementById('loginErrorMessage');
    errorMessage.textContent = message;
    if (message) {
        errorMessage.style.display = "block"; // Muestra el mensaje si hay texto
    } else {
        errorMessage.style.display = "none";  // Oculta el mensaje si está vacío
    }
}