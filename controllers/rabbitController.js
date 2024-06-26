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

// Supprimer un lapin
const deleteRabbit = async (req, res) => {
  try {
    const { id } = req.params;
    const rabbit = await rabbitService.removeRabbit(id);
    if (!rabbit) {
      return res.status(404).send("Lapin non trouvé");
    }
    res.status(200).json(rabbit);
  } catch (error) {
    console.error("Erreur lors de la suppression du lapin:", error);
    res.status(500).send("Erreur lors de la suppression du lapin");
  }
};

// Mettre à jour un lapin
const updateRabbit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, birth_date, breed, color } = req.body;
    const rabbit = await rabbitService.updateRabbit(
      id,
      name,
      gender,
      birth_date,
      breed,
      color
    );
    if (!rabbit) {
      return res.status(404).send("Lapin non trouvé");
    }
    res.status(200).json(rabbit);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du lapin:", error);
    res.status(500).send("Erreur lors de la mise à jour du lapin");
  }
};

const addWeight = async (req, res) => {
  const { id } = req.params;
  const { date, weight } = req.body;

  if (!date || !weight) {
    return res.status(400).send("Date et poids sont nécessaires.");
  }

  try {
    const newWeight = await rabbitService.addWeight(id, date, weight);
    res.status(201).json(newWeight);
  } catch (error) {
    console.error("Erreur dans le contrôleur lors de l'ajout du poids:", error);
    res.status(500).send("Erreur lors de l'ajout du poids");
  }
};

const getParentChildRelations = async (req, res) => {
  try {
    console.log("lancement du controlleur");
    const relations = await rabbitService.getParentChildRelations();
    res.status(200).json(relations);
    console.log("fin du controlleur");
    console.log(relations)
  } catch (error) {
    res.status(500).send(error.message);
    console.error("Erreur dans le contrôleur:", error);
  }
};

const addParentChildRelation = async (req, res) => {
  console.log("req.body:", req.body); // Ajout de log pour vérifier le contenu de req.body

  const { parent_id, child_id } = req.body;

  if (!parent_id || !child_id) {
    return res
      .status(400)
      .json({ error: "parent_id and child_id are required" });
  }

  try {
    const newRelation = await rabbitService.addParentChildRelation(
      parent_id,
      child_id
    );
    res.status(201).json(newRelation);
  } catch (error) {
    console.error(
      "Erreur dans le contrôleur lors de l'ajout de la relation:",
      error
    );
    res.status(500).send("Erreur lors de l'ajout de la relation");
  }
};

const deleteParentChildRelation = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const deletedRelation = await rabbitService.deleteParentChildRelation(id);
    res.status(200).json(deletedRelation);
  } catch (error) {
    console.error(
      "Erreur dans le contrôleur lors de la suppression de la relation:",
      error
    );
    res.status(500).send("Erreur lors de la suppression de la relation");
  }
};

module.exports = {
  getRabbits,
  addRabbit,
  deleteRabbit,
  updateRabbit,
  addWeight,
  getParentChildRelations,
  addParentChildRelation,
  deleteParentChildRelation,
};
