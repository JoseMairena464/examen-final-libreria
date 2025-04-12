const readlineSync = require("readline-sync");
const fs = require("fs");

let catalogo = [];

function agregarLibro() {
    const titulo = readlineSync.question("Ingrese el título del libro: ");
    const autor = readlineSync.question("Ingrese el autor: ");
    let precio;
    do {
        precio = parseFloat(readlineSync.question("Ingrese el precio: "));
        if (isNaN(precio) || precio <= 0) console.log("Precio inválido.");
    } while (isNaN(precio) || precio <= 0);
    const anio = parseInt(readlineSync.question("Ingrese el año de publicación: "));
    
    catalogo.push({ titulo, autor, precio, anio });
    console.log(" Libro agregado correctamente.");
}

function mostrarCatalogo() {
    console.log("\n Catálogo de libros:");
    catalogo.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} ($${libro.precio}) - Año: ${libro.anio}`);
    });
}

function buscarLibro() {
    const titulo = readlineSync.question("Ingrese el título a buscar: ");
    const libro = catalogo.find(lib => lib.titulo.toLowerCase() === titulo.toLowerCase());
    libro ? console.log(libro) : console.log(" Libro no encontrado.");
}

function eliminarLibro() {
    const titulo = readlineSync.question("Ingrese el título del libro a eliminar: ");
    const index = catalogo.findIndex(lib => lib.titulo.toLowerCase() === titulo.toLowerCase());
    if (index !== -1) {
        catalogo.splice(index, 1);
        console.log(" Libro eliminado correctamente.");
    } else {
        console.log(" Libro no encontrado.");
    }
}

function verEstadisticas() {
    if (catalogo.length === 0) return console.log("No hay libros registrados.");
    const totalLibros = catalogo.length;
    const precioPromedio = catalogo.reduce((acc, lib) => acc + lib.precio, 0) / totalLibros;
    const libroMasAntiguo = catalogo.reduce((antiguo, lib) => lib.anio < antiguo.anio ? lib : antiguo);
    const libroMasCaro = catalogo.reduce((caro, lib) => lib.precio > caro.precio ? lib : caro);

    console.log("\n Estadísticas:");
    console.log(`Total de libros: ${totalLibros}`);
    console.log(`Precio promedio: $${precioPromedio.toFixed(2)}`);
    console.log(`Libro más antiguo: ${libroMasAntiguo.titulo} (${libroMasAntiguo.anio})`);
    console.log(`Libro más caro: ${libroMasCaro.titulo} ($${libroMasCaro.precio})`);
}

function ordenarLibros() {
    console.log("\nSeleccione el criterio de ordenación:");
    console.log("1. Precio ascendente");
    console.log("2. Precio descendente");
    console.log("3. Año de publicación");

    const opcion = readlineSync.questionInt("Ingrese opción: ");
    if (opcion === 1) {
        catalogo.sort((a, b) => a.precio - b.precio);
    } else if (opcion === 2) {
        catalogo.sort((a, b) => b.precio - a.precio);
    } else if (opcion === 3) {
        catalogo.sort((a, b) => a.anio - b.anio);
    } else {
        console.log(" Opción inválida.");
    }
    console.log(" Catálogo ordenado correctamente.");
}

function editarLibro() {
    const titulo = readlineSync.question("Ingrese el título del libro a editar: ");
    const libro = catalogo.find(lib => lib.titulo.toLowerCase() === titulo.toLowerCase());

    if (!libro) return console.log(" Libro no encontrado.");

    libro.titulo = readlineSync.question(`Nuevo título (${libro.titulo}): `) || libro.titulo;
    libro.autor = readlineSync.question(`Nuevo autor (${libro.autor}): `) || libro.autor;
    let nuevoPrecio;
    do {
        nuevoPrecio = parseFloat(readlineSync.question(`Nuevo precio (${libro.precio}): `));
        if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) console.log("Precio inválido.");
    } while (isNaN(nuevoPrecio) || nuevoPrecio <= 0);
    libro.precio = nuevoPrecio;
    libro.anio = parseInt(readlineSync.question(`Nuevo año (${libro.anio}): `)) || libro.anio;

    console.log(" Libro actualizado correctamente.");
}

function guardarCatalogo() {
    fs.writeFileSync("catalogo.json", JSON.stringify(catalogo, null, 2));
    console.log(" Catálogo guardado correctamente.");
}

function iniciarSistema() {
    let opcion;
    do {
        console.log("\n Menú Principal:");
        console.log("1. Agregar libro");
        console.log("2. Mostrar catálogo");
        console.log("3. Buscar libro por título");
        console.log("4. Eliminar libro");
        console.log("5. Ver estadísticas");
        console.log("6. Ordenar libros");
        console.log("7. Editar libro");
        console.log("8. Guardar catálogo");
        console.log("9. Salir");
        
        opcion = readlineSync.questionInt("Seleccione una opción: ");
        
        if (opcion === 1) {
            agregarLibro();
        } else if (opcion === 2) {
            mostrarCatalogo();
        } else if (opcion === 3) {
            buscarLibro();
        } else if (opcion === 4) {
            eliminarLibro();
        } else if (opcion === 5) {
            verEstadisticas();
        } else if (opcion === 6) {
            ordenarLibros();
        } else if (opcion === 7) {
            editarLibro();
        } else if (opcion === 8) {
            guardarCatalogo();
        } else if (opcion === 9) {
            console.log(" Saliendo...");
        } else {
            console.log(" Opción inválida.");
        }
    } while (opcion !== 9);
}

iniciarSistema();
