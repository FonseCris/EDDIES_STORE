const carouselTrack = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
let index = 0;

function moveCarousel() {
    const imageWidth = images[0].clientWidth || carouselTrack.offsetWidth; // Fallback
    index = (index + 1) % images.length; 
    const newPosition = -index * imageWidth; 
    carouselTrack.style.transform = `translateX(${newPosition}px)`; 
}

setInterval(moveCarousel, 3000);

/* Js.seccion categorias*/
const abrirCarrito = document.getElementById('abrir-carrito');

abrirCarrito.addEventListener('click', (e) => {
    e.preventDefault(); // Previene la acción predeterminada del enlace
    carritoModal.style.display = 'flex'; // Muestra el modal del carrito
});
app.use(express.static('public'));
// Filtrar productos por categoría seleccionada
document.querySelectorAll("#filtros ul li").forEach(categoria => {
    categoria.addEventListener("click", () => {
        // Obtener la categoría seleccionada
        const categoriaSeleccionada = categoria.textContent.trim();

        // Filtrar productos
        document.querySelectorAll("#productos .producto").forEach(producto => {
            const categoriaProducto = producto.getAttribute("data-categoria");
            producto.style.display = (categoriaProducto === categoriaSeleccionada) ? "block" : "none";
        });
    });
});


// Variables globales
const botonesCarrito = document.querySelectorAll('.btn-carrito');
const carritoModal = document.getElementById('carrito-modal');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
let carrito = [];

// Agregar productos al carrito
botonesCarrito.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        const productoCarrito = { nombre, precio };

        carrito.push(productoCarrito);
        actualizarCarrito();
    });
});

// Actualizar contenido del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
    carritoModal.style.display = 'flex';
}

// Cerrar el carrito
cerrarCarrito.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});


// Generar fecha actual en el calendario
const calendar = document.getElementById('calendar');
const today = new Date();
calendar.textContent = `Hoy es: ${today.toLocaleDateString('es-ES')}`;

// Manejar programación de cumpleaños
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const birthdayDate = document.getElementById('birthday-date').value;
    const birthdayName = document.getElementById('birthday-name').value;

    // Crear un nuevo elemento en la lista
    const listItem = document.createElement('li');
    listItem.textContent = `${birthdayDate} - Cumpleaños de ${birthdayName}`;
    
    birthdayList.appendChild(listItem);

    // Limpiar formulario
    form.reset();
});