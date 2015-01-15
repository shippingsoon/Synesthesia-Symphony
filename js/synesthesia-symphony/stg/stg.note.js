/*
	@description - Note submodule.
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

//Note submodule.
STG.Note = (function(globals, fsm, stg, resource, system) {
	"use strict";
	
	var layers = resource.layers;
	/*
	 * Note constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.width - The square's width.
	 * @param {Number} options.height - The square's height.
	 * @param {String|STG.Color} options.color - The square's color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String|STG.Color} options.strokeStyle - The outline color.
	 */
	function Note(options) {
		//Call our parent's constructor.
		stg.Square.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The note's state.
		var state = new fsm.State(options.state || {});
		
		//The 2D drawing context we will use to render the note.
		var ctx = options.ctx || this.getContext().ctx;
		
		//Set this state's parent.
		state.setParent(that);
		
		var note = options.note || 21;
		
		var key = options.key || 'A';
		
		var octave = options.octave || 0;
		
		var is_sharp = options.is_sharp || false;
		
		var colors = [options.color || 'white', ((is_sharp) ? 'black' : 'white')];
		
		var color_idx = 0;
	
		
		this.listen = function(data) {
			if (note === data.note) {
				color_idx = 0;
			}
			else
				color_idx = 1;

		}

		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			
		};
		
		/*
		 * Draw the note.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			if (ctx)
				that.draw({ctx: ctx, color: colors[color_idx]});
		};
		
		/*
		 * Update the bullet's location.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			
		};
		
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Note.prototype = Object.create(stg.Square.prototype);
	
	return Note;
}(window, FSM, STG, Resource, System));