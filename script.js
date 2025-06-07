
// Carrusel automático
const carouselTrack = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
let index = 0;

function moveCarousel() {
    const imageWidth = images[0]?.clientWidth || carouselTrack.offsetWidth; // Fallback
    index = (index + 1) % images.length; 
    const newPosition = -index * imageWidth; 
    carouselTrack.style.transform = `translateX(${newPosition}px)`; 
}

setInterval(moveCarousel, 3000);

// Modal del carrito
const abrirCarrito = document.getElementById('abrir-carrito');
const carritoModal = document.getElementById('carrito-modal');
const cerrarCarrito = document.getElementById('cerrar-carrito');

abrirCarrito?.addEventListener('click', (e) => {
    e.preventDefault();
    carritoModal.style.display = 'flex';
});

cerrarCarrito?.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});

// Filtrar productos por categoría
document.querySelectorAll("#filtros ul li").forEach(categoria => {
    categoria.addEventListener("click", () => {
        const categoriaSeleccionada = categoria.textContent.trim();

        document.querySelectorAll("#productos .producto").forEach(producto => {
            const categoriaProducto = producto.getAttribute("data-categoria");
            producto.style.display = (categoriaProducto === categoriaSeleccionada) ? "block" : "none";
        });
    });
});

// Carrito de compras
const botonesCarrito = document.querySelectorAll('.btn-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
let carrito = [];

botonesCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.producto');
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        carrito.push({ nombre, precio });
        actualizarCarrito();
    });
});

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

// Calendario personalizado
const calendar = document.getElementById('calendar');
const today = new Date();
calendar.textContent = `Hoy es: ${today.toLocaleDateString('es-ES')}`;

// Formulario de cumpleaños
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const birthdayDate = document.getElementById('birthday-date').value;
    const birthdayName = document.getElementById('birthday-name').value;

    const listItem = document.createElement('li');
    listItem.textContent = `${birthdayDate} - Cumpleaños de ${birthdayName}`;
    birthdayList.appendChild(listItem);

    form.reset();
});
