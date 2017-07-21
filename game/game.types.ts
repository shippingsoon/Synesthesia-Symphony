/**
 * @file Game types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IColor } from '../graphics/graphics.types';

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
	//Determines if MIDI.js library will only use the piano instrument.
	readonly ONLY_USE_PIANO_INSTRUMENT: boolean;
	//The path to the MIDI files used by MIDI.js.
	readonly MIDI_DIRECTORY: string;
	//The path to the soundfonts used by MIDI.js
	readonly SOUNDFONT_DIRECTORY: string;
	//The canvas' width and height at various resolutions. See IResolution for more info.
	readonly RESOLUTIONS: {
		readonly LOW: IResolution,
		readonly MEDIUM: IResolution,
		readonly HIGH: IResolution
	};
	//The player's initial lives.
	readonly PLAYER_INITIAL_LIVES: number;
	//The player's max power.
	readonly PLAYER_MAX_POWER: number;
	//The player's initial speed.
	readonly PLAYER_INITIAL_POWER: number;
	//The player's speed.
	readonly PLAYER_SPEED: number;
	//The player's speed when the SHIFT KEY is pressed.
	readonly PLAYER_FOCUS_SPEED: number;
	//The player's hitbox radius.
	readonly PLAYER_HITBOX_RADIUS: number;
	//Determines how long in milliseconds the player will be invulnerable after taking damage.
	readonly PLAYER_INVULNERABILITY_TIMEOUT: number;
}

/**
 * @interface
 */
export interface ISession {
	readonly bgmVolumeLevel: number;
	readonly sfxVolumeLevel: number;
	config: IConfig;
	data: any;//Interface TBA
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

export interface IGameData {d
	enemies: Array<any>;
	player: object;
	songs: Array<any>;
}