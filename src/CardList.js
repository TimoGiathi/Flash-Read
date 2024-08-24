import { useState, useMemo } from "react";
import Card from "./Card";

export default function CardList({
  cards,
  onToggleCards,
  onDeleteCard,
  subject,
  onSetCards,
}) {
  const [sortCards, setSortCards] = useState("input");

  const sortedCards = useMemo(() => {
    let sorted = [...cards];
    if (sortCards === "subA-Z") {
      sorted.sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (sortCards === "subZ-A") {
      sorted.sort((a, b) => b.subject.localeCompare(a.subject));
    } else if (sortCards === "contA-Z") {
      sorted.sort((a, b) => a.content.localeCompare(b.content));
    } else if (sortCards === "read-status") {
      sorted.sort((a, b) => Number(a.read) - Number(b.read));
    } else if (sortCards === "contZ-A") {
      sorted.sort((a, b) => b.content.localeCompare(a.content));
    }
    return sorted;
  }, [sortCards, cards]);

  function handleClearAll() {
    const confirm = window.confirm(
      "Are you sure you want to delete everything?"
    );
    if (confirm) onSetCards([]);
  }

  return (
    <div className="cards-container">
      <div className="grid">
        {sortedCards.map((card) => (
          <Card
            card={card}
            key={card.id} // Use a unique key
            onToggleCards={onToggleCards}
            onDeleteCard={onDeleteCard}
            subject={subject}
          />
        ))}
      </div>
      <div className="card-div">
        <button onClick={handleClearAll}>Clear All</button>
        <label>
          Sort by:
          <select
            value={sortCards}
            onChange={(e) => setSortCards(e.target.value)}
          >
            <option value="input">Input Order</option>
            <option value="subA-Z">Subject: A-Z</option>
            <option value="subZ-A">Subject: Z-A</option>
            <option value="contA-Z">Content: A-Z</option>
            <option value="contZ-A">Content: Z-A</option>
            <option value="read-status">Read Status</option>
          </select>
        </label>
      </div>
    </div>
  );
}
