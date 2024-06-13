const rabbitModel = require("../models/rabbitModel");

const fetchRabbits = async () => {
  try {
    const rabbits = await rabbitModel.getAllRabbits();
    return rabbits;
  } catch (error) {
    console.error("Erreur lors de la récupération des rabbit service:", error);
    throw new Error("Erreur lors de la récupération des rabbit service");
  }
};

const createRabbit = async (name, gender, birth_date, breed, color) => {
  try {
    const rabbit = await rabbitModel.addRabbit(
      name,
      gender,
      birth_date,
      breed,
      color
    );
    return rabbit;
  } catch (error) {
    console.error("Erreur lors de l'ajout du lapin service:", error);
    throw new Error("Erreur lors de l'ajout du lapin service");
  }
};

// Supprimer un lapin
const removeRabbit = async (id) => {
  try {
    const rabbit = await rabbitModel.deleteRabbit(id);
    return rabbit;
  } catch (error) {
    console.error("Erreur lors de la suppression du lapin service:", error);
    throw new Error("Erreur lors de la suppression du lapin service");
  }
};

// Mettre à jour un lapin
const updateRabbit = async (id, name, gender, birth_date, breed, color) => {
    try {
      const rabbit = await rabbitModel.updateRabbit(id, name, gender, birth_date, breed, color);
      return rabbit;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lapin service:', error);
      throw new Error('Erreur lors de la mise à jour du lapin service');
    }
  };

module.exports = { fetchRabbits, createRabbit, removeRabbit, updateRabbit };
