/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Home page.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - .
 * @return {Undefined}
 */
module.exports.home = function(req, res, next) {
	debugger;
	var base_url = req.protocol + '://' + req.hostname + ':' + req.app.server.address().port + '/';
	res.render('index', {title: 'Index | ', base_url: base_url});
};
