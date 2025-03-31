import Card from "./Card";
export default function Champions({ champions, handleAjoutAChampions }) {

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                {champions.map((champ) => (
                    <Card key={champ.id} info={champ} deplacer={handleAjoutAChampions} />
                ))}
            </div>
        </div>
    );
}