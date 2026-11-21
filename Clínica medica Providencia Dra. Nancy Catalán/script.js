// Reemplaza este número con el WhatsApp real de la clínica en formato 502XXXXXXXX
const CLINIC_WHATSAPP_NUMBER = "50200000000";

// Animación suave de aparición al desplazarse
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Formulario guiado hacia WhatsApp
const form = document.getElementById("whatsappForm");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("patientName");
        const serviceInput = document.getElementById("serviceType");
        const timeInput = document.getElementById("preferredTime");
        const dateInput = document.getElementById("preferredDate");
        const noteInput = document.getElementById("symptomsNote");

        const nameError = document.getElementById("nameError");
        const serviceError = document.getElementById("serviceError");

        nameError.textContent = "";
        serviceError.textContent = "";

        let isValid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = "Por favor escribe el nombre del paciente.";
            isValid = false;
        }

        if (!serviceInput.value) {
            serviceError.textContent = "Selecciona el tipo de consulta.";
            isValid = false;
        }

        if (!isValid) return;

        const lines = [
            "Hola Clínica Médica Providencia (Dra. Nancy Catalán), me gustaría solicitar una cita:",
            `• Paciente: ${nameInput.value.trim()}`,
            `• Consulta: ${serviceInput.value}`,
            `• Horario preferido: ${timeInput.value}`
        ];

        if (dateInput.value) {
            lines.push(`• Fecha deseada: ${dateInput.value}`);
        }

        if (noteInput.value.trim()) {
            lines.push(`• Motivo / nota: ${noteInput.value.trim()}`);
        }

        const message = encodeURIComponent(lines.join("\n"));
        const waUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${message}`;

        window.open(waUrl, "_blank", "noopener,noreferrer");
    });
}