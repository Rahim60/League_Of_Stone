"use client"; // Assure que ce composant est bien en mode client

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Deck from "@/components/Deck";

const MatchMaking = () => {
  const [deck, setDeck] = useState([]);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données depuis sessionStorage
    const storedDeck = sessionStorage.getItem("deck");
    const storedName = sessionStorage.getItem("name");
    const storedToken = sessionStorage.getItem("token");

    if (storedDeck) setDeck(JSON.parse(storedDeck))
    if (storedName) setUsername(storedName);

    // Si aucune donnée n'est trouvée, rediriger vers la page d'accueil ou de connexion
    if (!storedDeck || !storedToken) router.push("/signin");
  }, [router]); // Dépendance sur router pour éviter les avertissements

  const joinQueue = async () => router.push("/liste-attente")
  const battle = async () => router.push("/game/jeu.js");

  const retourAccueil = () => {
    sessionStorage.removeItem("deck");
    router.push("/acceuil");
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    router.push("/signin"); // Redirection avec router
    sessionStorage.clear();
  };

  return (
    <div >
      <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
        <h2 className="lead">League Of Stones</h2>

        <h2 className="text-center">Deck Selectionné</h2>
        {username && (
          <div className="d-flex align-items-center">
            <span className="fw-bold mr-3 col-4">{username} </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        )}
      </nav>
      <div className="container py-5">
        <div className="row">
          {deck.length > 0 ? (
            <Deck toutleschampions={deck} deplacer={() => { }} />
          ) : (
            <p className="text-muted text-center fs-5">Aucune carte dans le deck.</p>
          )}
        </div>

        {/* Buttons Section */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 d-flex justify-content-center gap-3">
            <button className="btn btn-outline-primary btn-lg" onClick={retourAccueil}>
              Accueil
            </button>

            <button className="btn btn-success btn-lg" onClick={joinQueue}>
              Rejoindre la file d&apos;attente
            </button>
            <button className="btn btn-danger btn-lg" onClick={battle}>
              combat
            </button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default MatchMaking;