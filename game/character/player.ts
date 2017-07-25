/**
 * @file The player class handles user input for the player
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { LifeForm } from './lifeform';
import { ICssColor, IVector2dMath } from '../../graphics/types';
import { unmanaged } from 'inversify';

/**
 * @classdesc The player class
 */
export class Player extends LifeForm {
	private _primaryColor;

	/**
	 * @param position - The position.
	 * @param r - The circle's radius. This value must be positive.
	 * @param fillColor - The fill color.
	 * @param _speed - The speed.
	 * @param _lifePoints - The life points.
	 * @param _healthPoints - The health points.
	 * @param maxHealthPoints - The max health points.
	 * @param Keydown - 3rd party user input module.
	 * @param _secondaryColor -
	 */
	public constructor(
		@unmanaged() position: IVector2dMath,
		@unmanaged() r: number = 1,
		@unmanaged() fillColor: ICssColor = null,
		@unmanaged() _speed: number = 10,
		@unmanaged() _lifePoints: number = 1,
		@unmanaged() _healthPoints: number = 1,
		@unmanaged() maxHealthPoints: number = 1,
		@unmanaged() private Keydown,
		@unmanaged() private _secondaryColor,
		@unmanaged() private secondarySpeed = 10
	) {
		super(position, r, fillColor, _speed, _lifePoints, _healthPoints, maxHealthPoints);
		this._primaryColor = fillColor;
	}

	public handleInput(dt: number): void {
		const speed = (this.Keydown.shift ? this.secondarySpeed : this.speed) * (dt / 1000.0);
		console.log('time', new Date(), 'speed', speed.toFixed(2));

		//The Up key has been pressed.
		if ((this.Keydown.up || this.Keydown.w)) {
			this.position.subtract({x: 0, y: speed});
		}

		//The Down key has been pressed.
		if ((this.Keydown.down || this.Keydown.s)) {
			this.position.add({x: 0, y: speed});
		}

		//The Left key is pressed.
		if ((this.Keydown.left || this.Keydown.a)) {
			this.position.subtract({x: speed, y: 0});
		}

		//The Right key has been pressed.
		if ((this.Keydown.right || this.Keydown.d)) {
			this.position.add({x: speed, y: 0});
		}

		//The Right key has been pressed.
		if ((this.Keydown.z)) {}
	}

	/**
	 * Gets the secondary color.
	 * @returns {ICssColor}
	 */
	public get primaryColor(): ICssColor {
		return this._primaryColor;
	}

	/**
	 * Gets the secondary color.
	 * @returns {ICssColor}
	 */
	public get secondaryColor(): ICssColor {
		return this._secondaryColor;
	}
}
