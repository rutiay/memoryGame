import { Component } from "react";
import Board from "./Board";
import Message from "./Message/Message";
import History from "./History";
import "./MemoryGame.css";

class MemoryGame extends Component {
  state = {
    board: [],
    time: null,
    turns: null,
    message: "",
  };

  initialData = [
    { img: "/img/img-1.jpg" },
    { img: "/img/img-2.jpg" },
    { img: "/img/img-3.jpg" },
    { img: "/img/img-4.jpg" },
    { img: "/img/img-5.jpg" },
    { img: "/img/img-6.jpg" },
    // { img: "/img/img-7.jpg" },
    // { img: "/img/img-8.jpg" },
    // { img: "/img/img-9.jpg" },
    // { img: "/img/img-10.jpg" },
    // { img: "/img/img-11.jpg" },
    // { img: "/img/img-12.jpg" },
    // { img: "/img/img-13.jpg" },
    // { img: "/img/img-14.jpg" },
    // { img: "/img/img-15.jpg" },
  ];

  setIntervalId = null;
  firstCard = null;
  secondCard = null;
  disable = false;
  numOfPairs = 0;
  numOfMatchingPairs = 0;
  timeResultArray = [];
  MEMORY_GAME_TIME_CHART = "memoryGameTime";

  startGame = () => {
    this.createBoard();
    this.countTime();
    this.firstCard = null;
    this.secondCard = null;
    this.numOfPairs = this.initialData.length;
  };

  createBoard = () => {
    const dubbleArray = [...this.initialData, ...this.initialData]
      .sort(() => Math.random() - 0.5)
      .map((card, i) => ({
        ...card,
        isMatched: false,
        isClicked: false,
        id: i,
      }));
    this.setState({
      board: dubbleArray,
      time: 0,
      turns: 0,
    });
  };

  countTime = () => {
    this.setIntervalId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  };

  playerTurn = (card) => {
    if (!this.disable) {
      !this.firstCard ? (this.firstCard = card) : (this.secondCard = card);
    }
  };

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate() {
    if (this.firstCard && this.secondCard && this.firstCard.id !== this.secondCard.id){
      this.disable = true;
      if (this.firstCard.img === this.secondCard.img) {
        this.numOfMatchingPairs++;
        this.state.board.map((card) => {
          if (card.img === this.firstCard.img) {
            card.isMatched = true;
          }
        });
        this.movesHadler();
        if (this.isGameOver()) {
          clearInterval(this.setIntervalId);
          this.setState({ message: "Congratulations!" });
          this.saveTime();
        }
      }
      else {
        setTimeout(() => this.movesHadler(), 1000);
      }
    }
  }

  saveTime = () => {
    this.getTimeHistory();
    this.addNewTimeScore();
  };

  getTimeHistory = () => {
    this.timeResultArray =
      JSON.parse(localStorage.getItem(this.MEMORY_GAME_TIME_CHART)) || [];
  };

  addNewTimeScore = () => {
    this.timeResultArray.push(this.state.time);
    localStorage.setItem(
      this.MEMORY_GAME_TIME_CHART,
      JSON.stringify(this.timeResultArray)
    );
  };

  movesHadler = () => {
    this.firstCard = null;
    this.secondCard = null;
    this.disable = false;
    this.setState({
      turns: this.state.turns + 1,
    });
  };

  isGameOver = () => this.numOfMatchingPairs === this.numOfPairs;

  render() {
    return (
      <div className="memoryGame">
        <h1>Memory Game</h1>
        <button onClick={() => window.location.reload()}>New Game</button>
        <br/>
        <button onClick={this.getTimeHistory}>Get Time History</button>
        <Message
          time={this.state.time}
          moves={this.state.turns}
          gameOver={this.state.message}
        />
        <Board
          board={this.state.board}
          playerTurn={this.playerTurn}
          firstCard={this.firstCard}
          secondCard={this.secondCard}
        />
        <History timeHistory={this.timeResultArray} />
      </div>
    );
  }
}

export default MemoryGame;
