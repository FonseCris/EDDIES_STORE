document.addEventListener("DOMContentLoaded", function () {
  const monthElement = document.querySelector(".month h1");
  const datesElement = document.querySelector(".dates");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const eventList = document.getElementById("event-list");
  const eventForm = document.getElementById("birthday-form");
  const eventDateInput = document.getElementById("birthday-date");
  const eventNameInput = document.getElementById("birthday-name");

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const today = new Date();
  const currentDate = today.getDate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token || !userId) {
    alert("Debes iniciar sesión para ver el calendario.");
    window.location.href = "login.html";
    return;
  }

  function updateCalendar() {
    monthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    datesElement.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      const inactive = document.createElement("div");
      inactive.className = "inactive";
      datesElement.appendChild(inactive);
    }

    for (let i = 1; i <= lastDate; i++) {
      const dateElement = document.createElement("div");
      dateElement.textContent = i;
      dateElement.className = "date";

      if (i === currentDate && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        dateElement.style.backgroundColor = "#91ffda";
        dateElement.style.color = "#000";
        dateElement.style.fontWeight = "bold";
      }

      dateElement.addEventListener("click", () => {
        const selected = new Date(currentYear, currentMonth, i);
        eventDateInput.value = selected.toISOString().split("T")[0];
      });

      datesElement.appendChild(dateElement);
    }
  }

  async function cargarEventos() {
    try {
      const res = await fetch("https://eddies-backend.onrender.com/api/eventos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const eventos = await res.json();
      mostrarEventos(eventos);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
    }
  }

  function mostrarEventos(eventos) {
    eventList.innerHTML = "";
    eventos.forEach((evento) => {
      const item = document.createElement("li");
      item.textContent = `${evento.fecha} - ${evento.titulo}`;
      eventList.appendChild(item);
    });
  }

  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fecha = eventDateInput.value;
    const titulo = eventNameInput.value;

    if (!fecha || !titulo) {
      alert("Por favor completa los campos.");
      return;
    }

    try {
      const res = await fetch("https://eddies-backend.onrender.com/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ fecha, titulo })
      });

      if (res.ok) {
        alert("Evento guardado");
        eventForm.reset();
        cargarEventos();
      } else {
        alert("Error al guardar evento");
      }
    } catch (error) {
      console.error("Error al guardar evento:", error);
    }
  });

  prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
  });

  nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });

  updateCalendar();
  cargarEventos();
});
