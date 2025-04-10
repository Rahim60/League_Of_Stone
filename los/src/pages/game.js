import Navbar from "@/components/Navbar";
import Plateau from "@/components/Plateau";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import UnknownDeck from "@/components/UnknownDeck";

const Game = () => {
    const [match, setMatch] = useState({
        status: "",
        joueur: {},
        adversaire: {}
    });
    const [error, setError] = useState("");

    // --- Moved up so it's defined before useEffect uses it ---
    const getMatch = useCallback(async () => {
        try {
            const username = sessionStorage.getItem("name");
            if (!username) throw new Error("Nom d'utilisateur manquant");

            const { data } = await axios.get('/match/getMatch');

            setMatch({
                status: data?.status,
                joueur: data?.player1?.name === username ? data?.player1 : data?.player2,
                adversaire: data?.player1?.name === username ? data?.player2 : data?.player1,
            });

        } catch (error) {
            console.error("Erreur lors de la récupération du match:", error.message);
            setError("Erreur lors de la récupération du jeu");
        }
    }, [setMatch, setError]);


    // Setup interval to fetch match data
    useEffect(() => {
        const interval = setInterval(() => {
            getMatch();
        }, 2000);

        return () => clearInterval(interval);
    }, [getMatch]);

    // Initial setup: get deck + opponent name
    useEffect(() => {
        const storedDeck = sessionStorage.getItem("deck");

        if (storedDeck) {
            try {
                const parsedDeck = JSON.parse(storedDeck);
                if (parsedDeck) {
                    if (match?.status == "Deck is pending") 
                        initDeck(parsedDeck);
                }
            } catch (e) {
                console.log("Erreur parsing deck", e);
            }
        }

        getMatch().then(() => {
            if (
                match?.adversaire?.hp <= 0
                || match?.joueur?.hp <= 0
                || match?.joueur.turn == false && match?.adversaire.turn == false
            )
                endMatch();
        }
)
    }, [match?.status]);

    const initDeck = async (deck) => {
        try {
            const formattedDeck = deck.map(({ key }) => ({ key }));
            await axios.get(`/match/initDeck?deck=${JSON.stringify(formattedDeck)}`);
        } catch (error) {
            console.log(error.message);
            setError("Erreur lors de l'initialisation du deck");
        }
    };

    const piocheCarte = async () => {
        try {
            await axios.get(`/match/pickCard`);
            await getMatch();
        } catch (error) {
            console.log(error.message);
            setError("Erreur: impossible de piocher une carte");
        }
    };

    const playCard = async (cardKey) => {
        try {
            await axios.get(`/match/playCard?card=${cardKey}`);
            await getMatch();
        } catch (error) {
            console.log(error.message);
            setError("Erreur: la carte n'a pas été jouée");
        }
    };

    const attackCard = async (cardKey, targetCardKey) => {
        try {
            await axios.get(`/match/attack?card=${cardKey}&ennemyCard=${targetCardKey}`);
            await getMatch();
        } catch (error) {
            console.log(error.message);
            setError("Erreur lors de l'attaque de la carte adverse");
        }
    };

    const attackPlayer = async (cardKey) => {
        try {
            await axios.get(`/match/attackPlayer?card=${cardKey}`);
            await getMatch();
        } catch (error) {
            console.log(error.message);
            setError("Erreur lors de l'attaque du joueur adverse");
        }
    };

    const endTurn = async () => {
        try {
            await axios.get(`/match/endTurn`);
            await getMatch();
        } catch (error) {
            console.log(error.message);
            setError("Erreur: impossible de terminer le tour");
        }
    };

    const endMatch = async () => {
        try {
            if (joueur?.hp <= 0 && adversaire?.hp) {
                await axios.get(`/match/finishMatch`);
            }
        } catch (error) {
            setError(error || error?.message);
        }
    }

    // Log the state variables whenever they change
    useEffect(() => {
        console.log("Match State:", match);
        console.log("Error State:", error);
    }, [match, error]);

    return (
        <>
            <Navbar title="Match" />

            <div className="container">
                {error && <p className="alert alert-danger mt-3">{error}</p>}

                {(
                    match?.adversaire?.hp <= 0
                    || match?.joueur?.hp <= 0
                    || match?.joueur.turn == false && match?.adversaire.turn == false
                )
                    && <p className="alert alert-success mt-3">{match?.status}</p>
                }

                <div className="row align-items-center justify-content-center my-3">

                    {/* Only show opponent deck if adversaire is defined */}
                    {match?.adversaire && (
                        <>
                            {/* Only show opponent name when it's available */}
                            <h4 className="alert bg-dark text-white text-center">{match?.adversaire?.name}</h4>

                            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                                <h6 className="lead text-center">Deck de {match?.adversaire?.name}</h6>
                                <UnknownDeck />
                                {match.adversaire?.deck && <p className="lead text-center">Cartes Restant : {match.adversaire?.deck}/20</p>}

                            </div>
                        </>
                    )}

                    {/* Only pass match data if it's available */}
                    {match && match.joueur && match.adversaire && (
                        <Plateau
                            joueur={match.joueur}
                            adversaire={match.adversaire}
                            status={match.status}
                            playCard={playCard}
                            attackCard={attackCard}
                            attackPlayer={attackPlayer}
                            endTurn={endTurn}
                        />
                    )}

                    {/* Only show the player deck */}
                    {match.joueur?.deck && (
                        <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                            {match.joueur?.deck && <p className="lead text-center">Cartes Restant : {match.joueur?.deck}/20</p>}
                            <UnknownDeck />
                            <h6 className="lead text-center">Votre Deck</h6>
                            {match.joueur?.cardPicked === false && (
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={piocheCarte}
                                    disabled={match?.joueur?.cardPicked} // Disable if card is already picked
                                >
                                    Piocher une carte
                                </button>
                            )}
                        </div>
                    )}

                    {/* Only show "You" section when match data is available */}
                    {match && match.joueur && (
                        <h4 className="alert bg-dark text-white text-center mt-4">Vous</h4>
                    )}
                </div>
            </div>
        </>

    );
};

export default Game;
