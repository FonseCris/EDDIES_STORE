// Usuario.js

const API_URL = 'http://localhost:5001/api/auth';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Inicio de sesión exitoso");
                    localStorage.setItem("token", data.token); // Guarda el token para futuras peticiones

                    // OPCIONAL: puedes redirigir al usuario a otra página
                    // window.location.href = "index.html";
                } else {
                    alert(data.message || "Error al iniciar sesión");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al conectar con el servidor");
            }
        });
    }
});
