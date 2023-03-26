//obtiene la fecha actualizada y se muestra en el footer
let fechaActualizada = new Date();
let dia = fechaActualizada.getDate();
let mes = fechaActualizada.getMonth() + 1;
let año = fechaActualizada.getFullYear();
let fechaString = `${dia}/${mes}/${año}`;
document.getElementById("fecha-actualizada").textContent = fechaString;

// Obtiene los elementos del DOM
const formulario = document.getElementById("formulario");
const idInput = document.getElementById("idInput");
const nombreInput = document.getElementById("nombreInput");
const descripcionInput = document.getElementById("descripcionInput");
const tablaProductos = document.getElementById("tablaProductos");

// Obtener los datos del LocalStorage
const productos = JSON.parse(localStorage.getItem("productos")) || [];

// Función para renderizar la tabla de productos
function renderizarTabla() {
  tablaProductos.innerHTML = "";
  productos.forEach(function (producto) {
    tablaProductos.innerHTML += `
      <tr>
        <td>${producto.ID}</td>
        <td>${producto.Nombre}</td>
        <td>${producto.Descripcion}</td>
        <td>
          <button onclick="editarProducto(${producto.ID})">Editar</button>
          <button onclick="eliminarProducto(${producto.ID})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Función para agregar un nuevo producto
function agregarProducto(e) {
  e.preventDefault();

  // Obtiene los valores del formulario

  const id = idInput.value;
  const nombre = nombreInput.value;
  const descripcion = descripcionInput.value;

  // Crea el objeto del producto
  const producto = {
    ID: id,
    Nombre: nombre,
    Descripcion: descripcion,
  };

  // Agrega el producto al arreglo de productos
  productos.push(producto);

  // Guarda los productos en LocalStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Renderiza la tabla de productos
  renderizarTabla();

  // Limpia los campos del formulario
  idInput.value = "";
  nombreInput.value = "";
  descripcionInput.value = "";
}

// Función para editar un producto existente
function editarProducto(id) {
  // Busca el producto por ID
  const producto = productos.find(function (p) {
    return p.ID == id;
  });

  // Setea los valores del producto en el formulario
  idInput.value = producto.ID;
  nombreInput.value = producto.Nombre;
  descripcionInput.value = producto.Descripcion;

  // Elimina el producto del arreglo de productos
  productos.splice(productos.indexOf(producto), 1);

  // Guarda los productos en LocalStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Renderiza la tabla de productos
  renderizarTabla();
}

// Función para eliminar un producto existente
function eliminarProducto(id) {
  // Busca el producto por ID
  const producto = productos.find(function (p) {
    return p.ID == id;
  });

  // Elimina el producto del arreglo de productos
  productos.splice(productos.indexOf(producto), 1);

  // Guarda los productos en LocalStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Renderiza la tabla de productos
  renderizarTabla();
}

// Event listener para agregar producto al formulario
formulario.addEventListener("submit", agregarProducto);

// Renderiza la tabla de productos al cargar la página
renderizarTabla();
