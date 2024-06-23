const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  getRabbits,
  addRabbit,
  deleteRabbit,
  updateRabbit,
  addWeight,
} = require("./controllers/rabbitController");

const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  validateTask,
} = require("./controllers/taskController");

const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  register,
  login,
} = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
// Gerer la table rabbit
app.get("/api/rabbits", getRabbits);
app.post("/api/rabbits", addRabbit);
app.delete("/api/rabbits/:id", deleteRabbit);
app.put("/api/rabbits/:id", updateRabbit);
//ajout d'un nouveau poids pour le lapin
app.post("/api/rabbits/:id/weights", addWeight);

// Gerer la table des taches
app.get("/api/tasks", getTasks);
app.post("/api/tasks", addTask);
app.delete("/api/tasks/:id", deleteTask); 
app.put("/api/tasks/:id", updateTask);
app.patch("/api/tasks/:id", validateTask);

// Gerer la table des utilisateurs
app.get("/api/users", getAllUsers);
app.post("/api/users", addUser);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);

app.post('/api/register', register);
app.post('/api/login', login);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
