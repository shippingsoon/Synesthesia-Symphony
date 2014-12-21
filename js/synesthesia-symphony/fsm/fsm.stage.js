/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/
	
var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};

//Stage state.
FSM.Stage = (function(fsm, stg, resource) {
	"use strict";
	
	function Stage(options) {
		var state = new fsm.State({});
		var player = new fsm.Player({x:80});
		var enemies = [];
		var layers = resource.layers;
		var sprites = resource.sprites;
		
		/*
		 * Initiate this state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Handle events for this state.
			window.addEventListener('keydown', game.fsm.controller, false);
			
			//Add the player substate.
			state.setSubstates(player.state);
			
			//Add the enemy substates.
			for (var enemy_count = 0; enemy_count < 20; enemy_count++) {
				//Create several enemies at random locations.
				enemies.push(new fsm.Enemy({
					x:Math.floor((Math.random() * 500) + 40),
					y:Math.floor((Math.random() * 300) + 20)
				}));
				state.setSubstates(enemies[enemy_count].state);
			}
			
			//Used for debugging.
			window.addEventListener('mousemove', function(e) {
				for (var i = 0; i < 8; i++) {
					//var rect = game.ctx.canvas.getBoundingClientRect();
					//var image_data = layers.odd.ctx.getImageData(-40 + e.clientX - rect.left, -20 + e.clientY - rect.top, 1, 1);
					//var data = image_data.data;
					//console.log(data);
				}
				
			}, false);
		};
		
		var cy = 20;
		
		state.update = function(game) {
			
			if (cy === 560)
				cy = 0;
			cy += 5;
		};
		
		state.render = function(game) {
			//Draw the canvas image.
			game.ctx.drawImage(
				sprites.canvas_bg,
				40,
				cy,
				480 - 40,
				560
			);
			
			game.ctx.drawImage(
				sprites.canvas_bg,
				40,
				cy - 560,
				480 - 40,
				560
			);
			
			//Draw the background image.
			game.ctx.drawImage(sprites.stages_bg[0], 0, 0);
		};
		
		/*
		 * Stop this state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			//Remove the event.
			window.removeEventListener('keydown', game.fsm.controller, false);
		};

		//Return an instance of this state.
		return state;
	}
	
	return Stage;
}(FSM, STG, Resource));