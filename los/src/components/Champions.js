import Card from "./Card";
export default function Champions({ champions, handleAjoutAChampions }) {

    return (
        <div className="container">
            <div className="row">
                {champions.map((champ) => (
                    <Card key={champ.id} info={champ} deplacer={handleAjoutAChampions} />
                ))}
            </div>
        </div>
    );
}