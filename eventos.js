document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("Debes iniciar sesión para editar tu perfil.");
    window.location.href = "login.html";
    return;
  }

  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const direccionInput = document.getElementById("direccion");
  const cumpleanosInput = document.getElementById("cumpleanos");
  const form = document.getElementById("perfil-form");

  // 1. Obtener los datos actuales del usuario
  fetch(`https://eddies-backend.onrender.com/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      nombreInput.value = data.name || "";
      emailInput.value = data.email || "";
      direccionInput.value = data.direccion || "";
      cumpleanosInput.value = data.cumpleaños || "";
    })
    .catch(err => {
      console.error("❌ Error al obtener perfil:", err);
      alert("No se pudo cargar el perfil.");
    });

  // 2. Enviar actualización
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosActualizados = {
      name: nombreInput.value,
      email: emailInput.value,
      direccion: direccionInput.value,
      cumpleaños: cumpleanosInput.value
    };

    try {
      const res = await fetch(`https://eddies-backend.onrender.com/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(datosActualizados)
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Perfil actualizado con éxito.");
        window.location.href = "index.html";
      } else {
        alert("❌ Error: " + (result.message || "No se pudo actualizar"));
      }
    } catch (error) {
      console.error("❌ Error en PUT:", error);
      alert("Error al actualizar perfil.");
    }
  });
});
