/*
 * @file Audio state
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ICanvasResource, IState} from '../../system/system.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
import { State } from '../../system/system.state';
import { IConfig, ISession } from '../game.types';

/**
 * @classdesc The load state
 */
@injectable()
export class LoadAudioState extends State {
	@inject(TYPES.Widgets) private widgets: any;
	@inject(TYPES.MIDI) private readonly midiJs: any;

	public constructor(@inject(TYPES.Session) private session: ISession, @inject(TYPES.IntroState) private readonly nextState: IState) {
		super();
	}

	/**
	 * @return {void}
	 */
	public start() {
		this.loadAudio(() => {
			//Set the volume.
			this.midiJs.setVolume(0, this.session.bgmVolumeLevel);

			//The speed the songs are played at.
			this.midiJs.Player.timeWarp = 1;

			//Remove the loading widget.
			this.midiJs.loader.stop();

			//Use the finite state machine to transition to the Intro state. See system.fsm.ts for more details.
			this.emit('pushState', {state: this.nextState});
		});
	};

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}

	private loadAudio(callback: Function) {
		//The MIDI.js loader widget shows the progress of the MIDI.loadPlugin() function.
		this.midiJs.loader = this.widgets;

		//An array of MIDI instrument IDs.
		const instruments: Array<string> = []; //Audio.getAllInstruments(data.session.getGameData.songs, MIDI);

		//Load the soundfont data.
		this.midiJs.loadPlugin({
			targetFormat: 'mp3',
			soundfontUrl: this.session.config.SOUNDFONT_DIRECTORY,
			instruments: this.session.config.ONLY_USE_PIANO_INSTRUMENT ? ['acoustic_grand_piano'] : instruments,
			callback: callback
		});
	}
}
