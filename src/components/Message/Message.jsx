import MovesCounterMessage from "./MovesCounterMessage";
import TimeCounterMessage from "./TimeCounterMessage";
import GameOverMessage from "./GameOverMessage";
import './Message.css'

function Message({ time, moves, gameOver }) {
  return (
    <div className="messages">
      <div>
        <MovesCounterMessage moves={moves} />
        <TimeCounterMessage time={time} />
      </div>
      <div>
        <GameOverMessage gameOver={gameOver} />
      </div>
    </div>
  );
}

export default Message;
