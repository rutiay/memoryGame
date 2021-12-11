import Card from "./Card";
import "./Board.css";

function Board({ board, playerTurn, firstCard, secondCard}) {
  return (
    <div className="cardsContainer">
      {board.map((card) => (
        <Card
          key={card.id}
          card={card}
          playerTurn={playerTurn}
          turnCard={
           card.isMatched || card === firstCard || card === secondCard
          }
        />
      ))}
    </div>
  );
}

export default Board;
