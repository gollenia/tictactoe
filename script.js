"use strict"

/* TABLE OF CONTENT 
I.  Comment


*/

/*=======
0 Problems : you can still add more than one photo to a field!!

I COMMENT

x = christmas tree
o = christmas present
======= */

let fields = [];
let currentPlayer = 0;

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
                    alt="christmas-tree">
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
*/
function takingTurns(i) {
    if (player1()) {
        showX(i);
        currentPlayer++;
    } else if (player2()) {
        showO(i);
        currentPlayer--;
    }
    selectionToFields(i);
    console.log(fields);
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

/* 
Chosen image is pushed to array fields 
*/
function selectionToFields(i) {
    if (player1()) {
        fields[i] = `image-x-${i}`
    } else if (player2()) {
        fields[i] = `image-o-${i}`;
    }
}

function player1(){
   return currentPlayer == 0;
}

function player2(){
    return currentPlayer == 1;
}


function replay() {
    currentPlayer = 0;
    fields = [];
    hideAllImages();
}

function hideAllImages() {
    for (let i = 0; i < 9; i++) {
    document.getElementById(`image-x-${i}`).classList.add('d-none');
    document.getElementById(`image-o-${i}`).classList.add('d-none');      
}
}

