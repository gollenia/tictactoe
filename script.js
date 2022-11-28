"use strict"

/* TABLE OF CONTENT 
I.  Comment


*/

/*=======
0 Problems : you can still add more than one photo to a field!!

I COMMENT

player 1: x = christmas player1
player 2: o = christmas player2 
======= */

let fields = [];
let numberTurns = [];
let currentPlayer = 0;
let winner;

function renderTable() {
    for (let i = 0; i < 3; i++) {
        document.getElementById('row-top').innerHTML += tableRowHtml(i);
    }
    for (let i = 3; i < 6; i++) {
        document.getElementById('row-middle').innerHTML += tableRowHtml(i);
    }
    for (let i = 6; i < 9; i++) {
        document.getElementById('row-bottom').innerHTML += tableRowHtml(i);
    }
}


function tableRowHtml(i) {
    return /*html*/ `
        <td onclick="takingTurns(${i})">
            <div id="field${i}" class="center">
                <img id="image-x-${i}" class="shapes x-o-shapes d-none images-stacked" src="icons/icons8-christmas-tree.png"
                    alt="christmas-player1">
                <img id="image-o-${i}" class="shapes x-o-shapes d-none" src="icons/icons8-christmas-preset.png" alt="">
            </div>
        </td>`;
}
/* 
This function lets
player1 play with x,
player2 play with o,
makes them take turns
after one click.

The field is only clickable when it is empty!

i == index of fields
*/
function takingTurns(i) {
    if (fieldIdEmpty(i)) {
        if (player1()) {
            showX(i);
            currentPlayer++;
            showPlayers2Turn();

        } else if (player2()) {
            showO(i);
            currentPlayer--;
            showPlayers1Turn();
        }
        numberTurns.push(1);
        selectionToFields(i);
        checkForWinner();
    }
}
/* 
Checks fields if it is empty
*/
function fieldIdEmpty(i) {
    return !fields[i];
}

function player1() {
    return currentPlayer == 0;
}

function player2() {
    return currentPlayer == 1;
}

/* 
On click only one X is being shown on field i
*/
function showX(i) {
    document.getElementById(`image-x-${i}`).classList.remove('d-none');
}

/* 
On click only O is being shown on field i
*/
function showO(i) {
    document.getElementById(`image-o-${i}`).classList.remove('d-none');
}


function showPlayers1Turn() {
    document.getElementById('player2').classList.remove('turn');
    document.getElementById('player1').classList.add('turn');
}

function showPlayers2Turn() {
    document.getElementById('player1').classList.remove('turn');
    document.getElementById('player2').classList.add('turn');
}


/* 
Chosen image is pushed to array fields 
*/
function selectionToFields(i) {
    if (player1()) {
        fields[i] = 'player2';
    } else if (player2()) {
        fields[i] = 'player1';
    }
}

function checkForWinner() {

    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
    }

    let gameOver = 0;
    for (let i = 0; i < numberTurns.length; i++) {
        gameOver += numberTurns[i];

        if (gameOver > 7) {
            document.getElementById('table').classList.add('unclickable');
            document.getElementById('draw').classList.remove('d-none');
            console.log('DRAW');

        }

    }

    if (winner) {
        document.getElementById('table').classList.add('unclickable');
        console.log('You win:', winner);
        hideLoser();
    }
}

function celebrateWinner() {

}

function hideLoser() {
    if (player1Wins()) {
        document.getElementById('player1').classList.add('victory');
        document.getElementById('player2').classList.add('d-none');
        console.log('player1 wins');
    } else if (player2Wins()) {
        document.getElementById('player1').classList.add('d-none');
        document.getElementById('player2').classList.add('victory');
        console.log('player2 wins');
    }
    console.log('macht was');
}


/* 
functions sets currentPlayer to default mode (change?),
clears fields-Array,
hides all the images in the fields.
*/
function replay() {
    currentPlayer = 0;
    fields = [];
    numberTurns = [];
    document.getElementById('table').classList.remove('unclickable');
    document.getElementById('draw').classList.add('d-none');
    hideAllImages();
    loserStartsGame();
    document.getElementById('player1').classList.remove('d-none');
    document.getElementById('player2').classList.remove('d-none');
    document.getElementById('player1').classList.remove('victory');
    document.getElementById('player2').classList.remove('victory');
}

function hideAllImages() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`image-x-${i}`).classList.add('d-none');
        document.getElementById(`image-o-${i}`).classList.add('d-none');
    }
}

function loserStartsGame() {
    if (player1Wins()) {
        currentPlayer = 1;
        winner = "";
        showPlayers2Turn();
    } else if (player2Wins()) {
        currentPlayer = 0;
        winner = "";
        showPlayers1Turn();
    }
}

function player1Wins() {
    return winner == "player1";
}

function player2Wins() {
    return winner == "player2";
}

