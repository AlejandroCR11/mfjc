document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll("button");
    const equipmentTableBody = document.querySelector("#equipmentTable tbody");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };

    // Modal y botón de agregar equipo
    const addEquipmentModal = document.getElementById("addEquipmentModal");
    const submitEquipmentBtn = document.getElementById("submitEquipmentBtn");
    const closeEquipmentModal = document.getElementById("closeEquipmentModal");

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

    closeEquipmentModal.onclick = () => {
        addEquipmentModal.style.display = "none";
    };

    closeMaintenanceModal.onclick = () => {
        addMaintenanceModal.style.display = "none";
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
                const actionsCell = row.insertCell(2);

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

                // Asegúrate de que la imagen pueda abrirse
                photoCell.innerHTML = `<img src="${e.target.result}" alt="${equipmentName}" width="50" height="50" onclick="showImage(this)">`;
                nameCell.innerText = equipmentName;

                actionsCell.innerHTML = `
                <button class="button button-view" onclick="showEquipmentDetails(this)">Ver detalles</button>
                <button class="button button-maintenance" onclick="showMaintenanceForm(this)">Mantenimiento</button>
                <button class="button button-delete" onclick="deleteEquipment(this)">Eliminar</button>
            `;

                addEquipmentModal.style.display = "none"; 
                equipmentPhotoInput.value = "";
                document.getElementById("equipmentName").value = "";
                document.getElementById("equipmentArea").value = "";
                document.getElementById("equipmentType").value = "";
                document.getElementById("equipmentSubtype").value = "";
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

    window.deleteEquipment = function(button) {
        if (confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    };

    // Mostrar los detalles del equipo
    window.showEquipmentDetails = function(button) {
        const row = button.parentNode.parentNode;

        const photoSrc = row.cells[0].querySelector("img").src; // Obtener la fuente de la imagen primaria
        const name = row.cells[1].innerText;

        // Actualiza el contenido del modal con detalles
        equipmentDetailsContent.innerHTML = `
            <img src="${photoSrc}" alt="${name}" width="100" height="100" onclick="openImageModal('${photoSrc}')"><br> 
            <strong>Nombre del Equipo:</strong> ${name}<br>
            <strong>Área del Equipo:</strong> ${row.dataset.area}<br>
            <strong>Tipo:</strong> ${row.dataset.type}<br>
            <strong>Subtipo:</strong> ${row.dataset.subType}<br>
            <strong>Marca del Equipo:</strong> ${row.dataset.brand}<br>
            <strong>Serial del Equipo:</strong> ${row.dataset.serial}<br>
            <strong>Modelo del Equipo:</strong> ${row.dataset.model}<br>
            <strong>Manual:</strong> ${row.dataset.manual}<br>
            <strong>Fecha de Garantía:</strong> ${row.dataset.warrantyDate}<br>
            <strong>Días de Garantía:</strong> ${row.dataset.warrantyDays}<br>
        `;

        equipmentDetailsModal.style.display = "block"; // Abre el modal
    };

    // Cerrar el modal de detalles
    closeEquipmentDetailsModal.onclick = () => {
        equipmentDetailsModal.style.display = "none";
    };

    window.showMaintenanceForm = function(button) {
        const row = button.closest("tr"); // Obtener la fila del equipo
        const equipmentName = row.cells[1].innerText; // Obtener el nombre del equipo desde la segunda celda (ajusta si es necesario)
    
        // Muestra el nombre del equipo en el modal
        if (document.getElementById("equipmentNameForMaintenance")) {
            document.getElementById("equipmentNameForMaintenance").innerText = equipmentName;
        }
    
        addMaintenanceModal.style.display = "block";

        
    
        // Asignar la funcionalidad de agregar mantenimiento al botón del modal
        submitMaintenanceBtn.onclick = function() {
            const tipoMantenimiento = document.getElementById("tipoMantenimiento").value;
            const fechaMantenimiento = document.getElementById("fechaMantenimiento").value;
            const descripcionMantenimiento = document.getElementById("descripcionMantenimiento").value;
    
            if (tipoMantenimiento && fechaMantenimiento && descripcionMantenimiento) {
                const nuevoMantenimiento = {
                    equipo: equipmentName, // Incluye el nombre del equipo
                    tipo: tipoMantenimiento,
                    date: fechaMantenimiento,
                    descripcion: descripcionMantenimiento
                };
    

                // Actualizar estadísticas
                const today = new Date();
                if (new Date(fechaMantenimiento) >= today) {
                    maintenanceStats.upcoming++;
                } else {
                    maintenanceStats.overdue++;
                }

                updateMaintenanceStats();
                
            // Guardar el mantenimiento en el localStorage
            const existingMaintenances = JSON.parse(localStorage.getItem('maintenances')) || [];
            existingMaintenances.push(nuevoMantenimiento);
            localStorage.setItem('maintenances', JSON.stringify(existingMaintenances));

            alert(`Mantenimiento agregado para el equipo "${equipmentName}":\nTipo: ${tipoMantenimiento}\nFecha: ${fechaMantenimiento}\nDescripción: ${descripcionMantenimiento}`);
            addMaintenanceModal.style.display = "none";

            document.getElementById("tipoMantenimiento").value = "";
            document.getElementById("fechaMantenimiento").value = "";
            document.getElementById("descripcionMantenimiento").value = "";

            initializeCalendar(); // Recargar el calendario para reflejar el nuevo mantenimiento
        } else {
            alert("Por favor, complete todos los campos obligatorios.");
        }
    };
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
        } else if (event.target === equipmentDetailsModal) {
            equipmentDetailsModal.style.display = "none";
        } else if (event.target === addMaintenanceModal) {
            addMaintenanceModal.style.display = "none"; 
        } else if (event.target === imageModal) {
            imageModal.style.display = "none"; 
            document.body.style.overflow = ""; // Restaurar el scroll del fondo
        }
    };

    // Función para mostrar la imagen en el modal ampliado
    window.showImage = function(imgElement) {
        openImageModal(imgElement.src);
    };
});

// Función para llenar los selectores de área, tipo y subtipo
const fillSelectOptions = () => {
    const equipmentAreaSelect = document.getElementById('equipmentArea');
    const equipmentTypeSelect = document.getElementById('equipmentType');
    const equipmentSubtypeSelect = document.getElementById('equipmentSubtype');

    // Limpiar opciones existentes en los selectores
    equipmentAreaSelect.innerHTML = '<option value="">Selecciona un área</option>';
    equipmentTypeSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
    equipmentSubtypeSelect.innerHTML = '<option value="">Selecciona un subtipo</option>';

    // Cargar opciones desde Local Storage
    const savedOptions = JSON.parse(localStorage.getItem('options')) || [];

    // Filtrar y agregar opciones a cada selector según el tipo
    savedOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.value;

        if (option.type === 'Área') {
            equipmentAreaSelect.appendChild(optionElement);
        } else if (option.type === 'Tipo') {
            equipmentTypeSelect.appendChild(optionElement);
        } else if (option.type === 'Subtipo') {
            equipmentSubtypeSelect.appendChild(optionElement);
        }
        
    });
};

// Llamar a fillSelectOptions al cargar la página
document.addEventListener('DOMContentLoaded', fillSelectOptions);
