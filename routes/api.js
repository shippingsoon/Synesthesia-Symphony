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
			var public_models = ['users', 'user_groups'];
			
			if (id && public_models.indexOf(model) !== -1) {
				models[model]
					.findById(id)
					.then(function(result) {
						response.json(result ? [result.dataValues] : []);
					})
					.catch(function(error) {  
						if (config.debug)
							console.log("error: %s", error);
						
						response.status(404).render('404', {title: '404 Not Found'});
					});
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
			var offset = parseInt(request.params.offset) || 0;
			var limit = parseInt(request.params.limit) || 10;
			var order = parseInt(request.params.order);
			var public_models = ['users', 'user_groups'];

			if (public_models.indexOf(model) !== -1) {
				models[model]
					.findAll(/*{offset: offset, limit: limit}*/)
					.then(function(result) {
						response.json(result);
					}).catch(function(error) {
						if (config.debug)
							console.log("error: %s", error);
						
						response.status(404).render('404', {title: '404 Not Found'});
					});
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
			var public_models = ['users', 'user_groups'];
			//console.dir(request.body);	
			
			if (request.body) {
				models[model].upsert(request.body)
					.then(function(result) {
						response.json({});
					})
					.catch(function(error) {
						if (config.debug)
							console.log("error: %s", error);
							
						response.status(404).render('404', {title: '404 Not Found'});
					});
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
			var public_models = ['users', 'user_groups'];
			
			if (public_models.indexOf(model) !== -1) {
				models[model].truncate({cascade: true})
					.then(function(result) {
						response.json({});
					})
					.catch(function(error) {
						if (config.debug)
							console.log("error: %s", error);
						
						response.status(404).render('404', {title: '404 Not Found'});
					});
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
			var id = request.params.id;
			var public_models = ['users', 'user_groups'];
			
			if (id && public_models.indexOf(model) !== -1) {
				models[model].destroy({id: id})
					.then(function(result) {
						response.json({res: result});
						
					})
					.catch(function(error) {
						if (config.debug)
							console.log("error: %s", error);
						
						response.status(404).render('404', {title: '404 Not Found'});
					});
			}
			else
				response.status(404).render('404', {title: '404 Not Found'});
		}
	};
};
