import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importation du router

import Head from "next/head";
import Champion from "@/components/Champions";
import Deck from "@/components/Deck";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function Accueil() {
  const [champions, setChampion] = useState([]);
  const [deck, setDeck] = useState([]);

  // const [data, err, handleFetch] = useFetch();
  const router = useRouter(); // Initialisation du router


  useEffect(() => {
    // Vérifier et récupérer le token + username
    if (!sessionStorage.getItem("token") && !sessionStorage.getItem("name")) {
      console.warn("Aucun token trouvé, redirection vers la connexion...");
      router.push("/");
    }
    // Charger les champions depuis l'API
    axios.get(`/cards`).then(({ data }) => setChampion(data)).catch(err => console.log(err))
  }, [router]);

  const deplacer = (newChamp) => {
    if (deck.length < 20) {
      setChampion((prevChampions) => prevChampions.filter((champ) => champ.id !== newChamp.id));
      setDeck((prevDeck) => [...prevDeck, newChamp]);
    }
  };

  const supprimer = (delChamp) => {
    setDeck((prevDeck) => prevDeck.filter((champ) => champ.id !== delChamp.id));
    setChampion((prevChampions) => [...prevChampions, delChamp]);
  };

  const handleSubmitDeck = () => {
    sessionStorage.setItem("deck", JSON.stringify(deck)); // Stocker le deck
    router.push("/conf-deck"); // Redirection avec router
  };

  return (
    <>
      <Head>
        <title>League Of Stones</title>
        <meta name="description" content="Jeu de cartes en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Barre de navigation */}
      <Navbar title={""} />

      <main style={{ display: "flex" }}>        {/* <--- A verifier */}
        <section style={{ flex: 1, padding: "20px", borderRight: "2px solid black" }}>
          <h2 style={{ color: "orange", textAlign: "center" }}>Les champions disponibles</h2>
          <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Champion champions={champions} handleAjoutAChampions={deplacer} />
          </div>
        </section>

        <section style={{ flex: "1", padding: "20px" }}>
          <h2 className="text-center">Mon deck</h2>


          {/* Nombre de cartes dans le deck */}
          <div className="text-center mt-3">
            <p>Cartes dans le deck : {deck.length}/20</p>
          </div>

          <Deck deck={deck} handleAjoutADeck={supprimer} />

          {/* Affichage du bouton "Valider le deck" */}
          {deck.length >= 20 && (
            <div className="text-center mt-3">
              <button className="btn btn-success" onClick={handleSubmitDeck}>
                Valider Selection
              </button>
            </div>
          )}

        </section>
      </main>
    </>
  );
}
