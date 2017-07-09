import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let word = "apple";
let wordArr = word.toUpperCase().split('');

const TriesLeft = props => {
  if ( props.triesRemaining !== 0) {
    if (props.gameWon) {
    return (
      <h3>You guessed it! Good work.</h3>
   )
  } else {
    return (
      <h3>Tries Left: {props.triesRemaining}</h3>
    )
  }
  } else {
    return (
      <div className="flexcontainer">
        <h3>Game over!</h3>
        <button onClick={props.showWord}>Show Word</button>
      </div>
    )
  }
}

const GuessWord = props => {
  let mappedWord = props.guessedWord.map( function(c) {
    return (<box>{c}</box>);
  });
  return (
    <div>
      {mappedWord}
    </div>
  )
}

const InputBox = props => {
  return (
    <div>
      <form onSubmit={props.enterLetter}>
        <label>
          Enter letter here: 
          <input type="text" maxLength="1" name="letter" placeholder="e.g. a" id="inputLetter" />
        </label>
        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  )
}

const LettersTried = props => {
  let letters = props.lettersGuessed.map( l => {
    l = l.toUpperCase();
    return `${l} `;
  });
  return (
    <div className="container">
      {letters}
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      lettersGuessed: [],
      guessedWord: ['_', '_', '_', '_', '_'],
      triesRemaining: 8,
      gameOver: false,
      gameWon: false,
    };

    this.enterLetter = this.enterLetter.bind(this);
    this.showWord = this.showWord.bind(this);
  };

  enterLetter = (event, props) => {
    event.preventDefault();
    this.setState( (prevState) => {
      let l = document.getElementById('inputLetter').value.toUpperCase();
      if (prevState.lettersGuessed.includes(l) || prevState.guessedWord.includes(l)) {
        alert('You have already guessed this letter!');
        document.getElementById('inputLetter').value = '';
      } else if ( wordArr.includes(l) ) {
        for (let i = 0; i < wordArr.length; i++) {
          if (wordArr[i] === l) {
            prevState.guessedWord.splice(i, 1, l);
          }
        }
        document.getElementById('inputLetter').value = '';
      }
      else {
        prevState.lettersGuessed.push(l);
        prevState.triesRemaining = prevState.triesRemaining - 1;
        document.getElementById('inputLetter').value = '';
      }
    });
  }

  showWord = (event, props) => {
    this.setState ({guessedWord: wordArr});
  }

  componentDidUpdate(prevProps, prevState) {
    if ( !this.state.guessedWord.includes('_')) {
      this.setState({ gameWon: true })
      document.getElementById('inputLetter').disabled = true;
      document.getElementById('submit').disabled = true;   
    }
    if (this.state.triesRemaining === 0) {
      this.setState({ gameOver: true })
      document.getElementById('inputLetter').disabled = true;
      document.getElementById('submit').disabled = true;
    }
  }

  render() {
    return (
      <div className="flexcontainer">
        <h1>Hangman</h1>
        <TriesLeft gameWon = {this.state.gameWon} showWord = {this.showWord} triesRemaining = {this.state.triesRemaining} lettersGuessed = {this.state.lettersGuessed} />
        <GuessWord guessedWord = {this.state.guessedWord} />
        <InputBox checkWon = {this.checkWon} enterLetter = {this.enterLetter} checkWon = {this.checkWon} />
        <LettersTried lettersGuessed = {this.state.lettersGuessed} />
      </div>
    );
  }
}

export default App;
