const userModel = require("../models/userModel");

// Récupérer la liste des utilisateurs
const fetchUsers = async () => {
    try {
        const users = await userModel.getAllUsers();
        return users;
    } catch (error) {
        console.error("Erreur lors de la sélection des utilisateurs service:", error);
        throw new Error("Erreur lors de la sélection des utilisateurs service");
    }
};

// Ajouter un utilisateur
const createUser = async (username, password) => {
    try {
        const user = await userModel.addUser(username, password);
        return user;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur service:", error);
        throw new Error("Erreur lors de l'ajout de l'utilisateur service");
    }
};

// Supprimer un utilisateur
const deleteUser = async (id) => {
    try {
        const user = await userModel.deleteUser(id);
        return user;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur service:", error);
        throw new Error("Erreur lors de la suppression de l'utilisateur service");
    }
};

// Mettre à jour un utilisateur
const updateUser = async (id, username, password) => {
    try {
        const user = await userModel.updateUser(id, username, password);
        return user;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur service:", error);
        throw new Error("Erreur lors de la mise à jour de l'utilisateur service");
    }
};

const register = async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.addUser(username, hashedPassword);
    return user;
};

const authenticate = async (username, password) => {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
        return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
};

module.exports = { fetchUsers, createUser, deleteUser, updateUser, register, authenticate };