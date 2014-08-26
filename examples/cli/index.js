//Usually would be require('moody')();
var moody = require('../..')();
var _ = require('lodash');
var chalk = require('chalk');
var prompt = require('prompt');
prompt.start();


function process() {
	console.log(chalk.blue('\nProcessing...'));
	moody.execute('process');
}

//Sample record
var books = [
	{
		title: '1984',
		id: '0',
		author: {
			name: "George Orwell",
			birthyear: "1903"
		},
		pages: 300
	},
	{
		title: 'Fahrenheit 451',
		id: '1',
		author: {
			name: "Ray Bradbury",
			birthyear: "1920"
		},
		pages: 200
	}
];

var booksState = {
	enter: function (oldState, booksData) {
		this.books = booksData;
	},
	process: function () {
		var self = this;
		_.each(this.books, function (book) {
			console.log(book.id + ': ' + book.title);
		});
		prompt.get(['bookId'], function (err, result) {
			var bookId = result.bookId;
			var book = _.find(self.books, {id: bookId});
			moody.push(bookState, book);
	  });
	}
};

var bookState = {
	enter: function (oldState, book) {
		this.book = book;
		process();
	},
	process: function () {
		var self = this;
		console.log(_.template(
			'title : <%= title %>\n' +
			'pages : <%= pages %>\n' +
			'author: <%= author.name %>\n'
			, this.book));
		var yesNoProperty = {
			name: 'yesno',
			message: 'View author?',
			validator: /y[es]*|n[o]?/,
			warning: 'Must respond yes or no',
			default: 'no'
		};
		prompt.get(yesNoProperty, function (err, result) {
			if (result.yesno.charAt(0) === 'y') {
				moody.push(authorState, self.book.author);
			} else {
				var yesNoProperty = {
					name: 'yesno',
					message: 'View another book?',
					validator: /y[es]*|n[o]?/,
					warning: 'Must respond yes or no',
					default: 'no'
				};
				prompt.get(yesNoProperty, function (err, result) {
					if (result.yesno.charAt(0) === 'y') {
						moody.pop();
						process();
					}
				});
			}
	  });
	}
}

var authorState = {
	enter: function (oldState, author) {
		this.author = author;
		process();
	},
	process: function () {
		console.log(_.template(
			'name      : <%= name %>\n' +
			'birthyear : <%= birthyear %>\n'
			, this.author));
		var yesNoProperty = {
			name: 'yesno',
			message: 'View another book?',
			validator: /y[es]*|n[o]?/,
			warning: 'Must respond yes or no',
			default: 'no'
		};
		prompt.get(yesNoProperty, function (err, result) {
			if (result.yesno.charAt(0) === 'y') {
				moody.pop();
				moody.pop();
				process();
			}
		});
	}
}

moody.push(booksState, books);
process();
