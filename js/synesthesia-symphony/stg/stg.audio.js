/*
	@description - Audio submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};
var System = System || {};

//Audio helper submodule.
STG.Audio = (function(globals, stg, system, midi) {
	"use strict";
	
	return {
		//The current time of the MIDI.js file that is playing.
		current_time: '00:00',
		
		/*
		 * Formats the MIDI.js time of the currently played file.
		 * @param {Number} now - The current MIDI.js time.
		 * @return {String} - The current time.
		 */
		formatTime: function(now) {
			var minutes = (now / 60) >> 0;
			var seconds = (now - (minutes * 60)) >> 0;
			var pad = {
				second: (minutes < 10) ? '0' : '',
				minute: (seconds < 10) ? '0' : ''
			};
			
			return (STG.Audio.current_time = pad.minute + minutes + ':' + pad.second + seconds);
		},
		
		/*
		 * Load the instruments.
		 * @param {Object} channel - An object mapping of channels to instruments.
		 * @return {Number[]} - An array of numerical MIDI instrument IDs.
		 */
		loadInstruments: function(channels) {
			//An array of instruments.
			var instruments = [];
			
			for (var instrument in channels) {
				//Get the instrument's ID.
				var id = midi.GeneralMIDI.byId[channels[instrument]].id;
				
				//MIDI.js does not check for duplicate instruments so only load this instrument if it is not found.
				if (midi.Soundfont !== undefined && midi.Soundfont[id] === undefined)
					instruments.push(id);
			}
			
			//Filter out duplicate values.
			instruments = instruments.filter(function(value, index, that) {
				return that.indexOf(value) === index;
			});
			
			return instruments;
		},
		
		/*
		 * Loads all instruments.
		 * @param {Object} songs - An object containing MIDI instrument IDS.
		 * @return {Number[]} - An array of numerical MIDI instrument IDs.
		 */
		loadAllInstruments: function(songs) {
			//An array of instruments.
			var instruments = [];
			var id = null;
			
			for (var song in songs) {
				for (var channel in songs[song].channels) {
					//Get the instrument's ID.
					id = songs[song].channels[channel];
					
					//MIDI.js does not check for duplicate instruments so only load this instrument if it is not found.
					if (midi.Soundfont !== undefined && midi.Soundfont[id] === undefined)
						instruments.push(midi.GeneralMIDI.byId[id].id);
				}
			}
			
			//Filter out duplicate values.
			instruments = instruments.filter(function(value, index, that) {
				return that.indexOf(value) === index;
			});
			
			return instruments;
		},
		
		/*
		 * Maps the MIDI channel to a MIDI instrument for a song.
		 * @param {Object} song - An object containing MIDI instrument IDS.
		 * @return {Undefined}
		 */
		programChange: function(song) {
			//The numeric MIDI instrument ID.
			var id = 0;
			
			for (var channel in song.channels) {
				//Set the ID.
				id = song.channels[channel];
				
				//Map the MIDI channel to an instrument.
				midi.programChange(channel, system.Config.PIANO_ONLY ? 0 : id);
			}
		},
	};
}(window, STG, System, MIDI)); 