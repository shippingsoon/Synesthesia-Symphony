/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It loads various data required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { gameLoop } from '../../system/system';
import { StateData } from '../../system/system.types';
import { State } from '../../system/system.state';
import * as Audio from './../../audio/audio';
import { IntroState } from '../state/game.intro-state';
import { StageState } from '../state/game.stage-state';
import { singleton } from '../synesthesia-symphony';
import _ from 'lodash';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const MIDI: any;
declare const widgets: any;

/**
 * @class
 * @classdesc The load state
 */
export class LoadState extends State {
	public constructor() {
		super();
	}

	/**
	 *
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public async start(data: StateData): Promise<void> {
		const λ = singleton.getInstance();

		try {
			//Load the CONFIG.json file into the session instance.
			//Here we use async await to avoid callback hell.
			data.session.setConfig = await data.session.load('/synesthesia-symphony/CONFIG.json');

			//Load the game data required to initiate enemies, items and projectile patterns.
			data.session.setGameData = await data.session.load(data.session.CONFIG.DB_URL);
		} catch (err) {
			console.error('Session.load() error, make sure the CONFIG.json and offline-data.json files contain the correct data and is valid JSON', err);
		}

		//Make sure the CONFIG data is set.
		if (_.isEmpty(data.session.CONFIG.RESOLUTIONS)) {
			throw new Error('Make sure the CONFIG.json file is valid JSON and implements the ConfigType interface found in Session.ts');
		}

		//Initiate resources such as canvas width. The Session.initResources() method uses CSS3 media queries to determine the size for the canvas' width and height.
		data.session.initResources(data.session.CONFIG.RESOLUTIONS);

		//An array of MIDI instrument IDs.
		const instruments = Audio.getAllInstruments(data.session.getGameData.songs, MIDI);

		//The MIDI.js loader widget shows the progress of the MIDI.loadPlugin() function.
		MIDI.loader = new widgets.Loader;

		λ.fsm.push({state: new StageState(), session: data.session});

		gameLoop();
		/*
		//Load the soundfont data.
		MIDI.loadPlugin({
			targetFormat: 'mp3',
			soundfontUrl: λ.session.CONFIG.SOUNDFONT_DIRECTORY,
			instruments: λ.session.CONFIG.ONLY_USE_PIANO_INSTRUMENT ? ['acoustic_grand_piano'] : instruments,
			callback: () => {
				//Set the volume.
				MIDI.setVolume(0, λ.session.getBGMVolume);

				//The speed the songs are played at.
				MIDI.Player.timeWarp = 1;

				//Remove the loading widget.
				MIDI.loader.stop();
				console.log('logging');
				//Use the finite state machine to transition to the Intro state. See system.fsm.ts for more details.
		        λ.fsm.push({state: new IntroState(), session: λ.session});
				that.changeState(new IntroState(), λ.session);

				//Start the recursive game loop.
				gameLoop();
			}
		});
		*/
	}

	public update(data: StateData): void {

	}

	public draw(data: StateData): void {

	}

	public pause(data: StateData): void {

	}

	public play(data: StateData): void {

	}

	public stop(data: StateData): void {

	}
}
