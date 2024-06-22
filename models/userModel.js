const db = require("../db");

// Recuperer un utilisateur à partir de son username
const getUserByUsername = async (username) => {
  const user = await pool.query('SELECT * FROM utilisateur WHERE username = $1', [username]);
  return user.rows[0];
};

// Récupérer la liste des utilisateurs dans la base de données
const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM utilisateur");
    return result.rows;
  } catch (error) {
    console.error(
      "Erreur lors de la sélection des données des utilisateurs model:",
      error
    );
    throw new Error(
      "Erreur lors de la sélection des données des utilisateurs model"
    );
  }
};

// Ajouter un utilisateur à la base de données
const addUser = async (username, password) => {
  try {
    const result = await db.query(
      "INSERT INTO utilisateur (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de l'utilisateur dans la base de données:",
      error
    );
    throw new Error(
      "Erreur lors de l'ajout de l'utilisateur dans la base de données"
    );
  }
};

// Supprimer un utilisateur de la base de données
const deleteUser = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM utilisateur WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur dans la base de données:",
      error
    );
    throw new Error(
      "Erreur lors de la suppression de l'utilisateur dans la base de données"
    );
  }
};

// Mettre à jour un utilisateur dans la base de données
const updateUser = async (id, username, password) => {
  try {
    const result = await db.query(
      "UPDATE utilisateur SET username = $1, password = $2 WHERE id = $3 RETURNING *",
      [username, password, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur dans la base de données:",
      error
    );
    throw new Error(
      "Erreur lors de la mise à jour de l'utilisateur dans la base de données"
    );
  }
};

module.exports = { getAllUsers, addUser, deleteUser, updateUser, getUserByUsername };
