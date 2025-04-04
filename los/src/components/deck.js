import Carte from "./cards";
export default function Deck({toutleschampions, deplacer}){


    return(
        <>
            {toutleschampions.map((champ) => (
                          <Carte key={champ.id} info={champ} deplacer={deplacer} />
                        ))}

        </>
    );}