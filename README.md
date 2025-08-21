# Aplicación de Lista de Tareas y Juego de Memoria

Esta es una aplicación construida utilizando Electron JS que combina gestión de tareas con un juego de memoria. Desarrollada para el TPI Programación II TSDS.

La aplicación incluye una lista de tareas con almacenamiento persistente y un juego de memoria con emojis que también conserva el progreso entre sesiones.

## Características

### Lista de Tareas
- Añadir nuevas tareas
- Marcar tareas como completadas
- Editar el contenido de una tarea
- Eliminar tareas
- Almacenamiento persistente usando localStorage

### Juego de Memoria
- Juego de memoria con 18 cartas (9 pares de emojis)
- Contador de intentos y pares encontrados
- Persistencia del progreso del juego
- Función de reiniciar juego

### Navegación
- Navegación entre secciones mediante pestañas
- El progreso se mantiene al cambiar entre secciones
- Interfaz intuitiva y responsive

## Instalación

Clona este repositorio:

```bash 
git clone https://github.com/Leandrovis22/TPI-Programacion-2.git
```

Navega al directorio del proyecto:

```bash
cd TPI-Programacion-2
```

Instala las dependencias:

```bash
npm install
```

Ejecuta la aplicación:

```bash
npm start
```

## Archivos principales

### Estructura HTML y CSS
- **index.html**: Estructura principal con navegación y ambas secciones
- **styles.css**: Estilos para toda la aplicación

### JavaScript - Electron
- **main.js**: Archivo principal de Electron que crea y gestiona la ventana

### JavaScript - Funcionalidad
- **renderer.js**: Maneja la lógica de la lista de tareas y localStorage
- **memoria.js**: Controla el juego de memoria y su persistencia
- **navegacion.js**: Gestiona el cambio entre secciones

## Uso

### Lista de Tareas
1. Al iniciar, la aplicación muestra la sección de tareas por defecto
2. Añade tareas escribiendo en el campo de entrada y presiona "Añadir" o Enter
3. Usa los botones "Completado", "Editar" o "Eliminar" para gestionar las tareas
4. Las tareas se guardan automáticamente y se restauran al reiniciar

### Juego de Memoria
1. Navega a la sección "Memoria" usando el botón superior
2. Haz clic en las cartas para revelar los emojis
3. Encuentra todos los pares para completar el juego
4. El progreso se guarda automáticamente, incluso al cambiar de sección
5. Usa "Reiniciar" para comenzar un nuevo juego

## Persistencia de Datos

La aplicación utiliza localStorage para mantener:
- **Lista de tareas**: Estado completo de todas las tareas
- **Juego de memoria**: Progreso actual, cartas encontradas e intentos
- Los datos se conservan al cerrar la aplicación o cambiar entre secciones

## Tecnologías Utilizadas

- **Electron JS**: Framework para aplicaciones de escritorio
- **HTML5/CSS3**: Estructura y estilos
- **JavaScript ES6+**: Lógica de la aplicación
- **localStorage**: Almacenamiento persistente local