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
			var mode = config.difficulty.selection;
			var difficulty = config.difficulty.titles[mode];
			var pad = '000000000';
			var hiscore = config.hiscore.toString();
			var score = config.score.toString();
			var lives = player.getLives().lives;
			var lives_text = '';
			
			//Left pad the scores with zeroes.
			hiscore = pad.substring(0, pad.length - hiscore.length) + hiscore;
			score = pad.substring(0, pad.length - score.length) + score;
			
			//Use the player's lives to determine how much unicode stars we will draw.
			for (var live = 0; live < lives; live++)
				lives_text += '\uf005 ';
				//lives_text += '* ';
				//lives_text += '\u2B51 ';
				
			
			//Common settings.
			var common = {
				x: 0, y: 0,
				message: '',
				ctx: ctx,
				color: 'white',
				font: 'bold 24px arial', align: 'left',
				shadowColor: 'black', shadowBlur: 2,
				shadowoffsetX: 3, shadowoffsetY: 3,
			};
			
			//Draw the hiscore.
			common.x = 551;
			common.y = 105;
			common.message = 'HiScore  ' + hiscore;
			stg.Canvas.text(common);
			
			//Draw the current score.
			common.x = 575;
			common.y = 135;
			common.message = 'Score  ' + score;
			stg.Canvas.text(common);
			
			//Draw the player's lives.
			common.x = 570;
			common.y = 175;
			common.message = 'Player  ';
			stg.Canvas.text(common);
			
			//Draw the player's power.
			common.x = 570;
			common.y = 205;
			common.message = 'Power  ' + player.getPower().power.toFixed(2) + ' / ' + config.MAX_POWER.toFixed(2);
			stg.Canvas.text(common);
			
			//Draw the glaze.
			common.x = 578;
			common.y = 235;
			common.message = 'Glaze  ' + config.glaze;
			stg.Canvas.text(common);
			
			//Display the FPS.
			if (system.Config.DEBUG === true) {
				common.x = ctx.canvas.width - 60;
				common.y = ctx.canvas.height - 20;
				common.message = 'FPS: ' + Math.floor(system.Config.fps).toFixed(0);
				common.font =  'bold 15px arial';
				stg.Canvas.text(common);
			}
			
			//Draw the player's lives.
			common.x = 656;
			common.y = 173;
			common.font = 'normal 18px FontAwesome';
			common.message = lives_text;
			stg.Canvas.text(common);
			
			//Draw the difficulty.
			common.x = 620;
			common.y = 65;
			common.message = difficulty;
			common.font = 'bold 28px arial';
			common.shadowColor = 'red';
			stg.Canvas.text(common);
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