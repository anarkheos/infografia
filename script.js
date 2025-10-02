document.addEventListener('DOMContentLoaded', function() {

    // Seleccionamos todos los elementos necesarios
    const actors = document.querySelectorAll('.actor');
    const conflictPoints = document.querySelectorAll('.conflict-point');
    
    // Variable para rastrear el actor activo
    let activeActor = null;

    // Añadimos un evento de clic a cada actor
    actors.forEach(actor => {
        actor.addEventListener('click', () => {
            const selectedActorId = actor.id.replace('actor-', '');

            // Si se hace clic en el actor ya activo, se desactiva todo
            if (actor.classList.contains('active')) {
                actor.classList.remove('active');
                activeActor = null;
                resetConflicts();
            } else {
                // Quitar la clase 'active' de cualquier otro actor
                actors.forEach(a => a.classList.remove('active'));
                
                // Añadir 'active' al actor seleccionado
                actor.classList.add('active');
                activeActor = selectedActorId;
                
                // Filtrar y resaltar los conflictos
                filterConflicts(activeActor);
            }
        });
    });

    /**
     * Filtra los puntos de conflicto en la línea de tiempo.
     * Los puntos no relacionados se atenúan, y los relacionados se resaltan.
     * @param {string} actorId - El ID del actor seleccionado (ej: 'operador').
     */
    function filterConflicts(actorId) {
        conflictPoints.forEach(point => {
            // El atributo 'data-actor' en el HTML contiene el actor relacionado
            const pointActor = point.dataset.actor;

            if (pointActor === actorId) {
                point.classList.remove('dimmed');
                point.classList.add('highlight');
            } else {
                point.classList.remove('highlight');
                point.classList.add('dimmed');
            }
        });
    }

    /**
     * Restablece la visualización de los conflictos, eliminando
     * cualquier filtro o resaltado.
     */
    function resetConflicts() {
        conflictPoints.forEach(point => {
            point.classList.remove('dimmed');
            point.classList.remove('highlight');
        });
    }

});
