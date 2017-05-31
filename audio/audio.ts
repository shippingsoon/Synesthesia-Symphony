/**
 * @file Audio namespace
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * @namespace
 */
namespace Symphony.Audio {
	"use strict";

	//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
	declare let MIDI:any;

	//Let the IDE know we are using the Lodash utilities library.
	declare let _:any;

	/**
	 * Loads all instruments.
	 * @param {any[]} songs - An array of objects containing various song data. Each object in this array should have an array 'instruments' property which maps instrument names to MIDI channels.
	 * @see {@link https://en.wikipedia.org/wiki/General_MIDI#Program_change_events} for more details on MIDI programs.
	 * @return {string[]}
	 */
	export function getAllInstruments(songs:any[]):string[] {
		//An array of MIDI instrument names in the same format as MIDI.GeneralMIDI.byId. These are MIDI program names such as "acoustic_grand_piano".
		let instruments:string[] = [];

		//Loop through the songs.
		_.each(songs, (song) => {
			//Each song object has an instruments array which contain the following data structure {channel:number, id:number};
			//where 'channel' is the MIDI channel and 'id' is the MIDI program number.
			_.each(song.instruments, (instrument) => {
				//MIDI.js does not check for duplicate instruments so only load this instrument if it is not found.
				if (_instrumentIsNotLoaded(instrument.id, MIDI))
					instruments.push(MIDI.GeneralMIDI.byId[instrument.id].id);
			});
		});
		//debugger;
		//Filter out duplicate values.
		return _.uniq(instruments);
	}

	/**
	 * Checks to see if MIDI.js has already loaded this instrument. This is only needed because MIDI.js does not check for duplicates.
	 * @param {string} programName - A name of a MIDI program/instrument i.e., acoustic_grand_piano.
	 * @param {any} midiJs - The MIDI.js module.
	 * @return {boolean}
	 */
	function _instrumentIsNotLoaded(programName:string, midiJs:any):boolean {
		return (typeof(midiJs.Soundfont) !== "undefined" && _.isEmpty(midiJs.Soundfont[programName]));
	}



}