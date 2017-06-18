/**
 * @file Audio namespace
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { ConfigType } from '../system/system.types';
import _ from 'lodash';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const MIDI: any;

/**
 * This method returns an array of instrument names in a format that is consumed by MIDI.loadPlugin() method.
 * @param {any[]} songs - An array of objects containing various song data. See the 'songs' property in offline-data.json for the correct format of this data structure.
 * @param {any} MIDIJS - The MIDI.js module.
 * @see {@link https://en.wikipedia.org/wiki/General_MIDI#Program_change_events} for more details on MIDI programs.
 * @return {string[]}
 */
export function getAllInstruments(songs: any[], MIDIJS: any): string[] {
	//An array of MIDI instrument names in the same format as MIDI.GeneralMIDI.byId. These are MIDI program names such as "acoustic_grand_piano".
	let instruments: string[] = [];

	//Loop through the songs.
	for (let song of songs) {
		//Each song object has an instruments array which contain the following data structure {channel:number, id:number};
		//where 'channel' is the MIDI channel and 'id' is the MIDI program number.
		for (let instrument of song.instruments) {
			//MIDI.js does not check for duplicate instruments so only load this instrument if it is not found.
			if (typeof(MIDIJS.Soundfont) !== 'undefined' && _.isEmpty(MIDIJS.Soundfont[instrument.id])) {
				instruments.push(MIDIJS.GeneralMIDI.byId[instrument.id].id);
			}
		}
	}

	//Filter out duplicate values.
	return _.uniq(instruments);
}

/**
 * Maps the MIDI channel to an instrument for a song.
 * @param {Object[]} instruments - An array of objects containing MIDI channels and program numbers (i.e., {channel:number, id:number}).
 * @param {any} MIDIJS - The MIDI.js module.
 * @param {boolean} PIANO_ONLY - Determines if only the piano instrument will be mapped to the channel.
 * @return {void}
 */
export function programChange(instruments: {channel: number, id: number}[], MIDIJS: any, PIANO_ONLY: boolean = false): void {
	//The song.instruments array contains the following data structures of the form {channel:number, id:number}.
	for (let instrument of instruments) {
		//Map the MIDI channel to an instrument. If PIANO_ONLY is true then we will only map the instrument number 0 which is the acoustic grand piano.
		MIDIJS.programChange(instrument.channel, ((PIANO_ONLY) ? 0 : instrument.id));
	}
}

/**
 * Plays a MIDI song.
 * @param {Object} song - An object containing a filename and instruments property. See the 'audio' property in offline-data.json for more details.
 * @param {any} MIDIJS - MIDI.js module.
 * @param {ConfigType} config - System configuration data. See System.ConfigType for more details.
 * @param {Function} eventListener - A callback that is passed to the MIDI.loadFile method.
 * @return {void}
 */
export function playSong(song: any, MIDIJS: any, config: ConfigType, eventListener: Function = null): void {
	//Set the full path to the MIDI song that will be loaded.
	const midiFilePath: string = config.MIDI_DIRECTORY + (_.endsWith(config.MIDI_DIRECTORY, '/') ? '' : '/') + song.filename;

	//TODO: Display the loading animation gif.
	//resource.sprites['loading_gif'].img.style.display = 'block';

	//Check to see if music is already playing. If so, stop the music.
	if (MIDIJS.Player.playing) {
		MIDIJS.Player.stop();
	}

	//Map the MIDI channel to an instrument.
	programChange(song.instruments, MIDIJS, config.ONLY_USE_PIANO_INSTRUMENT);

	//Load and play the menu music.
	MIDIJS.Player.loadFile(midiFilePath, () => {
		//TODO: Hide the loading animation gif.
		//resource.sprites['loading_gif'].img.style.display = 'none';

		//MIDI event listener.
		if (!_.isEmpty(eventListener)) {
			MIDIJS.Player.addListener(eventListener);
		}

		//Start the music.
		MIDIJS.Player.start();
	});
}

/**
 * Stops a MIDI song.
 * @param {any} midiPlayer - The MIDI.Player object.
 * @return {void}
 */
export function stopSong(midiPlayer: any): void {
	//Check to see if music is already playing. If so, stop the music.
	if (midiPlayer.playing) {
		midiPlayer.stop();
	}

	//Clear events.
	midiPlayer.clearAnimation();
	midiPlayer.removeListener();
}
