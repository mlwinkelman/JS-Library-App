// Constructor that creates class called "library" (global)
var library = function(){
};

// function that creates new book objects, using Object constructor
function createBook(bookTitle, bookAuthor, bookNumberOfPages, bookPublishDate, guid){
	//properties
	this.title = bookTitle;
	this.author = bookAuthor;
	this.numberOfPages = bookNumberOfPages;
	this.publishDate = bookPublishDate;
	this.id = "id-" + guid;
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
	this.$jumboTron = $(".output-box ol"); // target the output field in html
	this.$jumboTron2 = $(".output-box2 ul"); // target the output field in html

	// creates new empty array called bookArray and assigns it to "library"
	this.bookArray = new Array();

	// methods to kick off on DOM ready
	this._bindEvents(); //underscore designates that it's private
};

// Proxy
library.prototype._bindEvents = function(){
	$('#add-book').on('click', $.proxy(this._addBook, this));
	$('#add-book-input-published').keyup(function(event){
		if(event.keyCode == 13){
			$('#add-book').click();
		}
	});
	$('#remove-book-by-title').on('click', $.proxy(this._removeBookByTitle, this));
	// $('#remove-book-by-title').click(function(){
	// 	$('input[type="text"]').val('');
	// });
	$('#remove-book-title-input').keyup(function(event){
		if(event.keyCode == 13){
			$('#remove-book-by-title').click();
		}
	});
	$('#remove-book-by-author').on('click', $.proxy(this._removeBookByAuthor, this));
	$('#remove-book-author-input').keyup(function(event){
		if(event.keyCode == 13){
			$('#remove-book-by-author').click();
		}
	});
	$('#get-book-by-title').on('click', $.proxy(this._getBookByTitle, this));
	$('#get-book-title-input').keyup(function(event){
		if(event.keyCode == 13){
			$('#get-book-by-title').click();
		}
	});
	$('#get-book-by-author').on('click', $.proxy(this._getBookByAuthor, this));
	$('#get-book-author-input').keyup(function(event){
		if(event.keyCode == 13){
			$('#get-book-by-author').click();
		}
	});
	$('#get-random-book').on('click', $.proxy(this._getRandomBook, this));
	$('#get-random-author').on('click', $.proxy(this._getRandomAuthor, this));
	$('#get-all-authors').on('click', $.proxy(this._getAuthors, this));

};

//CREATE PROTOTYPE FUNCTIONS:
// ADD GUID methods to add unique random id when a new book is created
// so there is something to target when removing a book
library.prototype._guid = function(){
	return Math.floor((1 + Math.random()) * 0x10000)
     .toString(8)
     .substring(1);
};

// ADD BOOK
// creates function called addBook and assigns it to "library"
library.prototype._addBook = function(){
	var aValue = this._getAddBookValues();
	$('input[type="text"]').val('');
	// validate that new array has at least 4 values
	if (aValue.length >= 4) {
		// create container called 'book' to hold new createBook
		var book = new createBook(aValue[0], aValue[1], aValue[2], aValue[3], this._guid());
		// loop through bookArray and check for duplicates
		for (var i = 0; i < this.bookArray.length; i++) {
			if (this.bookArray[i].title == book.title) {
			// if duplicate book, return alert
			return alert('Sorry, that book has already been added');
			}
		}
		// otherwise, add new createBook to bookArray
		this.bookArray.push(book);
		// library1.setObject(book);
		// append new book as li to ul in the html jumbotron
		this.$jumboTron.append("<li id="+book.id+"><strong>Title: </strong>" + book.title + "; " +
			" <strong>Author: </strong>" + book.author + "; " +
			" <strong>Pages: </strong>" + book.numberOfPages + "; " +
			" <strong>Published: </strong>" + book.publishDate + "</li>");
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

// GET BOOK BY TITLE
library.prototype._getBookByTitle = function(){ // in console, pass actual author name
	// create container called sValue that contains the string collected from input
	var sValue = this._getBookTitleValue();
	$('input[type="text"]').val('');
	var regex = new RegExp(sValue, 'gi');
  // var bookByTitleArray = new Array();
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].title.match(regex)) {
      // bookByTitleArray.push(this.bookArray[i]);
			this.$jumboTron2.empty();
			this.$jumboTron2.append("<li><strong>Title: </strong>" + this.bookArray[i].title + "; " +
				" <strong>Author: </strong>" + this.bookArray[i].author + "; " +
				" <strong>Pages: </strong>" + this.bookArray[i].numberOfPages + "; " +
				" <strong>Published: </strong>" + this.bookArray[i].publishDate + "</li>");
				// i--;
    }
		// else {
		// 	this.$jumboTron2.empty();
		// 	this.$jumboTron2.append("<li>Title not found.</li>")
			// i--;

  }
	// return alert('Please enter a title.');
	// return bookByTitleArray;
};

// use jquery to find id of input field
// validate that input is not empty string or NaN
// return string and feed into removeBookByTitle function
library.prototype._getBookTitleValue = function(){
  var sVal;
  $("#get-book-by-title-form input").each(function(index, val){
    var vInput = $(this).val();
    if(vInput !== "" && vInput != NaN) {
      sVal = vInput.toString();
    }
  });
  return sVal;
};

