/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var server_utils = require('server_utils');

'use strict';

/*
 * Retrieve data from a model by the primary ID.
 * @param {Object} request - Server request.
 * @param {Object} response - Server response.
 * @param {Function} next - Invokes the next handler.
 * @return {Undefined}
 */
module.exports.getById = function(request, response, next) {
	var models = request.app.get('models');
	var model = request.params.model;
	var id = parseInt(request.params.id);

	if (models[model] && id) {
		models[model]
			.findById(id)
			.then(function(result) {
				(result)
					? response.status(200).json([result.dataValues])
					: response.status(404).json([]);
			})
			.catch(server_utils.errorHandler);
	}
	else
		response.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Retrieve data from a model. Accepts offset, limit and order.
 * @param {Object} request - Server request.
 * @param {Object} response - Server response.
 * @param {Function} next - Invokes the next handler.
 * @return {Undefined}
 */
module.exports.getModel = function(request, response, next) {
	var models = request.app.get('models');
	var model = request.params.model;
	var conditions = {
		offset: parseInt(request.params.offset) || 0,
		limit: parseInt(request.params.limit) || null,
		order: request.params.order || null 
	};
	
	if (models[model]) {
		models[model]
			.findAll(conditions)
			.then(function(result) {
				(result)
					? response.status(200).json(result)
					: response.status(404).json([]);
			})
			.catch(server_utils.errorHandler);
	}
	else
		response.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Insert or update a record.
 * @param {Object} request - Server request.
 * @param {Object} response - Server response.
 * @param {Function} next - Invokes the next handler.
 * @return {Undefined}
 */
module.exports.upsertModel = function(request, response, next) {
	var models = request.app.get('models');
	var model = request.params.model;
	
	if (models[model] && request.body) {
		models[model].upsert(request.body)
			.then(function(result) {
				(result)
					? response.status(200).json({})
					: response.status(404).json({});
			})
			.catch(server_utils.errorHandler);
	}
	else
		response.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Drops all records.
 * @param {Object} request - Server request.
 * @param {Object} response - Server response.
 * @param {Function} next - Invokes the next handler.
 * @return {Undefined}
 */
module.exports.dropModel = function(request, response, next) {
	var models = request.app.get('models');
	var model = request.params.model;
	
	if (models[model]) {
		models[model].truncate({cascade: true})
			.then(function(result) {
				(result)
					? response.status(200).json({})
					: response.status(404).json({});
			})
			.catch(server_utils.errorHandler);
	}
	else
		response.status(404).render('404', {title: '404 Not Found'});
};

/*
 * Drop record by ID.
 * @param {Object} request - Server request.
 * @param {Object} response - Server response.
 * @param {Function} next - Invokes the next handler.
 * @return {Undefined}
 */
module.exports.dropById = function(request, response, next) {
	var models = request.app.get('models');
	var model = request.params.model;
	var id = parseInt(request.params.id);
	
	if (models[model] && id && models[model].primaryKeyCount === 1) {
		var condition = {};
		var primary_key = models[model].primaryKeyField;
		condition[primary_key] = id;
		
		models[model]
			.destroy({force: true, where: condition})
			.then(function(affected_rows) {
				response
					.status((affected_rows > 0) ? 200 : 404)
					.json({affected_rows: affected_rows});
			})
			.catch(server_utils.errorHandler);
	}
	else
		response.status(404).render('404', {title: '404 Not Found'});
};
