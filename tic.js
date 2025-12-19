
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const replayBtn = document.getElementById('replayBtn');
    const winnerMessage = document.getElementById('winnerMessage');
    let currentPlayer = 'X';
    let gameActive = true;

    function handleCellClick(e) {
        const cell = e.target;

        if (!cell.textContent && gameActive) {
            cell.textContent = currentPlayer;
            checkGameStatus();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && gameActive) {
                computerMove();
            }
        }
    }

    function checkGameStatus() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                gameActive = false;
                highlightWinnerCells(combo);
                winnerMessage.textContent = `${cells[a].textContent} wins!`;
                return;
            }
        }

        if ([...cells].every(cell => cell.textContent)) {
            gameActive = false;
            winnerMessage.textContent = "It's a draw!";
        }
    }

    function computerMove() {
        const emptyCells = [...cells].filter(cell => !cell.textContent);
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function highlightWinnerCells(cellsToHighlight) {
        cellsToHighlight.forEach(cellIndex => {
            cells[cellIndex].classList.add('winner');
        });
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
        currentPlayer = 'X';
        gameActive = true;
        winnerMessage.textContent = '';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    replayBtn.addEventListener('click', resetGame);
});
