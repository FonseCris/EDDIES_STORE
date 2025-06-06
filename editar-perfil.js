// editar-perfil.js

// URL base del backend (ajústala si ya tienes tu dominio real)
const API_BASE_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://eddies-store-backend.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("Debes iniciar sesión para editar tu perfil.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("editar-perfil-form");

  // Cargar datos actuales
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/perfil/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const user = await res.json();

    document.getElementById("nombre").value = user.nombre || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("direccion").value = user.direccion || "";
    document.getElementById("cumpleaños").value = user.cumpleaños ? user.cumpleaños.split("T")[0] : "";

  } catch (err) {
    console.error("Error al cargar los datos del usuario:", err);
    alert("Error al cargar datos del usuario");
  }

  // Enviar cambios
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const cumpleaños = document.getElementById("cumpleaños").value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/perfil/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, email, direccion, cumpleaños })
      });

      if (res.ok) {
        alert("Perfil actualizado correctamente.");
        window.location.href = "Usuario.html";
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "No se pudo actualizar el perfil."));
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Error al enviar los datos.");
    }
  });
});
