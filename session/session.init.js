/*
 * @description - This submodule initiates resources.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};
var Resource = Resource || {};

/*
 * This submodule initiates resources.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {Resource} resource - Resource module.
 * @return {Function}
 */
Session.init = (function(globals, system, resource) {
	'use strict';
	
	/*
	 * Initiate resources.
	 * @param {Object} data - The data we will use to initiate the resources.
	 * @return {Undefined}
	 */
	function init(data) {
		//Load the session.
		system.hiscore = data.hiscore;
		system.resolution_idx = data.resolution_idx;
		system.volume = data.volume;
		system.bgm_volume = data.bgm_volume;
		system.sfx_volume = data.sfx_volume;
		system.show_fps = data.show_fps;
	}
	
	return init;
}(window, System, Resource));