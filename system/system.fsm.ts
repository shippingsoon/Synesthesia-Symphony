/*
 * @description - The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />

namespace Symphony.System {


    /*
     * The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
     */
    export class FSM {
        //An array of game states.
        private states:Array<State> = new Array();

        /*
         * Handle logic in the current state.
         * @param {number} data.dt - Delta time between the current and previous frames.
         * @return {void}
         */
        public update(data:StateData):void {
            //If the games states array is not empty.
            if (!_.isEmpty(this.states)) {
                //Use Lodash to grab the last element in the array.
                //Handle logic in the current state.
                _.last(this.states).update(data);
            }
        }

        /*
         * Render the current state.
         * @param {CanvasRenderingContext2D} data.ctx - Provides the 2D rendering context.
         * @return {void}
         */
        public draw(data:StateData):void {
            //NOTE: Might want to consider removing this IF statement, it is an edge case.
            if (!_.isEmpty(this.states)) {
                //Handle drawing routines for the current state.
                _.last(this.states).draw(data);
            }
        }

        /*
         * Pushes a new state on to the stack.
         * @param {System.State} game.state - A state to be processed.
         * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
         * @param {number} data.dt - Delta time between the current and previous frames.
         * @return {void}
         */
        public push(game:StateData):void {
            //Pause the current state
            if (!_.isEmpty(this.states))
                _.last(this.states).pause(game);

            //Push a new state and invoke its constructor.
            this.states.push(game.state);

            //Initiate the new state.
            _.last(this.states).start(game);
        }

        /*
         * Pops a state from the stack and optionally suspends the state.
         * @param {Boolean} data.pause - Determines if we will pause the state before switching to a previous state.
         * @param {CanvasRenderingContext2D} data.ctx - Provides the 2D rendering context.
         * @return {void}
         */
        public pop(data:StateData):void {
            if (!_.isEmpty(this.states)) {
                //Determine if we will pause the current state.
                if (data.pause)
                    _.last(this.states).stop(data);

                //Pop the current state.
                this.states.pop();

                //Resume the previous state.
                _.last(this.states).play(data);
            }
        };
    }

    /*
     * The data structure we will pass to the finite state machine.
     */
    export interface StateData {
        //HTML5 2D rendering context.
        ctx?:CanvasRenderingContext2D;

        //A game state.
        state?:State;

        //Delta time. The time difference from the current and previous game state.
        dt?:number;

        //Determines if we will pause the state.
        pause?:boolean;
    }
}

