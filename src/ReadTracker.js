export default function ReadTracker({ cards }) {
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
