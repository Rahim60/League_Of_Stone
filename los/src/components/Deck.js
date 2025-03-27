import Carte from "./Cards";

export default function Deck({ toutleschampions, deplacer }) {
  return (
    <div className="deck-container">
      {toutleschampions.map((champ) => (
        <Carte key={champ.id} info={champ} deplacer={deplacer} />
      ))}
    </div>
  );
}
