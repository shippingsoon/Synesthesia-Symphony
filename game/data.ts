/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/*
gameData;
export const canvasResource: ICanvasResource = new CanvasResource();
*/

import {IBoss, IConfig, IEnemy, IGameData, IItem, IPianoKey, IProjectile} from './types';

export let loadedGameData: IGameData;
export let config: IConfig;
export const projectiles: Set<IProjectile> = new Set<IProjectile>();
export const items: Set<IItem> = new Set<IItem>();
export const enemies: Set<IEnemy> = new Set<IEnemy>();
export const bosses: Set<IBoss> = new Set<IBoss>();
export const pianoKeys: Array<IPianoKey> = new Array<IPianoKey>();
