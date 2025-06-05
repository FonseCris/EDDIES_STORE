document.addEventListener("DOMContentLoaded", function () {
    const monthElement = document.querySelector(".month h1");
    const daysElement = document.querySelector(".days");
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
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    const today = new Date();
    const currentDate = today.getDate();
    const events = [];

    // Función para actualizar el calendario
    function updateCalendar() {
        monthElement.textContent = `${months[currentMonth]} ${currentYear}`;
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        datesElement.innerHTML = ""; // Limpiar

        for (let i = 0; i < firstDayOfMonth; i++) {
            const inactiveDate = document.createElement("div");
            inactiveDate.className = "inactive";
            datesElement.appendChild(inactiveDate);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dateElement = document.createElement("div");
            dateElement.textContent = i;
            dateElement.className = "date";

            // Resaltar la fecha actual
            if (i === currentDate && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dateElement.style.backgroundColor = "#91ffda";
                dateElement.style.color = "#000";
                dateElement.style.fontWeight = "bold";
            }

            // Evento de selección de fecha
            dateElement.addEventListener("click", function () {
                const selectedDate = new Date(currentYear, currentMonth, i);
                const formattedDate = selectedDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
                eventDateInput.value = formattedDate; // Establecer automáticamente la fecha
            });

            datesElement.appendChild(dateElement);
        }
    }

    // Navegar entre meses
    prevMonthButton.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Manejar el formulario de eventos
    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const eventDate = eventDateInput.value;
        const eventName = eventNameInput.value;

        if (eventDate && eventName) {
            const newEvent = { date: eventDate, name: eventName };
            events.push(newEvent);

            updateEventList();
            eventForm.reset();
        } else {
            alert("Por favor completa todos los campos");
        }
    });

    // Función para actualizar la lista de eventos
    function updateEventList() {
        eventList.innerHTML = ""; // Limpiar la lista actual
        events.forEach((event, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${event.date} - ${event.name}`;

            // Botón para eliminar eventos
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", function () {
                events.splice(index, 1); // Eliminar evento del array
                updateEventList();
            });

            listItem.appendChild(deleteButton);
            eventList.appendChild(listItem);
        });
    }

    // Inicializar el calendario
    updateCalendar();
});


// Agregar funcionalidad al catálogo
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-carrito");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const productoElemento = evento.target.closest(".producto");
            const nombre = productoElemento.querySelector("h3").textContent;
            const precio = parseFloat(
                productoElemento.querySelector(".precio").textContent.replace("$", "")
            );
            const imagen = productoElemento.querySelector("img").src;

            // Crear un objeto del producto
            const producto = { nombre, precio, imagen };

            // Obtener los productos existentes en el carrito desde localStorage
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Agregar el producto al carrito
            carrito.push(producto);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} se agregó al carrito.`);
        });
    });
});