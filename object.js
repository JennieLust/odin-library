/*  TODO

Short-term goals: 
    Make the read/unread button to function properly 

Long-term goals: 
    Add storage so new objects do not clear on reload

    Clear form when subm / closed 

    Add accessibility

    Organize code

 */

const body = document.querySelector("body");
const bookContainer = document.querySelector(".book-container");
const addButton = document.querySelector("#new-book-btn");
const form = document.querySelector(".form-popup");

let myLibrary = []
/* retrieves stored library 
var storedLibrary = JSON.parse(localStorage.getItem("my_library"));
myLibrary = storedLibrary; */

/* book constructor */
function Book(title, author, pages, genre, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.genre = genre
    this.read = read
    /* uneccesary, remove in future */
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
    
    /* dynamically names variables for new books */
    eval['book'+myLibrary.length] = new Book(form.title.value, form.author.value, form.pages.value, form.genre.value, read)

    /* adds object to library and reloads display */
    addBookToLibrary(eval['book'+myLibrary.length]);
    displayBooks();
    form.title.value = "";
    form.author.value = "";
    form.genre.value = "";
    form.pages.value = 1;
    form.read.checked = false;
};


function displayBooks() {
    /* iterates through myLibrary array and creates grid items */
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        var card = document.createElement("div");
        card.className = "card";
        bookContainer.appendChild(card);
        /* creates card button container */
        const iconButtons = document.createElement("div");
        iconButtons.className = "icon-buttons";
        /* card remove button and icon*/
        const btnRemove = document.createElement("button");
        btnRemove.className = "remove-button";
        /* Mouseover effect */
        const iconRemove = document.createElement("img");
        iconRemove.src = "./remove.png";
        iconRemove.className = "remove-icon"
        iconRemove.addEventListener('mouseover', () => {
            iconRemove.style.filter = "invert(7%) sepia(26%) saturate(7057%) hue-rotate(347deg) brightness(98%) contrast(87%)"
            iconRemove.addEventListener('mouseout', () => {
                iconRemove.style.filter = "invert(100%) sepia(100%) saturate(2%) hue-rotate(88deg) brightness(109%) contrast(101%)"
            })
        /* remove button action */    
        iconRemove.addEventListener('click', () => {
            console.log(book);
            myLibrary.splice(book, 1)
            displayBooks();
        })
        });
        /* card read/unread button and icon */
        const btnRead = document.createElement("button");
        btnRead.className = "read-button";
        const iconUnread = document.createElement("img");
        iconUnread.className = "read-icon"
        
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
                } else if (Object.keys(book).find(k => book[k] === key) === "genre"){
                    var text = document.createElement("p");
                    text.className = "genre";
                    text.innerText = `${key}`;
                    card.appendChild(text);
                } else if (Object.keys(book).find(k => book[k] === key) === "pages"){
                    var text = document.createElement("p");
                    text.className = "pages";
                    text.innerText = `${key} pages of `;
                    card.appendChild(text);
                }  else {
                    var text = document.createElement("p");
                    text.className = "read";
                    text.innerText = `, which you have ${key}.`;
                    card.appendChild(text);
                    if (key === "not read"){
                        /* decides which read-icon to add */ 
                        iconUnread.src = "./eyeopen.png"
                        /* color:  black to green (TOO LIGHT) */
                        iconUnread.style.filter = "invert(100%) sepia(100%) saturate(2%) hue-rotate(88deg) brightness(109%) contrast(101%)"
                        /* On hover change icon and color */
                        iconUnread.addEventListener('mouseover', () => {
                            iconUnread.src = "./eyeclosed.png"
                            iconUnread.style.filter = "invert(27%) sepia(7%) saturate(4155%) hue-rotate(314deg) brightness(92%) contrast(86%)"
                            iconUnread.addEventListener('mouseout', () => {
                                iconUnread.src = "./eyeopen.png"
                                iconUnread.style.filter = "invert(100%) sepia(100%) saturate(2%) hue-rotate(88deg) brightness(109%) contrast(101%)"
                            })
                        iconUnread.addEventListener('click', () => {
                            clickRead(book, key);
                        }
                        )
                        });
                    } else {
                        /* decides which read-icon to add */ 
                        iconUnread.src = "./eyeclosed.png";
                         /* color:  black to red */
                        iconUnread.style.filter = "invert(100%) sepia(100%) saturate(2%) hue-rotate(88deg) brightness(109%) contrast(101%)"
                        /* On hover change icon and color */
                        iconUnread.addEventListener('mouseover', () => {
                            iconUnread.src = "./eyeopen.png"
                            iconUnread.style.filter = "invert(59%) sepia(22%) saturate(2576%) hue-rotate(101deg) brightness(98%) contrast(91%)"
                            iconUnread.addEventListener('mouseout', () => {
                                iconUnread.src = "./eyeclosed.png";
                                iconUnread.style.filter = "invert(100%) sepia(100%) saturate(2%) hue-rotate(88deg) brightness(109%) contrast(101%)"
                            })
                        });
                        iconUnread.addEventListener('click', () => {
                            clickRead(book, key);
                        })
                    }
                };
            };   
        });
        card.appendChild(iconButtons)
        iconButtons.appendChild(btnRemove)
        btnRemove.appendChild(iconRemove)
        btnRead.appendChild(iconUnread)
        iconButtons.appendChild(btnRead);
    });
};

/* sets new value on object read status */
/* HOW DO I GET IT TO SHOW UP? make a function of the icon unread setter? */
function clickRead(book, key) {
    if (key === "read") {
        /* object value not read */
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i] === book) {
                myLibrary[i].read = "not read";
            }
        }
        
    } else {
        /*  object value read */
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i] === book) {
                myLibrary[i].read = "read";
            }
        }

    }
}



/* Adds default books to library */
var theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'high fantasy', 'not read')
var bookTwo = new Book('Book Two', 'Author Two des Authorieras', 300, 'murder mystery', 'read')
var bookThree = new Book('Book Three', 'Ano Nomies', 15, 'greek tragedy', 'not read')
var bookFour = new Book('Book Four', 'Ano Nomies', 15, 'post-apocalyptic comedy', 'not read')
var bookFive = new Book('Book Four & Nine Point Nine', 'Ano Nomies', 10005, 'adventure action', 'not read')

/* comment out/remove if stored array is retrieved otherwise it'll keep adding these to the library */
addBookToLibrary(theHobbit);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);
addBookToLibrary(bookFive);

function addBookToLibrary(book) {
    myLibrary.push(book)
}


/* Calls display so it is loaded on page loag */
displayBooks();

localStorage.setItem("my_library", JSON.stringify(myLibrary)); /* Stores myLibrary as string */

