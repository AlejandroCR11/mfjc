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

    const equipmentDetailsModal = document.getElementById("equipmentDetailsModal");
    const equipmentDetailsContent = document.getElementById("equipmentDetailsContent");
    const closeEquipmentDetailsModal = document.getElementById("closeEquipmentDetailsModal");


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
        const equipmentArea = document.getElementById("equipmentArea").value;
        const equipmentType = document.getElementById("equipmentType").value;
        const equipmentSubtype = document.getElementById("equipmentSubtype").value;
        const equipmentBrand = document.getElementById("equipmentBrand").value;
        const equipmentSerial = document.getElementById("equipmentSerial").value;
        const equipmentModel = document.getElementById("equipmentModel").value;
        const equipmentManual = document.getElementById("equipmentManual").value || "No tiene manual";
        const equipmentWarrantyDate = document.getElementById("equipmentWarranty").value;
    
        // Calcular días de garantía
        let equipmentWarrantyDays;
        if (equipmentWarrantyDate) {
            const warrantyDate = new Date(equipmentWarrantyDate);
            const today = new Date();
            const daysDifference = Math.ceil((warrantyDate - today) / (1000 * 60 * 60 * 24));

            if (daysDifference <= 0) {
                equipmentWarrantyDays = "Garantía vencida";
            } else {
                equipmentWarrantyDays = daysDifference + " días";
            }
        } else {
            equipmentWarrantyDays = "No tiene garantía";
        }

    
        if (equipmentPhotoInput.files.length > 0 && equipmentName) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const row = equipmentTableBody.insertRow();
                const photoCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const detailsCell = row.insertCell(2);
                const actionsCell = row.insertCell(3);
    
                // Asignar datos a la fila usando dataset
                row.dataset.area = equipmentArea;
                row.dataset.type = equipmentType;
                row.dataset.subType = equipmentSubtype;
                row.dataset.brand = equipmentBrand;
                row.dataset.serial = equipmentSerial;
                row.dataset.model = equipmentModel;
                row.dataset.manual = equipmentManual;
                row.dataset.warrantyDate = equipmentWarrantyDate || "No aplica";
                row.dataset.warrantyDays = equipmentWarrantyDays;
    
                photoCell.innerHTML = `<img src="${e.target.result}" alt="${equipmentName}" width="50" height="50" onclick="showImage(this)">`;
                nameCell.innerText = equipmentName;
    
                actionsCell.innerHTML = `
                    <button onclick="showEquipmentDetails(this)">Ver detalles</button>
                    <button onclick="showMaintenanceForm(this)">Mantenimiento</button>
                    <button onclick="deleteEquipment(this)">Eliminar</button>
                `;
    
                addEquipmentModal.style.display = "none"; 
                equipmentPhotoInput.value = "";
                document.getElementById("equipmentName").value = "";
                document.getElementById("equipmentArea").value = "producción";
                document.getElementById("equipmentType").value = "máquina";
                document.getElementById("equipmentSubtype").value = "electrónico";
                document.getElementById("equipmentBrand").value = "";
                document.getElementById("equipmentSerial").value = "";
                document.getElementById("equipmentModel").value = "";
                document.getElementById("equipmentManual").value = "";
                document.getElementById("equipmentWarranty").value = "";
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

                // Función para confirma eliminacion de un equipo
        window.deleteEquipment = function(button) {
            if (confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
                const row = button.parentNode.parentNode;
                row.parentNode.removeChild(row);
            }
        };

        // Mostrar los detalles del equipo
        window.showEquipmentDetails = function(button) {
            const row = button.parentNode.parentNode;
            
            const photoSrc = row.cells[0].querySelector("img").src; // Obtener la fuente de la imagen
            const name = row.cells[1].innerText;

            // Actualiza el contenido del modal con detalles
            equipmentDetailsContent.innerHTML = `
                <img src="${photoSrc}" alt="${name}" width="100" height="100" onclick="showImage('${photoSrc}')"><br>
                <strong>Nombre del Equipo:</strong> ${name}<br>
                <strong>Área del Equipo:</strong> ${row.dataset.area}<br>
                <strong>Tipo:</strong> ${row.dataset.type}<br>
                <strong>Subtipo:</strong> ${row.dataset.subType}<br>
                <strong>Marca del Equipo:</strong> ${row.dataset.brand}<br>
                <strong>Serial del Equipo:</strong> ${row.dataset.serial}<br>
                <strong>Modelo del Equipo:</strong> ${row.dataset.model}<br>
                <strong>Manual del Equipo (URL):</strong> <a href="${row.dataset.manual}" target="_blank">${row.dataset.manual}</a><br>
                <strong>Fecha de Garantía:</strong> ${row.dataset.warrantyDate}<br>
                <strong>Días Restantes de Garantía:</strong> ${row.dataset.warrantyDays}<br>
            `;
            
            equipmentDetailsModal.style.display = "block";
        };


        // Cerrar el modal de detalles
        closeEquipmentDetailsModal.onclick = () => {
            equipmentDetailsModal.style.display = "none";
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


        // Cerrar los modales al hacer clic fuera de él
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
        if (event.target === equipmentDetailsModal) {
            equipmentDetailsModal.style.display = "none";
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


