import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();

// Your existing user routes
app.use("/api/user", route);

// Add this **test posts route**
app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, title: "First post", content: "Hello world" },
    { id: 2, title: "Second post", content: "This is a test post" }
  ]);
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successful.");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
