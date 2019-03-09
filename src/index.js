require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const PORT = 8888;

const app = express();

// Database config
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Access the files in the local db () ../temp/uploads
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "temp", "uploads"))
);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
