// Agregar funcionalidad al catálogo
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-carrito");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const productoElemento = evento.target.closest(".producto");
            const nombre = productoElemento.querySelector("h3").textContent;
            const descripcion = productoElemento.querySelector(".descripcion")?.textContent || "";
            const precio = parseFloat(
                productoElemento.querySelector(".precio").textContent.replace("$", "")
            );
            const imagen = productoElemento.querySelector("img").src;

            const producto = { nombre, descripcion, precio, imagen };
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // actualizarContadorCarrito(); // Puedes descomentar esto si decides usar el contador
            alert(`${nombre} se agregó al carrito.`);
        });
    });

    const carritoContenedor = document.getElementById("productos-carrito");
    const totalContenedor = document.getElementById("total");

    if (carritoContenedor && totalContenedor) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let total = 0;

        carrito.forEach((producto, index) => {
            const item = document.createElement("li");
            item.innerHTML = `
                <div class="detalle-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: auto; border-radius: 5px;">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p>${producto.descripcion}</p>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                    </div>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            carritoContenedor.appendChild(item);
            total += producto.precio;
        });

        totalContenedor.textContent = `$${total.toFixed(2)}`;

        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (evento) => {
                const index = parseInt(evento.target.dataset.index);
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                // actualizarContadorCarrito(); // Comentar si no quieres usar contador
                location.reload();
            });
        });

        // ✅ Finalizar compra - Enviar orden al backend
        const botonFinalizar = document.getElementById("finalizar-compra");
        if (botonFinalizar) {
            botonFinalizar.addEventListener("click", async () => {
                if (carrito.length === 0) {
                    alert("Tu carrito está vacío.");
                    return;
                }

                const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

                const orden = {
                    productos: carrito.map((producto) => ({
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        precio: producto.precio,
                        cantidad: 1,
                        imagen: producto.imagen
                    })),
                    total: total,
                    cliente: {
                        nombre: "Cliente Anónimo",
                        email: "cliente@ejemplo.com"
                    }
                };

                try {
                    const respuesta = await fetch("http://localhost:3000/api/ordenes", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(orden)
                    });
                    if (respuesta.ok) {
                          // Guardar orden localmente para mostrarla luego
                        localStorage.setItem("ordenConfirmada", JSON.stringify(orden));
                         localStorage.removeItem("carrito");
                         actualizarContadorCarrito();
                         window.location.href = "confirmacion.html"; // Redirigir

                    } else {
                        const error = await respuesta.json();
                        alert("Error al procesar la orden: " + (error.error || "Error desconocido."));
                    }
                } catch (error) {
                    console.error("Error al enviar la orden:", error);
                    alert("Error de red al procesar la orden.");
                }
            });
        }
    }
});
