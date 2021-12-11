import "./Card.css";

function Card({ card, playerTurn, turnCard }) {
  return (
    <div className="cards">
      <div className={turnCard ? "flip" : ''}>
        <img
          src="/img/cover.jpg"
          className="cover"
          alt=""
          onClick={() => playerTurn(card)}
        />
        <img src={card.img} alt="" className="front-img" />
      </div>
    </div>
  );
}

export default Card;
