import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js"
import taskRoute from "./routes/taskRoute.js"
import userRoute from "./routes/userRoute.js"
const app = express();

app.use(cors(
    {origin: "*",}
))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoute)
app.use("/api/tasks", taskRoute)
app.use("/api/users", userRoute);

export default app;