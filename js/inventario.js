document.addEventListener("DOMContentLoaded", () => {
    const partsTableBody = document.querySelector("#partsTable tbody");
    const searchInput = document.getElementById("searchInput");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };

    let options = []; // Aquí guardarás los repuestos
    let currentPage = 1;
    const rowsPerPage = 6; // Cambia esto según cuántas filas quieras por página


    


    // Modal y botón de agregar repuesto
    const addPartModal = document.getElementById("addPartModal");
    const submitPartBtn = document.getElementById("submitPartBtn");
    const closePartModal = document.getElementById("closePartModal");

    const imageModal = document.getElementById("imageModal");
    const closeImageModal = document.getElementById("closeImageModal");
    const expandedImage = document.getElementById("expandedImage");


    const addPartBtn = document.getElementById("addPartBtn");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const pageInfo = document.getElementById("pageInfo");


    document.getElementById("addPartBtn").addEventListener("click", () => {
        addPartModal.style.display = "block";
    });

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
        
    

                // Función para confirma eliminacion de un repuesto
    window.deletePart = function(button) {
        if (confirm("¿Estás seguro de que deseas eliminar este repuesto?")) {
            const row = button.parentNode.parentNode;
            const index = Array.from(partsTableBody.rows).indexOf(row); // Obtener el índice de la fila
            options.splice((currentPage - 1) * rowsPerPage + index, 1); // Eliminar del arreglo options
            renderTable(); // Volver a renderizar la tabla
        }
    };

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








    // Función para renderizar la tabla de repuestos
    function renderTable() {
        partsTableBody.innerHTML = ""; // Limpiar la tabla antes de renderizar
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedOptions = options.slice(startIndex, endIndex);

        paginatedOptions.forEach(option => {
            const row = partsTableBody.insertRow();
            const photoCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const quantityCell = row.insertCell(2);
            const actionsCell = row.insertCell(3);

            photoCell.innerHTML = `<img src="${option.photo}" alt="${option.name}" width="50" height="50" onclick="showImage(this)">`;
            nameCell.innerText = option.name;
            quantityCell.innerHTML = `<span class="part-quantity">${option.quantity}</span>`;
            actionsCell.innerHTML = `
                <button onclick="incrementQuantity(this)">+</button>
                <button onclick="decrementQuantity(this)">-</button>
                <button onclick="deletePart(this)">Eliminar</button>
            `;
        });

        // Actualizar la información de la página
        pageInfo.innerText = `Página ${currentPage} de ${Math.ceil(options.length / rowsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(options.length / rowsPerPage);
        updatePageNumbers();
    }

    // Función para actualizar los números de página
    function updatePageNumbers() {
        pageNumbersContainer.innerHTML = ""; // Limpiar los números de página
        const totalPages = Math.ceil(options.length / rowsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });
            pageNumbersContainer.appendChild(pageButton);
        }
    }

    // Navegar a la página anterior
    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    // Navegar a la página siguiente
    nextPageBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(options.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    // Inicializar la tabla al cargar
    renderTable();














    // Agregar evento al botón de agregar repuesto
addPartBtn.addEventListener("click", () => {
    addPartModal.style.display = "block"; // Mostrar el modal
});

// Cerrar el modal
document.getElementById("closePartModal").addEventListener("click", () => {
    addPartModal.style.display = "none";
});

// Agregar el nuevo repuesto al hacer clic en el botón "Agregar Repuesto"
submitPartBtn.addEventListener("click", () => {
    const partPhotoInput = document.getElementById("partPhoto");
    const partNameInput = document.getElementById("partName");
    const partQuantityInput = document.getElementById("partQuantity");

    // Validar que los campos requeridos no estén vacíos
    if (partPhotoInput.files.length > 0 && partNameInput.value && partQuantityInput.value) {
        const newPart = {
            name: partNameInput.value,
            quantity: parseInt(partQuantityInput.value, 10),
            photo: URL.createObjectURL(partPhotoInput.files[0]) // Asigna la foto cargada
        };

        // Agregar el nuevo repuesto al arreglo
        options.push(newPart);

        // Limpiar los campos del formulario
        partPhotoInput.value = '';
        partNameInput.value = '';
        partQuantityInput.value = '';

        // Reiniciar a la primera página y renderizar la tabla
        currentPage = 1;
        renderTable();
        
        // Cerrar el modal
        addPartModal.style.display = "none";
    } else {
        alert("Por favor, complete todos los campos requeridos, incluyendo la foto.");
    }
});



})


