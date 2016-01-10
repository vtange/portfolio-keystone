var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * =============
 */

var Project = new keystone.List('Project', {
	autokey: { from: 'name', path: 'key', unique: true }
});

//Mongoose Schema (Constructor for Model)
Project.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	mainImage: { type: Types.CloudinaryImage },
	desc: { type: Types.Html, wysiwyg: true, height: 150 },
	link: { type: Types.Url },
	tags: { type: Types.Relationship, ref: 'ProjectTag', many: true }
});

Project.register();
