var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set 'active' class to 'works'
	locals.section = 'works';
	locals.filters = {
		tag: req.params.tag
	};
	locals.data = {
		projects: [],
		tags: []
	};
	
	// Load all tags
	view.on('init', function(next) {
		
		keystone.list('ProjectTag').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.tags = results;
			
			// Load the counts for each category - NOT USED YET
			async.each(locals.data.tags, function(tag, next) {
				
				keystone.list('Project').model.count().where('tags').in([tag.id]).exec(function(err, count) {
					tag.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Generate locals.data.tag with req.params.tag via locals.filters.tag, if it exists
	view.on('init', function(next) {
		
		if (req.params.tag) {
			keystone.list('ProjectTag').model.findOne({ key: locals.filters.tag }).exec(function(err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Build database query and execute to generate locals.data
	view.on('init', function(next) {
		// declare query object "q", define it below, execute it
		var q;
		if (locals.data.tag) {
			q = keystone.list('Project').model.where('tags').in([locals.data.tag.id]);
		}
		else{
			q = keystone.list('Project').model.find().populate('tags');
		}
		q.exec(function(err, results) {
			locals.data.projects = results;
			next(err);
		});
		
	});

	// Load all Projects into 'projects' list (defined in keystone.js), ordered by by sortOrder
	//view.query('projects', keystone.list('Project').model.find().sort('sortOrder'));
	
	// Render views/works.hbs
	view.render('works');
	
};
