document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  // Obtener datos actuales para precargar el formulario
  try {
    const res = await fetch(`https://tu-backend.onrender.com/api/auth/perfil/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const user = await res.json();
    if (res.ok) {
      document.getElementById("nombre").value = user.nombre || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("direccion").value = user.direccion || "";
      if (user.cumpleaños) {
        document.getElementById("cumpleanos").value = new Date(user.cumpleaños).toISOString().split("T")[0];
      }
    } else {
      alert("No se pudo cargar tu perfil.");
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el servidor.");
  }

  // Enviar cambios
  document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      direccion: document.getElementById("direccion").value,
      cumpleaños: document.getElementById("cumpleanos").value,
    };

    const nuevaPassword = document.getElementById("password").value;
    if (nuevaPassword) data.password = nuevaPassword;

    try {
      const response = await fetch(`https://tu-backend.onrender.com/api/usuarios/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Perfil actualizado correctamente.");
        window.location.href = "Usuario.html";
      } else {
        alert(result.message || "❌ No se pudo actualizar.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión.");
    }
  });
});
