require("dotenv").config();
require("pg");
const express = require("express");
const router = require("./routes");
const { runScheduler } = require("./controllers/scheduler");

const app = express();

app.use(express.json());

app.use("/api/v1/", router);

const port = 4000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}!`));

runScheduler();
