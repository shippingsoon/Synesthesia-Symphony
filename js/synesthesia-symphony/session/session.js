/*
	@description - Synesthesia Symphony's configuration module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var Session = Session || {};
var System = System || {};

//This module handles sessions.
Session = (function(globals, system, $) {
	"use strict";
	
	return {
		//Loads a session.
		load: function(callback) {
			$.ajax({
				type: 'POST',
				url: '/session/load',
				dataType: 'json',
				success: function(data) {
					//Load the session.
					system.Config.hiscore = data.hiscore;
					system.Config.resolution = data.resolution;
					
					//Call our main function every n frames per second.
					globals.interval = setInterval(callback, (1000 / system.Config.FPS));
				},
				error: function(data) {
					if (system.Config.debug)
						console.log(data);
					
					//Call our main function every n frames per second.
					globals.interval = setInterval(callback, (1000 / system.Config.FPS));
				}
			});
		},
		
		//Saves a session.
		save: function() {
			var session = {
				hiscore: system.Config.hiscore,
				resolution: system.Config.resolution
			};
			
			$.ajax({
				type: 'POST',
				url: '/session/save',
				data: session,
				success: function(data) {
					
				},
				error: function(data) {
					if (system.Config.debug)
						console.log(data);
				}
			});
		}
	};
}(window, System, jQuery)); 
