import Carte from "./Cards";
export default function Champions({toutleschampions, deplacer}){


    return(
        <>
            {toutleschampions.map((champ) => (
                <Carte key={champ.id} info={champ} deplacer={deplacer} />
            ))}

        </>
    );}