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
var System = System || {};

//Stage state.
FSM.Stage = (function(fsm, stg, resource, system) {
	"use strict";
	
	function Stage(options) {
		var layers = resource.layers;
		var sprites = resource.sprites;
		var config = system.Config;
		var state = new fsm.State({});
		var player = new fsm.Player({x: 250, y: 480, ctx: layers.buffer.ctx});
		var enemies = [];
		var canvas_position = [
			{x: 0, y: 0},
			{x: 0, y: -sprites.canvas_bg.height}
		];
		
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
					x: Math.floor((Math.random() * 460) + 40),
					y: Math.floor((Math.random() * 300) + 20),
					ctx: layers.buffer.ctx
				}));
				state.setSubstates(enemies[enemy_count].state);
			}
			
			//Used for debugging.
			window.addEventListener('mousemove', function(e) {
				for (var i = 0; i < 8; i++) {
					var rect = layers.screen.getBoundingClientRect();
					var x = e.clientX - rect.left - 40;
					var y = e.clientY - rect.top - 20;
					var image_data = layers.buffer.ctx.getImageData(x, y, 1, 1);
					var data = image_data.data;
					var color = (data[0] === 0 && data[1] === 0 && data[2] === 255) ? "blue" : "unknown";
					
					console.log({x: x, y: y, color: color});	
				}
			}, false);
		};

		state.update = function(game) {
			stg.Stage.conveyorBelt(canvas_position, sprites.canvas_bg.height, 5);
		};
		
		state.render = function(game) {

			game.ctx.drawImage(sprites.stages_bg[0], 0, 0);
			layers.buffer.ctx.drawImage(sprites.canvas_bg, 0, canvas_position[0].y);
			layers.buffer.ctx.drawImage(sprites.canvas_bg, 0, canvas_position[1].y);
			
			stg.Stage.drawStageInfo(game.ctx, player);
			
			return function () {
				game.ctx.drawImage(layers.buffer, 40, 20);
			};
				
			
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
}(FSM, STG, Resource, System));