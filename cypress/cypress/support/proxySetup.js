const { startProxyServer, stopProxyServer } = require('./proxy_cors');

// Iniciar el servidor proxy antes de las pruebas
before(() => {
  startProxyServer();
});

// Detener el servidor proxy después de las pruebas
after(() => {
  stopProxyServer();
});
