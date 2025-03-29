import Carte from "./Cards";
export default function Champions({toutleschampions, deplacer}){


    return(
        <div class="container text-center">
            <div class="row justify-content-center">
                {toutleschampions.map((champ) => (
                    <Carte key={champ.id} info={champ} deplacer={deplacer} />
                ))}
            </div>
        </div>
    );}