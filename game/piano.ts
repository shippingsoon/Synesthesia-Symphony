/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */
import {inject, injectable, interfaces} from 'inversify';
import {TYPES} from '../bootstrap/inversify.types';
import {IPianoKey} from './types';
import Newable = interfaces.Newable;
import {IColor, ICssColor, IVector2d} from '../graphics/types';
import {IMidiJs} from '../audio/types';
import {ICanvasResource} from '../system/types';

@injectable()
export class Piano {
	//An array of piano keys.
	private pianoKeys: Array<IPianoKey> = [];

	public constructor(
		@inject(TYPES.MidiJs) midiJs: IMidiJs,
		@inject(TYPES.NewablePianoKey) readonly PianoKey: Newable<IPianoKey>,
		@inject(TYPES.NewableCssColor) readonly CssColor: Newable<ICssColor>,
		@inject(TYPES.NewableVector2d) readonly Vector2d: Newable<IVector2d>,
		@inject(TYPES.CanvasResource) readonly resource: ICanvasResource
	) {
		//Zero is for white keys and one is for black keys.
		const pianoKeyColors: Array<number> = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

		//The margin between white piano keys. DevNote: there are 51 white keys and 36 black keys.
		const keyMargin: number = resource.canvas.width / 51;
		debugger;
		//The offset between piano keys.
		let offset: number = 0;
		let count: number = 0;
		//21 - 108.
		for (let note = 0x15; note < 0x6C; note++) {
			//Determine if the piano key is white or black.
			const isBlack: boolean = pianoKeyColors[note % 12] === 1;
			if (isBlack) {count++;}
			//The piano key's width.
			const keyWidth: number = isBlack ? (keyMargin / 1.5) : keyMargin;

			//The piano key's height.
			const keyHeight: number = (isBlack ? 15 : 30) + 3.73;

			//The piano key's name (e.g., c6 or a2).
			const key: string = midiJs.noteToKey[note];

			//Piano octave. There are 8 octaves.
			const octave: number = midiJs.keyToOctave[key];

			//The piano's fill color.
			const fillColor: IColor = isBlack
				? {r: 0, g: 0, b: 0, a: 1}
				: {r: 255, g: 255, b: 255, a: 1};

			//debugger;
			this.pianoKeys.push(new PianoKey(
				new CssColor(fillColor),
				new CssColor({r: 255, g: 0, b: 0, a: 1}),
				new Vector2d({x: isBlack ? (offset - 5) : offset, y: 0}),
				keyWidth,
				keyHeight,
				note,
				key,
				octave,
				isBlack
			));

			//Offset the piano keys by incrementing the offset by the key margin.
			if (!isBlack) {
				offset += keyMargin;
			}
		}

		//Sort the white and black keys. This will allow the black keys to be drawn on top of the white keys.
		this.pianoKeys = this.pianoKeys.sort((key: IPianoKey): number => (key.isBlack) ? 1 : 0);
	}

	public draw(resource: ICanvasResource) {
		for (let pianoKey of this.pianoKeys) {
			pianoKey.draw(resource.ctx);
		}
	}
}
