/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {injectable, unmanaged} from 'inversify';
import {ColorName, ICssColor, IVector2d, IVector2dMath} from '../types';
import {Shape} from './shape';
import {Mixin} from '../../system/mixin';
import {DrawableRectangle} from '../mixin/drawable-rectangle';

/**
 * @classdesc A rectangle shape.
 */
@Mixin(DrawableRectangle)
@injectable()
export class Rectangle extends Shape implements DrawableRectangle {
	//The rectangle's width. This value must be positive.
	protected _w: number;

	//The rectangle's height. This value must be positive.
	protected _h: number;

	/**
	 * Mixins.
	 * @see the class for a proper JsDoc description.
	 */
	public render: (ctx: CanvasRenderingContext2D, position: IVector2d, w: number, h: number, fillColor: ICssColor|ColorName, lineColor?: ICssColor|ColorName, lineWidth?: number) => void;

	/**
	 * @param position - The rectangle's x coordinate
	 * @param w - The rectangle's width. This value must be positive.
	 * @param h - The rectangle's height. This value must be positive.
	 * @throws {Error}
	 */
	public constructor(@unmanaged() position: IVector2dMath, @unmanaged() w: number = 1, @unmanaged()  h: number = 1) {
		super(position);
		this.w = w;
		this.h = h;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the rectangle's width.
	 * @return {number}
	 */
	public get w(): number {
		return this._w;
	}

	/**
	 * Sets the rectangle's width.
	 * @param {number} width
	 * @throws {Error}
	 */
	public set w(width: number) {
		//Make sure the width is greater than 0.
		if (width < 0) {
			throw new Error(`Width must be greater than zero, you entered: ${width}`);
		}

		this._w = width;
	}

	/**
	 * Gets the rectangle's height.
	 * @return {number}
	 */
	public get h(): number {
		return this._h;
	}

	/**
	 * Sets the rectangle's width.
	 * @param {number} height
	 * @throws {Error}
	 */
	public set h(height: number) {
		//Make sure the width is greater than 0.
		if (height < 0) {
			throw new Error(`Height must be greater than zero, you entered: ${height}`);
		}

		this._h = height;
	}

	/**
	 * Gets the rectangle's area.
	 * @return {number}
	 */
	public get getArea(): number {
		return (this.w * this.h);
	}
	//#endregion
}
