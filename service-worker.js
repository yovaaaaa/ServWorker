// 2. Instalar el Service Worker y guardar recursos esenciales en caché.
const CACHE_NAME = "introduccion-sw-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: evento install");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// 3. Activar el Service Worker y retirar cachés de versiones anteriores.
self.addEventListener("activate", (event) => {
  console.log("Service Worker: evento activate");

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// 4. Interceptar solicitudes: primero intentar caché y luego red.
self.addEventListener("fetch", (event) => {
  // Este ejemplo solo atiende solicitudes GET del mismo origen.
  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          // Guardar en caché respuestas válidas del mismo origen.
          if (networkResponse && networkResponse.ok) {
            const responseCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseCopy);
            });
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Respuesta de reserva para navegación sin conexión.
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return new Response("Recurso no disponible sin conexión.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      })
  );
});
