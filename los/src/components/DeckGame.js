const DeckGame = ({ deck, handler }) => {
  return (
    <div className="container">
      <div className="row">
        {deck && deck.map(({ name, info, key }) => (
            <div key={key} className="card m-3 shadow" style={{ width: "6.5rem" }}
                onClick={handler}
            >
                <div className="d-flex align-items-center justify-content-center">
                    <img className="card-img-top mt-2  rounded"
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`} alt={name}
                        style={{ width: "100%", height: "auto" }} />
                </div>

                <div className="card-body p-0">
                    <p className="p-0 m-0">{name} </p>
                </div>

                <ul className="list-group list-group-flush">
                    <li style={{ listStyle: "none" }}>{`Att : ${info.attack}`}</li>
                    <li style={{ listStyle: "none" }}>{`Def : ${info.defense}`}</li>
                </ul>
            </div>
        ))}
      </div>
    </div>
  );
}

export default DeckGame;