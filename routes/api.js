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
	var routes = {};
	var public_models = ['users', 'user_groups'];

	/*
	 * Retrieve data from a model by the primary ID.
	 * @param {Object} request - Server request.
	 * @param {Object} response - Server response.
	 * @param {Function} next - Invokes the next handler.
	 * @return {Undefined}
	 */
	routes.getById = function(request, response, next) {
		var model = request.params.model;
		var id = parseInt(request.params.id);
		
		if (id && public_models.indexOf(model) !== -1) {
			models[model]
				.findById(id)
				.then(function(result) {
					response.json(result ? [result.dataValues] : []);
				})
				.catch(function(error) {  
					if (config.debug)
						console.log("error: %s", error);
				});
		}
		else
			response.status(404).render('404', {title: '404 Not Found'});
	}
	
	/*
	 * Retrieve data from a model. Accepts offset, limit and order.
	 * @param {Object} request - Server request.
	 * @param {Object} response - Server response.
	 * @param {Function} next - Invokes the next handler.
	 * @return {Undefined}
	 */
	routes.getModel = function(request, response, next) {
		var model = request.params.model;
		var offset = parseInt(request.params.offset) || 0;
		var limit = parseInt(request.params.limit) || 10;
		var order = parseInt(request.params.order);
		
		if (public_models.indexOf(model) !== -1) {
			models[model]
				.findAll(/*{offset: offset, limit: limit}*/)
				.then(function(result) {
					response.json(result);
				}).catch(function(error) {
					if (config.debug)
						console.log("error: %s", error);
				});
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
	routes.upsertModel = function(request, response, next) {
		var model = request.params.model;
		var method = request.params.method;
		var methods = ['upsert', 'create', 'update'];
		var is_valid = (request.body && public_models.indexOf(model) !== -1 && methods.indexOf(method) !== -1); 
		
		if (is_valid) {
			debugger;
			
			models[model][method](request.body)
				.then(function(result) {
					response.json({});
				})
				.catch(function(error) {
					if (config.debug)
						console.log("error: %s", error);	
				});
		}
		else
			response.status(404).render('404', {title: '404 Not Found'});
	};
	
	return routes;
};
