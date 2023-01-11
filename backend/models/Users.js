const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	date: {
		type: Date,
		required: false
	},
	type: {
		type: String,
		required: true
	},
	password:
	{
		type: String,
		required: true
	},
	education: {
		required: false,
		type: Array
	},
	skill: {
		required: false,
		type: Array
	},
	bio: {
		type: String,
		maxlength: 250,
		required: false,

	},
	contact: {
		type: Number,
		required: false,
		maxlength: 10
	},
	count: {
		type: Number,
		default: 0
	},
	userrating: { type: Number, required: false, default: 0 },
	ratinggot: { type: Number, required: false, default: 0 }
});


module.exports = User = mongoose.model("Users", UserSchema);
