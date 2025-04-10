const DeckGame = ({ deck, handleAttackAux, playCard }) => {
  return (
    <div className="container">
      <div className="row">
        {deck && deck.map((card) => (
            <div key={card?.key} className="card m-3 shadow" style={{ width: "6.5rem" }}
            >
            <div className="d-flex align-items-center justify-content-center">
                <img className="card-img-top mt-2  rounded"
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${card?.key}_0.jpg`} alt={card?.name}
                    style={{ width: "100%", height: "auto" }} />
            </div>
              <div className="card-body p-0">
                  <p className="p-0 m-0">{card?.name} </p>
              </div>

              <ul className="list-group list-group-flush">
                <button className="btn btn-outline-dark p-0" onClick={() => playCard(card)}>
                  Poser
                </button>
                <button className="btn btn-outline-dark p-0 mt-1" onClick={() => handleAttackAux(card)}>
                  Attack
                </button>
                <li style={{ listStyle: "none" }}>{`Att : ${card?.info.attack}`}</li>
                <li style={{ listStyle: "none" }}>{`Def : ${card?.info.defense}`}</li>
                </ul>
            </div>
        ))}
      </div>
    </div>
  );
}

export default DeckGame;