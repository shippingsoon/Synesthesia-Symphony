/**
 * @file Session singleton class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {IConfig, IGameData, ISession} from '../game/game.types';
import { injectable } from 'inversify';

/**
 * @class
 * @classdesc Session class
 */
@injectable()
export class Session implements ISession {
	private _bgmVolumeLevel: number;
	private _sfxVolumeLevel: number;
	private _config: IConfig;
	private _data: IGameData;

	public get bgmVolumeLevel(): number {return this._bgmVolumeLevel;}
	public set bgmVolumeLevel(bgmVolumeLevel: number) {this._bgmVolumeLevel = bgmVolumeLevel;}
	public get sfxVolumeLevel(): number {return this._bgmVolumeLevel;}
	public set sfxVolumeLevel(sfxVolumeLevel: number) {this._bgmVolumeLevel = sfxVolumeLevel;}

	public get config(): IConfig {return this._config;}
	public set config(config: IConfig) {this._config = config;}
	public get data(): IGameData {return this._data;}
	public set data(data: IGameData) {this._data = data;}
	public constructor() {}
}
