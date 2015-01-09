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
		 
		var degreesx = 180;
		var anglex = 0;
		var speedx = 10;
		
		var degrees = 0;
		var angle = 0;
		var speed = 15;
		var padding = 10;
		
		this.state.update = function(game) {
			if (Keydown.w) {
				speedx += 1;
			}
			
			if (Keydown.s) {
				speedx -= 1;
			}
			
			if (Keydown.a) {
				degreesx -= 10;
				anglex = stg.Math.degreeToRadian({degrees: degreesx, invert: true})
				
				parent.subtract({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}
			
			if (Keydown.d) {
				degreesx += 10;
				anglex = stg.Math.degreeToRadian({degrees: degreesx, invert: true})
				
				parent.add({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}
			
			if (Keydown.q) {
				degreesx = 180;
			}
			
			if (Keydown.l) {
				anglex = stg.Math.degreeToRadian({degrees: 0.1, invert: true});
				console.log(angle);
				parent.add({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}
			
			if (Keydown.i) {
				anglex = stg.Math.degreeToRadian({degrees: 90, invert: true});
				
				parent.add({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}
			
			if (Keydown.j) {
				anglex = stg.Math.degreeToRadian({degrees: 180, invert: true});
				
				parent.add({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}
			
			if (Keydown.k) {
				anglex = stg.Math.degreeToRadian({degrees: 270, invert: true});
				
				parent.add({
					x: speedx * Math.cos(anglex),
					y: speedx * Math.sin(anglex)
				});
			}

			parent_position = parent.getPosition();
			//console.log('degreesx', degreesx, 'speedx', speedx, 'parent_position', parent_position);
			
			if (Keydown.x) {
				parent_position = parent.getPosition();
				
				for (var bullet = 0; bullet < bullets.length; bullet++) {
					bullets[bullet].setPosition({
						x: parent_position.x,
						y: parent_position.y
					});
				}
				degrees = 90;
				angle = 0;
				
				padding = 10;
			}
			
			if (Keydown.z) {
				if (once) {
					var spacer = 0;
					
					
					
					_once = false;
				}
				once = true;
			}
			
			/*
			 * Circular pattern.
			 * @param {STG.Bullet[]} - An array of STG bullets.
			 */
			function circular(options) {
				var bullets = options.bullets || [new stg.Bullet({})];
				var padding = options.padding || 10;
				var speed = options.speed || 4;
				var parent = options.parent || null;
				var invert = (options.invert === undefined);
				var degrees  = options.degrees || 180;
				var radians = 0;
				
				
				for (var bullet = 0, length = bullets.length; bullet < length; bullet++) {
						
					if (_once) {
						parent_position = parent.getPosition();
						game.fsm.setSubstate({substate: bullets[bullet].state});
						
						bullets[bullet].setPosition({
							x: parent_position.x,
							y: parent_position.y
						});
	
						
					}
					
					radians = stg.Math.degreeToRadian({degrees: degrees, invert: invert});

					bullets[bullet].velocity.add({
						x: speed * Math.cos(radians),
						y: speed * Math.sin(radians)
					});
					
					degrees += padding;
				}
			}
			
		};
		
		return this.state;
	};
	
	return Pattern;
}(FSM, STG, Resource));