var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Producer Model
 * ==========
 */

var Producer = new keystone.List('Producer');

Producer.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Producer.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Producer.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Producer.defaultColumns = 'name, email, isAdmin';
Producer.register();
