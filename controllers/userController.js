const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la sélection des utilisateurs:", error);
    res.status(500).send("Erreur lors de la sélection des utilisateurs");
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).send("Erreur lors de la suppression de l'utilisateur");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = await userService.updateUser(id, username, password);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await authService.addUser(username, password);
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await authService.authenticateUser(username, password);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
module.exports = { getAllUsers, addUser, deleteUser, updateUser, register, login };
