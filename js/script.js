document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll("button");
    const equipmentTableBody = document.querySelector("#equipmentTable tbody");
    const maintenanceStats = {
        upcoming: 0,
        overdue: 0,
        history: []
    };



    
    // Modal y botón de agregar equipo
    const searchInput = document.getElementById("searchInput");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const pageNumbers = document.getElementById("pageNumbers");
    const pageInfo = document.getElementById("pageInfo");


    const addEquipmentModal = document.getElementById("addEquipmentModal");
    const submitEquipmentBtn = document.getElementById("submitEquipmentBtn");
    const closeEquipmentModal = document.getElementById("closeEquipmentModal");
    const otraOperacion = document.getElementById("otraOperacionInput");

    const addMaintenanceModal = document.getElementById("addMaintenanceModal");
    const closeMaintenanceModal = document.getElementById("closeMaintenanceModal");
    const submitMaintenanceBtn = document.getElementById("submitMaintenanceBtn");

    const imageModal = document.getElementById("imageModal");
    const closeImageModal = document.getElementById("closeImageModal");
    const expandedImage = document.getElementById("expandedImage");

    const equipmentDetailsModal = document.getElementById("equipmentDetailsModal");
    const equipmentDetailsContent = document.getElementById("equipmentDetailsContent");
    const closeEquipmentDetailsModal = document.getElementById("closeEquipmentDetailsModal");

    const viewHistoryBtn = document.getElementById("viewHistoryBtn");



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


            // Guardar el equipo en localStorage
            const equipmentData = {
                photo: e.target.result,
                name: equipmentName,
                area: equipmentArea,
                type: equipmentType,
                subtype: equipmentSubtype,
                brand: equipmentBrand,
                serial: equipmentSerial,
                model: equipmentModel,
                manual: equipmentManual,
                warrantyDate: equipmentWarrantyDate || "No aplica",
                warrantyDays: equipmentWarrantyDays
            };

            const existingEquipment = JSON.parse(localStorage.getItem("equipment")) || [];
            existingEquipment.push(equipmentData);
            localStorage.setItem("equipment", JSON.stringify(existingEquipment));

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
        
            // Obtener el nombre del equipo que se va a eliminar
            const equipmentName = row.cells[1].innerText;
        
            // Eliminar el equipo de la tabla
            row.parentNode.removeChild(row);
        
            // Eliminar el equipo de localStorage
            let storedEquipments = JSON.parse(localStorage.getItem('equipment')) || []; // Usar 'equipment' en lugar de 'equipments'
            storedEquipments = storedEquipments.filter(equipment => equipment.name !== equipmentName); // Filtrar por nombre de equipo
            localStorage.setItem('equipment', JSON.stringify(storedEquipments)); // Guardar de nuevo en localStorage
        
            alert(`El equipo "${equipmentName}" ha sido eliminado.`);
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
            
            const tipoOperacion = document.getElementById("tipoOperacion").value;
            let operacion;

            if (tipoOperacion === "otro") {
                operacion = document.getElementById("otraOperacionInput").value; // Captura el valor del campo de texto
            } else {
                operacion = tipoOperacion;
            }

            const tipoMantenimiento = document.getElementById("tipoMantenimiento").value;
            const fechaMantenimiento = document.getElementById("fechaMantenimiento").value;
            const descripcionMantenimiento = document.getElementById("descripcionMantenimiento").value;
            
            if (tipoMantenimiento && fechaMantenimiento && descripcionMantenimiento) {
                const nuevoMantenimiento = {
                    equipo: equipmentName, // Incluye el nombre del equipo
                    tipo: tipoMantenimiento,
                    operacion: operacion,
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
            
            alert(`Mantenimiento agregado para el equipo "${equipmentName}":\nTipo: ${tipoMantenimiento}\nOperación: ${operacion}\nFecha: ${fechaMantenimiento}\nDescripción: ${descripcionMantenimiento}`);
            addMaintenanceModal.style.display = "none";

            // Limpiar campos   
        // document.getElementById("tipoMantenimiento").value = "";
        // document.getElementById("tipoOperacion").value = "";
        document.getElementById("otraOperacionInput").value = "";
        
            document.getElementById("fechaMantenimiento").value = "";
            document.getElementById("descripcionMantenimiento").value = "";

            updateMaintenanceStats();
            initializeCalendar(); // Recargar el calendario para reflejar el nuevo mantenimiento
        } else {
            alert("Por favor, complete todos los campos obligatorios.");
        }
    };
};

viewHistoryBtn.addEventListener("click", () => {
    const historialMantenimientos = JSON.parse(localStorage.getItem("maintenances")) || [];

    if (historialMantenimientos.length === 0) {
        alert("No hay historial de mantenimientos.");
        return;
    }

    let historyOutput = "Historial de Mantenimientos:\n";
    historialMantenimientos.forEach((entry, index) => {
        historyOutput += `${index + 1}. Equipo: ${entry.equipo}, Operación: ${entry.tipo}, Fecha: ${entry.date}, Descripción: ${entry.descripcion}\n`;
    });
    alert(historyOutput);;
});


    // Actualiza las estadísticas de mantenimiento en el panel de control
