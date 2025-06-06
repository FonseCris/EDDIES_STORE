// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("https://tu-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Bienvenido, " + data.usuario.nombre);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.usuario.id);
        window.location.href = "Usuario.html";
      } else {
        alert(data.mensaje || "❌ Credenciales inválidas.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  });
});
