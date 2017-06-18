/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { StateData } from '../system/system.types';

/**
 * @interface
 */
export interface IEntity {
	draw(data: StateData): void;
	update(data: StateData): void;
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
