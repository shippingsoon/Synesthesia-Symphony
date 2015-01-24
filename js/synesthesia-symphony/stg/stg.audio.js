/*
	@description - Audio submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var STG = STG || {};

//Audio helper submodule.
STG.Audio = (function(globals, stg, midi) {
	"use strict";
	
	return {
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
				
				//Only load this instrument if it has not already been loaded.
				if (midi.Soundfont !== undefined && midi.Soundfont[id] === undefined)
					instruments.push(id);
			}
			
			//Filter out duplicate values.
			instruments = instruments.filter(function(value, index, that) {
				return that.indexOf(value) === index;
			});
			
			//Debug.
			if (instruments.length === 0)
				throw 'Instruments error in stg.audio.js';
			
			return instruments;
		},
		
	};
}(window, STG, MIDI)); 