// Carlos Rondón Pérez / RA1, Actividad 3: Lista de tareas interactiva.

// Bloque de declaraciones
const tareas = [];
const agregarBoton = document.getElementById("agregar");
const nuevaTarea = document.getElementById("nuevaTarea");
const listaTareas = document.getElementById("listaTareas");

// Función para iniciar los eventos
function iniciarEventos() {
  agregarBoton.addEventListener("click", agregarTarea);
  nuevaTarea.addEventListener("change", agregarTarea);
}

// Función para agregar una nueva tarea
function agregarTarea() {
  const tarea = obtenerTarea();
  if (tarea) {
    const nuevaTarea = crearTarea(tarea);
    tareas.push(nuevaTarea);
    actualizarLista();
    limpiarEntrada();
  }
}

// Función para obtener el valor de la nueva tarea
function obtenerTarea() {
  return nuevaTarea.value.trim();
}

// Función para crear un objeto tarea
function crearTarea(nombre) {
  return { nombre: nombre, completada: false };
}

// Función para limpiar la entrada de datos
function limpiarEntrada() {
  nuevaTarea.value = "";
}

// Función para actualizar la lista de tareas
function actualizarLista() {
    listaTareas.innerHTML = "";
    for (let index = 0; index < tareas.length; index++) {
      listaTareas.appendChild(crearElementoTarea(tareas[index], index));
    }
  }
  

// Función para crear la tarea en la lista
function crearElementoTarea(tarea, index) {
  const li = document.createElement("li");

  const textoTarea = document.createElement("span");
  textoTarea.className = "textoTarea";
  if (tarea.completada) {
    textoTarea.classList.add("completada");
  }
  textoTarea.textContent = tarea.nombre;

  const botonesTarea = document.createElement("div");
  botonesTarea.className = "botonesTarea";
  const botonCompletar = crearBotonCompletar(index);
  const botonEliminar = crearBotonEliminar(index);
  botonesTarea.appendChild(botonCompletar);
  botonesTarea.appendChild(botonEliminar);

  li.appendChild(textoTarea);
  li.appendChild(botonesTarea);

  return li;
}

// Función para crear el botón de cambio de estado de la tarea
function crearBotonCompletar(index) {
    const boton = document.createElement("button");
  
    // Asignar el texto del botón usando if...else
    if (tareas[index].completada) {
      boton.textContent = "Desmarcar como completada";
    } else {
      boton.textContent = "Marcar como completada";
    }
  
    boton.setAttribute("class", "botonCompletar");
    boton.onclick = function() {
      cambiarEstado(index);
    };
  
    return boton;
  }
  

// Función para crear el botón de eliminar tarea
function crearBotonEliminar(index) {
    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.setAttribute("class", "botonEliminar");
    boton.onclick = function() {
      marcarEliminado(index);
    };
  
    return boton;
  }
  

// Función para cambiar el estado de una tarea
function cambiarEstado(index) {
  tareas[index].completada = !tareas[index].completada;
  actualizarLista();
}

// Función para eliminar una tarea
function marcarEliminado(index) {
  tareas.splice(index, 1);
  actualizarLista();
}

// Inicializar eventos
iniciarEventos();
