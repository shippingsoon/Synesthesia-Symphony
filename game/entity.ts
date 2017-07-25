/**
 * @file Entity class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ICssColor, IVector2dMath} from '../graphics/types';
import { Circle } from '../graphics/shape/circle';
import { injectable, unmanaged } from 'inversify';

/**
 * @classdesc Entity class.
 */
@injectable()
export class Entity extends Circle {
	/**
	 * @param position - The position.
	 * @param r - The circle's radius. This value must be positive.
	 * @param _fillColor - The fill color.
	 */
	public constructor(@unmanaged() position: IVector2dMath, @unmanaged() r: number, @unmanaged() private _fillColor: ICssColor) {
		super(position, r);
	}

	/**
	 * Gets the fillColor.
	 * @returns {ICssColor}
	 */
	public get fillColor(): ICssColor {
		return this._fillColor;
	}
}
