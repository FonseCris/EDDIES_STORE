document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const contenedor = document.getElementById("lista-ordenes");

  if (!userId || !token) {
    alert("Debes iniciar sesión para ver tus órdenes.");
    window.location.href = "login.html";
    return;
  }

  const API_BASE_URL = location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://eddies-store-backend.onrender.com";

  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/ordenes/usuario/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const ordenes = await respuesta.json();

    if (!ordenes.length) {
      contenedor.innerHTML = "<p>No has realizado ninguna orden aún.</p>";
      return;
    }

    contenedor.innerHTML = ""; // Limpiar el mensaje "Cargando..."

    ordenes.forEach(orden => {
      const div = document.createElement("div");
      div.classList.add("orden");
      div.innerHTML = `
        <h3>Orden #${orden._id.slice(-6)}</h3>
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
    contenedor.innerHTML = "<p>Error al cargar tus órdenes.</p>";
  }
});
