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
FSM.Stage = (function(globals, fsm, stg, resource, system) {
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
		//A reference to the current object.
		var that = this;
		
		//The stage's state.
		var state = new fsm.State({parent: that});
		
		//An array to hold the enemies.
		var enemies = [];
		
		//Enum targets.
		var targets = {player: 0, enemies: 1};
		
		//Our player.
		var player = new fsm.Player({
			x: 250,
			y: 380,
			ctx: layers.buffer.getContext().ctx,
			target: targets.enemies,
			lives: 5,
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
		
		//The position vector for the two revolving canvas sprites.
		var canvas_vectors = [
			new stg.Vector({x: 0, y: 0}),
			new stg.Vector({x: 0, y: -sprites.canvas_bg.img.height})
		];
		
		//Music player.
		var mplayer = MIDI.Player;
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
		
			var synesthesia = MusicTheory.Synesthesia;
			var map = synesthesia.map('D. D. Jameson (1844)');
			var offset = 0;
			var notes = [];
			var white_margin = 480 / 51;
			var is_sharp = false;
			var sharp_count = [];
			
			//Zero is for white keys and one is for black keys.
			var colors = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
			
			for (var note = 0x15; note < 0x6C; note++) {
				is_sharp = colors[note % 12] === 1;
				
				notes.push(
					new stg.Note({
						ctx: layers.buffer.getContext().ctx,
						x: ((is_sharp) ? offset - 3 : offset),
						y: 0,
						w: ((is_sharp) ? white_margin / 1.5 : white_margin),
						h: (is_sharp) ? 10 : 20,
						color: map[note % 12].hex,
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
			for (var note = 0; note < notes.length; note++) {
				if (!sharp_count[note])
					state.setSubstate({substate: notes[note].getState()});
			}
			
			//Load the black keys.
			for (var note = 0; note < notes.length; note++) {
				if (sharp_count[note])
					state.setSubstate({substate: notes[note].getState()});
			}
			
			//*
			//Load the stage music.
			MIDI.loadPlugin({
				soundfontUrl: './soundfont/',
				//instruments: ['bright_acoustic_piano', 'synth_bass_1', 'lead_1_square', 'synth_bass_2', 'lead_2_sawtooth', 'synth_strings_1', 'electric_guitar_jazz'],
				instruments: ['acoustic_grand_piano', 'bright_acoustic_piano', 'synth_bass_1', 'violin', 'viola', 'cello'],
				callback: function(data) {
					
					//Change the program and patch.
					//http://en.wikipedia.org/wiki/General_MIDI#Program_change_events
					/*
					MIDI.programChange(0, 1);
					MIDI.programChange(1, 38);
					MIDI.programChange(3, 80);
					MIDI.programChange(2, 39);
					MIDI.programChange(4, 81);
					MIDI.programChange(5, 50);
					MIDI.programChange(6, 26);
					*/
					MIDI.programChange(0, 0);
					MIDI.programChange(1, 1);
					/*
					MIDI.programChange(0, 40);
					MIDI.programChange(1, 42);
					*/
					
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the stage music.
					//mplayer.loadFile('/synesthesia-symphony/midi/green-hill.mid', mplayer.start);
					mplayer.loadFile('/synesthesia-symphony/midi/still-alive.mid', mplayer.start);
					//MIDI event listener.
					mplayer.addListener(function (data) {
						console.log(data);
						
						//for (var note = 0; note < notes.length; note++) {
						//	if (notes[note].listen(data))
						//		break;
						//}
						
						var event = new CustomEvent('onNote-' + data.note, {'detail': data});
						globals.dispatchEvent(event);
					});
				}
			});
			//*/
			
			//Add the player substate.
			state.setSubstate({substate: player.getState()});
			return;
			
			enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext().ctx,
				lives: 10,
				target: targets.player,
				patterns: [{
						method: 'Circular',
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 5,
						padding: 10,
						degrees: 270,
						radii: [8, 4],
						speeds: [5],
						colors: ['pink', 'red'],
						delay: 2000,
						rate: 100,
						duration: 30,
						rotation: 10,
					}, {
						method: 'Circular',
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 5,
						padding: 10,
						degrees: 270,
						radii: [8, 4],
						speeds: [5],
						colors: ['red', 'pink'],
						delay: 2000,
						rate: 100,
						duration: 30,
						rotation: -10
					}
				],
				paths: [
					new stg.Point({x: 0, y: 0, delay: 0, speed: 10}),
					new stg.Point({x: 200, y: 200, delay: 8000, speed: 12}),
					new stg.Point({x: 700, y: 700, delay: 0, speed: 14})
				],
				loop_points: false
			}));
			
			state.setSubstate({substate: enemies[0].getState()});
			
			
			
			enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext().ctx,
				lives: 20,
				target: targets.player,
				patterns: [{
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 30,
						padding: 10,
						degrees: 10,
						radii: [10, 5],
						speeds: [12, 24, 2],
						rotation: 10,
						colors: ['red', 'yellow', 'black'],
						rate: 100,
						delay: 15000
					}
				],
				paths: [
					new stg.Point({x: 0, y: -200, delay: 12000, speed: 10}),
					new stg.Point({x: 300, y: 200, delay: 3000, speed: 12}),
					new stg.Point({x: 300, y: 100, delay: 3000, speed: 12}),
					new stg.Point({x: 700, y: 0, delay: 0, speed: 14})
				],
				loop_points: false
			}));
			
			state.setSubstate({substate: enemies[1].getState()});
			
			
			enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext().ctx,
				target: targets.player,
				lives: 12,
				patterns: [{
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 4,
						padding: 40,
						degrees: 0,
						radii: [12, 16, 12, 8],
						speeds: [10, 8, 6, 4],
						rotation: 20,
						colors: ['green', 'red'],
						rate: 1060,
						is_opens: [true, false, false, false],
						duration: 20,
						delay: 24000
					}
				],
				paths: [
					new stg.Point({x: -100, y: 200, delay: 24000, speed: 10}),
					new stg.Point({x: 400, y: 200, delay: 2000, speed: 12}),
					new stg.Point({x: 300, y: 100, delay: 3000, speed: 12}),
					new stg.Point({x: 700, y: 0, delay: 0, speed: 14})
				],
				loop_points: false
			}));
			
			state.setSubstate({substate: enemies[2].getState()});
			
			enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext().ctx,
				target: targets.player,
				lives: 100,
				patterns: [{
						ctx: layers.buffer.getContext().ctx,
						max_bullets: 27,
						padding: 18,
						degrees: 180,
						radii: [10, 5],
						speeds: [8, 4],
						rotation: 30,
						colors: ['green', 'red'],
						rate: 200,
						is_opens: [false],
						duration: 2000,
						delay: 32000
					}
				],
				paths: [
					new stg.Point({x: -20, y: -20, delay: 32000, speed: 10}),
					new stg.Point({x: 400, y: 200, delay: 5000, speed: 12}),
					new stg.Point({x: 20, y: 100, delay: 6000, speed: 12}),
					new stg.Point({x: 460, y: 290, delay: 3000, speed: 14})
				],
				loop_points: true
			}));
			
			state.setSubstate({substate: enemies[3].getState()});
			
		};

		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			//Filter out inactive enemies.
			enemies = enemies.filter(function(enemy){
				return enemy.getState().isAlive();
			});
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
		 * Retrieves target objects.
		 * @param {Number} _target - Set to 0 to retrieve the player and 1 to retrieve enemies.
		 */
		this.getTargets = function(_target) {
			var target = _target || 0;
			
			if (target === targets.player)
				return {player: player};
				
			else if (target === targets.enemies)
				return {enemies: enemies};
			
			else
				return {player: player, enemies: enemies};
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
}(window, FSM, STG, Resource, System));