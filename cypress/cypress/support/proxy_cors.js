const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

let server = null;

/**
 * Iniciar el servidor y el middleware del proxy
 */
function startProxyServer() {
  const app = express();

  // Configurar el proxy para redirigir las solicitudes al enlace HTTPS especifico
  const proxyOptions = {
    //  target: 'https://my.api.mockaroo.com/users.json?key=af4f0e30',
    target: "https://my.api.mockaroo.com/",
    changeOrigin: true,
    // Opciones adicionales segun tus necesidades
  };

  // Crear el middleware del proxy
  const proxy = createProxyMiddleware(proxyOptions);

  // Utilizar el middleware del proxy en todas las solicitudes
  app.use("/", proxy);

  // Ejemplo de registro en el servidor proxy
  app.use("/", (req, res, next) => {
    console.log("Solicitud recibida:", req.url);
    next();
  });

  // Iniciar el servidor en el puerto deseado
  server = app.listen(3000, () => {
    console.log("Servidor proxy en ejecucion en http://localhost:3000");
  });
}

/**
 * Detener el servidor y el middleware del proxy
 */
function stopProxyServer() {
  if (server) {
    server.close();
    server = null;
    console.log("Servidor proxy detenido");
  }
}

module.exports = { startProxyServer, stopProxyServer };
