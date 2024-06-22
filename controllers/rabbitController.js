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
        return res.status(404).send('Lapin non trouvé');
      }
      res.status(200).json(rabbit);
    } catch (error) {
      console.error('Erreur lors de la suppression du lapin:', error);
      res.status(500).send('Erreur lors de la suppression du lapin');
    }
  }; 


  // Mettre à jour un lapin
const updateRabbit = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, gender, birth_date, breed, color } = req.body;
      const rabbit = await rabbitService.updateRabbit(id, name, gender, birth_date, breed, color);
      if (!rabbit) {
        return res.status(404).send('Lapin non trouvé');
      }
      res.status(200).json(rabbit);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lapin:', error);
      res.status(500).send('Erreur lors de la mise à jour du lapin');
    }
  };

  const addWeight = async (req, res) => {
    const { id } = req.params;
    const { date, weight } = req.body;
  
    if (!date || !weight) {
      return res.status(400).send('Date et poids sont nécessaires.');
    }
  
    try {
      const newWeight = await rabbitService.addWeight(id, date, weight);
      res.status(201).json(newWeight);
    } catch (error) {
      console.error('Erreur dans le contrôleur lors de l\'ajout du poids:', error);
      res.status(500).send('Erreur lors de l\'ajout du poids');
    }
  };


module.exports = { 
  getRabbits,
  addRabbit,
  deleteRabbit,
  updateRabbit,
  addWeight
 };
