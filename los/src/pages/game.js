import Deck from "@/components/Deck";
import Navbar from "@/components/Navbar";
import Plateau from "@/components/Plateau";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Game = () => {

    const dummy = [{ "_id": "67b4b3c947afde42bc37d428", "id": 24, "key": "Jax", "name": "Jax", "title": "Maître d'armes", "image": { "full": "Jax.png", "sprite": "champion1.png", "group": "champion", "x": 144, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 5, "magic": 7, "difficulty": 5 } }, { "_id": "67b4b3c947afde42bc37d429", "id": 37, "key": "Sona", "name": "Sona", "title": "Virtuose de la harpe", "image": { "full": "Sona.png", "sprite": "champion3.png", "group": "champion", "x": 432, "y": 0, "w": 48, "h": 48 }, "info": { "attack": 5, "defense": 2, "magic": 8, "difficulty": 4 } }, { "_id": "67b4b3c947afde42bc37d42a", "id": 18, "key": "Tristana", "name": "Tristana", "title": "Canonnière yordle", "image": { "full": "Tristana.png", "sprite": "champion3.png", "group": "champion", "x": 432, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 9, "defense": 3, "magic": 5, "difficulty": 4 } }, { "_id": "67b4b3c947afde42bc37d42b", "id": 110, "key": "Varus", "name": "Varus", "title": "Flèche de la vengeance", "image": { "full": "Varus.png", "sprite": "champion3.png", "group": "champion", "x": 288, "y": 96, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 3, "magic": 4, "difficulty": 2 } }]
    const dummy1 = [{ "_id": "67b4b3c947afde42bc37d428", "id": 24, "key": "Jax", "name": "Jax", "title": "Maître d'armes", "image": { "full": "Jax.png", "sprite": "champion1.png", "group": "champion", "x": 144, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 5, "magic": 7, "difficulty": 5 } }]
    const [match, setMatch] = useState([]);
    const [deck, setDeck] = useState([]);
    const [deckOpp, setDeckOpp] = useState([]);

    const [error, setError] = useState("");
    

    
    useEffect(() => setDeck(dummy), []); 

    useEffect(() => {
        const storedDeck = sessionStorage.getItem("deck");
        if (storedDeck) setDeck(storedDeck);
    }, []);

    useEffect(() => getMatch(), [])

    const getMatch = useCallback(() =>
        axios.get('/match/getMatch').then(({ data }) => setMatch(data)).catch(({ message }) => {
            console.log(message);
            setError("Erreur lors de la recuperation du jeu")
        }), []);
    
    const initDeck = () => 
        axios.get(`/match/initDeck?deck=${JSON.stringify(deck.map(({ key }) => { key: key }))}`).catch(err => {
            console.log(message);
            setError("Erreur lors de la recuperation du jeu")
        });
    
    const pioche = () => 
        axios.get(`/match/pickCard`).then(getMatch).catch(({ message }) => {
            setError(message)
            console.log("Erreur : ", err);
        });

    const playCard = (cardKey) =>
        axios.get(`/match/playCard?card=${cardKey}`).then(getMatch).catch(({ message }) => {
            console.log(message);
            setError("Echec, carte n'etait pas posée")
        });
    
    const attackCard = (cardKey, targetCardKey) => 
        axios.get(`/match/attack?card=${cardKey}&ennemyCard=${targetCardKey}`).then(getMatch).catch(({ message }) => {
            console.log(message);
            setError("Echec de l'attaque contre la de carte ton adversaire");
        });

    const attackPlayer = (cardKey) => 
        axios.get(`/match/attackPlayer?card=${cardKey}`).then(getMatch).catch(({ message }) => {
            console.log(message)
            setError("Echec de l'attaque contre ton adversaire");
        });

    const endTurn = () => 
        fetch(`/match/endTurn`).then(getMatch).catch(({ message }) => {
            console.log(message)
            setError("Echec fin de tour")
        });

    return (
        <>
            <Navbar title={"Match"} />

            <div className="container">
                <div className="row align-items-center justify-content-center my-3">
                    {/* Left Side (Deck) */}
                    <h4 className="alert bg-dark text-white text-center" >Michael</h4>
                    <div className="col-md-3 d-flex justify-content-end">
                        <Deck deck={dummy1} handleAjoutADeck={() => { }} type={"game"} />
                    </div>
                    
                    <Plateau />

                    {/* Right Side (Deck) */}
                    <div className="col-md-3 d-flex justify-content-start">
                        <Deck deck={dummy1} handleAjoutADeck={() => { }} type={"game"} />
                    </div>
                    <h4 className="alert bg-dark text-white text-center" >Vous</h4>

                </div>
            </div>
        </>

    )
}

export default Game;