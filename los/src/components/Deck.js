import Card from "./Card";

const Deck = ({ handleAjoutADeck, deck, type }) => {
  return (
    <div className="container">
      <div className="row">
        {deck && deck.map((champ) => (
          <Card key={champ.id} info={champ} deplacer={handleAjoutADeck} type={ type }  />
        ))}
      </div>
    </div>
  );
}

export default Deck;