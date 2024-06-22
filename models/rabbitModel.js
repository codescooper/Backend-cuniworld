const db = require("../db");

// Récupérer la liste des lapins dans la base de données
const getAllRabbits = async () => {
  try {
    const result = await db.query(`
      SELECT r.id AS rabbit_id, r.name, r.color, r.gender, r.birth_date,
             w.id AS weight_id, w.date, w.weight
      FROM rabbit r
      LEFT JOIN weights w ON r.id = w.rabbit_id
    `);

    const rabbitsMap = new Map();
    
    result.rows.forEach(row => {
      const { rabbit_id, name, color, gender, birth_date, weight_id, date, weight } = row;

      if (!rabbitsMap.has(rabbit_id)) {
        rabbitsMap.set(rabbit_id, {
          id: rabbit_id,
          name,
          color,
          gender,
          birth_date,
          weightData: []
        });
      }

      if (weight_id) {
        rabbitsMap.get(rabbit_id).weightData.push({ id: weight_id, date, weight });
      }
    });

    const rabbits = Array.from(rabbitsMap.values());

    return rabbits;
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

// Supprimer un lapin de la base de données
const deleteRabbit = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM rabbit WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du lapin dans la base de données:",
      error
    );
    throw new Error(
      "Erreur lors de la suppression du lapin dans la base de données"
    );
  }
};

// Mettre à jour un lapin dans la base de données
const updateRabbit = async (id, name, gender, birth_date, breed, color) => {
  try {
    const result = await db.query(
      "UPDATE rabbit SET name = $1, gender = $2, birth_date = $3, breed = $4, color = $5 WHERE id = $6 RETURNING *",
      [name, gender, birth_date, breed, color, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du lapin dans la base de données:",
      error
    );
    throw new Error(
      "Erreur lors de la mise à jour du lapin dans la base de données"
    );
  }
};
module.exports = { getAllRabbits, addRabbit, deleteRabbit, updateRabbit };
