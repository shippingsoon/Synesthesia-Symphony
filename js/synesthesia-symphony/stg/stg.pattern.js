/*
	@description - Pattern submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};

//Pattern submodule.
STG.Pattern = (function(fsm, stg, resource) {
	"use strict";
	
	var layers = resource.layers;
	
	 /*
	  * Pattern constructor.
	  * @param {Object} options - TBA
	  */
	function Pattern(options) {
		//A reference to the current object.
		var that = this;
		
		//The pattern's state.
		this.state = new fsm.State(options);
		
		var once = true;
		var _once = true;
		var counter = 0;
		var inter = null;
		var current_time = new Date;
		var elapsed_time = new Date;
		var bullets = [];
		var MAX_BULLETS = 20;
		var parent = null;
		var parent_position = null;
		var ctx = options.ctx;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.start = function(game) {
			parent = that.state.getParent();
			//console.log(parent);
			if (parent) {
				parent_position = parent.getPosition();
				//console.log(parent_position);
				
				for (var bullet = 0; bullet < MAX_BULLETS; bullet++) {
					bullets.push(new stg.Bullet({
						x: parent_position.x,
						y: parent_position.y,
						color: stg.Color({r: 255, b: 255, g: 0}),
						ctx: ctx,
						radius: 50
					}));
					//game.fsm.setSubstate({substate: bullets[bullet].state});
				}
				
			}
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.update = function(game) {
			/*
				Sloppy experiment area.
			*/
			
			if (Keydown.x) {
				parent_position = parent.getPosition();
				
				for (var bullet = 0; bullet < bullets.length; bullet++) {
					bullets[bullet].setPosition({
						x: parent_position.x,
						y: parent_position.y
					});
				}
			}
			
			if (Keydown.z) {
				//parent = that.state.getParent();
				//console.log('parent', parent.count);
				
				
				
				if (once) {
					var offset = 0;
					var s = 10;
					//var angle = angle || 0;
					var padding = 10;
					var degrees = 90;
					//var a = (degrees - (( bullets.length * padding) / 2) + (padding / 2));
					//var a = degrees / (3 * padding);
					var angle = 90; padding = 10;
					var radian = 0;
					
					for (var bullet = 0; bullet < bullets.length; bullet++) {
						if (_once) {
							parent_position = parent.getPosition();
							game.fsm.setSubstate({substate: bullets[bullet].state});
							bullets[bullet].velocity.setPosition({x: 10, y: 10});
							bullets[bullet].angle = 0;
							bullets[bullet].setRadius(10);
							bullets[bullet].setPosition({
								x: parent_position.x + 0,
								y: parent_position.y - 10
							});
							
						}
						//bullets[bullet].speed += 0.2;
						
						//angle = stg.Math.degreeToRadian(a, true);
						radian = stg.Math.degreeToRadian({degrees: angle, invert: true});
						
						bullets[bullet].velocity.add(2)
						

						bullets[bullet].add({
							x: bullets[bullet].velocity.getPosition().x * Math.cos(bullets[bullet].angle),
							y: bullets[bullet].velocity.getPosition().y * Math.sin(bullets[bullet].angle)
						});
						
						bullets[bullet].angle += stg.Math.degreeToRadian({degrees: angle, invert: true});
						angle += padding;
						
						
						console.log(angle);
					}
					_once = false;
				}
				//console.log(parent_position);
				once = true;
			}
			
		};
		
		return this.state;
	};
	
	return Pattern;
}(FSM, STG, Resource));