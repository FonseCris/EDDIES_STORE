const API_URL = 'https://eddies-backend.onrender.com';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Inicio de sesión exitoso');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId); // si el backend lo devuelve
      window.location.href = 'catalogo.html';
    } else {
      alert(`❌ Error: ${data.msg || data.message || 'Credenciales incorrectas'}`);
    }
  } catch (err) {
    console.error('Error en el login:', err);
    alert('❌ Error al conectar con el servidor');
  }
});
