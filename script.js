// Recorrer todos los elementos que son dragables
let elementoSeleccionado = null;

function update_draggables() {
    let elementos = document.querySelectorAll(".caja");

    elementos.forEach(elemento => {
        elemento.addEventListener("dragstart", () => {
            elementoSeleccionado = elemento;
            console.log("Moviendo " + elementoSeleccionado.textContent);
        });
        elemento.addEventListener("dragend", () => {
            elementoSeleccionado = null;
            console.log("Ya no hay elemento seleccionado");
        });
    });
}

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", (event) => {
    const target = event.target;
    // Controlar que las cajas no se sobrepongan y puedan ordenarse
    if (target.classList.contains("colum")) {
        if (elementoSeleccionado) {
            target.appendChild(elementoSeleccionado);
        }
    } else if (target.classList.contains("caja")) {
        if (elementoSeleccionado) {
            target.parentNode.insertBefore(elementoSeleccionado, target.nextSibling);
        }
    }
});

const primera_columna = document.querySelector(".todo");

document.getElementById("addbox").addEventListener("click", () => {
    let nombre_caja = window.prompt("Introduce una tarea");

    // Controlar que no se introduzca una cadena vacia
    // he añadido trim para evitar que se introduzcan cadenas que comiencen por espacios vacios
    while (nombre_caja.trim() === "") {
        nombre_caja = window.prompt("ERROR! La tarea debe contener caracteres");
    }
    let caja = document.createElement("div");
    caja.textContent = nombre_caja;
    caja.classList.add("caja");
    caja.draggable = true;
    primera_columna.appendChild(caja);
    caja.style.backgroundColor = color_random();
    update_draggables();
});

// Función para calcular el color
function color_random() {
    let colores = ["green", "red", "blue", "yellow", "brown"];
    let indice_color = Math.floor(Math.random() * colores.length);
    return colores[indice_color];
}

// Función para buscar entre las cajas (hecha de forma similar al ejemplo de ajax)
function buscar() {
    // Obtener el valor del input de búsqueda
    var input = document.getElementById('cajaBuscar').value.toLowerCase();

    // Obtener la lista de elementos caja
    var cajas = document.querySelectorAll('.caja');

    // Iterar sobre los elementos caja
    cajas.forEach(function (caja) {
        var text = caja.textContent.toLowerCase(); // Obtener el texto de cada caja en minúsculas
        // Mostrar u ocultar cajas según la coincidencia de búsqueda
        if (text.indexOf(input) > -1) {
            caja.style.display = '';
        } else {
            caja.style.display = 'none';
        }
    });
}
