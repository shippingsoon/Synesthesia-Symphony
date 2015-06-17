/*
 * @description - Synesthesia Symphony's session module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};

/*
 * This module handles sessions.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @return {Object}
 */
var Session = (function(globals, system) {
	'use strict';

	var base = document.getElementsByTagName('base')[0];
	
	return {
		/*
		 * Returns the base url.
		 * @param {String} path - URI.
		 * @return {String}
		 */
		base_url: function(path) {
			path = (path) ? path.toLowerCase() : '';
			//return base.href + path;
			return 'http://localhost:21616/' + path;
		}
	};
}(window, System)); 
