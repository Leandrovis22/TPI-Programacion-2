document.addEventListener('DOMContentLoaded', () => {
    // Elementos de navegación
    const btnListaTareas = document.getElementById('btnListaTareas');
    const btnMemoria = document.getElementById('btnMemoria');
    const seccionTareas = document.getElementById('seccionTareas');
    const seccionMemoria = document.getElementById('seccionMemoria');

    // Función para cambiar de sección
    function mostrarSeccion(seccionActiva, botonActivo) {
        // Ocultar todas las secciones
        document.querySelectorAll('.seccion').forEach(seccion => {
            seccion.classList.remove('activo');
        });
        
        // Remover clase activo de todos los botones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('activo');
        });
        
        // Mostrar sección seleccionada
        seccionActiva.classList.add('activo');
        botonActivo.classList.add('activo');
    }

    // Event listeners para los botones de navegación
    btnListaTareas.addEventListener('click', () => {
        mostrarSeccion(seccionTareas, btnListaTareas);
    });

    btnMemoria.addEventListener('click', () => {
        mostrarSeccion(seccionMemoria, btnMemoria);
        
        // Reinicializar el juego de memoria si es necesario
        setTimeout(() => {
            inicializarJuegoMemoria();
        }, 100);
    });

    // Inicializar mostrando la sección de tareas por defecto
    mostrarSeccion(seccionTareas, btnListaTareas);
});