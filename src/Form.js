import { useState } from "react";
export default function Form({ cards, onSetCards, subject, onSetSubject }) {
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");

  const newCard = {
    title: title,
    content: cont,
    read: false,
    id: crypto.randomUUID(),
    subject: subject,
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleAddCard() {
    if (!title || !cont) return;
    onSetCards((cards) => [...cards, newCard]);
    setTitle("");
    setCont("");
    onSetSubject("other");
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-card">
      <h3>Add a new Flash Card</h3>
      <div>
        <label>
          Title:
          <input
            type="text"
            placeholder="card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>Content: </label>
        <textarea
          placeholder="card content"
          value={cont}
          onChange={(e) => setCont(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Subject: </label>
        <select value={subject} onChange={(e) => onSetSubject(e.target.value)}>
          <option value="Biology">Biology</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Physics">Physics</option>
          <option value="Languages">Languages</option>
          <option value="Geography">Geography</option>
          <option value="History">History</option>
          <option value="Business">Business Studies</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button onClick={handleAddCard}>Add</button>
    </form>
  );
}
