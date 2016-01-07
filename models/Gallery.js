var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Project = new keystone.List('Project', {
	autokey: { from: 'name', path: 'key', unique: true }
});

//Mongoose Schema (Constructor for Model)
Project.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

Project.register();
