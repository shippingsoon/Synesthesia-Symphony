/*
 * @description - Save session submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};

/*
 * Saves the current session.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {jQuery} $ - jQuery library.
 * @return {Function}
 */
Session.save = (function(globals, system, $) {
	'use strict';
	
	/*
	 * Saves the current session.
	 * @return {Undefined}
	 */
	function save() {
		var session = {
			hiscore: system.hiscore,
			resolution: system.resolution_idx
		};
		
		if (system.Config.ONLINE) {
			$.ajax({
				type: 'POST',
				url: '/synesthesia-symphony/session/save',
				data: session,
				dataType: 'json',
				success: function(data) {
					
				},
				error: function(data) {
					if (system.Config.DEBUG_MODE)
						console.log(data);
				}
			});
		}
	}

	return save;
}(window, System, jQuery)); 
