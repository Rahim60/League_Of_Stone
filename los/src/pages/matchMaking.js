"use client"; // Assure que ce composant est bien en mode client

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Deck from "@/components/Deck";

const MatchMaking = () => {
  const [deck, setDeck] = useState([]);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données depuis sessionStorage
    const storedDeck = sessionStorage.getItem("deck");
    const storedName = sessionStorage.getItem("name");
    const storedToken = sessionStorage.getItem("token");

    if (storedDeck) setDeck(JSON.parse(storedDeck))
    if (storedName) setUsername(storedName);
    if (storedToken) setToken(storedToken);

    // Si aucune donnée n'est trouvée, rediriger vers la page d'accueil ou de connexion
    if (!storedDeck || !storedToken) router.push("/signin");
  }, []);

  const joinQueue = async () => {
    const res = await fetch("http://localhost:3001/users/amIConnected", {
      method : "GET",
      headers: {
        'Authorization': token
      }
    });
    const data = await res.json();
    !data?.connectedUser && setError("Not connected on the server");
    console.log(data)

    try{
      const response = await fetch("http://localhost:3001/matchmaking/participate", {
        method : "GET",
        headers: {
          'Authorization': token
        }
      });
      if (!response.ok) throw new Error("Erreur lors de la connexion à /matchmaking/participate");
    }catch(err){ 
      setError(err.message);
    }

    console.log(error)
  }

  const retourAccueil = () => {
    sessionStorage.removeItem("deck");
    router.push("/acceuil");
  }

  return (
    <div className="image">
      <div className="container py-5 ">
        {/* Section d'en-tête */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-4 text-primary">Deck Choisi</h1>
            <p className="lead text-muted">{username}</p>
          </div>
        </div>

        {/* Section pour afficher les cartes */}
        <h2 className="text-center text-secondary mb-4">Votre Deck :</h2>
        <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {deck.length > 0 ? (
            <Deck toutleschampions={deck} deplacer={() => {}} />
          ) : (
            <p>Aucune carte dans le deck.</p>
          )}
        </div>

        {/* Bouton Retour */}
        <div className="container">
          <div className="text-center mt-4">
            <div className="row">
              <button className="btn btn-primary col-3" onClick={retourAccueil}>
                Accueil
              </button>

              <button className="btn btn-success col-3" onClick={joinQueue}>
                Rejoindre la liste d'attente
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchMaking;