const rabbitModel = require("../models/rabbitModel");
const weightModel = require('../models/weightModel');

// Récupérer la liste des lapins
const fetchRabbits = async () => {
  try {
    const rabbits = await rabbitModel.getAllRabbits();
    return rabbits;
  } catch (error) {
    console.error("Erreur lors de la récupération des rabbit service:", error);
    throw new Error("Erreur lors de la récupération des rabbit service");
  }
};

// Ajouter un lapin
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

// Récupérer les poids d'un lapin
const getRabbitWeights = async (rabbitId) => {
  try {
    const weights = await weightModel.getWeightsByRabbitId(rabbitId);
    return weights;
  } catch (error) {
    console.error('Erreur lors de la sélection des poids du lapin service:', error);
    throw new Error('Erreur lors de la sélection des poids du lapin service');
  }
};

// Ajouter un nouveau poids au lapin
const addWeight = async (rabbitId, date, weight) => {
  try {
    return await weightModel.addWeight(rabbitId, date, weight);
  } catch (error) {
    console.error('Erreur dans le service lors de l\'ajout du poids:', error);
    throw error;
  }
};

//recuperer les relations du lapin
const getParentChildRelations = async () => {
  try {
    console.log('lancement du service');
    const relations = await rabbitModel.getParentChildRelations();
    console.log(relations);
    return relations;
  } catch (error) {
    console.error('Erreur lors de la sélection des relations du lapin service:', error);
    throw new Error('Erreur lors de la sélection des relations du lapin service');
  }
}

// ajouter une relation au lapin
const addParentChildRelation = async (rabbitId, parentRabbitId) => {
  try {
    return await rabbitModel.addParentChildRelation(rabbitId, parentRabbitId);
  } catch (error) {
    console.error('Erreur dans le service lors de l\'ajout de la relation:', error);
    throw error;
}}

const deleteParentChildRelation = async (id) => {
  try {
    return await rabbitModel.deleteParentChildRelation(id);
  } catch (error) {
    console.error('Erreur dans le service lors de la suppression de la relation:', error);
    throw error;
  }
}


module.exports = { 
  fetchRabbits, 
  createRabbit, 
  removeRabbit, 
  updateRabbit, 
  getRabbitWeights, 
  addWeight,
  getParentChildRelations,
  addParentChildRelation,
  deleteParentChildRelation
};
