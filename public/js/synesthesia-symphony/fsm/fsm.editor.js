/*
 * @description - Editor state.
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
var Session = Session || {};
/*
 * Editor state.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Object} resource - Resource module.
 * @param {System} system - System module.
 * @param {MIDI} midi - MIDI.js library.
 * @param {Shape} shape - Shape module.
 * @param {Vector} vector - Vector module.
 * @param {Character} character - Character module.
 * @param {Object} $ - jQuery library.
 * @param {Object} session - Session module.
 * @return {Function}
 */
FSM.Editor = (function(globals, fsm, stg, resource, system, midi, shape, vector, character, $, session) {
	'use strict';

	/*
	 * Editor state.
	 * @param {FSM} options - TBA
	 * @return {Undefined}
	 */
	function Editor(options) {
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
		var mouse = new vector({x: 0, y: 0});
		var enemies = [];
		var waypoints = [];

		//The position vector for the two revolving canvas sprites.
		var canvas_vectors = [
			new vector({x: 0, y: 0}),
			new vector({x: 0, y: -sprites.canvas.img.height})
		];
		
		//Music player.
		var mplayer = midi.Player;

		/*
		 * Sets the mouse location relative to the canvas.
		 * @param {Object} event - Mouse event.
		 * @return {Undefined}
		 */
		function setMouse(event) {
			var canvas_element = $(this).offset();
			
			mouse.setPosition({
				x: (event.pageX - canvas_element.left) - 40,
				y: (event.pageY - canvas_element.top) - 20
			});
			
			//console.clear();
			//console.log("Mouse (%s, %s)", mouse.x, mouse.y);
		}

		/*
		 * Saves a new enemy.
		 * @param {Vector} mouse - Mouse vector coordinates.
		 * @return {Undefined}
		 */
		function addEnemy(mouse) {
			var enemy = {
				//user_id: 1,
				user_group_id: 10,
				user_name: 'Joe Smith2',
				email_address: 'joe2@gmail.gov',
				password: 't3stInG13423sdfsfs@!',
				salt: '3$#$@#$efdfdsfs',
				date_added: new Date(1990, 6, 22)
			};
			
			//$.post(session.base_url('set/create/users'), enemy, function(data) {
			//	console.log("success: %s", data);
			//});
			
			$.ajax({
				type: 'POST',
				url: session.base_url('set/create/users'),
				data: JSON.stringify(enemy),
				dataType: 'json',
				contentType: 'application/json',
				success: function(new_enemy) {
					if (new_enemy.user_id) {
						enemies.push(new_enemy);
						
					}
					console.log("success: %s", data);
				}
			});
			//console.log("added enemy");
		}

		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			//Handle events for this state.
			globals.addEventListener('keydown', game.fsm.controller, false);
			
			//Mouse event.
			$('.synesthesia-symphony').on('mousemove', setMouse);
			
			//Show mouse cursor.
			$('.synesthesia-symphony').css('cursor', 'pointer');
			
			//Initialize the conveyor belt.
			stg.Stage.is_odd_belt = true;
			
			//General context menu.
			var general_menu = {
				items: {
					add: {name: 'Add Enemy', icon: 'add', callback: function() {addEnemy(mouse);}},
					save: {name: 'Save', icon: 'quit'}
				}
			};
			
			//Context menu for managing enemies.
			var enemy_menu = {
				items: {
					edit: {name: 'Edit', icon: 'edit'},
					cut: {name: 'Cut', icon: 'cut'},
					add: {name: 'Add Waypoint', icon: 'add'},
					delete: {name: 'Delete', icon: 'delete'}
				}
			};
			
			//Context menu for managing enemy waypoints.
			var waypoint_menu = {
				items: {
					cut: {name: 'Cut', icon: 'cut'},
					delete: {name: 'Delete', icon: 'delete'}
				}
			};

			$.contextMenu({
				selector: '.synesthesia-symphony',
				zIndex: 1000,
				build: function($trigger, e) {
					
					//if (mouse.getPosition().y > 300)
						return general_menu;
				}
			});
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			//Remove the events.
			globals.removeEventListener('keydown', game.fsm.controller, false);
			
			//Stop the mouse event.
			$('.synesthesia-symphony').off('mousemove', false);
			
			//Hide the mouse cursor.
			$('.synesthesia-symphony').css('cursor', 'none');
			
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
			
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			//This function moves the canvas sprite's position.
			//stg.Stage.conveyorBelt(canvas_vectors, sprites.canvas.img.height, system.canvas_scroll_rate);
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
			//Add the event listeners.
			globals.addEventListener('keydown', game.fsm.controller, false);
		};
		
		/*
		 * When the state is paused.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.pause = function(game) {
			//Remove the event listeners.
			globals.removeEventListener('keydown', game.fsm.controller, false);
		};
		
		/*
		 * Return the state.
		 * @return {FSM.State}.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Editor;
}(window, FSM, STG, Resource, System, MIDI, Shape, Vector, Character, jQuery, Session));
