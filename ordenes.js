document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("lista-ordenes");

    try {
        const respuesta = await fetch("http://localhost:3000/api/ordenes"); // Asegúrate de usar tu puerto backend
        const ordenes = await respuesta.json();

        if (ordenes.length === 0) {
            contenedor.innerHTML = "<p>No hay órdenes registradas.</p>";
            return;
        }

        ordenes.forEach(orden => {
            const div = document.createElement("div");
            div.classList.add("orden");
            div.innerHTML = `
                <h3>Cliente: ${orden.cliente?.nombre || "No especificado"}</h3>
                <p><strong>Total:</strong> $${orden.total}</p>
                <p><strong>Fecha:</strong> ${new Date(orden.fecha).toLocaleString()}</p>
                <ul>
                    ${orden.productos.map(p => `
                        <li>${p.nombre} - $${p.precio} x ${p.cantidad || 1}</li>
                    `).join("")}
                </ul>
                <hr>
            `;
            contenedor.appendChild(div);
        });

    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        contenedor.innerHTML = "<p>Error al cargar las órdenes.</p>";
    }
});
