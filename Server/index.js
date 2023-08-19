const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://urban.onrender.com"],
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

app.use("/", require("./routes/index"));

/* Server: */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});
