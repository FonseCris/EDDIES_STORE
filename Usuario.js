document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const greeting = document.getElementById("greeting");
  const userDetails = document.getElementById("user-details");
  const userActions = document.getElementById("user-actions");

  // Validar sesión activa
  if (!userId || !token) {
    alert("Debes iniciar sesión para acceder a tu perfil.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`https://eddies-store-backend.onrender.com/api/auth/perfil/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const user = await response.json();

    if (response.ok) {
      greeting.innerHTML = `<strong>Bienvenido, ${user.nombre || "Usuario"} 👋</strong>`;

      if (userDetails) {
        userDetails.innerHTML = `
          <p><strong>Correo:</strong> ${user.email}</p>
          <p><strong>Dirección:</strong> ${user.direccion || "No registrada"}</p>
          <p><strong>Cumpleaños:</strong> ${user.cumpleaños ? new Date(user.cumpleaños).toLocaleDateString() : "No registrado"}</p>
          <p><strong>Registrado desde:</strong> ${new Date(user.fechaRegistro).toLocaleDateString()}</p>
        `;
      }

      if (userActions) {
        userActions.innerHTML = `
          <button onclick="window.location.href='editar-perfil.html'">✏️ Editar perfil</button>
          <button onclick="window.location.href='ordenes.html'">📦 Ver mis pedidos</button>
          <button onclick="cerrarSesion()">🚪 Cerrar sesión</button>
        `;
      }

    } else {
      alert(user.message || "Error al cargar tu perfil.");
    }

  } catch (error) {
    console.error("Error al consultar perfil:", error);
    alert("Error al conectarse con el servidor.");
  }
});

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "login.html";
}
