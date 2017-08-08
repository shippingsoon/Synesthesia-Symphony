/**
 * @file Game types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ColorName, IColor, IVector2d} from '../graphics/types';
import {Projectile} from './projectile';

/**
 * @interface
 */
export interface IEntity {
	draw(): void;
	update(): void;
}

/**
 * @type EntityKeys
 */
export type EntityKeys = 'bosses' | 'enemies' | 'projectiles' | 'items';

/**
 * @interface
 */
export interface IItem {
	x: number;
	y: number;
}

/**
 * An interface for configuration data.
 * @interface
 */
export interface IConfig {
	//Database URL.
	readonly DB_URL: string;
	//Determines if debug information will be logged to the console. Setting this to true may (or may not) break things.
	readonly DEBUG_MODE: boolean;
	//Determines if MidiJs.js library will only use the piano instrument.
	readonly ONLY_USE_PIANO_INSTRUMENT: boolean;
	//The path to the MidiJs files used by MidiJs.js.
	readonly MIDI_DIRECTORY: string;
	//The path to the soundfonts used by MidiJs.js
	readonly SOUNDFONT_DIRECTORY: string;
	//Project name.
	readonly PROJECT_NAME: string;
	//The canvas' width and height at various resolutions. See IResolution for more info.
	readonly RESOLUTIONS: {
		readonly LOW: IResolution,
		readonly MEDIUM: IResolution,
		readonly HIGH: IResolution
	};
}

/**
 * @interface
 */
export interface ISession {
	readonly bgmVolumeLevel: number;
	readonly sfxVolumeLevel: number;
	config: IConfig;
	data: IGameData;
}

/**
 * Screen resolution data structure.
 * @interface
 */
export interface IResolution {
	readonly W: number;
	readonly H: number;
	readonly CANVAS_W: number;
	readonly CANVAS_H: number;
}

/**
 * @interface
 */
export interface IGame {
	main(timestamp: number): void;
}

/**
 * @interface
 */
export interface IGameData {
	readonly enemies: Array<any>;
	readonly player: {
		readonly position: IVector2d,
		readonly r: number,
		readonly speed: number,
		readonly fillColor: IColor|ColorName,
		readonly secondaryColor: IColor|string,
		readonly secondarySpeed: number
	};
	readonly songs: Array<any>;
}

/**
 * @interface
 */
export interface IPianoKey {
	isBlack: boolean;
	draw(ctx: CanvasRenderingContext2D);
	destroy(): void;
}

/*
gameData;
export const canvasResource: ICanvasResource = new CanvasResource();

export const projectiles: Set<Projectile> = new Set<Projectile>();
export const items: Set<IItem> = new Set<IItem>();
export const enemies: Set<IEnemy> = new Set<IEnemy>();
export const bosses: Set<IBoss> = new Set<IBoss>();
*/

export const projectiles: Set<Projectile> = new Set<Projectile>();
export let loadedGameData: IGameData;
