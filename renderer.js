document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del DOM
    const entradaTarea = document.getElementById('entradaTarea');
    const botonAñadirTarea = document.getElementById('añadirTarea');
    const listaTareas = document.getElementById('listaTareas');

    // Elementos de la ventana emergente de edición
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    const cerrarVentanaEmergente = document.getElementById('cerrarVentanaEmergente');
    const entradaEditarTarea = document.getElementById('entradaEditarTarea');
    const botonGuardarEdicion = document.getElementById('guardarEdicion');

    // Inicializamos la variable tareaActual como nulo
    let tareaActual = null;

    // Función para cargar las tareas desde localStorage
    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.forEach(tarea => {
            const li = crearElementoTarea(tarea.texto);
            if (tarea.completada) {
                li.querySelector('.tarea').classList.add('completada');
            }
            listaTareas.appendChild(li);
        });
    }

    // Se ejecuta cargar las tareas guardadas al iniciar
    cargarTareas();

    // Añadir tarea con el botón
    botonAñadirTarea.addEventListener('click', añadirTarea);

    // Añadir tarea al presionar "Enter"
    entradaTarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            añadirTarea();
        }
    });

    // Función para guardar las tareas en localStorage
    function guardarTareas() {
        const tareas = [];
        listaTareas.querySelectorAll('li').forEach(li => {
            tareas.push({
                texto: li.querySelector('.tarea').textContent,
                completada: li.querySelector('.tarea').classList.contains('completada')
            });
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Función para añadir una nueva tarea
    function añadirTarea() {
        const textoTarea = entradaTarea.value.trim();
        if (textoTarea) {
            const li = crearElementoTarea(textoTarea);
            listaTareas.appendChild(li);
            guardarTareas();
            entradaTarea.value = '';
        }
    }

    // Función para crear un nuevo elemento de tarea
    function crearElementoTarea(textoTarea) {
        const li = document.createElement('li');
        li.innerHTML =
            `<span class="tarea">${textoTarea}</span>
            <div>
                <button class="editar">Editar</button>
                <button class="completado">Completado</button>
                <button class="eliminar">Eliminar</button>
            </div>`;

        // Agregar funcionalidades a los botones
        li.querySelector('.eliminar').addEventListener('click', () => {
            li.remove();
            guardarTareas();
        });

        li.querySelector('.completado').addEventListener('click', () => {
            li.querySelector('.tarea').classList.toggle('completada');
            guardarTareas();
        });

        li.querySelector('.editar').addEventListener('click', () => {
            tareaActual = li.querySelector('.tarea');
            entradaEditarTarea.value = tareaActual.textContent; // Cargar el texto de la tarea actual en el campo de entrada
            ventanaEmergente.style.display = 'block'; // Mostrar ventana emergente
        });

        return li;
    }

    // Guardar los cambios en la tarea editada
    botonGuardarEdicion.addEventListener('click', () => {
        if (tareaActual && entradaEditarTarea.value.trim()) {
            tareaActual.textContent = entradaEditarTarea.value.trim();
            guardarTareas();
            ventanaEmergente.style.display = 'none'; // Ocultar ventana emergente
        }
    });

    // Cerrar la ventana emergente al hacer clic en la "X"
    cerrarVentanaEmergente.addEventListener('click', () => {
        ventanaEmergente.style.display = 'none';
    });

    // Cerrar la ventana emergente si se hace clic afuera
    window.addEventListener('click', (e) => {
        if (e.target === ventanaEmergente) {
            ventanaEmergente.style.display = 'none';
        }
    });
});
