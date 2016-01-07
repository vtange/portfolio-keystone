var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	//console.log(keystone.list('Project').model);//keystone.list('Project').model is Mongoose object that can find()

	// Set 'active' class to 'works'
	locals.section = 'works';
	
	// Load all Projects into 'projects' list (defined in keystone.js), ordered by by sortOrder
	view.query('projects', keystone.list('Project').model.find().sort('sortOrder'));
	
	// Render views/works.hbs
	view.render('works');
	
};
