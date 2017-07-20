/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It initiates various resources required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource, IState } from '../../system/system.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
import { State } from '../../system/system.state';
import { IConfig, IGameData, ISession } from '../game.types';
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
export class LoadSessionState extends State implements Loader {
	//Mixin
	public load: <T>(url: string, dataType?: string) => Promise<T>;

	@inject(TYPES.MIDI) private readonly midiJs: any;
	@inject(TYPES.jQuery) public readonly $: any;

	public constructor(@inject(TYPES.Session) private session: ISession, @inject(TYPES.LoadAudioState) private readonly nextState: IState) {
		super();
	}

	/**
	 * @return {void}
	 */
	public start() {
		this.loadSession().then(() => {
			this.emit('pushState', {state: this.nextState});
		});
	};

	private async loadSession(url: string = 'config.json'): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				//Load the CONFIG.json file into the session instance.
				//Here we use async await to avoid callback hell.
				this.session.config = await this.load<IConfig>(url);
			}
			catch (err) {
				console.error('Error loading the config.json file. Make sure the file contains the correct data and is valid JSON', err);
			}

			try {
				//Load the game data required to initiate enemies, items and projectile patterns.
				this.session.data = await this.load<IGameData>(this.session.config.DB_URL);
			}
			catch (err) {
				console.error('Error loading the offline-data.json files. Make sure the file contains the correct data and is valid JSON', err);
			}
		});
	}

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
