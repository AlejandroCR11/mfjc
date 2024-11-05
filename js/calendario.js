document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    let calendar; // Declarar la variable calendar

    

    // Cargar mantenimientos desde el localStorage
    const loadMaintenances = () => {
        return JSON.parse(localStorage.getItem('maintenances')) || [];
    };

    let currentMaintenanceId;

    // Inicializar el calendario
    const initializeCalendar = () => {
        const maintenances = loadMaintenances().map((m, index) => ({
            id: String(index),
            title: `${m.equipo} - ${m.tipo}`,
            start: m.date,
            extendedProps: {
                tipo: m.tipo,
                descripcion: m.descripcion,
                equipo: m.equipo
            }
        }));

        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: maintenances,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
            },
            eventClick: function(info) {
                currentMaintenanceId = parseInt(info.event.id);
                openMaintenanceModal({
                    equipo: info.event.extendedProps.equipo,
                    tipo: info.event.extendedProps.tipo,
                    fecha: new Date(info.event.start),
                    descripcion: info.event.extendedProps.descripcion
                });
            }
        });

        calendar.render();
    };

    // Llamar a initializeCalendar para que calendar tenga valor
    initializeCalendar();

    // Abrir modal de mantenimiento
    const openMaintenanceModal = (maintenance) => {
        document.getElementById("equipmentName").innerText = maintenance.equipo || 'No definido';
        document.getElementById("maintenanceType").innerText = maintenance.tipo || 'No definido';
        document.getElementById("maintenanceDate").innerText = maintenance.fecha.toLocaleDateString() || 'No definido';
        document.getElementById("maintenanceDescription").innerText = maintenance.descripcion || 'No definido';
    
        document.getElementById("maintenanceModal").style.display = "block";
    };
    
    // Cerrar el modal
    const closeMaintenanceModal = () => {
        document.getElementById("maintenanceModal").style.display = "none";
    };

    // Escuchar el evento de clic en el botón de cerrar
    document.getElementById("closeMaintenanceModal").onclick = closeMaintenanceModal;

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.onclick = (event) => {
        const maintenanceModal = document.getElementById("maintenanceModal");
        if (event.target === maintenanceModal) {
            closeMaintenanceModal();
        }
    };

    // Eliminar mantenimiento
    const deleteMaintenance = () => {
        const maintenances = loadMaintenances();
        const updatedMaintenances = maintenances.filter((_, index) => index !== currentMaintenanceId);
        localStorage.setItem('maintenances', JSON.stringify(updatedMaintenances));

        // Buscar y eliminar el evento en el calendario
        const event = calendar.getEventById(String(currentMaintenanceId));
        if (event) {
            event.remove();
        }

        closeMaintenanceModal(); // Cerrar el modal después de eliminar
    };

    // Asignar la función al botón de eliminar
    document.getElementById("deleteMaintenanceBtn").onclick = deleteMaintenance;
});