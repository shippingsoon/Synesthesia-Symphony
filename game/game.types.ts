/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IStateData } from '../system/system.types';
import { IColor } from '../graphics/graphics.types';

/**
 * @interface
 */
export interface IEntity {
	draw(data: IStateData): void;
	update(data: IStateData): void;
}

/**
 * @interface
 */
export interface EntityType {
	readonly bosses: IEntity[];
	readonly enemies: IEntity[],
	readonly projectiles: IEntity[],
	readonly items: IEntity[]
}

/**
 * @interface
 */
export interface EntityData {
	readonly manager: any;
	readonly dt: number;
}

/**
 * @type EntityKeys
 */
export type EntityKeys = 'bosses' | 'enemies' | 'projectiles' | 'items';

/**
 * Placeholder test interface
 * @interface
 */
export interface ILifeform {
	x: number;
	y: number;
	radius: number;
	fillColor?: IColor;
	borderColor?: IColor;
	borderWidth?: number;
}

/**
 * @interface
 */
export interface IItem {
	x: number;
	y: number;
}
