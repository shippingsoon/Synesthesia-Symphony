/*
	@description - Offline resources.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var Session = Session || {};

//Offline resources.
Session.cache = (function(globals) {
	"use strict";
	
	return {
		hiscore: 2000,
		resolution: 0,
		volume: 10,
		bgm_volume: 90,
		sfx_volume: 120,
		show_fps: true
	};
	
	/*
			
			resource.enemies.push(new fsm.Enemy({
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
					}
				],
				paths: [
					new stg.Point({x: 0, y: 0, delay: 0, speed: 10}),
					new stg.Point({x: 200, y: 200, delay: 8000, speed: 12}),
					new stg.Point({x: 700, y: 700, delay: 0, speed: 14})
				],
				loop_points: false
			}));
			
			state.setSubstate({substate: resource.enemies[0].getState()});
			
			
			
			resource.enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext(),
				lives: 20,
				target: stg.targets.player,
				patterns: [{
						ctx: layers.buffer.getContext(),
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
			
			state.setSubstate({substate: resource.enemies[1].getState()});
			
			
			resource.enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext(),
				target: stg.targets.player,
				lives: 12,
				patterns: [{
						ctx: layers.buffer.getContext(),
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
			
			state.setSubstate({substate: resource.enemies[2].getState()});
			
			resource.enemies.push(new fsm.Enemy({
				color: stg.Color({r: 0, g: 255, b: 0}),
				x: 200,
				y: 200,
				ctx: layers.buffer.getContext(),
				target: stg.targets.player,
				lives: 100,
				patterns: [{
						ctx: layers.buffer.getContext(),
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
			
			state.setSubstate({substate: resource.enemies[3].getState()});
			*/
}(window)); 
