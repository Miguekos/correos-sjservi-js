const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const log = require("./utils/logger");
const app = express();

const Raven = require("raven");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
if (process.env.NODE_ENV === "development") {
  dotenv.load({
    path: ".env.development",
  });
}
if (process.env.NODE_ENV === "production") {
  dotenv.load({
    path: ".env.production",
  });
}
const correosController = require("./controllers/correos");

// Must configure Raven before doing anything else with it
Raven.config(
  "https://a50f7208eb504127a9b71a8d41dc2967:23aa9b26837e40a1a5589c3bc1b4a968@sentry.acr.pe/15"
).install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());

/**
 * Usamos body-parse para revisar el body cuando los request son post
 */
app.use(Raven.errorHandler());
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

/**
 * Registro de puerto y servidor.
 */
app.disable("x-powered-by");
app.set("port", process.env.PORT);
app.set("host", process.env.NODEJS_IP);

/**
 * Rutas de Controllers
 */
app.get("/", (req, res) => {
  res.json({
    hola: "Server Correo SJServi JS",
  });
});

app.get("/sjservi/v1.0/correos/:id", correosController.correosAdjuntos);
app.post("/sjservi/v1.0/correos", correosController.correosAdjuntosArray);
app.post("/sjservi/v1.0/correosMasivoSimple", correosController.correosMasivoSimple);

/**
 * Iniciando Servidor.
 */
app.listen(app.get("port"), app.get("host"), () => {
  log.info(
    `Microservicio corriendo en http://${app.get("host")}:${app.get("port")}`
  );
});
