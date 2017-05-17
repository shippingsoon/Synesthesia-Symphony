/*
 * @description - Synesthesia Symphony. The main function is invoked in this file.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system/system.ts" />

//Program starting point.
namespace Symphony {
	'use strict';

	//Tell the TypeScript compiler we are using the jQuery library.
	export declare let jQuery:any;

	//Let the compiler know that we are using the Lodash utilities library..
	export declare let _:any;
	export declare let Keydown:any;

	//Initiate the main game loop.
	System.main();
}