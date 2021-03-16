const mongoose = require('mongoose');

// Define the model
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateCreated: String,
    dateModified: String
})

// Export the model
module.exports = mongoose.model('blogs', blogSchema)