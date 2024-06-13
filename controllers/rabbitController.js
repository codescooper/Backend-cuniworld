const rabbitService = require("../services/rabbitService");

const getRabbits = async (req, res) => {
  try {
    const rabbits = await rabbitService.fetchRabbits();
    res.json(rabbits);
  } catch (error) {
    console.error("Erreur lors de la récupération des rabbits:", error);
    res.status(500).send("Erreur lors de la récupération des rabbits");
  }
};

const addRabbit = async (req, res) => {
  try {
    const { name, gender, birth_date, breed, color } = req.body;
    const rabbit = await rabbitService.createRabbit(
      name,
      gender,
      birth_date,
      breed,
      color
    );
    res.status(201).json(rabbit);
  } catch (error) {
    console.error("Erreur lors de l'ajout du lapin:", error);
    res.status(500).send("Erreur lors de l'ajout du lapin");
  }
};

module.exports = { getRabbits, addRabbit };
