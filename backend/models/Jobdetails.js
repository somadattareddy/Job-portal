const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const jobdetails = new Schema({
	title: {
		type: String,
		required: true
	},
	recruiterid: {
		type: String,
		required: true
	},
	recruitername: {
		type: String,
		required: true
	},
	maxapplicant: {
		type: Number,
		required: true
	},
	positions: {
		type: Number,
		required: true
	},
	remainingjobs:{
		type:Number,
		required:false
	},
	postingdate: {
		type: Date, required: true
	},
	deadlinedate: {
		type: Date, required: true

	},
	requiredskills: {
		type: Array, required: true
	},
	typeofjob: {
		type: String, required: true
	},
	duration: {
		type: Number,
		required: true,
		min: 0,
		max: 6,
		default: 0
	},
	salary: {
		type: Number,
		required: true
	},
	finalrating: {
		type: Number,
		default: 0
	},
	applied: {
		type: Boolean,
		required: false
	},
	application: [{
		applicant_id: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ["Applied", "Shortlisted", "Accepted", "Rejected"],
			default: "Applied"
		},
		joiningdate: {
			type: Date,
		},
		applicationdate: {
			type: Date,
		},
		rating: {
			type: Number,
			required: false,
			max: 5,
			min: 0,
			default: 0
		},//applicant to job
		ratingfromrec: {
			type: Number,
			required: false,
			max: 5,
			min: 0,
			default: 0
		},sop: {
			type: String,
			// required: true
		}
	}]
});


module.exports = Jobdetails = mongoose.model("Jobdetails", jobdetails);
