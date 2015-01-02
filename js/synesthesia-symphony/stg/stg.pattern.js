/*
	@description - Pattern submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/synesthesia-symphony/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};

//Pattern submodule.
STG.Pattern = STG.Pattern || (function(fsm, stg) {
	"use strict";
	
	 /*
	  * Pattern constructor.
	  * @param {Object} options
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
		
		this.state.start = function(game) {
			var parent = this.state.getParent();
			var parent_position = parent.getPosition();
			
			for (var bullet = 0; bullet < MAX_BULLETS; bullet++) {
				bullets.push(new stg.Bullet({
					x: parent_position.x,
					y: parent_position.y,
					color: stg.Color(255, 255),
					ctx: ctx,
					radius: 50
				}));
			}
		};
		
		//Update the pattern.
		this.state.update = function(game) {
			
			if (Keydown.x) {
				for (var bullet = 0; bullet < bullets.length; bullet++) {
					bullets[bullet].position.setPosition({
						x: position.getPosition().x,
						y: position.getPosition().y
					});
				}
			}
			
			if (Keydown.z) {
				
				if (once) {
					var offset = 0;
					var s = 10;
					var angle = angle || 0;
					var padding = 30;
					var degrees = 90;
					//var a = (degrees - (( bullets.length * padding) / 2) + (padding / 2));
					//var a = degrees / (3 * padding);
					var a = -90; padding = 45;
					for (var bullet = 0, length = bullets.length; bullet < length && bullet < 3; bullet++) {
						if (_once) {
							game.fsm.setSubstate({substate: bullets[bullet].state});
							bullets[bullet].speed = 10;
							bullets[bullet].position.setPosition({
								x: position.getPosition().x + 0,
								y: position.getPosition().y - 10
							});
							
						}
						//bullets[bullet].speed += 0.2;
						
						//angle = stg.Math.degreeToRadian(a, true);
						angle = stg.Math.degreeToRadian({degrees: 90, invert: true});
						
						bullets[bullet].setRadius(10);
						

						bullets[bullet].position.add({
							x: bullets[bullet].speed * Math.cos(angle),
							y: bullets[bullet].speed * Math.sin(angle)
						});
						
						a += padding;
						
					}
					_once = false;
				}
				once = true;
			}
			
		};
		
	};
	
	return Pattern;
}(FSM, STG));