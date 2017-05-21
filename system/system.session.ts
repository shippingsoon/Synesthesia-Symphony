/*
 * @description - Session management.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />
/// <reference path="./../synesthesia-symphony.ts" />


namespace Symphony.System.Session {
	//Tell the TypeScript compiler we are using the jQuery library.
	declare let jQuery:any;

	/**
	 * Loads configuration data from a JSON file or remote database.
	 * @param {string} url - The URL to request data from.
	 * @param {Function} callback - The callback method that will be invoked on success.
	 * @returns {void}
	 */
	export function loadSession(url:string, callback:Function):void {
		jQuery.ajax({
			dataType: "json",
			url: url,
			success: callback,
			error: _onError
		});
	}

	/**
	 * Saves configuration data to a remote database via a RESTful JSON API.
	 * @param {string} url - The URL of the RESTFul API that we will send data to.
	 * @param {Symphony.System.Session.ConfigType} config - The configuration data we will be saving.
	 * @param {Function} callback
	 * @returns {void}
	 */
	export function saveSession(url:string, config:Symphony.System.Session.ConfigType, callback:Function):void {
		jQuery.ajax({
			dataType: "json",
			type: "POST",
			url: url,
			data: config,
			success: callback,
			error: _onError
		});
	}

	/**
	 * Initiates a session.
	 * @param {Function} callback
	 * @returns {void}
	 */
	export function init(callback:Function):void {
		//Read the configuration data from the config.json file.
		Session.loadSession("/synesthesia-symphony/config.json", function(json) {
			//This will determine if we will pull configuration data from a database.
			if (json.USE_DB) {
				//Load the configuration data from a remote database.
				//this.load("localhost:3000/api/load", callback);
			}
			else {
				//Use the config data we received from the config.json file.
				callback(json);
			}
		})
	}

	/**
	 * An interface for configuration data.
	 */
	export interface ConfigType {
		readonly USE_DB:boolean;
		readonly DEBUG_MODE:boolean;
		readonly ONLY_USE_PIANO_INSTRUMENT:boolean;
		readonly TARGETED_FPS:number,
		readonly PLAYER_INITIAL_LIVES:number;
		readonly PLAYER_MAX_POWER:number;
		readonly PLAYER_INITIAL_POWER:number;
		readonly PLAYER_SPEED:number;
		readonly PLAYER_FOCUS_SPEED:number;
		readonly PLAYER_HITBOX_RADIUS:number;
		readonly PLAYER_INVULNERABILITY_TIMEOUT:number;
		readonly MIDI_FILE_PATH:string;
		readonly TITLE:string;
		readonly DEVELOPER:string;
		readonly VERSION:string;
		readonly RESOLUTIONS:{
			LOW:ResolutionType,
			MEDIUM:ResolutionType,
			HIGH:ResolutionType
		};
	}

	export interface ResolutionType {
		readonly W:number;
		readonly H:number;
		readonly CANVAS_W:number;
		readonly CANVAS_H:number;
	}

	/**
	 * Helper method for logging error messages. TODO: Add this to a Debug namespace.
	 * @param {object} err - An object containing server request status.
	 * @returns {void}
	 */
	function _onError(err:object):void {
		console.error("An error has occurred, make sure you are pulling valid JSON from the config.json file", err);
	}
}
