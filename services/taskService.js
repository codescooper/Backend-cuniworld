const taskModel = require("../models/taskModel");

// Récupérer la liste des taches
const fetchTask = async () => {
    try {
        const tasks = await taskModel.getAllTasks();
        return tasks;
    } catch (error) {
        console.error("Erreur lors de la sélection des taches service:", error);
        throw new Error("Erreur lors de la sélection des taches service");
    }
};

// Ajouter une tache
const createTask = async (name, category, user_id) => {
    try {
        const task = await taskModel.addTask(name, category, user_id);
        return task;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tache service:", error);
        throw new Error("Erreur lors de l'ajout de la tache service");
    }
};

// Supprimer une tache
const deleteTask = async (id) => {
    try {
        console.log(`Deleting task with ID: ${id} in service`); // Log de l'ID
        const task = await taskModel.deleteTask(id);
        if (!task) {
            console.log(`No task found with ID: ${id} in service`); // Log si la tâche n'est pas trouvée
        }
        return task;
    } catch (error) {
        console.error("Erreur lors de la suppression de la tache service:", error);
        throw new Error("Erreur lors de la suppression de la tache service");
    }
};

// Mettre à jour une tache
const updateTask = async (id, name, category) => {
    try {
        const task = await taskModel.updateTask(id, name, category);
        return task;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la tache service:", error);
        throw new Error("Erreur lors de la mise à jour de la tache service");
    }
};

module.exports = { fetchTask, createTask, deleteTask, updateTask };