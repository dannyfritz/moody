'use strict';

var _ = require('lodash');

var utils = {

	/**
		@method callCallback
		@private
		@param source {Object} Object bound to `this`
		@param callbackNAme {String}
		@param [args] {Array}
	*/
	callCallback: function (source, callbackName, args) {
		if (!_.isFunction(source[callbackName])) {
			return source[callbackName];
		}
			return source[callbackName].apply(source, args);
	},

	/**
		@method getArguments
		@private
		@param callback {Function}
		@param [args] {Array}
	*/
	getArguments: function (args, offset) {
		return _(args).toArray().rest(offset).value();
	}
};

module.exports = utils;
