import Carte from "./Cards";
export default function Champions({toutleschampions, deplacer}){


    return(
        <div className="container text-center">
            <div className="row justify-content-center">
                {toutleschampions.map((champ) => (
                    <Carte key={champ.id} info={champ} deplacer={deplacer} />
                ))}
            </div>
        </div>
    );}