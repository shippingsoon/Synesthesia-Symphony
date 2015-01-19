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
FSM.Stage = (function(globals, fsm, stg, resource, system, midi, $) {
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
		
		//The paused state.
		var pauseState = new fsm.Pause({});
		
		var color_map = resource.color_map;
		
		//Our player.
		resource.player = new fsm.Player({
			x: 250,
			y: 380,
			ctx: layers.buffer.getContext(),
			target: stg.targets.enemies,
			colors: [new stg.Color(color_map[9].getColor()), new stg.Color(color_map[7].getColor())],
			lives: 5,
			lineWidth: 3,
			patterns: [{
					method: 'Circular',
					ctx: layers.buffer.getContext(),
					max_bullets: 1,
					offsets: {x: 10, y: -10},
					padding: 0,
					degrees: 90,
					radii: [4],
					speeds: [18],
					delay: 0,
					rate: 100,
					rotation: 0
				}, {
					method: 'Circular',
					ctx: layers.buffer.getContext(),
					max_bullets: 1,
					offsets: {x: -10, y: -10},
					padding: 0,
					degrees: 90,
					radii: [4],
					speeds: [18],
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
		var mplayer = midi.Player;
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Builds the piano.
			stg.Stage.buildPiano(state);
			
			//Load the stage music.
			midi.loadPlugin({
				soundfontUrl: './soundfont/',
				//instruments: ['bright_acoustic_piano', 'synth_bass_1', 'lead_1_square', 'synth_bass_2', 'lead_2_sawtooth', 'synth_strings_1', 'electric_guitar_jazz'],
				instruments: [
					'electric_bass_finger', 'rock_organ', 'rock_organ', 'pad_7_halo', 'tuba', 'french_horn',
					'string_ensemble_2', 'dulcimer', 'pad_8_sweep', 'tuba', 'electric_piano_2', 'whistle', 'dulcimer'
				],
				callback: function(data) {
					//Change the program and patch.
					//http://en.wikipedia.org/wiki/General_MIDI#Program_change_events
					/*
					midi.programChange(0, 1);
					midi.programChange(1, 38);
					midi.programChange(3, 80);
					midi.programChange(2, 39);
					midi.programChange(4, 81);
					midi.programChange(5, 50);
					midi.programChange(6, 26);
					*/
					
					midi.programChange(0, 33); //Program (patch) change ::  Channel 0.  Patch 33 (Electric Bass(finger))
					midi.programChange(1, 18); //Program (patch) change ::  Channel 1.  Patch 18 (Rock Organ)
					midi.programChange(2, 18); //Program (patch) change ::  Channel 2.  Patch 18 (Rock Organ)
					midi.programChange(3, 94); //Program (patch) change ::  Channel 3.  Patch 94 (Pad 7 (halo))
					midi.programChange(4, 58); //Program (patch) change ::  Channel 4.  Patch 58 (Tuba)
					midi.programChange(5, 60); //Program (patch) change ::  Channel 5.  Patch 60 (French Horn)
					midi.programChange(6, 49); //Program (patch) change ::  Channel 6.  Patch 49 (String Ensemble 2)
					midi.programChange(7, 15); //Program (patch) change ::  Channel 7.  Patch 15 (Dulcimer)
					midi.programChange(8, 95); //Program (patch) change ::  Channel 8.  Patch 95 (Pad 8 (sweep))
					midi.programChange(10, 58); //Program (patch) change ::  Channel 10.  Patch 58 (Tuba)
					midi.programChange(11, 5); //Program (patch) change ::  Channel 11.  Patch 5 (Electric Piano 2)
					midi.programChange(12, 78); //Program (patch) change ::  Channel 12.  Patch 78 (Whistle)
					midi.programChange(13, 15); //Program (patch) change ::  Channel 13.  Patch 15 (Dulcimer)
					
					//Set the volume.
					midi.setVolume(0, config.volume);
					
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the stage music.
					//mplayer.loadFile('/synesthesia-symphony/midi/green-hill.mid', mplayer.start);
					mplayer.loadFile('/synesthesia-symphony/midi/sky-chase-zone.mid', mplayer.start);
					
					//MIDI event listener.
					mplayer.addListener(function (data) {
						var event = new CustomEvent('onNote-' + data.note, {'detail': data});
						globals.dispatchEvent(event);
					});
				}
			});
			
			//Handle events for this state.
			globals.addEventListener('keyup', game.fsm.controller, false);
			
			//If the mouse leaves the window transition into the pause state.
			globals.addEventListener('mouseout', game.fsm.controller, false);
			
			//Add the player substate.
			state.setSubstate({substate: resource.player.getState()});
			
			//Filter out inactive bullets.
			setInterval(function() {
				resource.bullets = resource.bullets.filter(function(bullet){
					return bullet.getState().isAlive();
				});
			}, 300);
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			if (mplayer.playing)
				mplayer.stop();
				
			//Remove the event.
			globals.removeEventListener('keyup', game.fsm.controller, false);
			globals.removeEventListener('mouseout', game.fsm.controller, false);
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			//Filter out inactive enemies.
			resource.enemies = resource.enemies.filter(function(enemy){
				return enemy.getState().isAlive();
			});
			
			//If the current score has passed the hiscore.
			if (config.score > config.hiscore)
				config.hiscore = config.score;
			
			//This function moves the canvas sprite's position.
			stg.Stage.conveyorBelt(canvas_vectors, sprites.canvas_bg.img.height, system.Config.canvas_scroll_rate);
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			game.ctx.drawImage(sprites.stages_bg[0].img, 0, 0);
			
			//Draw the two revolving canvas sprites on to the buffer layer.
			layers.buffer.ctx.drawImage(sprites.canvas_bg.img, 0, canvas_vectors[0].getPosition().y);
			layers.buffer.ctx.drawImage(sprites.canvas_bg.img, 0, canvas_vectors[1].getPosition().y);
			
			//This function draws various game related text on the screen.
			stg.Stage.drawStageInfo(game.ctx, resource.player);
			
			//Return a callback.
			return function () {
				//Render the buffer layer on the screen layer.
				game.ctx.drawImage(layers.buffer.canvas, 40, 20);
			};
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 */
		state.controller = function(game) {
			//Handle keyup events.
			if (game.event.keyCode) {
				switch (game.event.keyCode) {
					//Escape key is pressed transition to the pause state.
					case 27:
						game.fsm.forward({state: pauseState, ctx: game.ctx});
						break;
				}
			}
			
			//If the mouse moves off the screen go to the pause state.
			else {
				var e = (game.event) ? game.event : globals.event;
				var target = e.relatedTarget || e.toElement;
				
				//If the mouse it off the screen.
				if (!target || target.nodeName === 'HTML')
					game.fsm.forward({state: pauseState, ctx: game.ctx});
			}
		};
		
		/*
		 * When the state is resumed.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.play = function(game) {
			if (!mplayer.playing && mplayer.currentTime < mplayer.endTime)
				mplayer.resume();
			
			//Add the event listeners.
			globals.addEventListener('keyup', game.fsm.controller, false);
			globals.addEventListener('mouseout', game.fsm.controller, false);
		}
		
		/*
		 * When the state is paused.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.pause = function(game) {
			//If music is currently playing pause it.
			if (mplayer.playing)
				mplayer.pause();
			
			//Play a SFX.
			midi.noteOn(0, 60, 127, 0);
			
			//Remove the event listeners.
			globals.removeEventListener('keyup', game.fsm.controller, false);
			globals.removeEventListener('mouseout', game.fsm.controller, false);
		}
		
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
}(window, FSM, STG, Resource, System, MIDI, jQuery));