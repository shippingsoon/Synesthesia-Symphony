/**
 * @file LifeForm class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {IColor, ICssColor, IVector2dMath} from '../../graphics/types';
import {injectable, unmanaged} from 'inversify';
import {Vector2dMath} from '../../graphics/vector-2d-math';
import {CssColor} from '../../graphics/css-color';
import {ILifeform} from '../types';

/**
 * @classdesc LifeForm class.
 */
@injectable()
export class LifeForm implements ILifeform {
	/**
	 * @param _fillColor - The fill color.
	 * @param _position - The entity's position.
	 * @param _r - The entity's radius. This value must be positive.
	 * @param _speed - The speed.
	 * @param _lifePoints - The life points.
	 * @param _healthPoints - The health points.
	 * @param maxHealthPoints - The max health points.
	 * @param _pattern - To be announced.
	 */
	public constructor(
		@unmanaged() protected _fillColor: ICssColor,
		@unmanaged() protected _position: IVector2dMath,
		@unmanaged() protected _r: number = 1,
		@unmanaged() protected _speed: number = 10,
		@unmanaged() protected _lifePoints: number = 1,
		@unmanaged() protected _healthPoints: number = 1,
		@unmanaged() protected readonly maxHealthPoints: number = 1,
		@unmanaged() protected readonly _pattern: void = null
	) {
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the fillColor.
	 * @returns {ICssColor}
	 */
	public get fillColor(): ICssColor {
		return this._fillColor;
	}

	/**
	 * Gets the position of this shape.
	 * @returns {IVector2dMath}
	 */
	public get position(): IVector2dMath {
		return this._position;
	}

	/**
	 * Gets the life points.
	 * @return {number}
	 */
	public get lifePoints(): number {
		return this._lifePoints;
	}

	/**
	 * Sets the life points.
	 * @param hp - The health points to set.
	 */
	public set lifePoints(hp: number) {
		this._lifePoints = hp;
	}

	/**
	 * Gets the health points.
	 * @return {number}
	 */
	public get healthPoints(): number {
		return this._healthPoints;
	}

	/**
	 * Sets the health points.
	 * @param hp - The health points to set.
	 */
	public set healthPoints(hp: number) {
		this._healthPoints = hp;
	}

	/**
	 * Gets the speed.
	 * @returns {number}
	 */
	public get speed(): number {
		return this._speed;
	}

	/**
	 * Sets the speed.
	 * @param speed - The speed to set.
	 */
	public set speed(speed: number) {
		this._speed = speed;
	}

	/**
	 * Gets the circle's radius.
	 * @return {number}
	 */
	public get r(): number {
		return this._r;
	}

	/**
	 * Sets the circle's radius.
	 * @param {number} radius
	 * @throws {Error}
	 */
	public set r(radius: number) {
		//Make sure the radius is greater than 0.
		if (radius <= 0) {
			throw new Error(`Radius must be greater than zero, you entered: ${radius}`);
		}

		this._r = Math.round(radius);
	}
	//#endregion
}
