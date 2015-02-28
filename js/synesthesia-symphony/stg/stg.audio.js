/*
 * @description - Audio submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var STG = STG || {};
var System = System || {};

/*
 * Audio helper submodule.
 * @param {Object} globals - Explicit globa
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System module.
 * @param {MIDI} midi - MIDI.js library.
 * @param {Resource} resource - Resource module.
 * @return {Object}
 */
STG.Audio = (function(globals, stg, system, midi, resource) {
	'use strict';
	
	return {
		//The current time of the MIDI.js file that is playing.
		current_time: '00:00',
		
		//The end time of the MIDI.js file that is playing.
		end_time: '00:00',
		
		/*
		 * Formats the MIDI.js time of the currently played file.
		 * @param {Number} time - The raw MIDI.js time.
		 * @return {String} - The formatted time.
		 */
		formatTime: function(time) {
			var minutes = (time / 60) >> 0;
			var seconds = (time - (minutes * 60)) >> 0;
			var pad = {
				second: ((seconds < 10) ? '0' : ''),
				minute: ((minutes < 10) ? '0' : '')
			};
			
			return pad.minute + minutes + ':' + pad.second + seconds;
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
		
		/*
		 * Maps the MIDI channel to a MIDI instrument for a song.
		 * @param {Number} channel - The MIDI channel to play the note on.
		 * @param {Number} note - The MIDI note to be played.
		 * @param {Number} velocity - The velocity the note was played.
		 * @param {Number} delay - The delay to play the SFX.
		 * @param {Boolean} use_bgm_volume - Determines if we'll use the background music's volume level.
		 * @return {Undefined}
		 */
		playSfx: function(channel, note, velocity, delay, use_bgm_volume) {
			if (!use_bgm_volume)
				midi.setVolume(0, system.sfx_volume);
			
			midi.noteOn(channel || 0, note || 0, velocity || system.sfx_volume, delay || 0);
			midi.setVolume(0, system.bgm_volume)
		},
		
		/*
		 * MIDI.js setAnimation callback.
		 * @param {Number} data.now - Where the MIDI file is currently at.
		 * @param {Number} data.end - The end of the MIDI file.
		 * @param {Object} data.events - MIDI events.
		 * @return {Undefined}
		 */
		replayer: function(data) {
			var percent = data.now / data.end;
			var now = data.now >> 0;
			var end = data.end >> 0;
			
			if (now >= end) {
				MIDI.Player.currentTime = 0;
				MIDI.Player.resume();
			}
			
			stg.Audio.current_time = stg.Audio.formatTime(now);
			stg.Audio.end_time = stg.Audio.formatTime(end)
		},
		
		/*
		 * Plays a MIDI song.
		 * @param {Object|Resource.songs} options.song - The MIDI song to play.
		 * @param {Function} options.addListener - MIDI.js addListener callback.
		 * @param {Function} options.setAnimation - MIDI.js setAnimation callback.
		 * @param {Function} options.loadFile - MIDI.js loadFile callback.
		 * @return {Undefined}
		 */
		playSong: function (options) {
			var song = (options.song) ? options.song : arguments[0];
			var addListener = (options.addListener) ? options.addListener : (arguments[1] || null);
			var setAnimation = (options.setAnimation) ? options.setAnimation : (arguments[2] || null);
			var loadFile = (options.loadFile) ? options.loadFile : (arguments[3] || null);
			
			//MIDI.js music player.
			var mplayer = midi.Player;
			
			//Show the loading gif.
			resource.sprites['loading_gif'].img.style.display = 'block';
			
			//Stop the music.
			if (mplayer.playing)
				mplayer.stop();
			
			//Map the MIDI channel to an instrument.
			this.programChange(song);
			
			//Load and play the menu music.
			mplayer.loadFile(song.file, loadFile || function(data) {
				//Hide the loading gif.
				resource.sprites['loading_gif'].img.style.display = 'none';
				
				//MIDI event listener.
				if (typeof addListener === 'function')
					mplayer.addListener(addListener);
				
				//Loop the music.
				if (typeof setAnimation === 'function')
					mplayer.setAnimation(setAnimation);
			
				//Start the music.
				mplayer.start();
			});
		},
		
		/*
		 * Stops a MIDI song.
		 * @return {Undefined}
		 */
		stopSong: function () {
			//MIDI.js music player.
			var mplayer = midi.Player;
			
			//Stop the music.
			if (mplayer.playing)
				mplayer.stop();
			
			//Clear events.
			mplayer.clearAnimation();
			mplayer.removeListener();
		}
	};
}(window, STG, System, MIDI, Resource)); 