function updateMaintenanceStats() {
    // Actualizamos la interfaz de usuario
    document.querySelector("#upcomingMaintenanceCount span").innerText = maintenanceStats.upcoming;
    document.querySelector("#overdueMaintenanceCount span").innerText = maintenanceStats.overdue;

    // Guardamos las estadísticas en localStorage
    const maintenanceStatsData = {
        upcoming: maintenanceStats.upcoming,
        overdue: maintenanceStats.overdue
    };
    localStorage.setItem('maintenanceStats', JSON.stringify(maintenanceStatsData));
}

    const storedStats = JSON.parse(localStorage.getItem('maintenanceStats'));
    if (storedStats) {
        maintenanceStats.upcoming = storedStats.upcoming;
        maintenanceStats.overdue = storedStats.overdue;

        // Actualizamos la interfaz con las estadísticas almacenadas
        updateMaintenanceStats();
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







    let currentPage = 1;
    const rowsPerPage = 2;  // Cantidad máxima de filas por página
    
    // Función para obtener los equipos y filtrarlos
    function getFilteredEquipment() {
        const searchText = searchInput.value.toLowerCase();
        const rows = Array.from(equipmentTableBody.getElementsByTagName("tr"));
        return rows.filter(row => row.cells[1].innerText.toLowerCase().includes(searchText));
    }
    
    // Función para mostrar una página de resultados
    function displayPage(pageNumber) {
        const filteredRows = getFilteredEquipment();
        const totalRows = filteredRows.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);
    
        // Asegurarse de que la página no se salga de los límites
        currentPage = Math.max(1, Math.min(pageNumber, totalPages));
    
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        // Ocultar todos los elementos y mostrar solo los de la página actual
        Array.from(equipmentTableBody.getElementsByTagName("tr")).forEach(row => row.style.display = "none");
    
        // Mostrar solo las filas que corresponden a la página actual
        filteredRows.slice(start, end).forEach(row => row.style.display = "");
    
        // Actualizar la información de la página actual
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    
        // Habilitar o deshabilitar los botones de paginación
        prevPageBtn.disabled = currentPage === 1;
        
        // Condición adicional para habilitar el botón "Siguiente" si el total de filas es menor o igual a rowsPerPage
        nextPageBtn.disabled = totalRows <= rowsPerPage ? false : currentPage === totalPages;
    }
    
    // Eventos para los botones de paginación
    prevPageBtn.addEventListener("click", () => {
        displayPage(currentPage - 1);
    });
    
    nextPageBtn.addEventListener("click", () => {
        displayPage(currentPage + 1);
    });
    
    // Evento de búsqueda
    searchInput.addEventListener("input", () => {
        displayPage(1); // Reiniciar a la primera página cuando se realiza una búsqueda
    });
    
    // Mostrar la primera página cuando se carga el contenido
    displayPage(1);




    // Cargar equipos desde localStorage
    const equipmentData = JSON.parse(localStorage.getItem("equipment")) || [];
    equipmentData.forEach(equipment => {
        const row = equipmentTableBody.insertRow();
        const photoCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const actionsCell = row.insertCell(2);

        // Asignar datos a la fila usando dataset
        row.dataset.area = equipment.area;
        row.dataset.type = equipment.type;
        row.dataset.subType = equipment.subtype;
        row.dataset.brand = equipment.brand;
        row.dataset.serial = equipment.serial;
        row.dataset.model = equipment.model;
        row.dataset.manual = equipment.manual;
        row.dataset.warrantyDate = equipment.warrantyDate;
        row.dataset.warrantyDays = equipment.warrantyDays;

        photoCell.innerHTML = `<img src="${equipment.photo}" alt="${equipment.name}" width="50" height="50" onclick="showImage(this)">`;
        nameCell.innerText = equipment.name;

        actionsCell.innerHTML = `
            <button class="button button-view" onclick="showEquipmentDetails(this)">Ver detalles</button>
            <button class="button button-maintenance" onclick="showMaintenanceForm(this)">Mantenimiento</button>
            <button class="button button-delete" onclick="deleteEquipment(this)">Eliminar</button>
        `;
    });
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


// Esta función muestra el campo de texto si se selecciona "Otro" en el selector
function mostrarCampoTexto() {
    const tipoOperacion = document.getElementById("tipoOperacion").value;
    const otraOperacionInput = document.getElementById("otraOperacionInput");

    if (tipoOperacion === "otro") {
        otraOperacionInput.style.display = "block"; // Mostrar campo de texto
    } else {
        otraOperacionInput.style.display = "none"; // Ocultar campo de texto
        otraOperacionInput.value = ""; // Limpiar el campo de texto si no es "Otro"
    }
}



