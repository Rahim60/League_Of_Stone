import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importation du router
import Head from "next/head";
import "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Champion from "@/components/Champions";
import Deck from "@/components/Deck";

export default function Acceuil() {
  const router = useRouter(); // Initialisation du router
  const [champions, setChampions] = useState([]);
  const [decks, setDecks] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Vérifier et récupérer le token + username
    const token = sessionStorage.getItem("token");
    const storedName = sessionStorage.getItem("name");

    if (token && storedName) {
      setUsername(storedName);
    } else {
      console.warn("Aucun token trouvé, redirection vers la connexion...");
      router.push("/signin"); // Redirige vers la page de connexion
    }

    // Charger les champions depuis l'API
    fetch("http://localhost:3001/cards")
      .then((reponse) => {
        if (!reponse.ok) {
          console.error("Chargement non effectué " + reponse.status);
        }
        return reponse.json();
      })
      .then((json) => setChampions(json))
      .catch((error) => {
        console.error("Erreur lors de la récupération des cartes", error);
      });
  }, []);

  const deplacer = (x) => {
    if (decks.length < 20) {
      setChampions((champions) => champions.filter((cha) => cha.id !== x.id));
      setDecks((c) => [...c, x]);
    }
  };

  const supprimer = (x) => {
    setDecks((decks) => decks.filter((cha) => cha.id !== x.id));
    setChampions((c) => [...c, x]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    router.push("/signin"); // Redirection avec router
    sessionStorage.clear();
  };

  const handleSubmitDeck = () => {
    sessionStorage.setItem("deck", JSON.stringify(decks)); // Stocker le deck
    router.push("/matchMaking"); // Redirection avec router
  };

  return (
    <div className="image">
        <Head>
        <title>League Of Stones</title>
        <meta name="description" content="Jeu de cartes en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Barre de navigation */}
      <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
        <h1>League Of Stones</h1>
        {username && (
          <div className="d-flex align-items-center">
            <span className="fw-bold mr-3 col-4">{username} </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        )}
      </nav>

      <main className="main1" style={{ display: "flex", backgroundImage: `url("/pho2.jpg")` }}>
        <section style={{ flex: 1, padding: "20px", borderRight: "2px solid black" }}>
          <h2 style={{ color: "orange", textAlign: "center" }}>Les champions disponibles</h2>
          <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Champion toutleschampions={champions} deplacer={deplacer} />
          </div>
        </section>

        <section style={{ flex: 1, padding: "20px" }}>
          <h2 style={{ textAlign: "center", color: "gray" }}>Mon deck</h2>
          <Deck toutleschampions={decks} deplacer={supprimer} />

          {/* Affichage du bouton "Valider le deck" */}
          {decks.length >= 20 && (
            <div className="text-center mt-3">
              <button className="btn btn-success" onClick={handleSubmitDeck}>
                Valider le deck
              </button>
            </div>
          )}

          {/* Nombre de cartes dans le deck */}
          <div className="text-center mt-3">
            <p>Cartes dans le deck : {decks.length}/20</p>
          </div>
        </section>
      </main>
    </div>
  );
}
