/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */
/**
 * @interface
 */
export interface IMidiJs {
	Soundfont: any;
	GeneralMIDI: any;
	Player: any;
	loader: any;
	noteToKey: {[index: number]: string};
	keyToOctave: {[index: string]: number};
	programChange(channel: number, program: number): void;

}

/**
 * @interface
 */
export interface IMidiJsData {
	readonly channel: number;
	readonly end: number;
	readonly message: number;
	readonly note: number;
	readonly now: number;
	readonly velocity: number;
}