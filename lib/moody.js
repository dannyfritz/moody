'use strict';

var _ = require('lodash');
var utils = require('./moody-utils.js');

/**
	This follows the singleton pattern.
	@module moody
*/

/**
	moody is a library for defining running states such as a gamestate.
	Example states of a game would be menu, game, and credits.

	@class moody
	@singleton
*/

function Moody() {
	return {
		/**
			This Array holds all the current states.

			@property states
			@type Array
			@private
		*/
		states: [],

		/**
			Returns the current state.

			@method current
			@return currentState {Object}
		*/
		current: function () {
			return _.last(this.states);
		},

		/**
			Push a new state onto the stack.

			Calls the `enter` callback on the state being added.

			@method push
			@param state {Object}
			@param [argument]* {Mixed} Arguments to pass to the `enter` callback.
			@return enterReturn {Mixed}
		*/
		push: function (state) {
			if (!_.isObject(state)) {
				throw new Error('Pushed state must be an object.');
			}
			var lastState = this.current();
			this.states.push(state);
			var args = utils.getArguments(arguments);
			args = [lastState].concat(args);
			return utils.callCallback(state, 'enter', args);
		},

		/**
			Remove the current state from the stack.
			Calls the `leave` callback on the state being removed.

			@method pop
			@return poppedState {Object}
		*/
		pop: function () {
			var poppedState = this.states.pop();
			if (_.isUndefined(poppedState)) {
				throw new Error('No states to pop.');
			}
			var args = utils.getArguments(arguments);
			return utils.callCallback(poppedState, 'leave', args);
		},

		/**
			In with the new state. Out with the old state.

			Pop the current state and replace with a new one.
			Calls the `enter` callback on new state.
			Calls the `leave` callback on the previous state.

			@method switch
			@param toState {Object} State to be switched in.
			@param [argument]* {Mixed} Arguments to pass to the `enter` callback.
			@return enterReturn {Mixed}
		*/
		switch: function (toState) {
			if (!_.isObject(toState)) {
				throw new Error('Switched state must be an object.');
			}
			var leaveResult = this.pop();
			var enterResult = this.push.apply(this, arguments);
			return {
				enter: enterResult,
				leave: leaveResult
			};
		},

		/**
			Calls the function denoted by `functionName` on the current state.

			If the value is not a function it returns the value it maps to.

			@method execute
			@param functionName {String} The name of the function to be called on the
				current state.
			@param [argument]* {Mixed} Arguments to pass to the function.
		*/
		execute: function (functionName) {
			if (!_.isString(functionName)) {
				throw new Error('functionName must be a String.');
			}
			var currentState = this.current();
			if (!_.isObject(currentState)) {
				return undefined;
			}
			if (!_.isFunction(currentState[functionName])) {
				return currentState[functionName];
			}
			var args = utils.getArguments(arguments);
			return currentState[functionName].apply(currentState, args);
		}
	};
}

module.exports = Moody;
