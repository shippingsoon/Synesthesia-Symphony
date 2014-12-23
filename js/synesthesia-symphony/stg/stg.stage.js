/*
	@description - Synesthesia Symphony's sub module for stage states.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var STG = STG || {};
var System = System || {};

//This sub module handles common functions related to the stage states.
STG.Stage = (function(globals, system, stg) {
	"use strict";
	
	return {
		/*
		 * Draws the stage difficulty, the player's lives, and the score text.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 * @param {Object||Player} player - The player object.
		 */
		drawStageInfo: function(ctx, player) {
			var config = system.Config;
			var mode = config.difficulty.mode;
			var difficulty = config.difficulty.titles[mode];
			var pad = "000000000";
			var hiscore = config.hiscore.toString();
			var score = config.score.toString();
			var lives = "";
			
			//Left pad the scores with zeroes.
			hiscore = pad.substring(0, pad.length - hiscore.length) + hiscore;
			score = pad.substring(0, pad.length - score.length) + score;
			
			//Use the player's lives to determine how much unicode stars we will draw.
			for (var live = 0; live < player.lives; live++)
				lives += ' \u2B51'
			
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
				message: 'Player ' + lives,
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
			
			//Draw the player's power.
			stg.Canvas.Text({
				x: 660 + 6, y: 205,
				message: 'Power  ' + player.power.toFixed(2) + ' / 4.00',
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'center',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			});
		},
		
		//Keeps track of which canvas sprite should be pushed to the top of the conveyor belt.
		is_odd_belt: true,
		
		/*
		 * Moves the canvas background. To move the background we uses two alternating canvas sprites to create the illusion of seamless movement.
		 * @param {Object|Array} canvas_position - An array of two objects containing the x and y coordinates of the canvas sprites to be drawn. 
		 * @param {Number} height - The height of the canvas sprite.
		 * @param {Number} speed - The speed in which we will be moving the canvas sprite on the conveyor belt.
		 */
		conveyorBelt: function(canvas_position, height, speed) {
			//Determine
			var index = (this.is_odd_belt) ? 0 : 1;
			
			//If this canvas' position is off the stage, then we will move it back to the top of the stage.
			if (canvas_position[index].y === height) {
				canvas_position[index].y = -height;
				this.is_odd_belt = !this.is_odd_belt;
			}
			
			//Move the canvas sprite along the conveyor belt.
			canvas_position[0].y += speed;
			canvas_position[1].y += speed;
		},
		
	};
}(window, System, STG)); 