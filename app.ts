/**
 * @file The application's entry point.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { main } from './system/system';

/**
 * The application's entry point.
 * @namespace
 */
namespace SynesthesiaSymphony {
	'use strict';

	//Initiate the main game loop.
	main().catch(err => {
		console.error(err);
	});
}
