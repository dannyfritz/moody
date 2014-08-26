//Usually would be require('moody')();
var moody = require('../..')();
var chalk = require('chalk');

var enter = function (oldState) {
	console.log(chalk.green.bold('Entering'), chalk.white(this.name), chalk.dim('from'), chalk.white(oldState && oldState.name));
}

var leave = function (oldState) {
	console.log(chalk.red.bold('Leaving'), chalk.white(this.name));
}

var firstState = {
	name: 'first',
	enter: enter,
	leave: leave
};

var secondState = {
	name: 'second',
	enter: enter,
	leave: leave
}

var thirdState = {
	name: 'third',
	enter: enter,
	leave: leave
}

var anotherThirdState = {
	name: 'anotherThird',
	enter: enter,
	leave: leave
}

moody.push(firstState);
moody.push(secondState);
moody.push(thirdState);
moody.switch(anotherThirdState);
moody.pop();
moody.pop();
moody.pop();
