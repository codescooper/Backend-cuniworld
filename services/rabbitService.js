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

module.exports = { fetchRabbits, createRabbit };
