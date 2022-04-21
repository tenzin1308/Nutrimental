import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adviceRouter from "./routers/adviceRouter.js";
import dailyIntakeRouter from "./routers/dailyIntakeRouter.js";
import foodHistoryRouter from "./routers/foodHistoryRouter.js";
import userRouter from "./routers/userRouter.js";
import vitaminRouter from "./routers/vitaminRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.2djpc.mongodb.net/nutrimental",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  }
);

// API
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/user", userRouter);
app.use("/api/daily-intake", dailyIntakeRouter);
app.use("/api/vitamin", vitaminRouter);
app.use("/api/food-history", foodHistoryRouter);
app.use("/api/advice", adviceRouter);

// Connection

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started at http://localhost:${port}`);
});
