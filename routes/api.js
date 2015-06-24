/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */




'use strict';

/*
 * API CRUD routes.
 * @param {Object} models - Sequelize models.
 * @param {Object} express - Express.js application.
 * @param {Object} config - Server configuration.
 * @return {Function}
 */
module.exports = function(models, express, config) {
	//The models that are access.
	var public_models = ['users', 'user_groups'];
	
	/*
	 * Logs error messages to stderr.
	 * @param {String} error - An error message.
	 * @return {Undefined}
	 */
	var errorHandler = function(error) {
		if (config.debug && error)
			//console.error("Error: %s", error);
			console.log("Error: %s", error);
	};

	return {
		/*
		 * Retrieve data from a model by the primary ID.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - Invokes the next handler.
		 * @return {Undefined}
		 */
		getById: function(request, response, next) {
			var model = request.params.model;
			var id = parseInt(request.params.id);
			var is_valid = (id && public_models.indexOf(model) !== -1);
			
			if (is_valid) {
				models[model]
					.findById(id)
					.then(function(result) {
						(result)
							? response.status(200).json([result.dataValues])
							: response.status(404).json([]);
					})
					.catch(errorHandler);
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		},
		
		/*
		 * Retrieve data from a model. Accepts offset, limit and order.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - Invokes the next handler.
		 * @return {Undefined}
		 */
		getModel: function(request, response, next) {
			var model = request.params.model;
			var conditions = {
				offset: parseInt(request.params.offset) || 0,
				limit: parseInt(request.params.limit) || null,
				order: request.params.order || null 
			};
			var is_valid = (public_models.indexOf(model) !== -1);
			
			if (is_valid) {
				models[model]
					.findAll(conditions)
					.then(function(result) {
						(result)
							? response.status(200).json(result)
							: response.status(404).json([]);
					})
					.catch(errorHandler);
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		},

		/*
		 * Insert or update a record.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - Invokes the next handler.
		 * @return {Undefined}
		 */
		upsertModel: function(request, response, next) {
			var model = request.params.model;
			
			if (request.body) {
				models[model].upsert(request.body)
					.then(function(result) {
						(result)
							? response.status(200).json({})
							: response.status(404).json({});
					})
					.catch(errorHandler);
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		},

		/*
		 * Drops all records.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - Invokes the next handler.
		 * @return {Undefined}
		 */
		dropModel: function(request, response, next) {
			var model = request.params.model;
			var is_valid = (public_models.indexOf(model) !== -1);
			
			if (is_valid) {
				models[model].truncate({cascade: true})
					.then(function(result) {
						(result)
							? response.status(200).json({})
							: response.status(404).json({});
					})
					.catch(errorHandler);
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		},

		/*
		 * Drop record by ID.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - Invokes the next handler.
		 * @return {Undefined}
		 */
		dropById: function(request, response, next) {
			var model = request.params.model;
			var id = parseInt(request.params.id);
			var is_valid = (id && public_models.indexOf(model) !== -1);
			
			if (is_valid && models[model].primaryKeyCount === 1) {
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
					.catch(errorHandler);
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		}
	};
};
