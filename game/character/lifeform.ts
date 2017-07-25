/**
 * @file LifeForm class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICssColor, IVector2dMath } from '../../graphics/types';
import { injectable, unmanaged } from 'inversify';
import { Entity } from '../entity';

/**
 * @classdesc LifeForm class.
 */
@injectable()
export class LifeForm extends Entity {
	/**
	 * @param position - The position.
	 * @param r - The circle's radius. This value must be positive.
	 * @param fillColor - The fill color.
	 * @param _speed - The speed.
	 * @param _lifePoints - The life points.
	 * @param _healthPoints - The health points.
	 * @param maxHealthPoints - The max health points.
	 */
	public constructor(
		@unmanaged() position: IVector2dMath,
		@unmanaged() r: number = 1,
		@unmanaged() fillColor: ICssColor = null,
		@unmanaged() protected _speed: number = 10,
		@unmanaged() protected _lifePoints: number = 1,
		@unmanaged() protected _healthPoints: number = 1,
		@unmanaged() protected readonly maxHealthPoints: number = 1
	) {
		super(position, r, fillColor);
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
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
	//#endregion
}
