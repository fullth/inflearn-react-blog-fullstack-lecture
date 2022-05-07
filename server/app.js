import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import postsRoute from "./routes/api/post";
import userRoute from "./routes/api/user";
import authRoute from "./routes/api/auth";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/post", postsRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connecting Success!!!"))
.catch((e) => console.log(e));

export default app;