/**
 * @file Session class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {IConfig, IGameData, ISession} from '../game/types';
import {injectable, unmanaged} from 'inversify';

/**
 * @classdesc Session class. This was originally a singleton class but was refactored to use InversifyJs' singleton scope.
 */
@injectable()
export class Session implements ISession {
	//Background music volume level.
	private _bgmVolumeLevel: number = 127;

	//Sound effects volume level.
	private _sfxVolumeLevel: number = 127;

	//Read only configuration data. This data is stored in a config.json file. See IConfig for more details.
	private _config: IConfig;

	//Game data used to initiate entities such as player, projectile, and items. This data is either loaded from a database or a JSON file.
	private _data: IGameData;

	public constructor() {}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the background music volume level.
	 * @return {number}
	 */
	public get bgmVolumeLevel(): number {return this._bgmVolumeLevel;}

	/**
	 * Sets the background music volume level.
	 * @param bgmVolumeLevel - The background music volume level. Must be between 0-127.
	 * @throws {Error}
	 */
	public set bgmVolumeLevel(bgmVolumeLevel: number) {
		if (bgmVolumeLevel < 0 || bgmVolumeLevel > 127) {
			throw new Error('Background music volume level must be between 0 and 127');
		}

		this._bgmVolumeLevel = bgmVolumeLevel;
	}

	/**
	 * Gets the sound effects volume level.
	 * @return {number}
	 */
	public get sfxVolumeLevel(): number {return this._bgmVolumeLevel;}

	/**
	 * Sets the sound effects volume level.
	 * @param {number} sfxVolumeLevel - The sound effects volume to set. Must be between 0-127.
	 * @throws {Error}
	 */
	public set sfxVolumeLevel(sfxVolumeLevel: number) {
		if (sfxVolumeLevel < 0 || sfxVolumeLevel > 127) {
			throw new Error('Sound effects volume level must be between 0 and 127');
		}

		this._bgmVolumeLevel = sfxVolumeLevel;
	}

	/**
	 * Gets the readonly configuration data. See config.json or IConfig for more details.
	 * @return {IConfig}
	 */
	public get config(): IConfig {return this._config;}

	/**
	 * Gets the configuration data.
	 * @param config - The configuration data.
	 */
	public set config(config: IConfig) {this._config = config;}

	/**
	 * Gets the game data.
	 * @return {IGameData}
	 */
	public get data(): IGameData {return this._data;}

	/**
	 * Sets the game data.
	 * @param data - The game data.
	 */
	public set data(data: IGameData) {this._data = data;}
	//#endregion
}
