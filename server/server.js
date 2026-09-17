import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from './src/config/db.js'
import authRouter from './src/routes/authRoutes.js'
import userRouter from "./src/routes/userRoutes.js";
import UpdateRouter from "./src/routes/UserPutRoutes.js";

const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.send("Api working");
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/put', UpdateRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);