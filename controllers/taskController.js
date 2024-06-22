const taskService = require("../services/taskService");

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.fetchTask();
        res.json(tasks);
    } catch (error) {
        console.error("Erreur lors de la sélection des taches:", error);
        res.status(500).send("Erreur lors de la sélection des taches");
    }
};

const addTask = async (req, res) => {
    try {
        const { name, category, user_id } = req.body;
        const task = await taskService.createTask(name, category, user_id);
        res.status(201).json(task);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tache:", error);
        res.status(500).send("Erreur lors de l'ajout de la tache");
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete task with ID: ${id}`); // Log de l'ID
        const task = await taskService.deleteTask(id);
        if (!task) {
            console.log(`Task with ID: ${id} not found`); // Log si la tâche n'est pas trouvée
            return res.status(404).send("Tache non trouvée");
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Erreur lors de la suppression de la tache:", error);
        res.status(500).send("Erreur lors de la suppression de la tache");
    }
};
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category } = req.body;
        const task = await taskService.updateTask(id, name, category);
        if (!task) {
            return res.status(404).send("Tache non trouvé");
        }
        res.status(200).json(task);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la tache:", error);
        res.status(500).send("Erreur lors de la mise à jour de la tache");
    }
};

module.exports = { getTasks, addTask, deleteTask, updateTask };