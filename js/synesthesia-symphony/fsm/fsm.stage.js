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
		
		//Moves the canvas.
		function conveyorBelt(canvas_position, height, speed) {
			conveyorBelt.is_odd_belt = (conveyorBelt.is_odd_belt === undefined)
				? true
				: conveyorBelt.is_odd_belt;
			
			var index = (conveyorBelt.is_odd_belt) ? 0 : 1;
			
			if (canvas_position[index].y === height) {
				canvas_position[index].y = -height;
				conveyorBelt.is_odd_belt = !conveyorBelt.is_odd_belt;
			}
			canvas_position[0].y += speed;
			canvas_position[1].y += speed;
		}
		
		//Draws the game text.
		function gameInfo(ctx, player) {
			var mode = config.difficulty.mode;
			var difficulty = config.difficulty.titles[mode];
			var pad = "000000000";
			var hiscore = config.hiscore.toString();
			var score = config.score.toString();
			var lives = "";
			hiscore = pad.substring(0, pad.length - hiscore.length) + hiscore;
			score = pad.substring(0, pad.length - score.length) + score;
			
			for (var live = 0; live < player.lives; live++)
				lives += ' \u2B51'
				
			system.Config.score += 10;
			if (system.Config.score > system.Config.hiscore)
				system.Config.hiscore = system.Config.score;
			
			//Draw the difficulty.
			stg.Canvas.Text({
				x: 660, y: 65,
				message: difficulty,
				ctx: ctx, color: 'white',
				font: 'bold 28px arial', align: 'center',
				shadowColor: 'red', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
			
			//Draw the hiscore.
			stg.Canvas.Text({
				x: 660, y: 105,
				message: 'HiScore ' + hiscore,
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
			
			//Draw the current score.
			stg.Canvas.Text({
				x: 660, y: 135,
				message: '    Score ' + score,
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
				
			//Draw the player's lives.
			stg.Canvas.Text({
				x: 660 - 10, y: 175,
				message: 'Player '+lives,
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
			
			//Draw the player's power.
			stg.Canvas.Text({
				x: 660 - 34, y: 205,
				message: 'Power  1.0',
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
		}

		state.update = function(game) {
			conveyorBelt(canvas_position, sprites.canvas_bg.height, 5);
		};
		
		state.render = function(game) {

			game.ctx.drawImage(sprites.stages_bg[0], 0, 0);
			layers.buffer.ctx.drawImage(sprites.canvas_bg, 0, canvas_position[0].y);
			layers.buffer.ctx.drawImage(sprites.canvas_bg, 0, canvas_position[1].y);
			
			gameInfo(game.ctx, player);
			
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