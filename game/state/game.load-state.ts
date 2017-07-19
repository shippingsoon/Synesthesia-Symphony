/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It initiates various resources required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource } from '../../system/system.types';
import { injectable, inject, unmanaged } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
import { State } from '../../system/system.state';
import { IConfig, ISession } from '../game.types';
import { Loader } from '../../system/system.mixin-traits';
import { Mixin } from '../../system/system.mixin';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const widgets: any;
declare const jQuery: any;

/**
 * @classdesc The load state
 */
@Mixin(Loader)
@injectable()
export class LoadState extends State implements Loader {
	//Mixin
	public load: <T>(url: string, dataType?: string) => Promise<T>;

	public constructor(@inject(TYPES.MIDI) private readonly midiJs, @inject(TYPES.Session) private session: ISession, @inject(TYPES.jQuery) public $: any) {
		super();
	}

	/**
	 * @return {void}
	 */
	public start(): void {
	}

	public async loadConfig(): Promise<any> {
		try {
			//Load the CONFIG.json file into the session instance.
			//Here we use async await to avoid callback hell.
			this.session.config = await this.load<IConfig>('config.json');

			//Load the game data required to initiate enemies, items and projectile patterns.
			this.session.data = await this.load<any>(this.session.config.DB_URL);
		} catch (err) {
			console.error('CanvasResource.load() error, make sure the CONFIG.json and offline-data.json files contain the correct data and is valid JSON', err);
		}

		//An array of MIDI instrument IDs.
		const instruments: Array<string> = []; //Audio.getAllInstruments(data.session.getGameData.songs, MIDI);

		//The MIDI.js loader widget shows the progress of the MIDI.loadPlugin() function.
		this.midiJs.loader = new widgets.Loader;

		//Load the soundfont data.
		this.midiJs.loadPlugin({
			targetFormat: 'mp3',
			soundfontUrl: this.session.config.SOUNDFONT_DIRECTORY,
			instruments: this.session.config.ONLY_USE_PIANO_INSTRUMENT ? ['acoustic_grand_piano'] : instruments,
			callback: () => {
				//Set the volume.
				this.midiJs.setVolume(0, this.session.bgmVolumeLevel);

				//The speed the songs are played at.
				this.midiJs.Player.timeWarp = 1;

				//Remove the loading widget.
				this.midiJs.loader.stop();
				console.log('hi hi');
				debugger;
				//Use the finite state machine to transition to the Intro state. See system.fsm.ts for more details.
				this.emit('pushState', {state: null}, window);
			}
		});
	}

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
