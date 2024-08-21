export default function Card({ card, onToggleCards, onDeleteCard, subject }) {
  return (
    <div>
      <article className="article">
        <div className="flex">
          <h3>{card.title}</h3>
          <span>{card.subject}</span>
          <p className={card.read ? "read" : "pending"}>
            {card.read ? "Read" : "Pending"}
          </p>
        </div>
        <p style={card.read ? { textDecoration: "line-through" } : {}}>
          {card.content}
        </p>
        <span>
          <button onClick={() => onDeleteCard(card.id)}>Delete</button>
          <div>
            <label>{card.read ? "Unmark as read " : "Mark as read"}</label>
            <input
              type="checkbox"
              value={card.read}
              onChange={() => onToggleCards(card.id)}
            />
          </div>
        </span>
      </article>
    </div>
  );
}
