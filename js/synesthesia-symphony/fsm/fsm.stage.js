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


/*
 * Stage state.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System submodule.
 * @param {MIDI} midi - MIDI.js library.
 * @return {FSM.Intro}
 */
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
			//Map the MIDI channels to a numerical MIDI instrument ID.
			//http://en.wikipedia.org/wiki/General_MIDI#Program_change_events
			var channels = {
				0: 33, 1: 18,
				2: 18, 3: 94,
				4: 58, 5: 60,
				6: 49, 7: 15,
				8: 95, 9: 116,
				10: 58, 11: 5,
				12: 78, 13: 15
			};
			
			//An array of MIDI instrument IDs.
			var instruments = stg.Audio.loadInstruments(channels);
			
			//Show the loading gif.
			resource.loading_gif.style.display = 'block';
			
			//Builds the piano.
			stg.Stage.buildPiano(state);
	
			//Add the player substate.
			state.setSubstate({substate: resource.player.getState()});
					
			//Load the stage music.
			midi.loadPlugin({
				soundfontUrl: './soundfont/',
				instruments: instruments,
				callback: function(data) {
					//Hide the loading gif.
					resource.loading_gif.style.display = 'none';
					
					//Map the MIDI channel to an instrument.
					for (var channel in channels)
						midi.programChange(channel, channels[channel]);
					
					//Set the volume.
					midi.setVolume(0, config.volume);
					
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the stage music.
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
		 * Return the state.
		 * @return {FSM.State} - An FSM state.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Stage;
}(window, FSM, STG, Resource, System, MIDI, jQuery));