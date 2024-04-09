const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const todoRouter = require("./routes/api/todos");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: ["https://todos-server-tau.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("Hello");
})

app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
