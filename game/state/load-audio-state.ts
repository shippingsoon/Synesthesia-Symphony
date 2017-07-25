/**
 * @file Load Audio state
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource, IState } from '../../system/types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
import { State } from '../../system/state';
import { ISession } from '../types';

/**
 * @classdesc The load state
 * @requires ISession
 * @requires IState
 * @requires Audio
 */
@injectable()
export class LoadAudioState extends State {
	/**
	 * @param session
	 * @param nextState
	 * @param audio
	 */
	public constructor(@inject(TYPES.Session) private readonly session: ISession, @inject(TYPES.IntroState) private readonly nextState: IState, @inject(TYPES.Audio) private readonly audio) {
		super();
	}

	public start() {
		console.log('LoadAudioState');
		this.emit('pushState', {state: this.nextState});
		/*
		this.loadAudio(() => {
			//Set the volume.
			this.audio.midiJs.setVolume(0, this.session.bgmVolumeLevel);

			//The speed the songs are played at.
			this.audio.midiJs.Player.timeWarp = 1;

			//Remove the loading widget.
			this.audio.midiJs.loader.stop();

			//Use the finite state machine to transition to the Intro state. See fsm.ts for more details.
			this.emit('pushState', {state: this.nextState});
		});
		*/
	};

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}

	private loadAudio(callback: Function) {
		//An array of MidiJs instrument IDs.
		const instruments: Array<string> = this.audio.getAllInstruments(this.session.data.songs);

		//This shouldn't happen.
		console.assert(instruments && instruments.length !== 0, 'Instruments not loaded');

		//Load the soundfont data.
		this.audio.midiJs.loadPlugin({
			targetFormat: 'mp3',
			soundfontUrl: this.session.config.SOUNDFONT_DIRECTORY,
			instruments: this.session.config.ONLY_USE_PIANO_INSTRUMENT ? ['acoustic_grand_piano'] : instruments,
			callback: callback
		});
	}
}
