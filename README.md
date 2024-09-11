Aplicación de Lista de Tareas

Esta es una aplicación de gestión de tareas (Todo List) construida utilizando Electron JS. 
Permite agregar, editar, marcar como completada y eliminar tareas, tiene almacenamiento persistente utilizando localStorage.

Características

Añadir nuevas tareas.
Marcar tareas como completadas.
Editar el contenido de una tarea.
Eliminar tareas.
Almacenamiento de tareas en localStorage para persistencia de datos.

Instalación

Clona este repositorio:

git clone https://github.com/Leandrovis22/TPI-Programacion-2.git

Navega al directorio del proyecto:

cd TPI-Programacion-2

Instala las dependencias:

npm install

Ejecuta la aplicación:

npm start

Archivos principales:

index.html: Estructura principal de la interfaz de usuario.
styles.css: Estilos de la aplicación.
main.js: Archivo principal de Electron que crea y gestiona la ventana de la aplicación.
renderer.js: Archivo que maneja la lógica de la interfaz de usuario, interacción con las tareas y manipulación del DOM.

Uso:

Al iniciar la aplicación, se verá una lista vacía de tareas.
Añadí una nueva tarea escribiendo en el campo de entrada y dale click al botón "Añadir".
Las tareas se pueden marcar como completadas, editar o eliminar.
Las tareas se guardan automáticamente sin importar la forma de cierre y se restauran cuando se vuelva a abrir la aplicación.
