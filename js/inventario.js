document.addEventListener("DOMContentLoaded", () => {
    const partsTableBody = document.querySelector("#partsTable tbody");
    const searchInput = document.getElementById("searchInput");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };

    
/*  
    //llamar la fulana base de datos
    document.getElementById('addPartForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        let formData = new FormData(this);

        fetch('inventario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert(result); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    
    window.incrementQuantity = function(button, partId) {
        updateQuantity(partId, "incrementar");
    };
    
  
    window.decrementQuantity = function(button, partId) {
        updateQuantity(partId, "decrementar");
    };


    window.deletePart = function(button, partId) {
        if (confirm("¿Estás seguro de que deseas eliminar este repuesto?")) {
            fetch(`inventario.php?eliminar=${partId}`)
                .then(response => response.text())
                .then(data => {
                    console.log(data);
        
                    renderTable();
                });
        }

    };

*/


    // Guardar opciones en localStorage
    function saveToLocalStorage() {
        localStorage.setItem("repuestos", JSON.stringify(options));
    }

    let options = JSON.parse(localStorage.getItem("repuestos")) || [];
    let currentPage = 1;
    const rowsPerPage = 6; 


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
        document.body.style.overflow = ""; // Restaurar el scroll
    };

    // Función para abrir el modal de imagen ampliada
    function openImageModal(imageSrc) {
        expandedImage.src = imageSrc; 
        document.body.style.overflow = "hidden"; // Bloquear el scroll
        imageModal.style.display = "block"; 
    }
    
        // Función para incrementar la cantidad del repuesto
        window.incrementQuantity = function(button) {
            const quantityCell = button.parentNode.parentNode.cells[2];
            const quantitySpan = quantityCell.querySelector(".part-quantity");
            let quantity = parseInt(quantitySpan.innerText);
            quantitySpan.innerText = ++quantity;
        
            const index = Array.from(partsTableBody.rows).indexOf(button.parentNode.parentNode);
            options[(currentPage - 1) * rowsPerPage + index].quantity = quantity;
            saveToLocalStorage(); // Guardar en localStorage
        };
        
    
        // Función para decrementar la cantidad del repuesto
        window.decrementQuantity = function(button) {
            const quantityCell = button.parentNode.parentNode.cells[2];
            const quantitySpan = quantityCell.querySelector(".part-quantity");
            let quantity = parseInt(quantitySpan.innerText);
            if (quantity > 1) {
                quantitySpan.innerText = --quantity;
        
                const index = Array.from(partsTableBody.rows).indexOf(button.parentNode.parentNode);
                options[(currentPage - 1) * rowsPerPage + index].quantity = quantity;
                saveToLocalStorage(); // Guardar en localStorage
            }
        };
        // Funcion para confirma eliminacion de un repuesto
        window.deletePart = function(button) {
            if (confirm("¿Estás seguro de que deseas eliminar este repuesto?")) {
                const row = button.parentNode.parentNode;
                const index = Array.from(partsTableBody.rows).indexOf(row);
                options.splice((currentPage - 1) * rowsPerPage + index, 1); 
                saveToLocalStorage(); // Guardar en localStorage
                renderTable(); 
            }
        };

        // desactivar el scroll del modal
    function openModal(modalElement) {
        modalElement.style.display = "block";
        document.body.classList.add("no-scroll"); // Desactiva el scroll
    }

    // restaurar el scroll del modal
    function closeModal(modalElement) {
        modalElement.style.display = "none";
        document.body.classList.remove("no-scroll"); // Activa el scroll
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

        closeModal(addPartModal); 
    });



    // Agregar Repuesto
    submitPartBtn.addEventListener("click", () => {
        const partPhotoInput = document.getElementById("partPhoto");
        const partNameInput = document.getElementById("partName");
        const partQuantityInput = document.getElementById("partQuantity");

        // Validar que los campos requeridos no esten vacios
        if (partPhotoInput.files.length > 0 && partNameInput.value && partQuantityInput.value) {
            const newPart = {
                name: partNameInput.value,
                quantity: parseInt(partQuantityInput.value, 10),
                photo: URL.createObjectURL(partPhotoInput.files[0])
            };

            // Agregar el nuevo repuesto al arreglo
            options.push(newPart);
            saveToLocalStorage(); 
            
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
    function renderTable(filteredOptions) {
        partsTableBody.innerHTML = ""; // Limpiar la tabla antes de renderizar
        const startIndex = (currentPage - 1) * rowsPerPage;
        const optionsToRender = filteredOptions || options; // Usar opciones filtradas si existen algun dia 
        const paginatedOptions = optionsToRender.slice(startIndex, startIndex + rowsPerPage);

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
                <button class="btn increment-btn" onclick="incrementQuantity(this)">+</button>
                <button class="btn decrement-btn" onclick="decrementQuantity(this)">-</button>
                <button class="btn delete-btn" onclick="deletePart(this)">Eliminar</button>
            `;
        });

        // Actualizar la información de la página
        pageInfo.innerText = `Página ${currentPage} de ${Math.ceil(options.length / rowsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(options.length / rowsPerPage);
        updatePageNumbers();
    }

    function addPart(part) {
        options.push(part);
        saveToLocalStorage(); // Guardar los cambios
        currentPage = 1; // Reiniciar a la primera página
        renderTable(); // Actualizar la tabla
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
    

    // página anterior
    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    // página siguiente
    nextPageBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(options.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    // Agregar evento para buscar por nombre
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredOptions = options.filter(option => option.name.toLowerCase().includes(searchTerm));
        currentPage = 1; // Reiniciar a la primera página
        renderTable(filteredOptions); // Renderizar tabla con opciones filtradas
    });

    renderTable();


    // Agregar evento al botón de agregar repuesto
addPartBtn.addEventListener("click", () => {
    addPartModal.style.display = "block"; 
});

// Cerrar el modal
document.getElementById("closePartModal").addEventListener("click", () => {
    addPartModal.style.display = "none";
});

if (typeof(Storage) === "undefined") {
    alert("Tu navegador no soporta almacenamiento local. Por favor, actualízalo.");
}


})


