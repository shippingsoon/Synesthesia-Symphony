/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It loads various data required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./../../audio/audio.ts" />
/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />
/// <reference path="./../../system/system.session.ts" />
/// <reference path="./../../system/system.fsm.ts" />
/// <reference path="./game.intro-state.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
	declare let MIDI:any;
	declare let widgets:any;

	/**
	 * @class
	 * @classdesc The load state
	 */
	export class LoadState extends System.State {
		/**
		 *
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @requires module:Symphony.Audio
		 * @return {void}
		 */
		public start(data:System.StateData):void {
			//An array of MIDI instrument IDs.
			let instruments = Audio.getAllInstruments(data.session.getGameData.songs);

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
					data.session.FSM.push({state: new Game.IntroState(), session: data.session});
				}
			});
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