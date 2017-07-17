/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It loads various data required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { ICanvasResource } from '../../system/system.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/bootstrap.types';
import { EventState } from '../../system/system.event-state';
import {IConfig, ISession} from '../game.types';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const MIDI: any;
declare const widgets: any;
declare const jQuery: any;

/**
 * @class
 * @classdesc The load state
 */
@injectable()
export class LoadState extends EventState {
	public constructor(@inject(TYPES.Session) private session: ISession, private $: any = jQuery, private midiJs: any = MIDI) {
		super();
	}
	/**
	 * @public
	 * @return {void}
	 */
	public start(): void {
		console.log('hi');
		this.loadConfig()
			.then(() => {
			});
	}

	private load<T>(url: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.$.ajax({
				dataType: 'json',
				url: url,
				success: (json) => { resolve(json); },
				error: (err) => { reject(err); }
			});
		});
	}

	public async loadConfig(): Promise<any> {
		try {
			//Load the CONFIG.json file into the session instance.
			//Here we use async await to avoid callback hell.
			this.session.config = await this.load<IConfig>('/synesthesia-symphony/config.json');

			//Load the game data required to initiate enemies, items and projectile patterns.
			this.session.data = await this.load(this.session.config.DB_URL);
		} catch (err) {
			console.error('CanvasResource.load() error, make sure the CONFIG.json and offline-data.json files contain the correct data and is valid JSON', err);
		}

		//Make sure the CONFIG data is set.
		if (typeof (this.session.config.RESOLUTIONS) === 'undefined') {
			throw new Error('Make sure the CONFIG.json file is valid JSON and implements the IConfig interface found in CanvasResource.ts');
		}

		//Initiate resources such as canvas width. The CanvasResource.initResources() method uses CSS3 media queries to determine the size for the canvas' width and height.
		//this.session.initResources(data.session.CONFIG.RESOLUTIONS);

		//An array of MIDI instrument IDs.
		const instruments: Array<string> = []; //Audio.getAllInstruments(data.session.getGameData.songs, MIDI);

		//The MIDI.js loader widget shows the progress of the MIDI.loadPlugin() function.
		MIDI.loader = new widgets.Loader;

		//Load the soundfont data.
		MIDI.loadPlugin({
			targetFormat: 'mp3',
			soundfontUrl: this.session.config.SOUNDFONT_DIRECTORY,
			instruments: this.session.config.ONLY_USE_PIANO_INSTRUMENT ? ['acoustic_grand_piano'] : instruments,
			callback: () => {
				//Set the volume.
				MIDI.setVolume(0, this.session.bgmVolumeLevel);

				//The speed the songs are played at.
				MIDI.Player.timeWarp = 1;

				//Remove the loading widget.
				MIDI.loader.stop();
				console.log('logging');
				//Use the finite state machine to transition to the Intro state. See system.fsm.ts for more details.
				//λ.fsm.push({state: new IntroState(), session: λ.session});
				//that.changeState(new IntroState(), λ.session);
			}
		});
	}

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