// REMOVE BOOK BY TITLE
library.prototype._removeBookByTitle = function(){
	// create container called sValue that contains the string collected from input
	var sValue = this._getRemoveBookTitleValue();
	$('input[type="text"]').val('');
	// loop through bookArray to check whether input field matches a book in the array
	for (var i = 0; i < this.bookArray.length; i++) {
		// debugger;
    if (this.bookArray[i].title == sValue) {
			// update output display to reflect removal
			$('#'+this.bookArray[i].id).remove();
			// if it matches, remove it from the array
      this.bookArray.splice(i, 1);
      return true;
    }
	}
	return alert('Unable to find that title.');
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

// GET BOOK BY AUTHOR
library.prototype._getBookByAuthor = function(){ // in console, pass actual author name
	// create container called sValue that contains the string collected from input
	var sValue = this._getBookByAuthorValue();
	$('input[type="text"]').val('');
	var regex = new RegExp(sValue, 'gi');
  // var bookByAuthorArray = [];
	this.$jumboTron2.empty();
  for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].author.match(regex)) {
      // bookByAuthorArray.push(this.bookArray[i]);
			// this.$jumboTron2.empty();
			this.$jumboTron2.append("<li><strong>Title: </strong>" + this.bookArray[i].title + "; " +
				" <strong>Author: </strong>" + this.bookArray[i].author + "; " +
				" <strong>Pages: </strong>" + this.bookArray[i].numberOfPages + "; " +
				" <strong>Published: </strong>" + this.bookArray[i].publishDate + "</li>");
    }
  }
	// return alert('Please enter an author.');
	// return bookByAuthorArray;
};

library.prototype._getBookByAuthorValue = function(){
  var sVal;
  $("#get-book-by-author-form input").each(function(index, val){
    var vInput = $(this).val();
    if(vInput !== "" && vInput != NaN) {
      sVal = vInput.toString();
    }
  });
  return sVal;
};

// REMOVE BOOK BY AUTHOR
library.prototype._removeBookByAuthor = function(){
	// create container called sValue that contains the string collected from input
	var sValue = this._getRemoveBookAuthorValue();
	$('input[type="text"]').val('');
	var isAuthorRemoved = false;
	for (var i = 0; i < this.bookArray.length; i++) {
    if (this.bookArray[i].author == sValue) {
			// update output display to reflect removal
			$('#'+this.bookArray[i].id).remove();
      this.bookArray.splice(i, 1);
      isAuthorRemoved = true;
			i--;
    }
		// else if(this.bookArray[i].author != sValue) {
		// 	return alert('Unable to find that author.');
		// }
  }
	// console.log(isAuthorRemoved);
	// return isAuthorRemoved;
	// return alert('Unable to find that author.'); // ALERT IS FIRING EVERYTIME!!

};
// Shawn's code using .extend which makes a clone and without decrement:
// Lib.prototype._removeBookByAuthor = function() {
//     var nArray = $(".jumbotron ul>li");
//     var author = $("#removeAuthor").val();
//     var newBookArray = $.extend(true, [], this.myBookArray);
//     for (i = 0; i < newBookArray.length; i++) {
//         if (newBookArray[i].author == author) {
//             nArray[i].remove();
//             this.myBookArray.splice(i, 1);
//         }
//     }
// };

library.prototype._getRemoveBookAuthorValue = function(){
  var sVal;
  $("#remove-book-author-form input").each(function(index, val){
    var vInput = $(this).val();
    if(vInput !== "" && vInput != NaN) {
      sVal = vInput.toString();
    }
  });
  return sVal;
};

// GET RANDOM BOOK
library.prototype._getRandomBook = function(){
  var randomBook = Math.floor(Math.random() * this.bookArray.length);
	var book = this.bookArray[randomBook];
	this.$jumboTron2.empty();
	this.$jumboTron2.append("<li id="+book.id+"><strong>Title: </strong>" + book.title + "; " +
		" <strong>Author: </strong>" + book.author + "; " +
		" <strong>Pages: </strong>" + book.numberOfPages + "; " +
		" <strong>Published: </strong>" + book.publishDate + "</li>");
  return this.bookArray.length <= 0 ? null : this.bookArray[randomBook];
};

// GET RANDOM AUTHOR
library.prototype._getRandomAuthor = function(){
  var randomAuthor = Math.floor(Math.random() * this.bookArray.length);
	var book = this.bookArray[randomAuthor];
	this.$jumboTron2.empty();
	this.$jumboTron2.append("<li id="+book.id+"><strong>Title: </strong>" + book.title + "; " +
		" <strong>Author: </strong>" + book.author + "; " +
		" <strong>Pages: </strong>" + book.numberOfPages + "; " +
		" <strong>Published: </strong>" + book.publishDate + "</li>");
  return this.bookArray.length <= 0 ? null : this.bookArray[randomAuthor].author;
};

// ADD BOOKS (won't add duplicates)
// library.prototype.addBooks = function(array){ // blah = whatever I'm passing in
// 	var counter = 0;
// 	for (var i = 0; i < array.length; i++) {
//   	if (this.addBook(array[i])){
// 			counter ++;
// 		}
//   }
//   return counter;
// };

// GET AUTHORS
library.prototype._getAuthors = function(){
  var authorArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
    if (authorArray.indexOf(this.bookArray[i].author) < 0){ // checking for duplicates, or not in there
      authorArray.push(this.bookArray[i].author);
    }
  }
	this.$jumboTron2.empty();
	this.$jumboTron2.append("<li><strong>Authors in Library: </strong>" + authorArray.join(', ') + "</li>");
	return authorArray;
};



// library1.addBook(book1);
// library1.addBook(book2);
// library1.addBook(book3);
// library1.addBook(book4);



//local storage start:
library.prototype.setObject = function() {
	if(typeof(Storage) !=="undefined") {
		localstorage['storageArray'] = JSON.stringify(this.bookArray);
	} else {
		return false;
	}
};

library.prototype.getObject = function() {
	if(typeof(Storage) !=="undefined") {
		return JSON.parse(localStorage.getItem('storageArray'));
	} else {
		return false;
	}
};
// // Store
// localStorage.cachedArray = "Smith";
// // Retrieve
// document.getElementById("result").innerHTML = localStorage.lastname;
