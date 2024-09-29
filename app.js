import express, { json } from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import team_membersRoutes from "./routes/team_membersRoutes.js"

const app = express();
app.use(cors({}));
app.use(morgan("dev"));

connectDB();

app.use(json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team_members", team_membersRoutes);

app.use(errorHandler);

export default app;
