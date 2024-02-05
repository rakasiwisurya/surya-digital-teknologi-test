require("dotenv").config();
require("pg");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const router = require("./routes");
const { runScheduler } = require("./controllers/scheduler");

const app = express();

const port = 4000;

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Birth Date Send Email API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use("/api/v1/", router);

app.listen(port, () => {
  console.info(`Listening app on http://localhost:${port}!`);
  console.info(`Api Documentation is on http://localhost:${port}/api-docs`);
});

runScheduler();
