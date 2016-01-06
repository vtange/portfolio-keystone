var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	// Set 'active' class to 'home'
	locals.section = 'home';
	
	// Render views/index.hbs
	view.render('index');
	
};
