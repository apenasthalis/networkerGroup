import express from "express";
import intentionRoutes from "./routes/intention.routes";
import memberRoutes from "./routes/member.routes";
import indicationRoutes from "./routes/indication.routes";

const app = express();

app.use(express.json());

app.use("/intention", intentionRoutes);
app.use("/member", memberRoutes);
app.use("/indication", indicationRoutes);

export default app;
