"use client"; // Assure que ce composant est bien en mode client

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Carte from "./components/cards"; // Assurez-vous que le chemin est correct
import "bootstrap/dist/css/bootstrap.min.css";

export default function Confirmation() {
  const [deck, setDeck] = useState([]);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données depuis sessionStorage
    const storedDeck = sessionStorage.getItem("deck");
    const storedName = sessionStorage.getItem("name");
    const storedToken = sessionStorage.getItem("token");

    if (storedDeck) {
      setDeck(JSON.parse(storedDeck)); // Parse le deck en objet JavaScript
    }
    if (storedName) {
      setUsername(storedName);
    }
    if (storedToken) {
      setToken(storedToken);
    }

    // Si aucune donnée n'est trouvée, rediriger vers la page d'accueil ou de connexion
    if (!storedDeck || !storedToken) {
      router.push("/connexion");
    }
  }, [router]);

  const retouracceuil = ()=>{
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
          deck.map((card) => (
            <Carte key={card.id} info={card} deplacer={() => {}} /> // Enlever la fonction `deplacer` si non nécessaire
          ))
        ) : (
          <p>Aucune carte dans le deck.</p>
        )}
      </div>

      {/* Bouton Retour */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={retouracceuil}>
          Retour à l'accueil
        </button>
      </div>
    </div>
    </div>
  );
}
