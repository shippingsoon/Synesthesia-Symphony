/**
 * @file The intro state. This is the first game state that is 2nd game state that is loaded into the finite state machine. It plays the intro scene.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	/**
	 * @class
	 * @classdesc The intro state.
	 */
	export class IntroState {
		public start(o:any):void {
			/*
			System.bg_canvas.addEventListener("webkitTransitionEnd", function(event) {
				o.fsm.push({state: new Game.State.Menu});
			}, false);

			System.bg_canvas.style.backgroundColor = "white";
			*/
		}

		public update(o:any):void {

		}

		public draw(o:any):void {

		}
	}
}