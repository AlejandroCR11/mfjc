const options = []; // Array para almacenar las opciones
const itemsPerPage = 2; // Número de opciones por página
let currentPage = 1;
let searchQuery = ''; // Almacena la consulta de búsqueda

document.addEventListener("DOMContentLoaded", () => {
    const partsTableBody = document.querySelector("#partsTable tbody");
    const searchInput = document.getElementById("searchInput");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };


    // Asignar evento al campo de búsqueda
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        filterTable(searchQuery);
    });

    // Función para filtrar y mostrar 
    function filterTable(query) {
        const rows = partsTableBody.getElementsByTagName("tr");
        for (let row of rows) {
            const nameCell = row.cells[1]; // aqui esta el nombre
            if (nameCell) {
                const partName = nameCell.textContent.toLowerCase();
                row.style.display = partName.includes(query) ? "" : "none";
            }
        }
    }



    function renderTable() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const filteredOptions = options.filter(option =>
            option.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        optionsTableBody.innerHTML = ""; 
    
        filteredOptions.slice(start, end).forEach(option => {
            const row = optionsTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = option;
        });
    
        const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
        renderPageNumbers(totalPages);
    }
    
    



    // Modal y botón de agregar repuesto
    const addPartModal = document.getElementById("addPartModal");
    const submitPartBtn = document.getElementById("submitPartBtn");
    const closePartModal = document.getElementById("closePartModal");

    const imageModal = document.getElementById("imageModal");
    const closeImageModal = document.getElementById("closeImageModal");
    const expandedImage = document.getElementById("expandedImage");
    
    const addOptionBtn = document.getElementById('addOptionBtn');
    const optionsTableBody = document.getElementById('optionsTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    const pageNumbers = document.getElementById('pageNumbers');

    document.getElementById("addPartBtn").addEventListener("click", () => {
        addPartModal.style.display = "block";
    });

    closeEquipmentModal.onclick = () => {
        addEquipmentModal.style.display = "none";
    };

    closeMaintenanceModal.onclick = () => {
        addMaintenanceModal.style.display = "none";
    };

    closePartModal.onclick = () => {
        addPartModal.style.display = "none";
    };

    closeImageModal.onclick = () => {
        imageModal.style.display = "none";
        document.body.style.overflow = ""; // Restaurar el scroll del fondo
    };

    // Función para abrir el modal de imagen ampliada
    function openImageModal(imageSrc) {
        expandedImage.src = imageSrc; 
        document.body.style.overflow = "hidden"; // Bloquear el scroll del fondo
        imageModal.style.display = "block"; 
    }


        // Función para incrementar la cantidad del repuesto
        window.incrementQuantity = function(button) {
            const quantityCell = button.parentNode.parentNode.cells[2];
            const quantitySpan = quantityCell.querySelector(".part-quantity");
            let quantity = parseInt(quantitySpan.innerText);
            quantitySpan.innerText = ++quantity;
        };
    
        // Función para decrementar la cantidad del repuesto
        window.decrementQuantity = function(button) {
            const quantityCell = button.parentNode.parentNode.cells[2];
            const quantitySpan = quantityCell.querySelector(".part-quantity");
            let quantity = parseInt(quantitySpan.innerText);
            if (quantity > 1) {
                quantitySpan.innerText = --quantity;
            }
        };
    
        // Función para eliminar un repuesto
        window.deletePart = function(button) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };
                // Función para confirma eliminacion de un repuesto
        window.deletePart = function(button) {
            if (confirm("¿Estás seguro de que deseas eliminar este repuesto?")) {
                const row = button.parentNode.parentNode;
                row.parentNode.removeChild(row);
            }
        };

    // Actualiza las estadísticas de mantenimiento en el panel de control
    function updateMaintenanceStats() {
        document.querySelector("#upcomingMaintenanceCount span").innerText = maintenanceStats.upcoming;
        document.querySelector("#overdueMaintenanceCount span").innerText = maintenanceStats.overdue;
    }



        // Función para abrir cualquier modal y desactivar el scroll
    function openModal(modalElement) {
        modalElement.style.display = "block";
        document.body.classList.add("no-scroll"); // Desactiva el scroll
    }

    // Función para cerrar cualquier modal y restaurar el scroll
    function closeModal(modalElement) {
        modalElement.style.display = "none";
        document.body.classList.remove("no-scroll"); // Activa el scroll nuevamente
    }


    // Abre el modal de agregar repuesto
    document.getElementById("addPartBtn").addEventListener("click", () => {
        openModal(addPartModal);
    });

    // Cierra el modal de agregar repuesto
    closePartModal.onclick = () => {
        closeModal(addPartModal);
    };

    submitPartBtn.addEventListener("click", () => {
        // Aquí va tu lógica para agregar un repuesto
        closeModal(addPartModal); // Cierra el modal después de agregar el repuesto
    });

    // Abre el modal de imagen ampliada
    window.showImage = function(image) {
        expandedImage.src = image.src;
        openModal(imageModal); // Utiliza la función para desactivar el scroll
    };

    // Cierra el modal de imagen ampliada
    closeImageModal.onclick = () => {
        closeModal(imageModal);
    };

    // Cerrar los modales al hacer clic fuera de ellos
    window.onclick = function(event) {
        if (event.target === addPartModal) {
            closeModal(addPartModal);
        }
        if (event.target === imageModal) {
            closeModal(imageModal);
        }
    };

    submitPartBtn.addEventListener("click", () => {
        const partPhotoInput = document.getElementById("partPhoto");
        const partName = document.getElementById("partName").value;
        const partQuantity = document.getElementById("partQuantity").value;

        if (partPhotoInput.files.length > 0 && partName && partQuantity) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const row = partsTableBody.insertRow();
                const photoCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const quantityCell = row.insertCell(2);
                const actionsCell = row.insertCell(3);

                photoCell.innerHTML = `<img src="${e.target.result}" alt="${partName}" width="50" height="50" onclick="showImage(this)">`;
                nameCell.innerText = partName;
                quantityCell.innerHTML = `<span class="part-quantity">${partQuantity}</span>`;
                actionsCell.innerHTML = `
                    <button onclick="incrementQuantity(this)">+</button>
                    <button onclick="decrementQuantity(this)">-</button>
                    <button onclick="deletePart(this)">Eliminar</button>
                `;

                addPartModal.style.display = "none";
                partPhotoInput.value = "";
                document.getElementById("partName").value = "";
                document.getElementById("partQuantity").value = "";
            };
            reader.readAsDataURL(partPhotoInput.files[0]);
        } else {
            alert("Por favor, complete todos los campos obligatorios.");
        }
    });
})




// Función para renderizar la paginación numérica
const renderPageNumbers = (totalPages) => {
    pageNumbers.innerHTML = ''; // Limpiar los botones de números de página
    const maxVisibleButtons = 6; // Número máximo de botones de página a mostrar
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






