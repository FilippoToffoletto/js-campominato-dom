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

playBtn.addEventListener('click', play);


function play(){
    const cellNumbers = gridLevels[levelSelect.value];

    reset();

    // genero la griglia
    generatePlayGround(cellNumbers);
}

function generatePlayGround(cellNumbers){
    // creo la griglia
    const grid = document.createElement('div');
    grid.className = 'grid';
    console.log(grid);

    for(let  i = 1; i <= cellNumbers; i++){
        const cell = generateCell(i, cellNumbers);
        grid.append(cell);
    }
}
function generateCell(cellId, cellNumbers){
    const cell = document.createElement('div');
    cell.className = 'cell';

    cell.classList.add('square'+cellNumbers);
    cell.cellId = cellId;
    cell.innerHTML = `<span>${cellId}</span>`;
    cell.addEventListener('click', handleClickCell);
    return cell;
}

function handleClickCell(){
    if(!bombs.includes(this.cellId)){
        this.classList.add('clicked');
        score ++;
        console.log(score);
        const cells = document.getElementsByName('cell');
        if(!score === cells.length - BOMBS_NUMBER){
            // fine gioco
        }
    }else{
        console.log(fine);
    }

}

function generateBombs(cellNumbers){
    const bombsGenerated = [];

    while(bombsGenerated.length < BOMBS_NUMBER){
        const bomb = generateRandomNumber();
        if(!bombsGenerated.includes(bomb)){
            bombsGenerated.push(bomb);
        }
    }

    return bombsGenerated;
}
function generateRandomNumber(){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function reset(){
    main.innerHTML = '';

}