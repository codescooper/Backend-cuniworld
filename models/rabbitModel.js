const db = require("../db");

// Récupérer la liste des lapins dans la base de données
const getAllRabbits = async () => {
  try {
    const result = await db.query("SELECT * FROM rabbit");
    return result.rows;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des rabbit model:",
      error
    );
    throw new Error(
      "Erreur lors de la récupération des données des rabbit model"
    );
  }
};

// Ajouter un lapin à la base de données
const addRabbit = async (name, gender, birth_date, breed, color) => {
  try {
    const result = await db.query(
      "INSERT INTO rabbit (name, gender, birth_date, breed, color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, gender, birth_date, breed, color]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du lapin dans la base de données:",
      error
    );
    throw new Error("Erreur lors de l'ajout du lapin dans la base de données");
  }
};

module.exports = { getAllRabbits, addRabbit };
