// registro.js
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-registro");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      direccion: document.getElementById("direccion").value,
      cumpleaños: document.getElementById("cumpleaños").value
    };

    try {
      const response = await fetch("https://eddies-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado con éxito");
        window.location.href = "login.html"; // si luego creas una página de login
      } else {
        alert("Error: " + (data.mensaje || data.error));
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Error en el registro");
    }
  });
});
