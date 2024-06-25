import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import morgan from "morgan";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

// This function is used to log the request method, URL, status code, and response time in the console.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
// This middleware function is used to enable CORS.
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// This middleware function is used to remove data, which is not allowed by the MongoDB query language, from the request body.
// This prevents NoSQL injection attacks.
app.use(ExpressMongoSanitize());

// This middleware function is used to sanitize user input coming from POST body, GET queries, and url params.
// This prevents XSS attacks.
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This middleware function is used to add the requestTime property to the request object.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// This is a router that handles all the routes related to authentication.
app.use("/api/v1/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
