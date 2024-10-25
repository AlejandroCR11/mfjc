document.addEventListener("DOMContentLoaded", () => {
    const equipmentTableBody = document.querySelector("#equipmentTable tbody");
    const partsTableBody = document.querySelector("#partsTable tbody");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };
    
    // Modal y botón de agregar equipo
    const addEquipmentModal = document.getElementById("addEquipmentModal");
    const submitEquipmentBtn = document.getElementById("submitEquipmentBtn");
    const closeEquipmentModal = document.getElementById("closeEquipmentModal");

    // Modal y botón de agregar repuesto
    const addPartModal = document.getElementById("addPartModal");
    const submitPartBtn = document.getElementById("submitPartBtn");
    const closePartModal = document.getElementById("closePartModal");
    
    const addMaintenanceModal = document.getElementById("addMaintenanceModal");
    const closeMaintenanceModal = document.getElementById("closeMaintenanceModal");
    const submitMaintenanceBtn = document.getElementById("submitMaintenanceBtn");

    const imageModal = document.getElementById("imageModal");
    const closeImageModal = document.getElementById("closeImageModal");
    const expandedImage = document.getElementById("expandedImage");

    
    document.getElementById("addEquipmentBtn").addEventListener("click", () => {
        addEquipmentModal.style.display = "block";
    });

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
    };

    submitEquipmentBtn.addEventListener("click", () => {
        const equipmentPhotoInput = document.getElementById("equipmentPhoto");
        const equipmentName = document.getElementById("equipmentName").value;

        if (equipmentPhotoInput.files.length > 0 && equipmentName) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const row = equipmentTableBody.insertRow();
                const photoCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const actionsCell = row.insertCell(2);
                
                photoCell.innerHTML = `<img src="${e.target.result}" alt="${equipmentName}" width="50" height="50" onclick="showImage(this)">`;
                nameCell.innerText = equipmentName;
                actionsCell.innerHTML = `
                <button onclick="showMaintenanceForm(this)">Mantenimiento</button>
                <button onclick="deleteEquipment(this)">Eliminar</button>
            `;

                addEquipmentModal.style.display = "none"; 
                equipmentPhotoInput.value = ""; 
                document.getElementById("equipmentName").value = ""; 
            };
            reader.readAsDataURL(equipmentPhotoInput.files[0]); 
        } else {
            alert("Por favor, complete todos los campos obligatorios.");
        }
    });
    
    
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


    window.showImage = function(image) {
        expandedImage.src = image.src; 
        imageModal.style.display = "block"; 
    };

    window.deleteRow = function(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    };

    window.showMaintenanceForm = function(button) {
        addMaintenanceModal.style.display = "block"; // Mostrar el modal de mantenimiento

        // Asignar la funcionalidad de agregar mantenimiento al botón del modal
        submitMaintenanceBtn.onclick = function() {
            const tipoMantenimiento = document.getElementById("tipoMantenimiento").value;
            const fechaMantenimiento = document.getElementById("fechaMantenimiento").value;
            const descripcionMantenimiento = document.getElementById("descripcionMantenimiento").value;

            if (tipoMantenimiento && fechaMantenimiento && descripcionMantenimiento) {
                maintenanceStats.history.push({
                    tipo: tipoMantenimiento,
                    fecha: new Date(fechaMantenimiento),
                    descripcion: descripcionMantenimiento
                });

                // Actualizar estadísticas
                const today = new Date();
                if (new Date(fechaMantenimiento) >= today) {
                    maintenanceStats.upcoming++;
                } else {
                    maintenanceStats.overdue++;
                }
                
                updateMaintenanceStats();
                alert(`Mantenimiento agregado:\nTipo: ${tipoMantenimiento}\nFecha: ${fechaMantenimiento}\nDescripción: ${descripcionMantenimiento}`);
                addMaintenanceModal.style.display = "none"; 
                document.getElementById("tipoMantenimiento").value = "preventivo"; 
                document.getElementById("fechaMantenimiento").value = ""; 
                document.getElementById("descripcionMantenimiento").value = ""; 
            } else {
                alert("Por favor, complete todos los campos obligatorios.");
            }
        };
    };

        // Función para eliminar un equipo
        window.deleteEquipment = function(button) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };

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

    // Actualiza las estadísticas de mantenimiento en el panel de control
    function updateMaintenanceStats() {
        document.querySelector("#upcomingMaintenanceCount span").innerText = maintenanceStats.upcoming;
        document.querySelector("#overdueMaintenanceCount span").innerText = maintenanceStats.overdue;
    }

     // Cerrar los modales al hacer clic fuera de ellos
    window.onclick = function(event) {
        if (event.target === addEquipmentModal) {
            addEquipmentModal.style.display = "none";
        }
        if (event.target === addMaintenanceModal) {
            addMaintenanceModal.style.display = "none";
        }
        if (event.target === addPartModal) {
            addPartModal.style.display = "none";
        }    
        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }
    };

    // Función para ver el historial de mantenimientos
    document.getElementById("viewHistoryBtn").addEventListener("click", () => {
        if (maintenanceStats.history.length === 0) {
            alert("No hay historial de mantenimientos.");
            return;
        }

        let historyOutput = "Historial de Mantenimientos:\n";
        maintenanceStats.history.forEach((entry, index) => {
            historyOutput += `${index + 1}. Tipo: ${entry.tipo}, Fecha: ${entry.fecha.toLocaleDateString()}, Descripción: ${entry.descripcion}\n`;
        });
        alert(historyOutput);
    });
});

