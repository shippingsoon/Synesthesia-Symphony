/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

'use strict';

//Load 1st party modules.
var server_utils = require('server_utils');

/*
 * Retrieve data from a model by the primary ID.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.getById = function(req, res, next) {
	var models = req.app.get('models');
	var model = req.params.model;
	var id = parseInt(req.params.id);

	if (models[model] && id) {
		models[model]
			.findById(id)
			.then(function(result) {
				(result)
					? res.status(200).json([result.dataValues])
					: res.status(404).json([]);
			})
			.catch(server_utils.errorHandler);
	}
	else
		res.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Retrieve data from a model. Accepts offset, limit and order.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.getModel = function(req, res, next) {
	var models = req.app.get('models');
	var model = req.params.model;
	var conditions = {
		offset: parseInt(req.params.offset) || 0,
		limit: parseInt(req.params.limit) || null,
		order: req.params.order || null 
	};
	
	if (models[model]) {
		models[model]
			.findAll(conditions)
			.then(function(result) {
				(result)
					? res.status(200).json(result)
					: res.status(404).json([]);
			})
			.catch(server_utils.errorHandler);
	}
	else
		res.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Insert or update a record.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.upsertModel = function(req, res, next) {
	var models = req.app.get('models');
	var model = req.params.model;
	
	if (models[model] && req.body) {
		models[model].upsert(req.body)
			.then(function(result) {
				res.status((result) ? 200 : 404).json({});
			})
			.catch(server_utils.errorHandler);
	}
	else
		res.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Drops all records.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.dropModel = function(req, res, next) {
	var models = req.app.get('models');
	var model = req.params.model;
	
	if (models[model]) {
		models[model].truncate({cascade: true})
			.then(function(result) {
				res.status((result) ? 200 : 404).json({});
			})
			.catch(server_utils.errorHandler);
	}
	else
		res.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Drop record by ID.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.dropById = function(req, res, next) {
	var models = req.app.get('models');
	var model = req.params.model;
	var id = parseInt(req.params.id);
	
	if (models[model] && id && models[model].primaryKeyCount === 1) {
		var condition = {};
		var primary_key = models[model].primaryKeyField;
		condition[primary_key] = id;
		
		models[model]
			.destroy({force: true, where: condition})
			.then(function(affected_rows) {
				res
					.status((affected_rows > 0) ? 200 : 404)
					.json({affected_rows: affected_rows});
			})
			.catch(server_utils.errorHandler);
	}
	else {
		res
			.status(404)
			.render('404', {title: '404 Not Found'});
	}
};
