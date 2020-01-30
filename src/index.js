import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {
  /*constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }
  Now iits not required since we are taking statte value from Board state
  */

  //lets change square to be function component
  //they only ontain render an d dont have their own state
    //render() {
      function Square(props){
      return (
        <button 
              className="square"
              onClick={()=> props.onClick()}
            >
          {/* TODO */
           props.value
          }
        </button>
      );
      }
  //  } closed render
  //}  closed class
  
  class Board extends React.Component {
   /*
    constructor(props){
      super(props);
      this.state = {
        squares:Array(9).fill(null),
        xIsNext: true,
      };
    }
    we dont need this after history and Game constructor
     added
     but see about arrays single and multi dimensional
    */

    //handle click moved from Board to Game   

    renderSquare(i) {
      return <Square 
                value={this.props.squares[i]}
                onClick={()=>this.props.onClick(i)} 
              />;
    }
  
    render() {
     
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null), //see multidimenstional array in js react
        }],
        stepNumber: 0,
        xIsNext:true,
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice(); //what slice does
     //the slice opetaor creates the copy of the squares array 
     // to modify instead of modifying existing array
     //Immutability is important
     //mutate data : means directly changing data value
      if (calculateWinner (squares) || squares[i]){
        return;
      }
      squares[i]= this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history:history.concat([{
        squares: squares,
        }]),
        //unline the array push() concat method doesnt mutate the original array so we use it
        stepNumber: history.length,
        xIsNext:!this.state.xIsNext,               
      });
    } 

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
     //use game components render function to use the most 
     //recent history and determine and display games status
     const history = this.state.history;
     const current = history[this.state.stepNumber];
     const winner = calculateWinner(current.squares);
     const moves = history.map((step , move)=>{
        const desc = move?
           'Go to move #' + move:
           'Go to game start';
           return (
              <li>
                <button onClick={() => this.jumpTo(move)}> {desc} </button>
              </li>
           );
     });
     let status;
     if (winner) {
       status = 'Winner: ' + winner;
     } else {
       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     }   

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i)=> this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div> {status} </div>
            <ol> {moves} </ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i=0; i< lines.length; i++){
      const [a, b, c]= lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  