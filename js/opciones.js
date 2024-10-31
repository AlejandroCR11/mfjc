const options = []; // Array para almacenar las opciones
const itemsPerPage = 5; // Número de opciones por página
let currentPage = 1;
let searchQuery = ''; // Almacena la consulta de búsqueda

// Obtener elementos del DOM
const addOptionBtn = document.getElementById('addOptionBtn');
const optionsTableBody = document.getElementById('optionsTableBody');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageInfo = document.getElementById('pageInfo');
const pageNumbers = document.getElementById('pageNumbers');
const searchInput = document.getElementById('searchInput'); // Campo de búsqueda

const addOption = () => {
    const optionType = document.getElementById('optionType').value.trim();
    const optionValue = document.getElementById('optionValue').value.trim();

    if (!optionType || !optionValue) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const existingOption = options.find(option => option.type === optionType && option.value === optionValue);
    if (existingOption) {
        alert("Esta opción ya existe. Por favor, ingresa una opción diferente.");
        return;
    }

    // Agregar la opción al array
    options.push({ type: optionType, value: optionValue });

    // Guardar las opciones en Local Storage
    localStorage.setItem("options", JSON.stringify(options));

    document.getElementById('optionType').value = '';
    document.getElementById('optionValue').value = '';
    renderTable();
};

// Función para renderizar la tabla según la página actual
const renderTable = () => {
    optionsTableBody.innerHTML = ''; // Limpiar la tabla

    // Filtrar opciones según la búsqueda
    const filteredOptions = options.filter(option => 
        option.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);

    // Establecer límites para la paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredOptions.length);

    // Agregar las opciones de la página actual
    for (let i = startIndex; i < endIndex; i++) {
        const newRow = optionsTableBody.insertRow();
        newRow.insertCell(0).className = 'tipo'; // Columna Tipo
        newRow.cells[0].innerText = filteredOptions[i].type; // Establecer el valor

        newRow.insertCell(1).className = 'nombre'; // Columna Nombre
        newRow.cells[1].innerText = filteredOptions[i].value; // Establecer el valor

        // Crear el botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.onclick = () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta opción?")) {
                options.splice(options.indexOf(filteredOptions[i]), 1); // Eliminar de la lista original
                renderTable(); // Volver a renderizar la tabla
            }
        };
        // Agregar la clase al botón
        deleteBtn.classList.add('button-delete-options');

        newRow.insertCell(2).appendChild(deleteBtn); // Columna Acciones
    }

    // Actualizar información de la página
    pageInfo.innerText = `Página ${currentPage} de ${totalPages}`;

    // Habilitar o deshabilitar los botones de paginación
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Renderizar botones de paginación numérica
    renderPageNumbers(totalPages);
};

// Función para renderizar la paginación numérica
const renderPageNumbers = (totalPages) => {
    pageNumbers.innerHTML = ''; // Limpiar los botones de números de página
    const maxVisibleButtons = 5; // Número máximo de botones de página a mostrar
    let startButton = Math.max(1, currentPage - 2); // Comenzar a mostrar 2 botones antes de la página actual
    let endButton = Math.min(totalPages, startButton + maxVisibleButtons - 1); // Terminar en 5 botones

    // Ajustar los límites si estamos cerca del final
    if (endButton - startButton < maxVisibleButtons - 1) {
        startButton = Math.max(1, endButton - maxVisibleButtons + 1);
    }

    // Agregar botones de páginas visibles
    for (let i = startButton; i <= endButton; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;

        // Añadir la clase 'active' al botón de la página actual
        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageButton.onclick = () => {
            currentPage = i;
            renderTable(); // Renderizar la tabla
            renderPageNumbers(totalPages); // Volver a renderizar los números de página
        };

        pageNumbers.appendChild(pageButton);
    }
};

// Navegar a la página anterior
prevPageBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
};

// Navegar a la página siguiente
nextPageBtn.onclick = () => {
    const totalPages = Math.ceil(options.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
};

// Asignar evento al botón
addOptionBtn.onclick = addOption;

// Asignar evento al campo de búsqueda
searchInput.oninput = () => {
    searchQuery = searchInput.value; // Actualizar la consulta de búsqueda
    currentPage = 1; // Reiniciar a la primera página
    renderTable(); // Volver a renderizar la tabla
};


// Cargar opciones de Local Storage al iniciar la página
window.onload = () => {
    const savedOptions = JSON.parse(localStorage.getItem("options")) || [];
    options.push(...savedOptions); // Añadir las opciones guardadas al array
    renderTable(); // Renderizar la tabla con las opciones cargadas
};






