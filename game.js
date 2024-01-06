

let board = document.querySelector(".board-row");
let boardCells = document.querySelectorAll(".board");
let style =  "#f2b137";

let p1 = document.getElementById("p-1");
let p2 = document.getElementById("p-2");
let ties = document.getElementById('ties');

let span = document.getElementById("span");


let cellArray = ["", "", "", "", "", "", "", "", ""];
let playerX = "X";
let winningMoveIndex = null;
for (let i = 0; i < cellArray.length && i < boardCells.length; i++) {
    boardCells[i].addEventListener('click', () => {
       
        if (cellArray[i] === "") {  
            makeMove(i,playerX);

            if (checkWinner(playerX)) {
                highlightWinningMove();
            }

           setTimeout(() => {
                if (checkWinner(playerX)) {
                    declareWinner(playerX);
                    resetGame();
                } else if (isBoardFull()) {
                    ties.innerText = parseInt(ties.innerText) + 1;
                    resetGame();
                } else {
                    playerX = (playerX === "X") ? "O" : "X";
                    makeComputerMove();
                }
            }, 1000); 
        }
    });

};
let h1 = document.querySelector('.h1-1');
function declareWinner(player) {
        // alert(`${player} is the winner!`); 
        if (player === "X") {
            p1.innerText = parseInt(p1.innerText) + 1;
        } else {
            p2.innerText = parseInt(p2.innerText) + 1;
        }

        outContainer.classList.add('act-dis');
        if(player === "X"){
            h1.innerHTML ="<h4>YOU WON</h4>"+"<br>" + `${player}`+  " TAKES THE LEAD";
        }else{
            h1.innerHTML = "<span>OH,YOU LOSE....</span>"+"<br>" + `${player}`+  " TAKES THE LEAD";
        }
        btns1.innerText = "QUIT";
        btns2.innerText = "NEXT ROUND";
       
};


function makeMove(index, player) {
            boardCells[index].innerHTML = player;
           if (player === "X") {
            boardCells[index].style.color = "#f2b137"; 
             span.innerText = "O" + " ";
            } else {
            boardCells[index].style.color = "#31C3BD"; 
            span.innerText = "X" + " " ;
            }
            cellArray[index] = player;
};

function makeComputerMove() {
    let canMakeMove = false; 
    setTimeout(() => {
        let bestMove = getBestMove(cellArray, "O");
        makeMove(bestMove, "O");

        if (checkWinner("O")) {
            highlightWinningMove();
        }

        setTimeout(() => {
            canMakeMove = true; 
            if (checkWinner("O")) {
                declareWinner("O");
                // resetGame();
            } else if (isBoardFull()) {
                outContainer.classList.add('act-dis');
                h1.innerHTML = "   IT'S A DRAW";
                btns1.innerText = "QUIT";
                btns2.innerText = "NEXT ROUND";
                ties.innerText = parseInt(ties.innerText) + 1;
                // resetGame();
            } else {
                playerX = "X";
            }
            
        }, 500); 
    }, 500);
    span.innerText = "X" + " ";
};

   
        setTimeout(()=>makeComputerMove(),2000)
    

function highlightWinningMove() {
    if (winningMoveIndex !== null) {
        boardCells[winningMoveIndex].classList.add('highlight');
    }
};
function checkWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (cellArray[i * 3] === player && cellArray[i * 3 + 1] === player && cellArray[i * 3 + 2] === player) {
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (cellArray[i] === player && cellArray[i + 3] === player && cellArray[i + 6] === player) {
            return true;
        }
    }
    if ((cellArray[0] === player && cellArray[4] === player && cellArray[8] === player) ||
        (cellArray[2] === player && cellArray[4] === player && cellArray[6] === player)) {
        return true;
    }

    return false;
}

function isBoardFull() {
    return cellArray.every(cellItem => cellItem !== "");
}

function resetGame() {
    for (let i = 0; i < cellArray.length; i++) {
        boardCells[i].innerHTML = "";
        cellArray[i] = "";
        boardCells[i].classList.remove('highlight'); 
    }
    playerX = "X";
    span.innerText= playerX +" "; 
   setTimeout(()=> makeComputerMove(),1000)
}

let refresh = document.querySelector(".refresh");
refresh.addEventListener('click',()=>{
    p1.innerText = 0;
    p2.innerText = 0;
    ties.innerText = 0;
    span.innerText = playerX + " ";
    
    outContainer.classList.add('act-dis');
    h1.innerHTML = " RESTART GAME";
    btns1.innerText = "NO,CANCEL";
    btns2.innerText = "YES,RESTART";
   
})


// function getBestMove(newBoard, player) {
//     let emptyCells = getEmptyCells(newBoard);

//     // Shuffle the available moves to add randomness
//     shuffleArray(emptyCells);

//     let bestMove;
//     let bestScore = -Infinity;

//     for (let i = 0; i < emptyCells.length; i++) {
//         let move = emptyCells[i];
//         newBoard[move] = player;

//         let score = minimax(newBoard, 0, false);

//         newBoard[move] = ""; // Undo the move

//         if (score > bestScore) {
//             bestScore = score;
//             bestMove = move;
//         }
//     }

//     return bestMove;
// }
function getBestMove(newBoard, player) {
    let emptyCells = getEmptyCells(newBoard);

    
    shuffleArray(emptyCells);

    let bestMove;
    let bestScore = -Infinity;

    for (let i = 0; i < emptyCells.length; i++) {
        let move = emptyCells[i];
        newBoard[move] = player;

        // Introduce randomness in the scoring
        let score = minimax(newBoard, 0, false) + Math.random() * 0.2;

        newBoard[move] = ""; // Undo the move

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
};

function minimax(newBoard, depth, isMaximizing) {
    if (checkWinner("O")) {
        return 1;
    } else if (checkWinner("X")) {
        return -1;
    } else if (isBoardFull()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                bestScore = Math.max(bestScore, minimax(newBoard, depth + 1, false));
                newBoard[i] = ""; // Undo the move
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                bestScore = Math.min(bestScore, minimax(newBoard, depth + 1, true));
                newBoard[i] = ""; // Undo the move
            }
        }
        return bestScore;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getEmptyCells(newBoard) {
            return newBoard.reduce((acc, value, index) => {
                if (value === "") {
                    acc.push(index);
                }
                return acc;
            }, []);
}


let outContainer = document.querySelector('.out-container');
let btns1 = document.querySelector('.btns-1');
let btns2 = document.querySelector('.btns-2');


btns2.addEventListener('click',()=>{
    
    if(btns2.innerText === "NEXT ROUND"){
        outContainer.classList.remove('act-dis');
        resetGame();
    }else{
        outContainer.classList.remove('act-dis');
        resetGame();
    }
});

btns1.addEventListener('click',()=>{
   if(btns1.innerText === "QUIT"){
      window.location.href = "C:/Users/USER/Desktop/Tic_Tac/index.html"
   }else{
    outContainer.classList.remove('act-dis');
   }
});