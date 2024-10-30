// Función para mostrar un modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Función para cerrar un modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Eventos para abrir y cerrar modales
document.getElementById('addEquipmentBtn').onclick = function() {
    showModal('addEquipmentModal');
};

document.getElementById('closeEquipmentModal').onclick = function() {
    closeModal('addEquipmentModal');
};

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    const equipmentModal = document.getElementById('addEquipmentModal');
    const detailsModal = document.getElementById('equipmentDetailsModal');
    const maintenanceModal = document.getElementById('addMaintenanceModal');
    
    if (event.target === equipmentModal) {
        closeModal('addEquipmentModal');
    } else if (event.target === detailsModal) {
        closeModal('equipmentDetailsModal');
    } else if (event.target === maintenanceModal) {
        closeModal('addMaintenanceModal');
    }
}