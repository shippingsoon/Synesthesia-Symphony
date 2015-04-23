/*
 * @description - Stage state.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */
	
var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var System = System || {};
var Shape = Shape || {};

/*
 * Stage state.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Object} resource - Resource module.
 * @param {System} system - System module.
 * @param {MIDI} midi - MIDI.js library.
 * @param {Shape} shape - Shape module.
 * @param {Vector} vector - Vector module.
 * @param {Character} character - Character module.
 * @return {Function}
 */
FSM.Stage = (function(globals, fsm, stg, resource, system, midi, shape, vector, character) {
	'use strict';

	/*
	 * Stage state.
	 * @param {FSM} options - TBA
	 * @return {Undefined}
	 */
	function Stage(options) {
		//The HTML5 canvases.
		var layers = resource.layers;
		
		//The sprites.
		var sprites = resource.sprites;
		
		//The MIDI songs.
		var songs = resource.songs;
		
		//Miscellaneous config information.
		var config = system.Config;
		var that = this;
		var state = new fsm.State({parent: that});
		var pauseState = new fsm.Pause({}).getState();
		var color_map = resource.color_map;
		var songs = resource.songs;
		var interval = null;
		var has_clicked = false;
		
		//Our player.
		resource.player = new character.Player({
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
			new vector({x: 0, y: 0}),
			new vector({x: 0, y: -sprites.canvas.img.height})
		];
		
		//Music player.
		var mplayer = midi.Player;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			resource.bullets = [];
			
			//Play the background music.
			stg.Audio.playSong({
				song: songs['sky_chase_zone'],
				setAnimation: stg.Audio.replayer,
				addListener: function(data) {
					//Dispatch events to the piano keys.
					var event = new CustomEvent('onNote-' + data.note, {'detail': data});
					globals.dispatchEvent(event);
				}
			});
			
			//Builds the piano.
			stg.Stage.buildPiano(state);
	
			//Add the player substate.
			state.setSubstate({substate: resource.player.getState()});
			
			//Handle events for this state.
			globals.addEventListener('keydown', game.fsm.controller, false);
			
			//Filter out inactive bullets.
			interval = setInterval(function() {
				resource.bullets = resource.bullets.filter(function(bullet){
					return bullet.getState().isAlive();
				});
			}, 300);
			
			
			//Initialize the conveyor belt.
			stg.Stage.is_odd_belt = true;
			
			resource.enemies.push(new character.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext(),
				lives: 10,
				target: stg.targets.player,
				patterns: [{
					method: 'Circular',
					ctx: layers.buffer.getContext(),
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
					ctx: layers.buffer.getContext(),
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
				}],
				paths: [
					{x: 0, y: 0, delay: 0, speed: 10},
					{x: 200, y: 200, delay: 8000, speed: 12},
					{x: 700, y: 700, delay: 0, speed: 14}
				],
				loop_points: false,
				items: [
					{}
				]
			}));
			
			state.setSubstate({substate: resource.enemies[0].getState()});
			
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			//Stop the music.
			mplayer.stop();
				
			//Remove the events.
			mplayer.removeListener();
			mplayer.clearAnimation();
			globals.removeEventListener('keydown', game.fsm.controller, false);
			
			//Clear the interval.
			if (interval !== null) {
				clearInterval(interval);
				interval = null;
			}
			
			//Empty the resources.
			resource.bullets = [];
			resource.notes = [];
			
			//Clear the 2D rendering context.
			var ctx = layers.buffer.getContext()
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 * @return {Undefined}
		 */
		state.controller = function(game) {
			//Handle keyup events.
			if (game.event.keyCode && !has_clicked) {
				switch (game.event.keyCode) {
					//Escape key is pressed transition to the pause state.
					case 27:
						game.fsm.forward({state: pauseState, ctx: game.ctx});
						break;
				}
				
				has_clicked = true;
			}
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			if (has_clicked) {
				setTimeout(function() {
					has_clicked = false;
				}, 100);
			}
			
			//Filter out inactive enemies.
			resource.enemies = resource.enemies.filter(function(enemy){
				return enemy.getState().isAlive();
			});
			
			//If the current score has passed the hiscore.
			if (system.score > system.hiscore)
				system.hiscore = system.score;
			
			//This function moves the canvas sprite's position.
			stg.Stage.conveyorBelt(canvas_vectors, sprites.canvas.img.height, system.canvas_scroll_rate);
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			game.ctx.drawImage(sprites.stage_0.img, 0, 0);
			
			//Draw the two revolving canvas sprites on to the buffer layer.
			layers.buffer.ctx.drawImage(sprites.canvas.img, 0, canvas_vectors[0].getPosition().y);
			layers.buffer.ctx.drawImage(sprites.canvas.img, 0, canvas_vectors[1].getPosition().y);
			
			//This function draws various game related text on the screen.
			stg.Stage.drawStageInfo(game.ctx, resource.player);
			
			//Return a callback.
			return function () {
				//Render the buffer layer on the screen layer.
				game.ctx.drawImage(layers.buffer.canvas, 40, 20);
			};
		};
		
		/*
		 * When the state is resumed.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.play = function(game) {
			if (!mplayer.playing)
				mplayer.resume();
			
			has_clicked = true;
			
			//Add the event listeners.
			globals.addEventListener('keydown', game.fsm.controller, false);
		}
		
		/*
		 * When the state is paused.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.pause = function(game) {
			//If music is currently playing pause it.
			if (mplayer.playing)
				mplayer.pause();
			
			//Play a SFX.
			stg.Audio.playSfx(0, 60, 127, 0);
			
			//Remove the event listeners.
			globals.removeEventListener('keydown', game.fsm.controller, false);
		}
		
		/*
		 * Return the state.
		 * @return {FSM.State}.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Stage;
}(window, FSM, STG, Resource, System, MIDI, Shape, Vector, Character));