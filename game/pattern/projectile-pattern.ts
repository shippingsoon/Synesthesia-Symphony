/**
 * @file Pattern class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony/} for online demo
 */

import {inject, injectable} from 'inversify';
import {TYPES} from '../../bootstrap/inversify.types';
import {IProjectile, IProjectilePattern} from '../types';

/**
 * @classdesc The projectile pattern (a.k.a Danmaku).
 */
@injectable()
export class ProjectilePattern implements IProjectilePattern {
	public constructor(
		@inject(TYPES.Projectiles) private readonly projectiles: Set<IProjectile>
	) {
	}
}
