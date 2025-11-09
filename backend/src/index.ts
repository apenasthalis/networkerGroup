import express from "express";
import intentionRoutes from "./routes/intention.routes";

const app = express();

app.use(express.json());

app.use("/intention", intentionRoutes);

export default app;
