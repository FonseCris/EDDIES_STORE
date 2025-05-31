// Agregar funcionalidad al catálogo
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-carrito");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const productoElemento = evento.target.closest(".producto");
            const nombre = productoElemento.querySelector("h3").textContent;
            const precio = parseFloat(
                productoElemento.querySelector(".precio").textContent.replace("$", "")
            );
            const imagen = productoElemento.querySelector("img").src;

            // Crear un objeto del producto
            const producto = { nombre, precio, imagen };

            // Obtener los productos existentes en el carrito desde localStorage
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Agregar el producto al carrito
            carrito.push(producto);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} se agregó al carrito.`);
        });
    });

    // Funcionalidad en la página del carrito
    const carritoContenedor = document.getElementById("productos-carrito");
    const totalContenedor = document.getElementById("total");

    if (carritoContenedor && totalContenedor) {
        // Obtener los productos del carrito desde localStorage
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let total = 0;

        // Mostrar los productos en el carrito
        carrito.forEach((producto, index) => {
            const item = document.createElement("li");
            item.innerHTML = `
                <div class="detalle-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: auto; border-radius: 5px;">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                    </div>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            carritoContenedor.appendChild(item);
            total += producto.precio;
        });

        // Actualizar el total
        totalContenedor.textContent = `$${total.toFixed(2)}`;

        // Agregar funcionalidad para eliminar productos
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (evento) => {
                const index = parseInt(evento.target.dataset.index);
                carrito.splice(index, 1); // Eliminar producto del array
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
                location.reload(); // Recargar página para reflejar los cambios
            });
        });
    }
});