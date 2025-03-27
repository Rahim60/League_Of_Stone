import Champion from "./Champions";

export default function Carte({ info , deplacer }) {

    const champchoisie=()=>{

    }

    return (
      <div
        className="card-container"
        style={{
          flex: "1 1 calc(25% - 20px)", // 4 cartes par ligne avec espace
          maxWidth: "calc(25% - 20px)",
          textAlign: "center",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "10px",
           backgroundColor: "gray",
        //   boxSizing: "border-box",
        //   margin: "10px",
        }}
        // action={{onclick}}
      >
        <div className="card text-center shadow-sm p-3" onClick ={()=>{deplacer(info)}}>
          <h3 style={{ color: "red" }}>{info.name}</h3>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.key}_0.jpg`} alt={info.name}
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            
          />

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <strong>Attack:</strong> {info.info.attack}
            </li>
            <li>
              <strong>Defense:</strong> {info.info.defense}
            </li>
          </ul>
          {/* <button onClick ={()=>{deplacer(info)}}>valider</button> */}
        </div>
      </div>
    );
  }
  

  