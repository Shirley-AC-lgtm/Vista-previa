// Reemplaza este número con el WhatsApp real del consultorio en formato 502XXXXXXXX
const DENTAL_WHATSAPP_NUMBER = "50200000000";

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
const dentalForm = document.getElementById("dentalWhatsappForm");

if (dentalForm) {
    dentalForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("patientName");
        const treatmentInput = document.getElementById("treatmentSelect");
        const scheduleInput = document.getElementById("schedulePref");
        const dateInput = document.getElementById("desiredDate");
        const noteInput = document.getElementById("patientNote");

        const nameError = document.getElementById("nameError");
        const treatmentError = document.getElementById("treatmentError");

        nameError.textContent = "";
        treatmentError.textContent = "";

        let valid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = "Por favor escribe tu nombre.";
            valid = false;
        }

        if (!treatmentInput.value) {
            treatmentError.textContent = "Selecciona el tratamiento que te interesa.";
            valid = false;
        }

        if (!valid) return;

        const lines = [
            "Hola Dra. Uri Mazariegos, me gustaría agendar una cita dental:",
            `• Paciente: ${nameInput.value.trim()}`,
            `• Tratamiento: ${treatmentInput.value}`,
            `• Horario preferido: ${scheduleInput.value}`
        ];

        if (dateInput.value) {
            lines.push(`• Fecha sugerida: ${dateInput.value}`);
        }

        if (noteInput.value.trim()) {
            lines.push(`• Consulta: ${noteInput.value.trim()}`);
        }

        const message = encodeURIComponent(lines.join("\n"));
        const waUrl = `https://wa.me/${DENTAL_WHATSAPP_NUMBER}?text=${message}`;

        window.open(waUrl, "_blank", "noopener,noreferrer");
    });
}