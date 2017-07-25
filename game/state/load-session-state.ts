/**
 * @file The Load game state. This is the first state that is added to the finite state machine. It initiates various resources required by other game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource, IState } from '../../system/types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
import { State } from '../../system/state';
import { IConfig, IGameData, ISession } from '../types';
import { Loader } from '../../system/mixin-traits';
import { Mixin } from '../../system/mixin';

/**
 * @classdesc The load state
 */
@Mixin(Loader)
@injectable()
export class LoadSessionState extends State implements Loader {
	/**
	 * Mixins
	 */
	public load: <T>(url: string, dataType?: string) => Promise<T>;

	//jQuery. This is a placeholder.
	@inject(TYPES.jQuery) public readonly $: any;

	/**
	 * @param session
	 * @param nextState
	 * @param resource
	 */
	public constructor(
		@inject(TYPES.Session) private readonly session: ISession,
		@inject(TYPES.LoadAudioState) private readonly nextState: IState,
		@inject(TYPES.CanvasResource) private readonly resource: ICanvasResource
	) {
		super();

		//Initiate the canvas resource.
		if (!this.resource.canvas) {
			this.resource.canvas = <HTMLCanvasElement> document.querySelector('#canvas-layer');
			this.resource.ctx = this.resource.canvas.getContext('2d');
		}

		//Initiate the background canvas resource.
		if (!this.resource.bgCanvas) {
			this.resource.bgCanvas = <HTMLCanvasElement> document.querySelector('#background-layer');
			this.resource.bgCtx = this.resource.bgCanvas.getContext('2d');
		}
	}

	public start(): void {
		console.log('LoadSessionState');
		this.loadSession().then(() => {
			if (this.session.config) {
				//Set the width and height for the canvas elements.
				this.resource.canvas.width = this.session.config.RESOLUTIONS.MEDIUM.CANVAS_W;
				this.resource.canvas.height = this.session.config.RESOLUTIONS.MEDIUM.CANVAS_H;
				this.resource.bgCanvas.width = this.session.config.RESOLUTIONS.MEDIUM.W;
				this.resource.bgCanvas.height = this.session.config.RESOLUTIONS.MEDIUM.H;
			}

			//Transition to the next game state.
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

			resolve();
		});
	}

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
