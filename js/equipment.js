// Obtener elementos del DOM
const addEquipment = () => {
    const equipmentName = document.getElementById('equipmentName').value;
    const equipmentArea = document.getElementById('equipmentArea').value;
    const equipmentType = document.getElementById('equipmentType').value;
    const equipmentSubType = document.getElementById('equipmentSubtype').value; // Subtipo
    const equipmentBrand = document.getElementById('equipmentBrand').value;
    const equipmentSerial = document.getElementById('equipmentSerial').value;
    const equipmentModel = document.getElementById('equipmentModel').value;
    const equipmentManual = document.getElementById('equipmentManual').value; // Opcional
    const equipmentWarranty = document.getElementById('equipmentWarranty').value; // Opcional

    // Agregar una nueva fila a la tabla
    const table = document.getElementById('equipmentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = `<img src="${URL.createObjectURL(document.getElementById('equipmentPhoto').files[0])}" style="width:50px;height:50px;">`;
    newRow.insertCell(1).innerHTML = equipmentName;
    newRow.insertCell(2).innerHTML = `
        <button onclick="viewDetails('${equipmentName}', '${equipmentArea}', '${equipmentType}', '${equipmentSubType}', '${equipmentBrand}', '${equipmentSerial}', '${equipmentModel}', '${equipmentManual}', '${equipmentWarranty}')">Detalles</button>
        <button onclick="addMaintenance('${equipmentName}')">Agregar Mantenimiento</button>
        <button onclick="deleteEquipment(this)">Eliminar</button>
    `;

    // Limpiar campos del formulario después de agregar el equipo
    clearEquipmentForm();

    // Cerrar el modal
    closeModal('addEquipmentModal');
};

// Función para limpiar el formulario de agregar equipo
const clearEquipmentForm = () => {
    document.getElementById('equipmentName').value = '';
    document.getElementById('equipmentArea').value = '';
    document.getElementById('equipmentType').value = '';
    document.getElementById('equipmentSubtype').value = ''; // Limpiar subtipo
    document.getElementById('equipmentBrand').value = '';
    document.getElementById('equipmentSerial').value = '';
    document.getElementById('equipmentModel').value = '';
    document.getElementById('equipmentManual').value = ''; // Limpiar manual
    document.getElementById('equipmentWarranty').value = ''; // Limpiar garantía
    document.getElementById('equipmentPhoto').value = ''; // Limpiar foto
};

// Función para ver detalles del equipo
const viewDetails = (name, area, type, subType, brand, serial, model, manual, warranty) => {
    const warrantyDisplay = warranty ? warranty : 'No hay garantía';
    const manualDisplay = manual ? `<a href="${manual}" target="_blank">Ver Manual</a>` : 'No tiene manual';

    // Contador de días de garantía
    const warrantyDays = warranty ? Math.max(0, (new Date(warranty) - new Date()) / (1000 * 60 * 60 * 24)) : null;
    const warrantyMessage = warrantyDays === 0 ? 'Garantía vencida' : (warrantyDays > 0 ? `${warrantyDays} días restantes` : '');

    const content = `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Subtipo:</strong> ${subType}</p>
        <p><strong>Marca:</strong> ${brand}</p>
        <p><strong>Serial:</strong> ${serial}</p>
        <p><strong>Modelo:</strong> ${model}</p>
        <p><strong>Manual:</strong> ${manualDisplay}</p>
        <p><strong>Fecha de Garantía:</strong> ${warranty} (${warrantyMessage})</p>
    `;
    document.getElementById('equipmentDetailsContent').innerHTML = content;
    document.getElementById('addMaintenanceBtn').style.display = 'block'; // Mostrar botón de mantenimiento
    showModal('equipmentDetailsModal');
};

// Función para eliminar equipo
const deleteEquipment = (btn) => {
    const row = btn.parentNode.parentNode;
    if (confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
        row.parentNode.removeChild(row);
    }
};

// Función para agregar mantenimiento
const addMaintenance = (equipmentName) => {
    // Mostrar el modal de agregar mantenimiento
    showModal('addMaintenanceModal');
    document.getElementById('submitMaintenanceBtn').onclick = function() {
        const maintenanceType = document.getElementById('tipoMantenimiento').value;
        const maintenanceDate = document.getElementById('fechaMantenimiento').value;
        const maintenanceDescription = document.getElementById('descripcionMantenimiento').value;

        if (maintenanceDate && maintenanceDescription) {
            alert(`Mantenimiento Agregado para: ${equipmentName}\nTipo: ${maintenanceType}\nFecha: ${maintenanceDate}\nDescripción: ${maintenanceDescription}`);
            closeModal('addMaintenanceModal');
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };
};

// Función para mostrar el modal
const showModal = (modalId) => {
    document.getElementById(modalId).style.display = 'block';
};

// Cerrar modales al hacer clic fuera de ellos
window.onclick = function(event) {
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            closeModal(modals[i].id);
        }
    }
};

