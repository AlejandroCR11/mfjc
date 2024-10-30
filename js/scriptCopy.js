document.addEventListener("DOMContentLoaded", () => {
    const partsTableBody = document.querySelector("#partsTable tbody");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };


    // Modal y botón de agregar repuesto
    const addPartModal = document.getElementById("addPartModal");
    const submitPartBtn = document.getElementById("submitPartBtn");
    const closePartModal = document.getElementById("closePartModal");

    const imageModal = document.getElementById("imageModal");
    const closeImageModal = document.getElementById("closeImageModal");
    const expandedImage = document.getElementById("expandedImage");


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
        // Obtenemos los valores de los campos dentro del modal (suponiendo que existen inputs con id)
        const partName = document.getElementById("partName").value;
        const partQuantity = document.getElementById("partQuantity").value;
    
        if (partName && partQuantity) {
            // Crear una nueva fila en la tabla de partes
            const newRow = partsTableBody.insertRow();
    
            // Insertar las celdas para el nombre, cantidad y opciones
            const nameCell = newRow.insertCell(0);
            const quantityCell = newRow.insertCell(1);
            const optionsCell = newRow.insertCell(2);
    
            nameCell.innerText = partName;
            quantityCell.innerHTML = `<span class="part-quantity">${partQuantity}</span>`;
    
            // Crear los botones de incremento, decremento y eliminación
            const incrementButton = document.createElement("button");
            incrementButton.textContent = "+";
            incrementButton.addEventListener("click", () => incrementQuantity(quantityCell));
    
            const decrementButton = document.createElement("button");
            decrementButton.textContent = "-";
            decrementButton.addEventListener("click", () => decrementQuantity(quantityCell));
    
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => deletePart(newRow));
    
            // Agregar los botones a la celda de opciones
            optionsCell.appendChild(incrementButton);
            optionsCell.appendChild(decrementButton);
            optionsCell.appendChild(deleteButton);
    
            // Limpiar el formulario y cerrar el modal
            document.getElementById("partName").value = '';
            document.getElementById("partQuantity").value = '';
            closeModal(addPartModal);
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
    
    // Función para incrementar la cantidad del repuesto
    function incrementQuantity(quantityCell) {
        const quantitySpan = quantityCell.querySelector(".part-quantity");
        let quantity = parseInt(quantitySpan.innerText);
        quantitySpan.innerText = ++quantity;
    }
    
    // Función para decrementar la cantidad del repuesto
    function decrementQuantity(quantityCell) {
        const quantitySpan = quantityCell.querySelector(".part-quantity");
        let quantity = parseInt(quantitySpan.innerText);
        if (quantity > 1) {
            quantitySpan.innerText = --quantity;
        }
    }
    
    // Función para eliminar un repuesto
    function deletePart(row) {
        if (confirm("¿Estás seguro de que deseas eliminar este repuesto?")) {
            row.remove();
        }
    }
});



    

