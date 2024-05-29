import { useState } from "react";

/* const flashCards = [
  {
    title: "The Head",
    content: "The head is a crucial structure",
    id: 123,
    read: false,
  },
  {
    title: "The Neck",
    content: "The neck is a crucial structure",
    id: 456,
    read: false,
  },
  {
    title: "The thorax",
    content: "The thorax is a crucial structure",
    id: 789,
    read: false,
  },
]; */

export default function App() {
  const [cards, setCards] = useState([]);

  function handleToggleCards(id) {
    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, read: !card.read } : card
      )
    );
  }

  function handleDeleteCards(id) {
    setCards((cards) => cards.filter((card) => card.id !== id));
  }

  return (
    <div>
      <Header />
      <Form cards={cards} onSetCards={setCards} />
      {cards.length > 0 && (
        <CardList
          cards={cards}
          onToggleCards={handleToggleCards}
          onDeleteCard={handleDeleteCards}
        />
      )}
      <ReadTracker cards={cards} />
    </div>
  );
}
function Header() {
  return <h1 className="logo">🖋FLASH READ🎴</h1>;
}

function Form({ cards, onSetCards }) {
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");
  const newCard = {
    title: title,
    content: cont,
    read: false,
    id: crypto.randomUUID(),
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleAddCard() {
    if (!title || !cont) return;
    onSetCards((cards) => [...cards, newCard]);
    setTitle("");
    setCont("");
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-card">
      <h3>Add a new Flash Card</h3>
      <div>
        <label>Title: </label>
        <input
          type="text"
          placeholder="card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Content: </label>
        <textarea
          placeholder="card content"
          value={cont}
          onChange={(e) => setCont(e.target.value)}
        ></textarea>
      </div>

      <button onClick={handleAddCard}>Add</button>
    </form>
  );
}

function CardList({ cards, onToggleCards, onDeleteCard }) {
  return (
    <div className="cards-container">
      <div className="grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.title}
            onToggleCards={onToggleCards}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ card, onToggleCards, onDeleteCard }) {
  return (
    <div>
      <article className="article">
        <div className="flex">
          <h3>{card.read ? card.title : card.title}</h3>
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

function ReadTracker({ cards }) {
  const numCards = cards.length;
  const readCards = cards.filter((card) => card.read).length;
  const percentage = (readCards / numCards) * 100;
  return (
    <footer className="footer">
      <p>
        {cards.length > 0
          ? `You have ${numCards} flash cards and you have read ${readCards} (${Math.round(
              percentage
            )}%)`
          : "Start adding your flash cards 🚀"}{" "}
      </p>
    </footer>
  );
}
