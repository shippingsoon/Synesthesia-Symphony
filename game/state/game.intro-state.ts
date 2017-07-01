/**
 * @file The intro state. This is the first game state that is 2nd game state that is loaded into the finite state machine. It plays the intro scene.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IStateData } from '../../system/system.types';
import { State } from '../../system/system.state';
import * as Audio from './../../audio/audio';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const MIDI: any;

/**
 * @class
 * @classdesc The intro state.
 */
export class IntroState extends State {
	public start(data: IStateData): void {
		Audio.playSong(data.session.getGameData.songs[3], MIDI, data.session.config);
		console.log('intro state');

		/*
		bg_canvas.addEventListener("webkitTransitionEnd", function(event) {
			o.fsm.push({state: new Game.State.Menu});
		}, false);

		bg_canvas.style.backgroundColor = "white";
		*/
	}

	public update(data: IStateData): void {

	}

	public draw(data: IStateData): void {

	}

	public pause(data: IStateData): void {

	}

	public play(data: IStateData): void {

	}

	public stop(data: IStateData): void {

	}
}
