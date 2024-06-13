const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getRabbits, addRabbit, deleteRabbit, updateRabbit } = require("./controllers/rabbitController");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
    // Gerer la table rabbit
app.get("/api/rabbits", getRabbits);
app.post('/api/rabbits', addRabbit);
app.delete('/api/rabbits/:id', deleteRabbit);
app.put('/api/rabbits/:id', updateRabbit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
