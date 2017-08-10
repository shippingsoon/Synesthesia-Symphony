/**
 * @file PianoKey class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */
import {inject, injectable, unmanaged} from 'inversify';
import {ICssColor, IVector2dMath} from '../graphics/types';
import {Rectangle} from '../graphics/shape/rectangle';
import {IWindow} from '../system/types';
import {IPianoKey} from './types';
import {TYPES} from '../bootstrap/inversify.types';

@injectable()
export class PianoKey extends Rectangle implements IPianoKey {
	public constructor(
		@unmanaged() private fillColor: ICssColor,
		@unmanaged() private color: ICssColor,
		@unmanaged() position: IVector2dMath,
		@unmanaged() w: number = 4,
		@unmanaged() h: number = 12,
		@unmanaged() private readonly note: number,
		@unmanaged() private readonly key: number,
		@unmanaged() private readonly octave: number,
		@unmanaged() private readonly _isBlack: boolean,
		@unmanaged() private readonly pattern: any = null,
		@unmanaged() private readonly element: IWindow = window,
		@inject(TYPES.Player) private readonly player
	) {
		super(position, w, h);
		this.element.addEventListener('onNote-' + this.note, this.onNoteEvent, false);
	}

	private onNoteEvent(event: CustomEvent): void {
		//Do something
	}

	public update(dt: number) {

	}

	public hasCollidedWithPlayer() {
		//Handle collison.
	}

	public draw(ctx: CanvasRenderingContext2D) {
		this.render(ctx, this.position, this.w, this.h, this.fillColor);
	}

	public destroy() {
		this.element.removeEventListener('onNote-' + this.note, this.onNoteEvent, false);
	}

	public get isBlack(): boolean {
		return this._isBlack;
	}
}