// Cerrar modal específico
const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
};

// Ampliar imagen al hacer clic
const expandImage = (src) => {
    const expandedImage = document.getElementById('expandedImage');
    expandedImage.src = src;
    document.getElementById('imageModal').style.display = 'block';
};

// Cerrar el modal de imagen
closeImageModal.onclick = function() {
    closeModal('imageModal');
};

// Mostrar el modal para agregar equipo
addEquipmentBtn.onclick = function() {
    showModal('addEquipmentModal');
};

// Cerrar el modal al hacer clic en la X
closeEquipmentModal.onclick = function() {
    closeModal('addEquipmentModal');
};

// Cerrar el modal de detalles
closeEquipmentDetailsModal.onclick = function() {
    closeModal('equipmentDetailsModal');
};

// Cerrar el modal de mantenimiento
closeMaintenanceModal.onclick = function() {
    closeModal('addMaintenanceModal');
};

// Manejo del botón de agregar equipo
document.getElementById('submitEquipmentBtn').onclick = addEquipment;


// Función para llenar los selectores de área, tipo y subtipo
const fillSelectOptions = () => {
    // Obtener referencias de los selectores del DOM
    const equipmentAreaSelect = document.getElementById('equipmentArea');
    const equipmentTypeSelect = document.getElementById('equipmentType');
    const equipmentSubtypeSelect = document.getElementById('equipmentSubtype');

    // Limpiar opciones existentes
    equipmentAreaSelect.innerHTML = '<option value="">Seleccionar Área</option>';
    equipmentTypeSelect.innerHTML = '<option value="">Seleccionar Tipo</option>';
    equipmentSubtypeSelect.innerHTML = '<option value="">Seleccionar Subtipo</option>';

    // Cargar opciones desde localStorage
    const areas = JSON.parse(localStorage.getItem('areas')) || [];
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const subtipos = JSON.parse(localStorage.getItem('subtipos')) || [];

    // Llenar selectores con las opciones guardadas
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        equipmentAreaSelect.appendChild(option);
    });

    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        equipmentTypeSelect.appendChild(option);
    });

    subtipos.forEach(subtipo => {
        const option = document.createElement('option');
        option.value = subtipo;
        option.textContent = subtipo;
        equipmentSubtypeSelect.appendChild(option);
    });
};

// Llamar a fillSelectOptions cuando se carga la página
document.addEventListener('DOMContentLoaded', fillSelectOptions);

function cargarOpciones() {
    const savedOptions = JSON.parse(localStorage.getItem("options")) || [];

    const areaSelect = document.getElementById("areaSelect");
    const tipoSelect = document.getElementById("tipoSelect");
    const subtipoSelect = document.getElementById("subtipoSelect");

    // Filtrar y agregar las opciones a cada select
    savedOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.value;

        if (option.type === "equipmentArea") {
            areaSelect.appendChild(optionElement);
        } else if (option.type === "equipmentType") {
            tipoSelect.appendChild(optionElement);
        } else if (option.type === "equipmentSubType") {
            subtipoSelect.appendChild(optionElement);
        }
    });
}



