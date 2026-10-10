# Introducción a Service Workers

Este proyecto es una práctica funcional para estudiar los conceptos habituales de un tutorial para principiantes: registro, instalación, activación, caché e interceptación de solicitudes.

**Importante:** los archivos son una reconstrucción didáctica propia sobre el tema. No se pudo verificar una transcripción completa del video, por lo que no debe considerarse una copia exacta de cada línea que aparece en pantalla.

## Estructura

- `index.html`: estructura de la página.
- `style.css`: estilos visuales.
- `app.js`: registra el Service Worker y muestra el estado.
- `service-worker.js`: instala y activa el worker, administra la caché e intercepta solicitudes.

## Cómo ejecutarlo

1. Descomprime la carpeta.
2. Abre una terminal dentro de la carpeta.
3. Inicia un servidor local. Si tienes Python instalado, ejecuta:

   ```bash
   python -m http.server 8000
   ```

4. Abre `http://localhost:8000` en el navegador.
5. Abre las herramientas de desarrollo del navegador y revisa la sección Application/Aplicación > Service Workers y Cache Storage.
6. Para comprobar el funcionamiento sin conexión, carga primero la página y luego activa el modo Offline en las herramientas de desarrollo.

No abras `index.html` directamente con `file://`: los Service Workers requieren un contexto seguro, como `localhost` o HTTPS.

## Nota sobre la caché

Cuando cambies archivos, incrementa el valor de `CACHE_NAME` en `service-worker.js` (por ejemplo, `introduccion-sw-v2`) para generar una nueva versión de la caché.
