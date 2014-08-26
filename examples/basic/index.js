//Usually would be require('moody')();
var moody = require('../..')();
var _ = require('lodash');

function process() {
	console.log(moody.execute('process'));
}

//Sample record
var books = [
	{
		title: '1984',
		id: 0,
		author: {
			name: "George Orwell",
			birthyear: "1903"
		},
		pages: 300
	},
	{
		title: 'Fahrenheit 451',
		id: 1,
		author: {
			name: "Ray Bradbury",
			birthyear: "1920"
		},
		pages: 200
	}
];

var booksState = {
	enter: function (oldState, booksData) {
		console.log(booksData);
		this.books = booksData;
	},
	process: function () {
		_.each(this.books, function (book) {
			console.log(book);
			console.log(book.id + ': ' + book.title);
		});
		var prompt = require('prompt');
		prompt.start();
		prompt.get(['bookId'], function (err, result) {
			var bookId = result.bookId;
			var book = _.find(this.books, {id: bookId});
	    console.log('You chose: ' + book.title);
	  });
	}
};

moody.push(booksState, books);
moody.execute('process');

var bookState = {
	enter: function (oldState) {
		this.book = oldState.user;
	},
	talk: function (message) {
		console.log(this.user + ' says, "' + message + '"');
	}
}
