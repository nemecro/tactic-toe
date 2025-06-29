// I need a Gameboard object with gameboard array
// this object must be created by using IIFE
// I need to be able to track the size of the Gameboard (e.g. 3x3)
// I need to be able to track changes in the Gameboard - every time player moves

// I need to create Players by either using IIFEs or Constructors
// I need Players to have a name, symbol and number of victories

// I need to be able to create a game objects by IIFEs
// I need the game to have a mechanism of changing players turns, to control the flow of the game
// I need the game object to track whether a victory condition has been met
// I need to be able to track the number of turns within the game and decide whether a draw happened

const gameboard = function(){
    let gameboardArr = [];

    /**
     * resets the gameboardArr and populates it with empty strings
     * @param {*} size 
     * @returns 
     */
    function generateGameboard(){
        // I do not want the gameboard to be smaller or larger than that, 3x3 for easier victory conditions
        const size = 3;
        gameboardArr = Array.from({length: size}, () => Array(size).fill(''));
        return true;
    }

    function getGameboardStatus(){
        return gameboardArr.map(row => row.slice());
    }

    // usage: gameboard.setGameboardField('X', 0, 2)
    function setGameboardField(playerSymbol, row, column){
        if (row < 0 || row >= gameboardArr.length || column < 0 || column >= gameboardArr.length){
            return 'out of bounds';
        }
        if (gameboardArr[row][column] === ''){
            gameboardArr[row][column] = playerSymbol;
            return true;
        } else {
            return 'field occupied';
        }
    }

    return {generateGameboard, getGameboardStatus, setGameboardField}
}();


const playerHandler = function(){
    let allowedNumberOfPlayers = 2;

    let players = [];

    /**
         * Creates a new player if valid and space allows.
         * @param {string} name - The player's name.
         * @param {string} symbol - The player's symbol (e.g., 'X' or 'O').
         * @returns {{success: boolean, message: string}}
     */
    function createPlayer(name, symbol){
        name = name.trim();
        symbol = symbol.trim();

        if (!name || !symbol){
            return {success: false, message: 'Name and symbol are required.'};
        }

        if (symbol.length !== 1){
            return {success: false, message: 'Symbol must be a single character.'};
        }

        if (players.length >= allowedNumberOfPlayers){
            return {success: false, message: 'More players than allowed.'};
        }

        if (!validatePlayer(name, symbol)){
            return {success: false, message: 'Player validity check failed'};
        }

        players.push({name, symbol});
        return {success: true, message: 'Player added succesfully.'};
    }

    /**
         * Validates that the player's name and symbol are unique.
         * @param {string} name
         * @param {string} symbol
         * @returns {boolean}
     */
    function validatePlayer(name, symbol){
        return !players.some(
            player => player.name === name || player.symbol === symbol
        );
    }

    /**
     * Resets the players array
     */
    function resetPlayers(){
        players = [];
    }

    /**
     * Returns a copy of the players array
     */
    function getPlayers(){
        return players.map(player => ({ ...player }));
    }

    return {createPlayer, resetPlayers, getPlayers};

}();

// until a victory condition is not met, swap players turns and get their input
const createGame = function(player1, player2){

    function checkVictory(board) {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (
            board[i][0] !== 0 &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]
            ) return board[i][0];
            if (
            board[0][i] !== 0 &&
            board[0][i] === board[1][i] &&
            board[1][i] === board[2][i]
            ) return board[0][i];
        }
        // Check diagonals
        if (
        board[0][0] !== 0 &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
        ) return board[0][0];

        if (
        board[0][2] !== 0 &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
        ) return board[0][2];
        return 0; // No winner
    }

    function play(){
        gameboard.generateGameboard();
        let activePlayer = player1;
        do{
            activePlayer = activePlayer === player1 ? player2 : player1;
            gameboard.setGameboardField(activePlayer.symbol, prompt(`${activePlayer}'s turn row: `), prompt(`${activePlayer}'s turn column: `));
        } while (checkVictory(gameboard.getGameboardStatus) === 0)
    }


}


// gameboard.generateGameboard();

// console.log(gameboard.setGameboardField('X', 0, 4));
// console.log(gameboard.setGameboardField('X', 0, 2));

// console.log(gameboard.getGameboardStatus());

// playerHandler.createPlayer('Roland', 'X');
