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



    

