import express from "express";
import cors from "cors"; 
import intentionRoutes from "./routes/intention.routes";
import memberRoutes from "./routes/member.routes";
import indicationRoutes from "./routes/indication.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/intention", intentionRoutes);
app.use("/member", memberRoutes);
app.use("/indication", indicationRoutes);
app.use("/auth", authRoutes);

export default app;
