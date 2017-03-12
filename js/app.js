// Constructor that creates class called "library" (global)
var library = function(){
};

// creates new empty array called bookArray and assigns it to "library"
// library.prototype.bookArray = new Array(); // could also be "= []"

// function that creates new book objects, using Object constructor
function createBook(bookTitle, bookAuthor, bookNumberOfPages, bookPublishDate){
	//properties
	this.title = bookTitle;
	this.author = bookAuthor;
	this.numberOfPages = bookNumberOfPages;
	this.publishDate = bookPublishDate;
};

// Shorthand for $( document ).ready()
$(function(){
		// creates new instance of 'library'
		window.library1 = new library();
		window.library1.init();

		//declaring variables and assigning new instances of our newBook class
		// window.book1 = new createBook("War and Peace","Leo Tolstoy", 140, 1869);
		// window.book2 = new createBook("Don Quixote","Miguel de Cervantes", 300, 1615);
		// window.book3 = new createBook("Hamlet","William Shakespeare", 220, 1601);
		// window.book4 = new createBook("To the Lighthouse","Virginia Woolf", 400, 1927);
		// window.book5 = new createBook("Anna Karenina","Leo Tolstoy", 150, 1877);
		// window.book6 = new createBook("Dubliners","James Joyce", 400, 1914);
		// window.book7 = new createBook("One Hundred Years of Solitude","Gabriel García Márquez", 320, 1967);
});

library.prototype.init = function(){
	//Cached selectors here (cache down) that will be reused throughout app
	this.$jumboTron = $(".jumbotron ul"); // target the output field in html
	// this.bookOutput = "<li><strong>Title: </strong>" + _addBook.title + "; " +
	// 	" <strong>Author: </strong>" + _addBook.author + "; " +
	// 	" <strong>Pages: </strong>" + _addBook.numberOfPages + "; " +
	// 	" <strong>Published: </strong>" + _addBook.publishDate + "</li>";
	this.bookArray = new Array();

	// methods to kick off on DOM ready
	this._bindEvents(); //underscore designates that it's private
};

// Proxy
library.prototype._bindEvents = function(){
	$('#add-book').on('click', $.proxy(this._addBook, this));
	$('#add-book').click(function(){
  	$('input[type="text"]').val('');
	});
	$('#remove-book-by-title').on('click', $.proxy(this._removeBookByTitle, this));
	$('#remove-book-by-title').click(function(){
		$('input[type="text"]').val('');
	});
};

//CREATE PROTOTYPE FUNCTIONS:

// ADD BOOK
// creates function called addBook and assigns it to "library"
library.prototype._addBook = function(){
	var aValue = this._getAddBookValues();
	// validate that new array has at least 4 values
	if (aValue.length >= 4) {
		// create container called 'book' to hold new createBook
		var book = new createBook(aValue[0], aValue[1], aValue[2], aValue[3]);
		// loop through bookArray and check for duplicates
		for (var i = 0; i < this.bookArray.length; i++) {
			if (this.bookArray[i].title == book.title) {
			// if duplicate book, return alert
			return alert('Sorry, that book has already been added');
			}
		}
		// otherwise, add new createBook to bookArray
		this.bookArray.push(book);
		// append new book as li to ul in the html jumbotron
		this.$jumboTron.append("<li><strong>Title: </strong>" + book.title + "; " +
			" <strong>Author: </strong>" + book.author + "; " +
			" <strong>Pages: </strong>" + book.numberOfPages + "; " +
			" <strong>Published: </strong>" + book.publishDate + "</li>");
		// this.$jumboTron.append(this.bookOutput); why won't this work??
		return true;
	}
	return alert('Please make sure all fields are filled out.');
};
// function that creates new array containing values from input fields
library.prototype._getAddBookValues = function(){
  var aVals = new Array();
  $("#new-book-form input").each(function(index, val){
    var vInput = $(this).val();
    if(vInput !== "" && vInput != NaN) {
      aVals.push($(this).val());
    }
  });
  return aVals;
};

// REMOVE BOOK BY TITLE
library.prototype._removeBookByTitle = function(){
	// create container called sValue that contains the string collected from input
	var sValue = this._getRemoveBookTitleValue();
	// loop through bookArray to check whether input field matches a book in the array
	for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].title == sValue) {
			// if it matches, remove it from the array
      this.bookArray.splice(i, 1);
			// update output display to reflect removal
			$('li').remove();  // ****** STUCK HERE! This removes all list items
      return true;
    }
	// if it doesn't match, return alert
  } return alert('Unable to find book with that title.');
};
// use jquery to find id of input field
// validate that input is not empty string or NaN
// return string and feed into removeBookByTitle function
library.prototype._getRemoveBookTitleValue = function(){
  var sVal;
  $("#remove-book-title-form input").each(function(index, val){
    var vInput = $(this).val();
    if(vInput !== "" && vInput != NaN) {
      sVal = vInput.toString();
    }
  });
  return sVal;
};

// REMOVE BOOK BY AUTHOR
library.prototype.removeBookByAuthor = function(bookAuthor){ // in console, pass actual author name
	var isAuthorRemoved = false;
	for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].author == bookAuthor) {
      this.bookArray.splice(i, 1);
      isAuthorRemoved = true;
    }
  } return isAuthorRemoved;
};

// GET RANDOM BOOK
library.prototype.getRandomBook = function(){
  var randomBook = Math.floor(Math.random() * this.bookArray.length);
  return this.bookArray.length <= 0 ? null : this.bookArray[randomBook];
};
// another way of doing Math.random:
// var max = this.bookArray.length;
// var min = 0;
// var randomBook = (Math.floor(Math.random() * (max - min)) + min);
// return this.bookArray(randomBook);

// GET BOOK BY TITLE
library.prototype.getBookByTitle = function(title){ // in console, pass actual author name
  var regex = new RegExp(title, 'gi');
  var bookByTitleArray = new Array();
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].title.match(regex)) {
      bookByTitleArray.push(this.bookArray[i]);
    }
  } return bookByTitleArray;
};

// GET BOOK BY AUTHOR
library.prototype.getBookByAuthor = function(author){ // in console, pass actual author name
  var regex = new RegExp(author, 'gi');
  var bookByAuthorArray = new Array();
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].author.match(regex)) {
      bookByAuthorArray.push(this.bookArray[i]);
    }
  } return bookByAuthorArray;
};

// ADD BOOKS (won't add duplicates)
library.prototype.addBooks = function(array){ // blah = whatever I'm passing in
	var counter = 0;
	for (var i = 0; i < array.length; i++) {
  	if (this.addBook(array[i])){
			counter ++;
		}
  }
  return counter;
};

// GET AUTHORS
library.prototype.getAuthors = function(){
  var authorArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
    if (authorArray.indexOf(this.bookArray[i].author) < 0){ // checking for duplicates, or not in there
      authorArray.push(this.bookArray[i].author);
    }
  } return authorArray;
};


// GET RANDOM AUTHOR
library.prototype.getRandomAuthor = function(){ // in console,
  var randomAuthor = Math.floor(Math.random() * this.bookArray.length);
  return this.bookArray.length <= 0 ? null : this.bookArray[randomAuthor].author;
};

// library1.addBook(book1);
// library1.addBook(book2);
// library1.addBook(book3);
// library1.addBook(book4);



//local storage start:
library.prototype._setObject = function (){
	// console.log('test');
	var cachedArray = this.bookArray;
	// set bookArray to some variable in localstorage
};

// // Store
// localStorage.cachedArray = "Smith";
// // Retrieve
// document.getElementById("result").innerHTML = localStorage.lastname;
