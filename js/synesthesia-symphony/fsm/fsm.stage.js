/*
	@description - Stage state.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
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
			state.setSubstate(player.state);
			
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
		
		
		this.getState = function() {
			return state;
		}

		//Return an instance of this state.
		return this.getState();
	}
	
	return Stage;
}(FSM, STG, Resource, System));