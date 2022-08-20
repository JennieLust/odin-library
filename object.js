const body = document.querySelector("body");
const bookContainer = document.querySelector(".book-container");
const addButton = document.querySelector("#new-book-btn")

addButton.addEventListener('click', () => {
    openForm();
})

let myLibrary = [];

/*

Add a NEW BOOK button that brings up a form allowing users to input the details for the new book: 
    author - Text, 
    title - text, 
    number of pages - int,
    whether it’s been read - boolean - checkmark
    and anything else you might want.


 */

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}



function displayBooks() {

    /* iterates through myLibrary array and creates a grid item */
    myLibrary.forEach(book => {
        var card = document.createElement("div");
        card.className = "card";
        bookContainer.appendChild(card);
        /* iterates through the object and creates p items with property and value */
        Object.values(book).forEach(key => {
            /* ignores object functions when creating p items */
            if (typeof key !== "function") {
                /* special p for the title */
                if (Object.keys(book).find(k => book[k] === key) === "title") {
                    var text = document.createElement("p");
                    text.className = "title";
                    text.innerText = `${key}`;
                    card.appendChild(text);
                } else if (Object.keys(book).find(k => book[k] === key) === "author"){
                    var text = document.createElement("p");
                    text.className = "author";
                    text.innerText = `by ${key}`;
                    card.appendChild(text);
                } else if (Object.keys(book).find(k => book[k] === key) === "pages"){
                    var text = document.createElement("p");
                    text.className = "pages";
                    text.innerText = `${key} pages |  `;
                    card.appendChild(text);
                }  else {
                    var text = document.createElement("p");
                    text.className = "read";
                    text.innerText = `${key}.`;
                    card.appendChild(text);
        }; };   
        })
    })
} ;


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read
    }
};





function addBookToLibrary(book) {
    myLibrary.push(book);
}

var theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read')
var bookTwo = new Book('Book Two', 'Author Two des Authorieras', 300, 'read')
var bookThree = new Book('Book Three', 'Ano Nomies', 15, 'not read')
var bookFour = new Book('Book Four', 'Ano Nomies', 15, 'not read')
var bookFive = new Book('Book Four & Nine Point Nine', 'Ano Nomies', 10005, 'not read')
addBookToLibrary(theHobbit);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);
addBookToLibrary(bookFive);





console.log(myLibrary)

displayBooks();