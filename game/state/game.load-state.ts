/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It loads various data required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

"use strict";

import { StateData } from './../../system/system';
import { State } from './../../system/system.state';
import * as Audio from './../../audio/audio';
import { IntroState } from './../state/game.intro-state';



//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare let MIDI:any;
declare let widgets:any;

/**
 * @class
 * @classdesc The load state
 */
export class LoadState extends State {
	/**
	 *
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @requires module:Symphony.Audio
	 * @return {void}
	 */
	public start(data:StateData):void {
		//An array of MIDI instrument IDs.
		let instruments = Audio.getAllInstruments(data.session.getGameData.songs, MIDI);

		//The MIDI.js loader widget shows the progress of the MIDI.loadPlugin() function.
		MIDI.loader = new widgets.Loader;

		//Load the soundfont data.
		MIDI.loadPlugin({
			targetFormat: "mp3",
			soundfontUrl: data.session.config.SOUNDFONT_DIRECTORY,
			instruments: data.session.config.ONLY_USE_PIANO_INSTRUMENT ? ["acoustic_grand_piano"] : instruments,
			callback: () => {
				//Set the volume.
				MIDI.setVolume(0, data.session.getBGMVolume);

				//The speed the songs are played at.
				MIDI.Player.timeWarp = 1;

				//Remove the loading widget.
				MIDI.loader.stop();

				//Use the finite state machine to transition to the Intro state. See system.fsm.ts for more details.
				data.session.FSM.push({state: new IntroState(), session: data.session});
			}
		});
	}

	public update(data:StateData):void {

	}

	public draw(data:StateData):void {

	}

	public pause(data:StateData):void {

	}

	public play(data:StateData):void {

	}

	public stop(data:StateData):void {

	}
}
