const express = require("express");
const cors = require("./config/cors");
const authRoutes = require("./routes/auth");
const installationsRoutes = require("./routes/installations");
const offersRoutes = require("./routes/offers");
const transactionsRoutes = require("./routes/transactions");
const errorHandler = require("./utils/errorHandler");

const app = express();
app.use(cors);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/installations", installationsRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/transactions", transactionsRoutes);

app.use(errorHandler);

module.exports = app;
