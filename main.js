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
    const gameboardArr = [];

    function generateGameboard(size){
        // I do not want the gameboard to be smaller or larger than that
        if (size < 3 || size > 5){
            return false;
        }

        for (let i = 0; i < size; i++){
            gameboardArr.push([]);
            for (let j = 0; j < size; j++){
                gameboardArr[i].push([]);
                gameboardArr[i][j] = '';
            }
        }
    }

    function getGameboardStatus(){
        return gameboardArr.slice();
    }

    // usage: gameboard.setGameboardField('X', 0, 2)
    function setGameboardField(playerSymbol, row, column){
        if (gameboardArr[row][column] === ''){
            gameboardArr[row][column] = playerSymbol;
        } else if (gameboardArr[row][column] === undefined){
            return 'out of bounds';
        } else {
            return 'field occupied';
        }
    }

    return {generateGameboard, getGameboardStatus, setGameboardField}
}();

gameboard.generateGameboard(3);
console.log(gameboard.setGameboardField('X', 0, 4));

console.log(gameboard.getGameboardStatus());
