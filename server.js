const express = require("express");
const participants = require("./models/participants");
const cors= require("cors");
//mongoDB Connection
require("./config/db");
//Importing Routes

const events = require("./routes/api/blogsApi");
const login = require("./routes/api/loginApi");
const participant = require("./routes/api/participantsAPi");

const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3004',
}))
app.get("/", (req, res) => res.send("hello"));

// Use Routes
app.use("/api/events", events);
app.use("/api/login", login);
app.use("/api/participant", participant);
const port = process.env.PORT || 3008;

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
