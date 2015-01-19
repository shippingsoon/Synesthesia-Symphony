/*
	@description - Save session submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};

//Saves the current session.
Session.save = (function(globals, system, $) {
	"use strict";
	
	/*
	 * Saves the current session.
	 */
	function save() {
		var session = {
			hiscore: system.Config.hiscore,
			resolution: system.Config.resolution.selection
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
					if (system.Config.DEBUG)
						console.log(data);
				}
			});
		}
	}

	return save;
}(window, System, jQuery)); 
