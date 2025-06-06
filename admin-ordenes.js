document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const contenedor = document.getElementById("lista-ordenes");

  if (!token) {
    alert("Debes iniciar sesión como administrador.");
    window.location.href = "login.html";
    return;
  }

  const API_BASE_URL = location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://eddies-store-backend.onrender.com";

  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/ordenes`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const ordenes = await respuesta.json();

    if (!ordenes.length) {
      contenedor.innerHTML = "<p>No hay órdenes registradas aún.</p>";
      return;
    }

    contenedor.innerHTML = ""; // limpiar mensaje por defecto

    ordenes.forEach(orden => {
      const div = document.createElement("div");
      div.classList.add("orden");
      div.innerHTML = `
        <h3>Orden #${orden._id.slice(-6)}</h3>
        <p><strong>Cliente:</strong> ${orden.cliente?.nombre || "Sin nombre"} (${orden.cliente?.email || "Sin email"})</p>
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
    console.error("Error al obtener todas las órdenes:", error);
    contenedor.innerHTML = "<p>Error al cargar las órdenes del sistema.</p>";
  }
});
