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
	
	// Narrow down locals.data.tags with req.params.tag via locals.filters.tag
	view.on('init', function(next) {
		
		if (req.params.tag) {
			keystone.list('ProjectTag').model.findOne({ key: locals.filters.tag }).exec(function(err, result) {
				locals.data.tags = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		// declare query object "q", define it below, execute it
		var q;
		if (req.params.tag) {
			q = keystone.list('Project').model.where('tags').in([locals.data.tags[0].id]);
		}
		else{
			q = keystone.list('Project').model.find();
		}
		q.exec(function(err, results) {
			console.log(results);
			locals.data.projects = results;
			next(err);
		});
		
	});

	// Load all Projects into 'projects' list (defined in keystone.js), ordered by by sortOrder
	//view.query('projects', keystone.list('Project').model.find().sort('sortOrder'));
	
	// Render views/works.hbs
	view.render('works');
	
};
