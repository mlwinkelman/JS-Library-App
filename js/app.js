// Constructor that creates class called "library" (global)
var library = function() {};
// creates new instance of 'library'
var library1 = new library();
// creates new empty array called bookArray and assigns it to "library"
library.prototype.bookArray = new Array(); // could also be "= []"

// function that creates new book objects, using Object constructor
function createBook(bookTitle, bookAuthor, bookNumberOfPages, bookPublishDate){
	//properties
	this.title = bookTitle;
	this.author = bookAuthor;
	this.numberOfPages = bookNumberOfPages;
	this.publishDate = bookPublishDate;
};

// GAVIN'S REFACTOR - function to assign createBook to library and push the books into the bookArray
// library.prototype.createBook = function(bookTitle, bookAuthor, bookNumberOfPages, bookPublishDate){
//   var book = {};
// 	//properties
// 	book.title = bookTitle;
// 	book.author = bookAuthor;
// 	book.numberOfPages = bookNumberOfPages;
// 	book.publishDate = bookPublishDate;
//
//   this.bookArray.push(book);
// }

//declaring variables and assigning new instances of our newBook class
var book1 = new createBook("War and Peace","Leo Tolstoy", 140, 1869);
var book2 = new createBook("Don Quixote","Miguel de Cervantes", 300, 1615);
var book3 = new createBook("Hamlet","William Shakespeare", 220, 1601);
var book4 = new createBook("To the Lighthouse","Virginia Woolf", 400, 1927);
var book5 = new createBook("Anna Karenina","Leo Tolstoy", 150, 1877);
var book6 = new createBook("Dubliners","James Joyce", 400, 1914);
var book7 = new createBook("One Hundred Years of Solitude","Gabriel García Márquez", 320, 1967);

// GAVIN'S REFACTOR for declaring variables:
// var book1 = library.prototype.createBook("War and Peace","Leo Tolstoy", 140, 1869);
// var book2 = library.prototype.createBook("Don Quixote","Miguel de Cervantes", 300, 1615);
// var book3 = library.prototype.createBook("Hamlet","William Shakespeare", 220, 1601);
// var book4 = library.prototype.createBook("To the Lighthouse","Virginia Woolf", 400, 1927);


//CREATE PROTOTYPE FUNCTIONS:

// ADD BOOK
// creates function called addBook and assigns it to "library"
library.prototype.addBook = function(blah){ // blah = new instance that I'm passing in
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].title == blah.title) {
    return false;
    }
  } this.bookArray.push(blah);
    return true;
};

// REMOVE BOOK BY TITLE
library.prototype.removeBookByTitle = function(bookTitle){ // in console, pass actual book title
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].title == bookTitle) {
      this.bookArray.splice(i, 1);
      return true;
    }
  } return false;
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
