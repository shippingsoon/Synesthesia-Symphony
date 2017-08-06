/**
 * @file The Audio class contains helper methods for MidiJs.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {IConfig} from '../game/types';
import {TYPES} from '../bootstrap/inversify.types';
import {inject, injectable} from 'inversify';
import {LoDashStatic} from 'lodash';
import {IMidiJs, IMidiJsData} from './types';

/**
 * @classdesc Audio class. This class contains helper methods for MidiJs. It was originally a singleton but was refactored to use InversifyJs' singleton scope.
 * @requires IMidiJs - MidiJs.
 * @requires LoDashStatic - Lodash
 * @requires widgets - MidiJs widget plugin.
 */
@injectable()
export class Audio {
	/**
	 * @param _midiJs - IMidiJs.
	 * @param _ - Lodash.
	 * @param widgets - MidiJs widget plugin.
	 */
	public constructor(@inject(TYPES.MidiJs) private readonly _midiJs: IMidiJs, @inject(TYPES.Lodash) private readonly _: LoDashStatic, @inject(TYPES.Widgets) readonly widgets: any) {
		//The MidiJs loader widget shows the progress of the MidiJs.loadPlugin() function.
		this._midiJs.loader = widgets.Loader();
	}

	/**
	 * This method returns an array of instrument names in a format that is required by MidiJs' loadPlugin() method.
	 * @param songs - An array of objects containing various song data. See the 'songs' property in offline-data.json for the correct format of this data structure.
	 * @see {@link https://en.wikipedia.org/wiki/General_MIDI#Program_change_events} for more details on MidiJs programs.
	 * @return {string[]} An array of instrument names in a format that is required by MidiJs.
	 */
	public getAllInstruments(songs: any[]): string[] {
		//An array of MidiJs instrument names in the same format as MidiJs.GeneralMIDI.byId. These are MidiJs program names such as "acoustic_grand_piano".
		let instruments: string[] = [];

		//Loop through the songs.
		for (let song of songs) {
			//Each song object has an instruments array which contain the following data structure {channel:number, id:number};
			//where 'channel' is the MidiJs channel and 'id' is the MidiJs program number.
			for (let instrument of song.instruments) {
				//MidiJs does not check for duplicate instruments so only load this instrument if it is not found.
				if (typeof(this.midiJs.Soundfont) !== 'undefined' && this._.isEmpty(this.midiJs.Soundfont[instrument.id])) {
					instruments.push(this.midiJs.GeneralMIDI.byId[instrument.id].id);
				}
			}
		}

		//Filter out duplicate values.
		return this._.uniq(instruments);
	}

	/**
	 * Maps the MidiJs channel to an instrument for a song.
	 * @param instruments - An array of objects containing MidiJs channels and program numbers (i.e., {channel:number, id:number}).
	 * @param onlyUsePianoInstrument - Determines if only the piano instrument will be mapped to the channel.
	 */
	public programChange(instruments: { channel: number, id: number }[], onlyUsePianoInstrument: boolean = false): void {
		//The song.instruments array contains the following data structures of the form {channel: number, id: number}.
		for (let instrument of instruments) {
			//Map the MidiJs channel to an instrument. If 'onlyUsePianoInstrument' is true then we will only map the instrument number 0 which is the acoustic grand piano.
			this.midiJs.programChange(instrument.channel, ((onlyUsePianoInstrument) ? 0 : instrument.id));
		}
	}

	/**
	 * Uses MidiJs to play a MidiJs song.
	 * @param song - An object containing a filename and instruments property. See the 'audio' property in offline-data.json for more details.
	 * @param config - Game configuration data. See Game.IConfig for more details.
	 * @param eventListener - A callback that is passed to the MidiJs.loadFile method.
	 */
	public playSong(song: {filename: string, instruments: any}, config: IConfig, eventListener: (data: IMidiJsData) => void = null): void {
		//Set the full path to the MidiJs song that will be loaded.
		const midiFilePath: string = config.MIDI_DIRECTORY + (this._.endsWith(config.MIDI_DIRECTORY, '/') ? '' : '/') + song.filename;

		//Check to see if music is already playing. If so, stop the music.
		this.stopSong(false);

		//Map the MidiJs channel to an instrument.
		this.programChange(song.instruments, config.ONLY_USE_PIANO_INSTRUMENT);

		//Load and play the menu music.
		this.midiJs.Player.loadFile(midiFilePath, () => {
			//MidiJs event listener.
			if (eventListener) {
				this.midiJs.Player.addListener(eventListener);
			}

			//Start the music.
			this.midiJs.Player.start();

		});
	}

	/**
	 * Stops a MidiJs song if it is currently playing.
	 * @param clearEvents - Determines if we will remove the eventListener.
	 */
	public stopSong(clearEvents: boolean = true): void {
		//Check to see if music is already playing. If so, stop the music.
		if (this.midiJs.Player.playing) {
			this.midiJs.Player.stop();
		}

		//Clear events.
		if (clearEvents) {
			this.midiJs.Player.clearAnimation();
			this.midiJs.Player.removeListener();
		}
	}

	/**
	 * Gets the MidiJs
	 * @returns {IMidiJs}
	 */
	public get midiJs(): IMidiJs {
		return this._midiJs;
	}
}
