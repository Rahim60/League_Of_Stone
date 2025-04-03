import { useEffect, useState } from "react";
import Deck from "./Deck";
import DummyDeck from "./DummyCard";
import DummyCard from "./DummyCard";

const Plateau = () => {


    const dummy = [{ "_id": "67b4b3c947afde42bc37d428", "id": 24, "key": "Jax", "name": "Jax", "title": "Maître d'armes", "image": { "full": "Jax.png", "sprite": "champion1.png", "group": "champion", "x": 144, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 5, "magic": 7, "difficulty": 5 } }, { "_id": "67b4b3c947afde42bc37d429", "id": 37, "key": "Sona", "name": "Sona", "title": "Virtuose de la harpe", "image": { "full": "Sona.png", "sprite": "champion3.png", "group": "champion", "x": 432, "y": 0, "w": 48, "h": 48 }, "info": { "attack": 5, "defense": 2, "magic": 8, "difficulty": 4 } }, { "_id": "67b4b3c947afde42bc37d42a", "id": 18, "key": "Tristana", "name": "Tristana", "title": "Canonnière yordle", "image": { "full": "Tristana.png", "sprite": "champion3.png", "group": "champion", "x": 432, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 9, "defense": 3, "magic": 5, "difficulty": 4 } }, { "_id": "67b4b3c947afde42bc37d42b", "id": 110, "key": "Varus", "name": "Varus", "title": "Flèche de la vengeance", "image": { "full": "Varus.png", "sprite": "champion3.png", "group": "champion", "x": 288, "y": 96, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 3, "magic": 4, "difficulty": 2 } }]
    const dummy2 = [{ "_id": "67b4b3c947afde42bc37d428", "id": 24, "key": "Jax", "name": "Jax", "title": "Maître d'armes", "image": { "full": "Jax.png", "sprite": "champion1.png", "group": "champion", "x": 144, "y": 48, "w": 48, "h": 48 }, "info": { "attack": 7, "defense": 5, "magic": 7, "difficulty": 5 } }, { "_id": "67b4b3c947afde42bc37d429", "id": 37, "key": "Sona", "name": "Sona", "title": "Virtuose de la harpe", "image": { "full": "Sona.png", "sprite": "champion3.png", "group": "champion", "x": 432, "y": 0, "w": 48, "h": 48 }, "info": { "attack": 5, "defense": 2, "magic": 8, "difficulty": 4 } }]

    const [mainAdv, setMainAdv] = useState([]);
    const [carteJouee, setCarteJouee] = useState([]);

    return (
        <>

            {/* Game Board + Player Deck */}
            <div className="col-md-6">
                {/* Opponent's Deck */}
                <div className="d-flex align-items-center flex-column mb-3">
                    <h6 className="lead text-center">Main Adversaire</h6>
                    <DummyDeck deck={dummy} />
                </div>


                {/* Plateau (Game Board) */}
                <div className="bg-light-subtle border border-secondary rounded shadow text-center">
                    <div className="container d-flex justify-content-center">
                        <DummyDeck deck={dummy} />
                    </div>
                    {/* seperator*/}
                    <hr className="my-4 border-secondary" />

                    <Deck deck={dummy2} handleAjoutADeck={() => {}} type={"game"} />
                </div>

                {/* Player's Deck */}
                <div className="d-flex flex-column justify-content-center mt-3">
                    <Deck deck={dummy} handleAjoutADeck={() => {}} type={"game"} />
                    <h6 className="lead text-center">Votre Main</h6>
                </div>
            </div>
        </>
    );
};

export default Plateau;