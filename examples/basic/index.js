//Usually would be require('moody')();
var moody = require('../..')();

//There are 3 special methods on states,
//	init : called once before entering state
//	enter: called when a state is pushed
//	leave: called when a state is popped
var firstState = {
	enter: function (lastState) {

	}
}
