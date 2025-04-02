import Image from "next/image";
import Champion from "./Champions";

export default function Carte({ info , deplacer }) {

    return (
      <div className="card m-3 shadow" style={{ width: "18rem", }} onClick={() => { deplacer(info) }}>
        <img className="card-img-top mt-2"
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.key}_0.jpg`} alt={info.name}
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}/>
        <div className="card-body">
          <h5 className="card-title">{info.name} </h5>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">Attack: {info.info.attack}</li>
          <li className="list-group-item"> Defense: {info.info.defense}</li>
        </ul>
      </div>
    );
  }
  

  