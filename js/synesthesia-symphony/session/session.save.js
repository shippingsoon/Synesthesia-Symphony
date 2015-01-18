/*
	@description - Save session submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};

//Saves a session.
Session.save = (function(globals, system, $) {
	"use strict";
	
	function save() {
		var session = {
			hiscore: system.Config.hiscore,
			resolution: system.Config.resolution
		};
		
		$.ajax({
			type: 'POST',
			url: '/synesthesia-symphony/session/save',
			data: session,
			success: function(data) {
				
			},
			error: function(data) {
				if (system.Config.DEBUG)
					console.log(data);
			}
		});
	}

	return save;
}(window, System, jQuery)); 
