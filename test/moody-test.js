var test = require('tape');
var _ = require('lodash');
var sinon = require('sinon');

var newMoody = require('..');

test('moody', function (t) {

	t.test('constructor', function (st) {
		st.ok(_.isFunction(newMoody), 'Constructor is a Function');
		var moody = newMoody();
		st.ok(_.isObject(moody), 'Constructor returns an object');
		st.equal(_.size(moody.states), 0, 'moody.states is empty');

		moody = newMoody();
		st.equal(_.size(moody.states), 0, 'new moody.states is empty');
		st.end();
	});

	t.test('current', function (st) {
		var moody = newMoody();
		var state = {};
		var anotherState = {};

		moody.push(state);
		var currentState = moody.current();
		st.equal(currentState, state, 'currentState equals state.');

		moody.push(anotherState);
		currentState = moody.current();
		st.equal(currentState, anotherState, 'currentState equals anotherState.');

		moody.pop();
		currentState = moody.current();
		st.equal(currentState, state, 'currentState equals state.');
		st.end();
	});

	t.test('push', function (st) {
		var moody = newMoody();
		st.equal(_.size(moody.states), 0, 'moody.states is empty');

		moody.push({});
		st.equal(_.size(moody.states), 1, 'moody.states has 1 state after moody.push');

		moody.push({});
		st.equal(_.size(moody.states), 2, 'moody.states has 2 state after 2 moody.push');
		st.end();
	});

	t.test('enter callback', function (st) {
		var moody = newMoody();
		var enter = sinon.stub().returns('A beautiful return!');
		var state = {
			enter: enter
		};

		var result = moody.push(state);
		st.ok(enter.calledOnce, 'enter called after moody.push.');
		st.equal(result, 'A beautiful return!', 'moody.push retrurned callback value.');
		st.end();
	});

	t.test('push errors', function (st) {
		st.throws(function () {
				var moody = newMoody();
				moody.push(1);
			},
			'Pushed state must be an object.',
			'moody.push arg must be an object.'
		);
		st.end();
	});

	t.test('pop', function(st) {
		var moody = newMoody();

		moody.push({});
		st.equal(_.size(moody.states), 1, 'moody.states has 1 state after moody.push');

		moody.pop();
		st.equal(_.size(moody.states), 0, 'moody.states is empty');
		st.end();
	});

	t.test('pop errors', function (st) {
		st.throws(function () {
				var moody = newMoody();
				moody.pop();
			},
			'No states to pop.',
			'moody.pop cannot be called when moody is empty.'
		);
		st.end();
	});

	t.test('leave callback', function (st) {
		var moody = newMoody();
		var leave = sinon.stub().returns('A beautiful return!');
		var state = {
			leave: leave
		};

		moody.push(state);
		var result = moody.pop();
		st.ok(leave.calledOnce, 'leave called after moody.pop.');
		st.equal(result, 'A beautiful return!', 'moody.pop retrurned callback value.');
		st.end();
	});

	t.test('swap', function (st) {
		var moody = newMoody();
		var leave = sinon.stub();
		var state = {
			leave: leave
		};
		var enter = sinon.stub().returns('A very pretty return!');
		var anotherState = {
			enter: enter
		};

		moody.push(state);
		st.equal(_.size(moody.states), 1, 'moody.states has 1 state after moody.push');

		var result = moody.swap(anotherState);
		st.equal(_.size(moody.states), 1, 'moody.states has 1 state after moody.push');
		st.ok(leave.calledOnce, 'leave called after moody.swap.');
		st.ok(enter.calledOnce, 'enter called after moody.swap');
		st.equal(result, 'A very pretty return!', 'moody.swap returned leave callback value');
		st.end();
	});

	t.test('swap errors', function (st) {
		st.throws(function () {
				var moody = newMoody();
				moody.swap(1);
			},
			'swaped state must be an object.',
			'moody.swap arg must be an object.'
		);
		st.end();
	});

	t.test('execute', function (st) {
		var moody = newMoody();
		var method = sinon.stub().returns('I do things!');
		var state = {
			method: method
		};
		var anotherMethod = sinon.stub().returns('I also do things!');
		var anotherState = {
			method: anotherMethod
		};

		moody.push(state);
		var result = moody.execute('method');
		st.ok(method.calledOnce, 'method called after moody.execute');
		st.equal(result, 'I do things!', 'moody.execute returned callback value');

		moody.push(anotherState);
		result = moody.execute('method');
		st.ok(anotherMethod.calledOnce, 'anotherMethod called after moody.execute');
		st.equal(result, 'I also do things!', 'moody.execute returned callback value');

		moody.pop(state);
		result = moody.execute('method');
		st.equal(method.callCount, 2, 'method called twice after moody.execute');
		st.equal(result, 'I do things!', 'moody.execute returned callback value');
		st.end();
	});

	t.test('execute empty moody', function (st) {
		var moody = newMoody();

		t.equal(moody.execute('method'), undefined, 'undefined returned calling execute on an empty moody.');
		st.end();
	});

	t.test('execute value', function (st) {
		var moody = newMoody();
		var state = {
			property: 1
		};

		moody.push(state);
		t.equal(moody.execute('property'), 1, 'return value if not a function.');
		st.end();
	});

	t.test('execute errors', function (st) {
		st.throws(function () {
				var moody = newMoody();
				moody.execute(1);
			},
			'functionName must be a String.',
			'Execute functionName art must be a string.'
		);
		st.end();
	});

	t.test('crap callback value', function (st) {
		var moody = newMoody();
		var state = {
			enter: 1,
			leave: 2
		};

		var result = moody.push(state);
		st.equal(result, 1, 'moody.push retrurned property value.');

		result = moody.pop();
		st.equal(result, 2, 'moody.pop retrurned property value.');
		st.end();
	});

	t.end();
});
