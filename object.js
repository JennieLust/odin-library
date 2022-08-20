/*  TODO

Add a NEW BOOK button that brings up a form allowing users to input the details for the new book: 
    and anything else you might want.

Add code that translates form values into javascript object
    create object w it - Done, however only temporary objects are created

Clear form when subm / closed 

 */

const body = document.querySelector("body");
const bookContainer = document.querySelector(".book-container");
const addButton = document.querySelector("#new-book-btn");
const form = document.querySelector(".form-popup");



let myLibrary = []
/* retrieves stored library */
var storedLibrary = JSON.parse(localStorage.getItem("my_library"));
myLibrary = storedLibrary;



/* book constructor */
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read
    };
};

/* button which opens form  */
addButton.addEventListener('click', (event) => {
    openForm();
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
};

function closeForm() {
    document.getElementById("myForm").style.display = "none";
};

/* on form submit/button click */
form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitForm()
});

let i = myLibrary.length;
function submitForm(form) {
    var read = "";
    if (form.read.checked === true) {
        read = "read" 
    } else {
        read = "not read"
    }
    
    /* dynamically named variables for new books */
    eval['book'+myLibrary.length] = new Book(form.title.value, form.author.value, form.pages.value, read)

    /* adds object to library and reloads display */
    addBookToLibrary(eval['book'+myLibrary.length]);
    displayBooks();
};


function displayBooks() {
    /* iterates through myLibrary array and creates grid items */
    bookContainer.innerHTML = "";
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
                };
            };   
        });
    });
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

/* Adds default books to library */
var theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read')
var bookTwo = new Book('Book Two', 'Author Two des Authorieras', 300, 'read')
var bookThree = new Book('Book Three', 'Ano Nomies', 15, 'not read')
var bookFour = new Book('Book Four', 'Ano Nomies', 15, 'not read')
var bookFive = new Book('Book Four & Nine Point Nine', 'Ano Nomies', 10005, 'not read')

/* comment out/remove if stored array is retrieved otherwise it'll keep adding these to the library 
addBookToLibrary(theHobbit);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);
addBookToLibrary(bookFive);
*/

/* Calls display so it is loaded on page loag */
displayBooks();

localStorage.setItem("my_library", JSON.stringify(myLibrary)); /* Stores myLibrary as string */

