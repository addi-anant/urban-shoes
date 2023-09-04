const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

/* CORS Header: */
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://urban-shoes.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://urban-hb0x.onrender.com",
      "https://urban-shoes.vercel.app",
    ],
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});
