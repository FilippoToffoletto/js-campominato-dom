/*
**Consegna**
L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

// acquisico il container dall'html
const main  = document.querySelector('.game-wrapper');
const playBtn = document.querySelector('#play');
const levelSelect = document.querySelector('#level');

const gridLevels = [100, 81, 49];
const BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;
let msg = document.getElementsByClassName('.end_Message');

playBtn.addEventListener('click', play);


function play(){
    const cellNumbers = gridLevels[levelSelect.value];

    reset();

    // genero la griglia
    generatePlayGround(cellNumbers);
    bombs = generateBombs(cellNumbers);
}

function generatePlayGround(cellNumbers){
    // creo la griglia
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let  i = 1; i <= cellNumbers; i++){
        const cell = generateCell(i, cellNumbers);
        grid.append(cell);
    }
    main.append(grid);
}

function generateCell(cellId, cellNumbers){
    const cell = document.createElement('div');
    cell.className = 'cell';

    cell.classList.add('square'+ cellNumbers);
    cell.cellId = cellId;
    cell.innerHTML = `<span>${cellId}</span>`;

    cell.addEventListener('click', handleClickCell);

    return cell;
}


function handleClickCell(){
    this.classList.add('clicked');

    if(!bombs.includes(this.cellId)){

        score++;
        const cells = document.getElementsByName('cell');

        if(score === cells.length - BOMBS_NUMBER){
            // fine gioco
            endGame(true);
        }
    }else{
        endGame(false);
    }
}

function endGame(isWin){
    let msg = document.createElement('div');
    msg.className = 'end_Message';
    const cells = document.getElementsByClassName('cell');
    if(isWin){
        msg = document.innerHTML `hai vinto`;
        console.log(msg);
    }else{
        msg = `HAI PERSO!Hai fatto ${score} punti su ${cells.length - BOMBS_NUMBER} possibilità.`
        console.log(msg);
    }
    document.getElementsByClassName('end_Message').innerHTML = msg;
    showBombs();
    const endLev = document.createElement('div');
    endLev.className = 'end-game-level';
    document.querySelector('.game-wrapper').append(endLev);
}

function showBombs(){
    const cells = document.getElementsByClassName('cell');
    for(let i = 0; i < cells.length; i++){
        const cell = cells[i];
        if(bombs.includes(cell.cellId)){
            cell.classList.add('bomb');
        }
    }
}

function generateBombs(cellNumbers){

    const bombsGenerated = [];

    while(bombsGenerated.length < BOMBS_NUMBER){
        const bomb = generateRandomNumber(1, cellNumbers);

        if(!bombsGenerated.includes(bomb)){
            bombsGenerated.push(bomb);
        }
    }
    console.log(bombsGenerated);
    return bombsGenerated;
}
function generateRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min +1) + min);
}


function reset(){
    main.innerHTML = '';
    let score = 0;
    document.getElementsByClassName('.end_Message').innerHTML = msg;
}