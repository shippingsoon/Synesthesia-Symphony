/*
 * @description - Synesthesia Symphony's submodule for stage states.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};
var STG = STG || {};
var Resource = Resource || {};

/*
 * This submodule handles common functions related to the stage states.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Resource} resource - Resource module.
 * @param {Canvas} canvas - Canvas module.
 * @param {Vector} vector - Vector module.
 * @return {Object}
 */
STG.Stage = (function(globals, system, stg, resource, canvas, vector) {
	'use strict';
	
	return {
		/*
		 * Draws the stage difficulty, the player's lives, and the score text.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 * @param {Character.Player} player - The player object.
		 * @return {Undefined}
		 */
		drawStageInfo: function(ctx, player) {
			//Various game related configuration data.
			var config = system.Config;
			
			//The name of the difficulty.
			var difficulty = system.difficulties[system.difficulty_idx].title;
			
			//The current scores.
			var hiscore = system.hiscore.toString();
			var score = system.score.toString();
			
			//The player's lives.
			var lives = player.getLives();
			var lives_text = '';
			
			//The zeroes we will use to pad the scores.
			var pad = '000000000';
			
			//Left pad the scores with zeroes.
			hiscore = pad.substring(0, pad.length - hiscore.length) + hiscore;
			score = pad.substring(0, pad.length - score.length) + score;
			
			//Use the player's lives to determine how much unicode stars we will draw.
			for (var live = 0; live < lives; live++)
				lives_text += '\uf005 ';	
			
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
			canvas.text(common);
			
			//Draw the current score.
			common.x = 575;
			common.y = 135;
			common.message = 'Score  ' + score;
			canvas.text(common);
			
			//Draw the player's lives.
			common.x = 570;
			common.y = 175;
			common.message = 'Player  ';
			canvas.text(common);
			
			//Draw the player's power.
			common.x = 570;
			common.y = 205;
			common.message = 'Power  ' + player.getPower().toFixed(2) + ' / ' + config.PLAYER.MAX_POWER.toFixed(2);
			canvas.text(common);
			
			//Draw the glaze.
			common.x = 578;
			common.y = 235;
			common.message = 'Glaze  ' + system.glaze;
			canvas.text(common);
			
			if (system.Config.DEBUG_MODE) {
				//The current time.
				common.x = ctx.canvas.width - 10;
				common.y = ctx.canvas.height - 80;
				common.message = 'Current Time: ' + stg.Audio.current_time;
				common.font =  'bold 15px arial';
				common.align = 'right';
				canvas.text(common);
				
				//The end time.
				common.x = ctx.canvas.width - 10;
				common.y = ctx.canvas.height - 60;
				common.message = 'End Time: ' + stg.Audio.end_time;
				common.font =  'bold 15px arial';
				common.align = 'right';
				canvas.text(common);
				
				//Display the total number of active bullets.
				pad = '0000';
				var bullet_string = String(resource.bullets.length);
				var bullet_count = pad.substring(0, pad.length - bullet_string.length) + resource.bullets.length;
				common.x = ctx.canvas.width - 10;
				common.y = ctx.canvas.height - 40;
				common.message = 'Bullets: ' + bullet_count;
				common.font =  'bold 15px arial';
				canvas.text(common);
			}
			
			//Display the FPS.
			if (system.show_fps || system.Config.DEBUG_MODE) {
				common.x = ctx.canvas.width - 10;
				common.y = ctx.canvas.height - 20;
				common.message = 'FPS: ' + Math.floor(system.fps).toFixed(0);
				common.font =  'bold 15px arial';
				canvas.text(common);
			}
			
			//Draw the player's lives.
			common.align = 'left';
			common.x = 656;
			common.y = 173;
			common.font = 'normal 18px FontAwesome';
			common.message = lives_text;
			canvas.text(common);
			
			//Draw the difficulty.
			common.x = 652;
			common.y = 65;
			common.align = 'center';
			common.message = difficulty;
			common.font = 'bold 28px arial';
			common.shadowColor = 'red';
			canvas.text(common);
		},
		
		//We will use this to keep track of which canvas sprite should be pushed to the top of the conveyor belt.
		is_odd_belt: true,
		
		/*
		 * Moves the canvas background. To move the background we uses two alternating canvas sprites to create the illusion of seamless movement.
		 * When one canvas has moved off the screen we will move it back to the top.
		 * @param {Vector[]} canvas_vectors - An array of two position vectors which will determine where we will draw the canvas sprites. 
		 * @param {Number} height - The height of the canvas sprite.
		 * @param {Number} speed - The rate in which we will be moving the canvas sprite on the conveyor belt.
		 * @return {Undefined}
		 */
		conveyorBelt: function(canvas_vectors, height, speed) {
			//Determine which canvas sprite should be moved to the top of the conveyor belt.
			var index = (this.is_odd_belt) ? 0 : 1;
			
			//If this canvas' position is off the stage, then we will move it back to the top of the stage.
			if (canvas_vectors[index].getPosition().y >= height) {
				//Move the canvas sprite above the stage.
				canvas_vectors[index].setPosition({y: -height});
				
				//This layer is back at the top so let's switch to the other layer.
				this.is_odd_belt = !this.is_odd_belt;
			}
			
			//Move the canvas sprite along the conveyor belt.
			canvas_vectors[0].add(speed);
			canvas_vectors[1].add(speed);
		},
		
		/*
		 * Builds the piano.
		 * @param {FSM.State} state - The state.
		 * @return {Undefined}
		 */
		buildPiano: function(state) {
			var offset = 0;
			var white_margin = 480 / 51;
			var is_sharp = false;
			var sharp_count = [];
			
			//Zero is for white keys and one is for black keys.
			var colors = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
			
			resource.notes = [];
			
			for (var note = 0x15; note < 0x6C; note++) {
				is_sharp = colors[note % 12] === 1;
				
				resource.notes.push(
					new stg.Note({
						ctx: resource.layers.buffer.getContext(),
						x: ((is_sharp) ? offset - 3 : offset),
						y: 0,
						w: ((is_sharp) ? white_margin / 1.5 : white_margin),
						h: (is_sharp) ? 10 : 20,
						color: new stg.Color(resource.color_map[note % 12].getColor()),
						note: note,
						key: MIDI.noteToKey[note],
						octave: (note - 12) / 12 >> 0,
						is_sharp: is_sharp
					}
				));
				
				sharp_count.push(is_sharp);
				
				if (!is_sharp)
					offset += white_margin;
			}
			
			//Load the white keys.
			for (var note = 0; note < resource.notes.length; note++) {
				if (!sharp_count[note])
					state.setSubstate({substate: resource.notes[note].getState()});
			}
			
			//Load the black keys.
			for (var note = 0; note < resource.notes.length; note++) {
				if (sharp_count[note])
					state.setSubstate({substate: resource.notes[note].getState()});
			}
		},
	};
}(window, System, STG, Resource, Canvas, Vector)); 