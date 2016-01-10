var keystone = require('keystone');

/**
 * ProjectTag Model
 * ==================
 */

var ProjectTag = new keystone.List('ProjectTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});
//Mongoose Schema (Constructor for Model)
ProjectTag.add({
	name: { type: String, required: true }
});

ProjectTag.relationship({ ref: 'Project', path: 'tags' });

ProjectTag.register();
