const API_URL = 'https://eddies-backend.onrender.com'; // ✅ URL real del backend

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('login-email').value;
  const contraseña = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/api/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contraseña })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Inicio de sesión exitoso');
      localStorage.setItem('token', data.token); // Guarda el token si tu backend lo devuelve
      window.location.href = 'catalogo.html'; // Redirige al catálogo
    } else {
      alert(`❌ Error: ${data.msg || 'Credenciales incorrectas'}`);
    }
  } catch (err) {
    console.error('Error en el login:', err);
    alert('❌ Error al conectar con el servidor');
  }
});
