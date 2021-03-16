const mongoose = require('mongoose');

// Define the model
const placeSchema = new mongoose.Schema({
	lat: Number,
	lng: Number,
	name: String,
	state: String,
	rating: Number,
	address: String,
	place_id: { type: 'String', unique: true },
	photo: {
		height: Number,
		width: Number,
		photo_reference: String
	}
})

// Export the model
module.exports = mongoose.model('places', placeSchema)