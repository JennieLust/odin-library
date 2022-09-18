/*              GOAL: as little global code as possible         */

/* TODO 
    Fix: names remain in form when reloading
    When starting game, enter default names and show displays
    */


const body = document.querySelector("body")
const gameContainer = document.querySelector(".game-container")
const cell0 = document.querySelector(".cell-0")
const cell1 = document.querySelector(".cell-1")
const cell2 = document.querySelector(".cell-2")
const cell3 = document.querySelector(".cell-3")
const cell4 = document.querySelector(".cell-4")
const cell5 = document.querySelector(".cell-5")
const cell6 = document.querySelector(".cell-6")
const cell7 = document.querySelector(".cell-7")
const cell8 = document.querySelector(".cell-8")

const startButton = document.querySelector(".start-btn");
const p1Info = document.querySelector(".player-1-info");
const p2Info = document.querySelector(".player-2-info");
const p1Button = document.querySelector(".p1-button");
const p2Button = document.querySelector(".p2-button")


var p2Turn = document.createElement("p");
var p1Turn = document.createElement("p");

var resDisplay = document.querySelector(".results")

var p1Icon = ""
var p2Icon = ""

startButton.addEventListener('click', () => {               /* initializes the game via the start/spela button */
    if (startButton.innerText === "SPELA") {

        p1Info.style.visibility = "visible";                /* pop up info-sidebars */
        p2Info.style.visibility = "visible";

        p2Button.addEventListener('click', () => {
            var p2Name = document.querySelector('.p2-name').value;
 
            if (p2Name.length < 1) {p2Name = "Player 2"};                /* set default name*/
            const p2 = playerFactory(p2Name, "o");

            document.querySelector(".p2-form").style.display = "none";      /* hides pop up form */
            
            var p2NameDis = document.createElement("p");        /* creates html display elements */
            p2NameDis.innerText = p2.name;
            p2Info.appendChild(p2NameDis);
            var p2IconDis = document.createElement("p");
            p2IconDis.innerText= "spelar med " + p2.icon;
            p2Info.appendChild(p2IconDis);
  
            p2Turn.innerText = `${p2.name}'s turn!`;             /* creates turn signal which can be hidden/revealed */
            p2Turn.style.fontWeight = "bold";
            p2Turn.style.visibility = "hidden";
            p2Info.appendChild(p2Turn);
        });

        p1Button.addEventListener('click', () => {
            var p1Name = document.querySelector('.p1-name').value;

            if (p1Name.length < 1) {p1Name = "Player 1"};                   /* set default name*/
                
            const p1 = playerFactory(p1Name, "x");
            
            document.querySelector(".p1-form").style.display = "none";      /* hides pop up form */

            var p1NameDis = document.createElement("p");        /* creates html display elements */
            p1NameDis.innerText = p1.name;
            p1Info.appendChild(p1NameDis);
            var p1IconDis = document.createElement("p");
            p1IconDis.innerText= "spelar med " + p1.icon;
            p1Info.appendChild(p1IconDis);

            p1Turn.innerText = `${p1.name}'s turn!`;            /* creates turn signal which can be hidden/revealed */
            p1Turn.style.fontWeight = "bold";
            p1Turn.style.visibility = "visible";
            p1Info.appendChild(p1Turn);
        });
        startButton.innerText = "BÖRJA OM"
    } else if (startButton.innerText === "BÖRJA OM") {
        gameBoard.clear();
        gameBoard.display();
        startButton.innerHTML = "SPELA"
        p1Info.style.visibility = "hidden";
        p2Info.style.visibility = "hidden";
        resDisplay.innerText = "";
        resDisplay.style.visibility = "hidden";
        window.location.reload();
    };   
    game();
});

const gameBoard = (() => {      
    const arr = ["", "", "", "", "", "", "", "", ""];               /* store gameboard as array inside of a gameboard object */
    const add = (icon, position) => arr[position] = icon            /* replace array index with icon */
    const clear = () => {for (let i = 0; i < arr.length; i++) {     /* clears array */
        arr[i] = "" }} 
    const display = () => {
        cell0.innerText = arr[0];
        cell1.innerText = arr[1];
        cell2.innerText = arr[2];
        cell3.innerText = arr[3];
        cell4.innerText = arr[4];
        cell5.innerText = arr[5];
        cell6.innerText = arr[6];
        cell7.innerText = arr[7];
        cell8.innerText = arr[8];
    }
    return {
        add, 
        clear, 
        arr, 
        display,
    };
})();

const game = function() {
    let gameTurn = 1;                   /* keeps track of turn order via odd/even */
    let iconify = function () {         /* decides which icon/turn it is */
        let currentIcon = ""
        if (gameTurn % 2 != 0) {currentIcon = "x"
        } else {currentIcon = "o"}
    return currentIcon;
    };

    let move = function (cell, index) {         /* move function */
        if (cell.innerText === "") {
            cell.innerText = iconify();
            gameBoard.add(iconify(), index);
            if (gameTurn > 3) {checkWinner(iconify())};                   /* determines if check-for-winner function should be called */
            gameTurn = gameTurn + 1;
        };
        if (gameTurn % 2 != 0) {
            p2Turn.style.visibility = "hidden";
            p1Turn.style.visibility = "visible";
        } else {
            p2Turn.style.visibility = "visible";
            p1Turn.style.visibility = "hidden";
        }
    };

    let checkWinner = function (icon) {             /* function that checks for winning combinations */
        /* function to shorten code - tests gameboard condition against patterns */
        let checkPattern = function (icon, index1, index2, index3) {
            if (gameBoard.arr[index1] === icon && gameBoard.arr[index2] === icon && gameBoard.arr[index3] === icon) {
                resDisplay.innerText =  icon + " vinner!";
                p1Turn.style.visibility = "hidden";
                p2Turn.style.visibility = "hidden";
                resDisplay.style.visibility = "visible";
                body.appendChild(resDisplay);
            }};
        checkPattern(icon, 0, 3, 6);
        checkPattern(icon, 2, 4, 7);
        checkPattern(icon, 2, 5, 8);
        checkPattern(icon, 0, 1, 2);
        checkPattern(icon, 3, 4, 5);
        checkPattern(icon, 6, 7, 8);
        checkPattern(icon, 0, 4, 8);
        checkPattern(icon, 2, 4, 6);
    }

    /* event listeners call move function with cell & index to be filled */
    cell0.addEventListener('click', () => {move(cell0, 0)});
    cell1.addEventListener('click', () => {move(cell1, 1)});
    cell2.addEventListener('click', () => {move(cell2, 2)});
    cell3.addEventListener('click', () => {move(cell3, 3)});
    cell4.addEventListener('click', () => {move(cell4, 4)});
    cell5.addEventListener('click', () => {move(cell5, 5)});
    cell6.addEventListener('click', () => {move(cell6, 6)});
    cell7.addEventListener('click', () => {move(cell7, 7)});
    cell8.addEventListener('click', () => { move(cell8, 8)});
};

gameBoard.display();    /* makes sure the gameboard is visible at the start */


const playerFactory = (name, icon) => { /* players stored in objects / factory */
    return { name, icon };
}

/* long term goal: 
    create an AI so player vs pc is possible
        1. start by getting the computer to make random legal move
        2. work on making pc smart - minimax algorithm
        3. if get this running - show off in discord
*/