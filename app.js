// 1. Registrar el Service Worker desde el JavaScript de la página.
const statusText = document.querySelector("#status");
const checkButton = document.querySelector("#check-button");

async function registerServiceWorker() {
  // Los Service Workers requieren HTTPS o localhost.
  if (!("serviceWorker" in navigator)) {
    statusText.textContent = "Este navegador no admite Service Workers.";
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./service-worker.js");
    statusText.textContent = "Service Worker registrado correctamente.";

    // Mostrar el estado actual, si hay un worker en alguna fase.
    if (registration.installing) {
      console.log("Service Worker instalándose");
    } else if (registration.waiting) {
      console.log("Service Worker instalado y esperando");
    } else if (registration.active) {
      console.log("Service Worker activo");
    }

    registration.addEventListener("updatefound", () => {
      console.log("Se encontró una actualización del Service Worker.");
    });
  } catch (error) {
    console.error("Falló el registro del Service Worker:", error);
    statusText.textContent = "No se pudo registrar el Service Worker. Revisa la consola.";
  }
}

async function checkRegistration() {
  if (!("serviceWorker" in navigator)) {
    statusText.textContent = "Este navegador no admite Service Workers.";
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration("./");
  statusText.textContent = registration
    ? "Hay un Service Worker registrado para esta página."
    : "Todavía no hay un Service Worker registrado.";
}

checkButton.addEventListener("click", checkRegistration);
registerServiceWorker();
