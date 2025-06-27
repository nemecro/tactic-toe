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
    function generateGameboard(size){
        // I do not want the gameboard to be smaller or larger than that
        if (size < 3 || size > 5){
            return false;
        }
        gameboardArr = Array.from({length: size}, () => Array(size).fill(''));
        return true;
    }

    function getGameboardStatus(){
        return gameboardArr.slice();
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

    return {createPlayer}

}();



gameboard.generateGameboard(3);
console.log(gameboard.setGameboardField('X', 0, 4));
console.log(gameboard.setGameboardField('X', 0, 2));

console.log(gameboard.getGameboardStatus());

playerHandler.createPlayer('Roland', 'X');
