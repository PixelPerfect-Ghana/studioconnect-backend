import express from "express";
import mongoose from "mongoose";
import studioRouter from "./routes/studio_routes.js";
import userRouter from "./routes/user_routes.js";
import reviewRouter from "./routes/review_route.js";
import bookingRouter from "./routes/booking_route.js";
import cors from "cors";

//connect to database
await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error connecting to database", error));

// create an express app
const app = express();

// use the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use(bookingRouter);
app.use(studioRouter);
app.use(userRouter);
app.use(reviewRouter);

// listen for incoming requests
app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
