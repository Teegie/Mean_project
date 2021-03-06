var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

app.route('/')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('articles');

		collection.find({}, {}, function(e,docs) {
			res.json(docs);
		});
	})

app.route('/article')
	.post(function(req, res) {
		var db         = req.db;
		var collection = db.get('articles');

		collection.insert(req.body, function(err, result) {
			res.send((null === err) ? { msg: '' } : { msg: err });
		});
	})

app.route('/article/:id')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('articles');

		collection.find({"_id" : req.params.id}, {}, function(e,docs) {
			res.json(docs);
		});
	})
	.delete(function(req, res) {
		var db         = req.db;
		var collection = db.get("articles");

		collection.remove({"_id" : req.params.id}, function(err) {
			res.send((null === err) ? { msg: "" } : { msg: err });
		});
	})
	.put(function(req, res) {
		var db         = req.db;
		var collection = db.get("articles");

		collection.update({"_id" : req.params.id}, {$set : req.body}, function(err, result) {
			res.send((null === err) ? { msg: "" } : { msg: err });
		});
	});

module.exports = app;
