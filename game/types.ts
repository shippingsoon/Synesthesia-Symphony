/**
 * @file Game types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ColorName, IColor, IVector2d} from '../graphics/types';

/**
 * @interface
 */
export interface IEntity {
	draw(): void;
	update(): void;
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
 * @interface
 */
export interface IResource {
	readonly canvas: HTMLCanvasElement;
	readonly backgroundCanvas: HTMLCanvasElement;
	readonly context: CanvasRenderingContext2D;
	readonly backgroundContext: CanvasRenderingContext2D;
	readonly foo?: number;
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
export interface IGameData {d
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
