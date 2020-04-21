const express = require("express");
const app = express();
const morgan = require("morgan");

const visitRoutes = require("./api/routes/visit");

app.use(morgan("dev"));

app.use("/visit", visitRoutes);

app.use((req, res, next) => {
  const error = new Error("Current Loc says: 'not found'");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

module.exports = app;
