import { useState } from 'react';
import './App.css';

function Square({value, handleInput}) {
  //const [value, setValue] = useState()
  const handleClick = () => {
    //setValue("O")
    console.log(value)
  }

  return <button className='square' value={value} onClick={handleInput}>{value}</button>
}

function Board(){

  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))
  
  const handleClick = (i) => {
    if(calculateWinner(squares) || squares[i]){
      return
    }
    const nextSquare = squares.slice()
    xIsNext ? nextSquare[i] = "X" : nextSquare[i] = "O";
    setSquares(nextSquare)
    setXIsNext(!xIsNext)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ]

    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
     }
    return null
  }

  const winner = calculateWinner(squares)
  let status 
  winner ? status = "Vinner er " + winner : status = "Neste spiller er " + (xIsNext ? "X" : "O")

  const handleNewGame = () => {
    setSquares(Array(9).fill(null))
  }
  
  return(
    <article>
      <h3>{status}</h3>
      <div className='board'>
        {squares.map((square, i) => (
        <Square key={i} value={square} handleInput={() => handleClick(i)}/>
        ))}
      </div>
      {winner ? <button onClick={handleNewGame}>Nytt spill</button> : null}
    </article>
  )
}


function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}
export default App;
