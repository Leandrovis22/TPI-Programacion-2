// Variables globales del juego
let cartas = [];
let cartasVisibles = [];
let paresEncontrados = [];
let intentos = 0;
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨'];

// Función para cargar el estado desde localStorage
function cargarEstado() {
    const estadoGuardado = JSON.parse(localStorage.getItem('juegoMemoria'));
    
    if (estadoGuardado && estadoGuardado.cartas.length > 0) {
        // Restaurar estado guardado
        cartas = estadoGuardado.cartas;
        paresEncontrados = estadoGuardado.paresEncontrados;
        intentos = estadoGuardado.intentos;
        cartasVisibles = []; // Siempre empezar sin cartas visibles
    } else {
        // Iniciar nuevo juego
        iniciarJuego();
    }
    
    actualizarInterfaz();
    renderizarCartas();
}

// Función para guardar el estado en localStorage
function guardarEstado() {
    const estado = {
        cartas: cartas,
        paresEncontrados: paresEncontrados,
        intentos: intentos
    };
    localStorage.setItem('juegoMemoria', JSON.stringify(estado));
}

function iniciarJuego() {
    // Resetear estado
    cartasVisibles = [];
    paresEncontrados = [];
    intentos = 0;
    
    // Mezclar emojis
    cartas = emojis
        .map(emoji => ({ emoji: emoji, visible: false, encontrada: false }))
        .sort(() => 0.5 - Math.random());
    
    actualizarInterfaz();
    renderizarCartas();
    guardarEstado();
}

function renderizarCartas() {
    const gridCartas = document.getElementById('gridCartas');
    if (!gridCartas) return;
    
    gridCartas.innerHTML = '';
    
    cartas.forEach((carta, indice) => {
        const elementoCarta = document.createElement('div');
        elementoCarta.className = 'carta';
        elementoCarta.dataset.indice = indice;
        
        if (carta.visible || carta.encontrada) {
            elementoCarta.textContent = carta.emoji;
            elementoCarta.classList.add('visible');
            if (carta.encontrada) {
                elementoCarta.classList.add('encontrada');
            }
        } else {
            elementoCarta.textContent = '?';
        }
        
        elementoCarta.addEventListener('click', () => mostrarCarta(indice));
        gridCartas.appendChild(elementoCarta);
    });
}

async function mostrarCarta(indice) {
    // Evitar acciones no válidas
    if (
        cartasVisibles.length === 2 ||
        cartas[indice].encontrada ||
        cartasVisibles.includes(indice)
    ) {
        return;
    }

    // Mostrar carta
    cartas[indice].visible = true;
    cartasVisibles.push(indice);
    renderizarCartas();

    // Lógica cuando se seleccionan dos cartas
    if (cartasVisibles.length === 2) {
        intentos++;
        actualizarInterfaz();
        
        const primerIndice = cartasVisibles[0];
        const segundoIndice = cartasVisibles[1];

        // Verificar si coinciden
        if (cartas[primerIndice].emoji === cartas[segundoIndice].emoji) {
            // Par encontrado
            cartas[primerIndice].encontrada = true;
            cartas[segundoIndice].encontrada = true;
            paresEncontrados.push(primerIndice, segundoIndice);
            cartasVisibles = [];
            
            guardarEstado(); // Guardar después de encontrar un par
            actualizarInterfaz();
            renderizarCartas();

            // Verificar si el juego terminó
            if (paresEncontrados.length === cartas.length) {
                setTimeout(() => {
                    alert(`¡Felicidades! Completaste el juego en ${intentos} intentos.`);
                }, 500);
            }
        } else {
            // No coinciden, esperar y ocultar
            await new Promise(resolve => setTimeout(resolve, 1000));
            cartas[primerIndice].visible = false;
            cartas[segundoIndice].visible = false;
            cartasVisibles = [];
            guardarEstado(); // Guardar después de un intento fallido
            renderizarCartas();
        }
    }
}

function actualizarInterfaz() {
    const elementoIntentos = document.getElementById('intentos');
    const elementoPares = document.getElementById('paresEncontrados');
    
    if (elementoIntentos) {
        elementoIntentos.textContent = intentos;
    }
    
    if (elementoPares) {
        elementoPares.textContent = paresEncontrados.length / 2;
    }
}

function inicializarJuegoMemoria() {
    // Solo inicializar si estamos en la sección de memoria
    if (document.getElementById('seccionMemoria')) {
        cargarEstado();
        
        // Agregar event listener al botón reiniciar
        const btnReiniciar = document.getElementById('reiniciarJuego');
        if (btnReiniciar) {
            btnReiniciar.addEventListener('click', () => iniciarJuego());
        }
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarJuegoMemoria();
});