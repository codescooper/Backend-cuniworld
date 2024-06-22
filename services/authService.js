const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');



module.exports = { register, authenticate };