import express, { json } from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
app.use(cors());
connectDB();

app.use(json());
app.use(morgan("dev"));

app.use("/api/events", eventRoutes);

app.use(errorHandler);

export default app;
