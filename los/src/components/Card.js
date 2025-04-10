export default function Card({ info , deplacer, type }) {

    return (
      <div className="card m-3 shadow" style={type == "game" ? { width: "6.5rem" } : { width: "10rem" }}
        onClick={ deplacer ? () => { deplacer(info) } : () => { } }
      >
        <div className="d-flex align-items-center justify-content-center">
          <img className="card-img-top mt-2  rounded"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.key}_0.jpg`} alt={info.name}
            style={{ width: "100%", height: "auto" }} />
        </div>

        <div className="card-body p-1">
          <h5 className="card-title">{info.name} </h5>
        </div>

        <ul className="list-group list-group-flush">
          <li className={type == "game" ? "" : "list-group-item"} style={type == "game" ? { listStyle: "none" } : {}}>{type == "game" ? `Att : ${info.info.attack}` : `Attack: ${info.info.attack}`}</li>
          <li className={type == "game" ? "" : "list-group-item"} style={type == "game" ? { listStyle: "none" } : {}}>{type == "game" ? `Def : ${info.info.defense}` : `Defense: ${info.info.defense}`}</li>
        </ul>
      </div>
    );
  }
  

  