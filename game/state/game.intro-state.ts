/**
 * @file The intro state. This is the first game state that is 2nd game state that is loaded into the finite state machine. It plays the intro scene.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./../../audio/audio.ts" />
/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
	declare let MIDI:any;

	/**
	 * @class
	 * @classdesc The intro state.
	 */
	export class IntroState extends System.State {
		public start(data:System.StateData):void {
			Audio.playSong(data.session.getGameData.songs[2], MIDI, data.session.config);

			/*
			System.bg_canvas.addEventListener("webkitTransitionEnd", function(event) {
				o.fsm.push({state: new Game.State.Menu});
			}, false);

			System.bg_canvas.style.backgroundColor = "white";
			*/
		}

		public update(data:System.StateData):void {

		}

		public draw(data:System.StateData):void {

		}

		public pause(data:System.StateData):void {

		}

		public play(data:System.StateData):void {

		}

		public stop(data:System.StateData):void {

		}
	}
}