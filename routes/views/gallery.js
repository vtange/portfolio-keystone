var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	console.log(keystone.list('Gallery').model);//keystone.list('Gallery').model is Mongoose object that can find()

	// Set 'active' class to 'works'
	locals.section = 'works';
	
	// Load all Gallery's into 'galleries', ordered by by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));
	
	// Render views/works.hbs
	view.render('works');
	
};
