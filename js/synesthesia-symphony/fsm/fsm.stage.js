/*
	@description - Stage state.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/
	
var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var System = System || {};

//Stage state.
FSM.Stage = (function(fsm, stg, resource, system) {
	"use strict";
	
	//The HTML5 canvases.
	var layers = resource.layers;
	
	//The sprites.
	var sprites = resource.sprites;
	
	//Miscellaneous config information.
	var config = system.Config;
		
	/*
	 * Stage state.
	 * @param {FSM} options - TBA
	 */
	function Stage(options) {
		//The stage's state.
		var state = new fsm.State({});
		
		//Our player.
		var player = new fsm.Player({
			x: 250,
			y: 380,
			ctx: layers.buffer.getContext().ctx,
			patterns: [{
					method: 'Circular',
					ctx: layers.buffer.getContext().ctx,
					max_bullets: 1,
					offsets: {x: 10, y: -10},
					padding: 0,
					degrees: 90,
					radii: [4],
					speeds: [18],
					colors: ['pink'],
					delay: 0,
					rate: 100,
					rotation: 0
				}, {
					method: 'Circular',
					ctx: layers.buffer.getContext().ctx,
					max_bullets: 1,
					offsets: {x: -10, y: -10},
					padding: 0,
					degrees: 90,
					radii: [4],
					speeds: [18],
					colors: ['pink'],
					delay: 0,
					rate: 100,
					rotation: 0
				}
			],
		});
		
		//An array to hold the enemies.
		var enemies = [];
		
		//The position vector for the two revolving canvas sprites.
		var canvas_vectors = [
			new stg.Vector({x: 0, y: 0}),
			new stg.Vector({x: 0, y: -sprites.canvas_bg.img.height})
		];
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Add the player substate.
			state.setSubstate({substate: player.state});
			
			for (var enemy = 0; enemy < 1; enemy++) {
				enemies.push(new fsm.Enemy({
					color: stg.Color({r: 0, g: 255, b: 0}),
					x: 200,
					y: 200,
					ctx: layers.buffer.getContext().ctx,
					patterns: [{
						method: 'Circular',
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 18,
						offsets: {x: 0, y: 0},
						padding: 20,
						degrees: 180,
						radii: [8, 10],
						speeds: [6, 8],
						colors: ['red', 'green'],
						delay: 200,
						rate: 300,
						rotation: 10,
						duration: 3
					}],
					paths: [
						new stg.Point({x: 0, y: 0, delay: 0}),
						new stg.Point({x: 200, y: 200, delay: 0}),
						new stg.Point({x: 200, y: 800, delay: 0})
					]
				}));
				
				state.setSubstate({substate: enemies[enemy].getState()});
			}
		};

		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			//The conveyorBelt() function moves the canvas sprite's position.
			stg.Stage.conveyorBelt(canvas_vectors, sprites.canvas_bg.img.height, 5);
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			//console.log(game.ctx)
			game.ctx.drawImage(sprites.stages_bg[0].img, 0, 0);
			
			//Draw the two revolving canvas sprites on to the buffer layer.
			//var buffer_ctx = layers.buffer.getContext().xt
			layers.buffer.ctx.drawImage(sprites.canvas_bg.img, 0, canvas_vectors[0].getPosition().y);
			layers.buffer.ctx.drawImage(sprites.canvas_bg.img, 0, canvas_vectors[1].getPosition().y);
			
			//The drawStageInfo() function draws various game related text on the screen.
			stg.Stage.drawStageInfo(game.ctx, player);
			
			//Return a callback.
			return function () {
				//Render the buffer layer on the screen layer.
				game.ctx.drawImage(layers.buffer.canvas, 40, 20);
			};
		};

		/*
		 * Returns an instance of this state.
		 */
		this.getState = function() {
			return state;
		}

		//Return an instance of this state.
		return this.getState();
	}
	
	return Stage;
}(FSM, STG, Resource, System));