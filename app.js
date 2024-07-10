const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const houseRoutes = require("./routes/houseRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/houses", houseRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

module.exports = app;
