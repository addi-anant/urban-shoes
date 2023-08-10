const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
// const session = require("express-session");

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // Form Input.
app.use(cookieParser()); // Handle Cookie.
app.use(express.urlencoded({ extended: true }));

/* MongoDB Connection: */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully Connected to the MongoDB Database."))
  .catch((error) => console.log(error));

/* Handling API Request: */
app.use("/", require("./routes/index"));

/* Server: */
app.listen("5000", () => {
  console.log("The server is up and running on port: 5000");
});
