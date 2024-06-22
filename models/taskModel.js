const db = require("../db");

// Récupérer la liste des taches dans la base de données
const getAllTasks = async () => {
    try {
        const result = await db.query("SELECT * FROM task");
        return result.rows;
    } catch (error) {
        console.error(
            "Erreur lors de la sélection des données des taches model:",
            error
        );
        throw new Error(
            "Erreur lors de la sélection des données des taches model"
        );
    }
};

// Ajouter une tache à la base de données
const addTask = async (name, category, user_id) => {
    try {
        const result = await db.query(
            "INSERT INTO task (name, category, user_id) VALUES ($1, $2, $3) RETURNING *",
            [name, category, user_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(
            "Erreur lors de l'ajout de la tache dans la base de données:",
            error
        );
        throw new Error("Erreur lors de l'ajout de la tache dans la base de données");
    }
};

// Supprimer une tache de la base de données
const deleteTask = async (id) => {
    try {
        console.log(`Executing DELETE query for task ID: ${id}`); // Log de l'ID
        const result = await db.query(
            "DELETE FROM task WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            console.log(`No task found with ID: ${id} in database`); // Log si aucune tâche n'est trouvée
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error("Erreur lors de la suppression de la tache dans la base de données:", error);
        throw new Error("Erreur lors de la suppression de la tache dans la base de données");
    }
};

// Mettre à jour une tache dans la base de données
const updateTask = async (id, name, category) => {
    try {
        const result = await db.query(
            "UPDATE task SET name = $1, category = $2 WHERE id = $3 RETURNING *",
            [name, category, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour de la tache dans la base de données:",
            error
        );
        throw new Error(
            "Erreur lors de la mise à jour de la tache dans la base de données"
        );
    }
}

module.exports = { getAllTasks, addTask, deleteTask, updateTask };