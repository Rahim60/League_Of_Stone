"use client"; // Assure que ce composant est bien en mode client

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Deck from "@/components/Deck";
import Navbar from "@/components/Navbar";

const ConfirmationDeck = () => {
  const [deck, setDeck] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données depuis sessionStorage
    const storedDeck = sessionStorage.getItem("deck");
    const storedToken = sessionStorage.getItem("token");

    if (storedDeck) setDeck(JSON.parse(storedDeck))

    // Si aucune donnée n'est trouvée, rediriger vers la page d'accueil ou de connexion
    if (!storedDeck || !storedToken) router.push("/");
  }, [router]); // Dépendance sur router pour éviter les avertissements

  const retourAccueil = () => {
    sessionStorage.removeItem("deck");
    router.push("/accueil");
  }

  return (
    <>
      <Navbar tite={"Deck Selectionné"} />

      <div className="container py-5">
        <h2 className="text-center">Deck Selectionné</h2>

        <div className="row">
          {deck.length > 0 ? (
            <Deck deck={deck} />
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

            <button className="btn btn-success btn-lg" onClick={() => router.push("/match-making")}>
              Rejoindre la file d&apos;attente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationDeck;