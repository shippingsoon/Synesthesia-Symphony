/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Index routes.
 * @param {Object} models - Sequelize models.
 * @param {Object} express - Express.js application.
 * @param {Object} config - Server configuration.
 * @return {Function}
 */

module.exports = function(models, express, config) {
	return {
		/*
		 * Home page.
		 * @param {Object} request - Server request.
		 * @param {Object} response - Server response.
		 * @param {Function} next - .
		 * @return {Undefined}
		 */
		home: function(request, response, next) {
			response.render('index', { title: 'Index | '});
		}
	};
};
