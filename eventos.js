async function enviarCorreoRecordatorio(evento) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://tu-backend.onrender.com/api/auth/perfil/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await res.json();

    await fetch("https://tu-backend.onrender.com/api/eventos/recordatorio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: user.nombre,
        correo: user.email,
        evento: evento.name,
        fecha: evento.date
      })
    });
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
}
