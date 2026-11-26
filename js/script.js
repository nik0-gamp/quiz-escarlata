
// Preguntas del concurso
let preguntas = [
    {
        pregunta: "¿En qué año fue fundado oficialmente el América de Cali?",
        respuestas: ["1918", "1927", "1931", "1948"],
        correcta: 1
    },
    {
        pregunta: "¿Qué día se celebra la fundación del América de Cali?",
        respuestas: ["13 de febrero", "21 de diciembre", "15 de agosto", "29 de septiembre"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál era el apodo de Benjamín Urrea, uno de los fundadores del América?",
        respuestas: ["Garabato", "El Tigre", "El Maestro", "El Diablo"],
        correcta: 0
    },
    {
        pregunta: "¿En qué año consiguió América su primer título del fútbol profesional colombiano?",
        respuestas: ["1975", "1979", "1982", "1985"],
        correcta: 1
    },
    {
        pregunta: "¿Cómo se conoce popularmente al América por sus colores?",
        respuestas: ["Los Leones", "Los Embajadores", "Los Diablos Rojos", "Los Azucareros"],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se llamó uno de los primeros colectivos de hinchas que antecedieron al Barón Rojo Sur?",
        respuestas: ["Furia Roja", "La Guardia Roja", "Los Escarlatas", "Comando Rojo"],
        correcta: 0
    },
    {
        pregunta: "¿En qué año se consolidó el Barón Rojo Sur con su nombre actual?",
        respuestas: ["1991", "1994", "1997", "2003"],
        correcta: 2
    },
    {
        pregunta: "¿En qué estadio juega como local el América de Cali?",
        respuestas: ["El Campín", "Pascual Guerrero", "Atanasio Girardot", "Metropolitano"],
        correcta: 1
    },
    {
        pregunta: "¿En qué tribuna se ubica tradicionalmente el Barón Rojo Sur?",
        respuestas: ["Norte", "Oriental", "Occidental", "Sur"],
        correcta: 3
    },
    {
        pregunta: "¿Qué elementos hacen parte de las expresiones tradicionales de una barra popular?",
        respuestas: [
            "Banderas, cantos y viajes",
            "Balones y uniformes de árbitros",
            "Trofeos y medallas",
            "Silbatos y tarjetas"
        ],
        correcta: 0
    }
];

// Variables del concurso
let posicion = 0;
let puntaje = 0;
let tiempo = 60;
let temporizador;
let respondida = false;
let resultados = [];

// Obtener elementos del HTML
let inicio = document.getElementById("inicio");
let concurso = document.getElementById("concurso");
let final = document.getElementById("final");

let botonIniciar = document.getElementById("iniciar");
let botonSiguiente = document.getElementById("siguiente");
let botonReiniciar = document.getElementById("reiniciar");

let numeroPregunta = document.getElementById("numeroPregunta");
let puntajeTexto = document.getElementById("puntaje");
let pregunta = document.getElementById("pregunta");
let respuestas = document.getElementById("respuestas");
let mensaje = document.getElementById("mensaje");
let temporizadorTexto = document.getElementById("temporizador");

let resultadoFinal = document.getElementById("resultadoFinal");
let listaResultados = document.getElementById("listaResultados");

// Iniciar el concurso
botonIniciar.addEventListener("click", function() {

    inicio.style.display = "none";
    concurso.style.display = "block";

    mostrarPregunta();

});

// Mostrar las preguntas
function mostrarPregunta() {

    respondida = false;

    botonSiguiente.disabled = true;

    mensaje.textContent = "";

    respuestas.innerHTML = "";

    numeroPregunta.textContent = "Pregunta " + (posicion + 1) + " de " + preguntas.length;

    puntajeTexto.textContent = "Puntaje: " + puntaje;

    pregunta.textContent = preguntas[posicion].pregunta;

    // Crear los botones de respuestas
    for (let i = 0; i < preguntas[posicion].respuestas.length; i++) {

        let boton = document.createElement("button");

        boton.textContent = preguntas[posicion].respuestas[i];

        boton.addEventListener("click", function() {
            comprobarRespuesta(i);
        });

        respuestas.appendChild(boton);

    }

    iniciarTemporizador();

}

// Comprobar la respuesta seleccionada
function comprobarRespuesta(seleccion) {

    if (respondida === true) {
        return;
    }

    respondida = true;

    clearInterval(temporizador);

    let correcta = preguntas[posicion].correcta;

    let botones = respuestas.querySelectorAll("button");

    for (let i = 0; i < botones.length; i++) {

        botones[i].disabled = true;

        if (i === correcta) {
            botones[i].classList.add("correcta");
        }

        if (i === seleccion && seleccion !== correcta) {
            botones[i].classList.add("incorrecta");
        }

    }

    if (seleccion === correcta) {

        puntaje++;

        mensaje.textContent = "¡Correcto! ¡Vamos América!";

        resultados.push({
            pregunta: preguntas[posicion].pregunta,
            respuesta: preguntas[posicion].respuestas[seleccion],
            correcta: true
        });

    } else {

        mensaje.textContent = "Incorrecto. La respuesta era: " + preguntas[posicion].respuestas[correcta];

        resultados.push({
            pregunta: preguntas[posicion].pregunta,
            respuesta: preguntas[posicion].respuestas[seleccion],
            correcta: false
        });

    }

    puntajeTexto.textContent = "Puntaje: " + puntaje;

    botonSiguiente.disabled = false;

}

// Iniciar el temporizador
function iniciarTemporizador() {

    clearInterval(temporizador);

    tiempo = 60;

    temporizadorTexto.textContent = tiempo;

    temporizador = setInterval(function() {

        tiempo--;

        temporizadorTexto.textContent = tiempo;

        if (tiempo === 0) {

            clearInterval(temporizador);

            tiempoAgotado();

        }

    }, 1000);

}

// Cuando se acaba el tiempo
function tiempoAgotado() {

    if (respondida === true) {
        return;
    }

    respondida = true;

    puntaje--;

    let correcta = preguntas[posicion].correcta;

    let botones = respuestas.querySelectorAll("button");

    for (let i = 0; i < botones.length; i++) {

        botones[i].disabled = true;

        if (i === correcta) {
            botones[i].classList.add("correcta");
        }

    }

    mensaje.textContent = "¡Tiempo agotado! La respuesta era: " + preguntas[posicion].respuestas[correcta];

    resultados.push({
        pregunta: preguntas[posicion].pregunta,
        respuesta: "Sin responder",
        correcta: false
    });

    puntajeTexto.textContent = "Puntaje: " + puntaje;

    botonSiguiente.disabled = false;

    // Pasar automáticamente a la siguiente pregunta
    setTimeout(function() {
        avanzarPregunta();
    }, 2000);

}

// Pasar a la siguiente pregunta
botonSiguiente.addEventListener("click", function() {

    avanzarPregunta();

});

function avanzarPregunta() {

    clearInterval(temporizador);

    if (posicion < preguntas.length - 1) {

        posicion++;

        mostrarPregunta();

    } else {

        finalizarConcurso();

    }

}

// Mostrar los resultados finales
function finalizarConcurso() {

    clearInterval(temporizador);

    concurso.style.display = "none";

    final.style.display = "block";

    resultadoFinal.textContent = "Tu puntaje final es: " + puntaje + " de " + preguntas.length;

    listaResultados.innerHTML = "";

    for (let i = 0; i < resultados.length; i++) {

        let resultado = document.createElement("div");

        resultado.classList.add("resultadoPregunta");

        if (resultados[i].correcta === true) {

            resultado.textContent = (i + 1) + ". " + resultados[i].pregunta + " - Correcto";

        } else {

            resultado.textContent = (i + 1) + ". " + resultados[i].pregunta + " - Incorrecto. Tu respuesta: " + resultados[i].respuesta + ". Respuesta correcta: " + preguntas[i].respuestas[preguntas[i].correcta];

        }

        listaResultados.appendChild(resultado);

    }

}

// Reiniciar el concurso
botonReiniciar.addEventListener("click", function() {

    clearInterval(temporizador);

    posicion = 0;

    puntaje = 0;

    tiempo = 60;

    resultados = [];

    final.style.display = "none";

    inicio.style.display = "block";

});
