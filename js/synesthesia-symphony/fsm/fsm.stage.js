/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/
	
var FSM = FSM || {};

//Stage state.
FSM.Stage = (function(fsm, stg) {
	"use strict";
	
	function Stage(options) {
		var state = new fsm.State({});
		var player = new fsm.Player({x:80});
		var enemies = [];
		var test_height = 5000;
		
		
		//The images.
		var sprites = {
			//Background image.
			stage_bg: document.getElementById('stage-bg'),
			
			//Canvas textured background image.
			canvas_bg: document.getElementById('canvas-bg'),
		};
		
		sprites.canvas_bg.x = 0;
		sprites.canvas_bg.y = 0;
		
		//The drawing layers.
		var layers = {
			//Buffer layer. All layers will be drawn to this layer before it is draw to the screen layer.
			buffer: document.getElementById('buffer-layer'),
			
			//Even paint layer. The paint trails will be drawn on this layer.
			even: document.getElementById('even-layer'),
			
			//Odd paint layer. The paint trails will be drawn on this layer.
			odd: document.getElementById('odd-layer'),
		};
		
		//Initiate the drawing layers.
		for (var layer in layers) {
			//Set the width and height of the layers.
			layers[layer].width = 480;
			layers[layer].height = 560;
			
			//Set the x and y coordinates of the layers.
			layers[layer].x = 0;
			layers[layer].y = 0;
			
			//Get the 2D context for drawing the layer.
			layers[layer].ctx = layers[layer].getContext('2d');
		}
		
		//Draw the canvas sprite on to the odd and even layers.
		layers.odd.height = test_height;
		layers.odd.ctx.drawImage(sprites.canvas_bg, 0, 0, 480, 560);
		layers.even.ctx.drawImage(sprites.canvas_bg, 0, 0, 480, 560);
		
		
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
					var rect = game.ctx.canvas.getBoundingClientRect();
					var image_data = layers.odd.ctx.getImageData(-40 + e.clientX - rect.left, -20 + e.clientY - rect.top, 1, 1);
					var data = image_data.data;
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
		
		/*
			if (bullet.color != player.color) {
				if (bullet.collision(this, player)) {
					player.colorCollision();
				}
					
			}
		*/
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
			game.ctx.drawImage(sprites.stage_bg, 0, 0);
			
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
}(FSM, STG || {}));