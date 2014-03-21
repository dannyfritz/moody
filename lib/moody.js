'use strict';

(function () {
	var _ = require('lodash');
	var utils = require('./moody-utils.js');

	/**
		This follows the singleton pattern.
		@module Moody
	*/

	/**
		Moody is a library for defining running states such as a gamestate.
		Example states of a game would be menu, game, and credits.

		@class Moody
	*/

	/**
		This Array holds all the current states.

		@property states
		@type Array
		@private
	*/
	var states = [];

	var Moody = {

		/**
			Returns the current state.

			@method current
			@return currentState {Object}
		*/
		current: function () {
			return _.last(states);
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
			var args = utils.getArguments(arguments);
			var lastState = this.current();
			states.push(state);
			if (_.isObject(lastState)) {
				args = [lastState].concat(args);
			}
			return utils.callCallback(state, 'enter', args);
		},

		/**
			Remove the current state from the stack.
			Calls the `leave` callback on the state being removed.

			@method pop
			@return poppedState {Object}
		*/
		pop: function () {
			var poppedState = states.pop();
			if (_.isUndefined(poppedState)) {
				throw new Error('No states to pop.');
			}
			return utils.callCallback(poppedState, 'leave');
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
			var oldState = this.pop();
			utils.callCallback(oldState, 'leave');
			return this.push.apply(this, arguments);
		},

		/**
			Calls the function denoted by `functionName` on the current state.

			If the value is not a function it returns the value it maps to.

			@method switch
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
			currentState[functionName].apply(currentState, args);
		}
	};

	module.exports = Moody;
})();