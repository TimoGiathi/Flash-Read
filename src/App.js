import { useState } from "react";
import Form from "./Form";
import CardList from "./CardList";
import ReadTracker from "./ReadTracker";

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
  const [subject, setSubject] = useState("bio");

  function handleToggleCards(id) {
    //toggles the 'read' status
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
    <>
      <Header />
      <Form
        cards={cards}
        onSetCards={setCards}
        subject={subject}
        onSetSubject={setSubject}
      />
      {cards.length > 0 && (
        <CardList
          cards={cards}
          onToggleCards={handleToggleCards}
          onDeleteCard={handleDeleteCards}
          subject={subject}
          onSetCards={setCards}
        />
      )}
      <ReadTracker cards={cards} />
    </>
  );
}
function Header() {
  return <h1 className="logo">🖋FLASH READ🎴</h1>;
}
