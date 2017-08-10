/**
 * @file The player class handles user input for the player
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {LifeForm} from './lifeform';
import {IColor, ICssColor, IVector2d, IVector2dMath} from '../../graphics/types';
import {unmanaged} from 'inversify';
import {CssColor} from '../../graphics/css-color';
import {Vector2dMath} from '../../graphics/vector-2d-math';

declare const Keydown: any;

/**
 * @classdesc The player class
 */
export class Player extends LifeForm {
	private _primaryColor: ICssColor;

	/**
	 * @param _fillColor - The fill color.
	 * @param _position - The entity's position.
	 * @param _r - The entity's radius. This value must be positive.
	 * @param _speed - The speed.
	 * @param _lifePoints - The life points.
	 * @param _healthPoints - The health points.
	 * @param maxHealthPoints - The max health points.
	 * @param _pattern - To be announced.
	 * @param keydown - 3rd party user input module.
	 * @param _secondaryColor -
	 * @param secondarySpeed
	 */
	public constructor(
		@unmanaged() _fillColor: ICssColor = new CssColor('green'),
		@unmanaged() _position: IVector2dMath = new Vector2dMath({x: 300, y: 100}),
		@unmanaged() _r: number = 15,
		@unmanaged() _speed: number = 770,
		@unmanaged() _lifePoints: number = 1,
		@unmanaged() _healthPoints: number = 1,
		@unmanaged() readonly maxHealthPoints: number = 1,
		@unmanaged() readonly _pattern: void = null,
		@unmanaged() private readonly keydown: any = Keydown,
		@unmanaged() private _secondaryColor: ICssColor = new CssColor({r: 255, g: 200, b: 23, a: 1}),
		@unmanaged() private readonly secondarySpeed: number = _speed / 2
	) {
		super(_fillColor, _position, _r, _speed, _lifePoints, _healthPoints, maxHealthPoints, _pattern);
		this._primaryColor = _fillColor;
	}

	public handleInput(dt: number): void {
		const speed = (this.keydown.shift ? this.secondarySpeed : this.speed) * (dt / 1000.0);
		//this.fillColor.setColor(this.keydown.shift ? this.secondaryColor : this.primaryColor);
		//console.log(new Date(), speed.toFixed(2), `(${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)})`);

		//The Up key has been pressed.
		if ((this.keydown.up || this.keydown.w)) {
			this.position.subtract({x: 0, y: speed});
		}

		//The Down key has been pressed.
		if ((this.keydown.down || this.keydown.s)) {
			this.position.add({x: 0, y: speed});
		}

		//The Left key is pressed.
		if ((this.keydown.left || this.keydown.a)) {
			this.position.subtract({x: speed, y: 0});
		}

		//The Right key has been pressed.
		if ((this.keydown.right || this.keydown.d)) {
			this.position.add({x: speed, y: 0});
		}

		//The Right key has been pressed.
		if ((this.keydown.z)) {}
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
