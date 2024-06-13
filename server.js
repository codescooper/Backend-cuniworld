const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getRabbits, addRabbit } = require("./controllers/rabbitController");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/rabbits", getRabbits);
app.post('/api/rabbits', addRabbit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
