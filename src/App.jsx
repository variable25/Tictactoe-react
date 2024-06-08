import Playerinfo from "./Components/PlayerInfo";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Logs from "./Components/Logs";
import { WINNING_COMBINATIONS } from "./winning_combo.js";
import GameOver from "./Components/GameOver.jsx";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2',
}

const BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null] 
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let newBoard = [...BOARD.map((array) => [...array])];

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const{ row,col } = square;

    newBoard[row][col] = player;
  }
  return newBoard;
}

function deriveWinnner(newBoard,players){
  let winner;

  for(const combo of WINNING_COMBINATIONS){
    const firstSquareSymbol = newBoard[combo[0].row][combo[0].column];  
    const secondSquareSymbol = newBoard[combo[1].row][combo[1].column];
    const thirdSquareSymbol = newBoard[combo[2].row][combo[2].column];

    if(firstSquareSymbol && 
      firstSquareSymbol===secondSquareSymbol && 
      firstSquareSymbol===thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns ] = useState([]);
  
  
  const activePlayer = deriveActivePlayer(gameTurns);
  const newBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinnner(newBoard, players);

  const hasDraw = (gameTurns.length === 9) && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedturn = [{ square : { row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns,];
      return updatedturn;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Playerinfo 
            initialname={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          >
          </Playerinfo>
          <Playerinfo 
            initialname={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          >
          </Playerinfo>
          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={newBoard}/>
      </div>
      <Logs turns={gameTurns}/>
    </main>
  );
}

export default App
