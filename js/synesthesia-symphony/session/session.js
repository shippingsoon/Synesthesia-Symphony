/*
	@description - Synesthesia Symphony's session module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var Resource = Resource || {};

//This module handles sessions.
var Session = Session || (function(globals, system, resource, $) {
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
					
					//Load the game resources.
					resource.load();
					
					//Call our main function every n frames per second.
					globals.interval = setInterval(callback, (1000 / system.Config.TARGET_FPS));
				},
				error: function(data) {
					if (system.Config.DEBUG)
						console.log(data);
					
					//Since we failed to make a connection to the server we will assume we are offline.
					system.Config.ONLINE = false;
					
					//Call our main function every n frames per second.
					globals.interval = setInterval(callback, (1000 / system.Config.TARGET_FPS));
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
					if (system.Config.DEBUG)
						console.log(data);
				}
			});
		}
	};
}(window, System, Resource, jQuery)); 
