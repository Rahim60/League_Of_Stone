import Card from "./Card";

const Deck = ({ handleAjoutADeck, deck }) => {
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        {deck.map((champ) => (
          <Card key={champ.id} info={champ} deplacer={handleAjoutADeck} />
        ))}
      </div>
    </div>
  );
}

export default Deck;