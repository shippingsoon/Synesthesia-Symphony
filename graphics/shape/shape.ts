/**
 * @file An abstract class for 2D shapes.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module Shape
 */

import {IShape, IVector2dMath} from '../types';
import {injectable, unmanaged} from 'inversify';

/**
 * @classdesc An abstract class for 2D shapes
 */
@injectable()
export abstract class Shape implements IShape {
	//A 2d vector.
	protected _position: IVector2dMath;

	/**
	 * @param position - The position of this shape.
	 */
	public constructor(@unmanaged() position: IVector2dMath) {
		this._position = position;
	}

	/**
	 * Returns the area of this shape.
	 * @return {number}
	 */
	public abstract get getArea(): number;

	/**
	 * Gets the position of this shape.
	 * @returns {IVector2dMath}
	 */
	public get position(): IVector2dMath {
		return this._position;
	}
}
