/**
 * @file The system namespace is the foundation for which every class is built upon.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { LoadState } from '../game/state/game.load-state';
import { singleton } from '../game/synesthesia-symphony';

//The current time. This is used to measure the delta time between two frames.
let currentTime: number = Date.now();

/**
 * This is the program's entry point. This method loads a session from a CONFIG file, initiates various HTML5 resources, and invokes the game loop.
 * @throws {Error}
 * @return {Promise<void>}
 */
export async function main(configURL: string = '/synesthesia-symphony/CONFIG.json'): Promise<void> {
	const λ = singleton.getInstance();

	//Transition to the Load state.
	λ.fsm.push({state: new LoadState(), session: λ.session});
}

/**
 * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
 * @throws {Error}
 * @return {void}
 */
export function gameLoop(): void {
	//This variable holds the time that was stored in the previous frame.
	const previousTime: number = currentTime;
	const λ = singleton.getInstance();

	//Update the current time.
	currentTime = Date.now();

	//Delta time is the time difference between the current and previous frames.
	let dt: number = currentTime - previousTime;

	//Check to see if the delta time is zero.
	if (dt === 0) {
		//throw new Error('Delta time is zero');
		console.log('Delta is zero');
		dt = 0.1;
	}

	//Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
	λ.session.setAnimationFrameId = requestAnimationFrame(gameLoop);

	//Update the instantaneous frames per second.
	λ.session.setFPS = 1000.0 / dt;

	//console.log(`FPS: ${λ.session.getFPS.toFixed(2)}`);

	//Limit the frame rate.
	if (dt > λ.session.CONFIG.TARGETED_FPS) {
		dt = λ.session.CONFIG.TARGETED_FPS;
	}

	//Handle logic in the current state.
	λ.fsm.update({session: λ.session, dt: dt});

	//Render the current state.
	λ.fsm.draw({session: λ.session, dt: dt});
}
