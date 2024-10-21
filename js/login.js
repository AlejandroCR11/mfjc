// Manejador del evento 'submit' del formulario
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

    // Obtener los valores de los campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Lógica de validación simple
    if (username === "" || password === "") {
        displayError("Por favor, completa ambos campos.");
        return;
    }

    // Simulación de autenticación
    if (username === "admin" && password === "12345") {
        location.href ="index.html";
        // Aquí va la animación de bienvenida
        showWelcomeAnimation(); 

        // Aquí podrías redirigir a la página principal del sistema
        // location.href ="index.html"
        // window.location.href = "dashboard.html";
    } else {
        displayError("Usuario o contraseña incorrectos.");
    }
});

// Función para mostrar mensajes de error
function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Función para mostrar la animación de bienvenida
function showWelcomeAnimation() {
    // Crea un elemento div para la animación
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

    // Agrega un elemento h1 con un mensaje de bienvenida
    const welcomeMessage = document.createElement('h1');
    welcomeMessage.textContent = "¡Bienvenido!";
    welcomeMessage.style.color = 'white';
    welcomeMessage.style.fontSize = '3em';
    animationContainer.appendChild(welcomeMessage);

    // Agrega el contenedor de la animación al documento
    document.body.appendChild(animationContainer);

    // Agrega una clase CSS para la animación (debes crear esta clase en tu archivo CSS)
    animationContainer.classList.add('welcomeAnimation');

    // Después de un tiempo, elimina la animación
    setTimeout(() => {
        document.body.removeChild(animationContainer);
    }, 3000); // 3 segundos de duración
}

// Opcional: recordar sesión (guarda datos en localStorage)
document.getElementById('rememberMe').addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('rememberMe');
    }
});