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
var Pattern = Pattern || {};

//Note submodule.
STG.Note = (function(globals, fsm, stg, resource, system, pattern) {
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
		var ctx = options.ctx || this.getContext();
		
		//Set this state's parent.
		state.setParent(that);
		
		var note = options.note || 21;
		
		var key = options.key || 'A';
		
		var octave = options.octave || 0;
		
		var is_sharp = options.is_sharp || false;
		
		var colors = [options.color || new stg.Color(255, 255, 255), ((is_sharp) ? 'black' : 'white')];
		
		var color_idx = 1;
		
		var danmaku = null;
	
		/*
		 * MIDI event listener.
		 * @param {Number} e.detail.note - MIDI note.
		 * @param {Number} e.detail.channel - MIDI channel.
		 * @param {Number} e.detail.velocity - MIDI velocity.
		 */
		function listen(e) {
			color_idx = 0;
			
			danmaku.setAutoFire(true);
			
			//Change the color index back to one.
			setTimeout(that.setColorIndex, 300, 1);
		}

		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Listen for MIDI events.
			globals.addEventListener('onNote-' + note, listen, false);

			danmaku = new pattern.Create({
				method: 'Circular',
				ctx: ctx,
				max_bullets: 3,
				offsets: {x: 0, y: 0},
				padding: 10,
				degrees: 270,
				radii: [4],
				speeds: [4],
				colors: [colors[0]],
				delay: 0,
				rate: 100,
				rotation: 10
			});
		
			state.setSubstate({
				substate: danmaku.getState(), 
				parent: that
			});
			
			danmaku.setAutoFire(false);
		};
		
		/*
		 * Stop the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			//Remove the event listener.
			globals.removeEventListener('onNote-' + note, listen, false);
		};
		
		/*
		 * Draw the note.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//console.log('colors', colors);
			if (ctx)
				that.draw({ctx: ctx, color: colors[color_idx]});
			//color_idx = 1;
		};
		
		/*
		 * Update the bullet's location.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			
		};
		
		/*
		 * Sets the color index.
		 * @param {Number} _color_idx - Set the index of the colors array.
		 */
		this.setColorIndex = function(_color_idx) {
			color_idx = _color_idx;
			danmaku.setAutoFire(false);
		}
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Note.prototype = Object.create(stg.Square.prototype);
	
	return Note;
}(window, FSM, STG, Resource, System, Pattern));