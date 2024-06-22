const db = require('../db');

const addWeight = async (rabbitId, date, weight) => {
  try {
    const result = await db.query(
      'INSERT INTO weights (rabbit_id, date, weight) VALUES ($1, $2, $3) RETURNING *;',
      [rabbitId, date, weight]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de l\'ajout du poids:', error);
    throw error;
  }
};

module.exports = {
  addWeight,
};
