const mongoose = require('mongoose');

// Define the model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

// Export the model
module.exports = mongoose.model('users', userSchema)