import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const champions = [
  { name: "Ivern", img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" },
  { name: "Teemo", img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg" },
  { name: "Taric", img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg" },
];

const Plateau = () => {
  return (
    <div className="container mt-4">
      <section className="plateau">
        
        {/* Partie Adversaire */}
        <article className="text-center">
          <div className="portrait">
            <img src="https://source.unsplash.com/100x100/?avatar1" alt="Adversaire" />
          </div>
          <h3 className="text-white">Adversaire</h3>
        </article>
        <article className="row justify-content-center">
          <div className="col-md-4">
            <div className="carte">
              <img src={champions[0].img} alt={champions[0].name} />
              <div className="nom-champion">{champions[0].name}</div>
            </div>
          </div>
        </article>

        {/* Séparation */}
        <div className="separator"></div>

        {/* Partie Joueur */}
        <article className="text-center">
          <div className="portrait">
            <img src="https://source.unsplash.com/100x100/?avatar2" alt="Joueur" />
          </div>
          <h3 className="text-white">Joueur</h3>
        </article>
        <article className="row justify-content-center">
          {champions.slice(1).map((champion, index) => (
            <div key={index} className="col-md-4">
              <div className="carte">
                <img src={champion.img} alt={champion.name} />
                <div className="nom-champion">{champion.name}</div>
              </div>
            </div>
          ))}
        </article>

      </section>
    </div>
  );
};

export default Plateau;
