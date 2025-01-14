// highlightNav.js
document.addEventListener("DOMContentLoaded", function () {
    // Detecta la URL actual sin parámetros de búsqueda o fragmentos
    const currentPage = window.location.pathname;
  
    // Selecciona los botones con la clase 'nav-button'
    const navButtons = document.querySelectorAll(".nav-button");



  
    navButtons.forEach((button) => {
      const buttonPage = new URL(button.href).pathname;
      if (currentPage === buttonPage) {
        button.classList.add("active");
      }
    });
  });

