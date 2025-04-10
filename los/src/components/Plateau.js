import { useEffect, useState } from "react";
import UnknownDeck from "./UnknownDeck";
import Image from "next/image";
import lifeBar from "../public/health-bar.png";
import DeckGame from "./DeckGame";

const Plateau = ({ joueur, adversaire, playCard, attackCard, attackPlayer, endTurn }) => {

    const [selCard, setSelCard] = useState(null);
    const [enemyCard, setEnemyCard] = useState(null);

    const handleAttackCard = async () => {
        if (selCard && enemyCard) {
            attackCard(selCard, enemyCard);

            setEnemyCard(null);
            setSelCard(null);
        }
    }

    useEffect(() => {
        handleAttackCard()
    }, [selCard, enemyCard])

    return (
        <>
            {/* Plateau + Deck Joueur */}
            <div className="col-md-6">
                {/* Main de l'opposant */}
                {adversaire?.name && (
                    <div className="d-flex flex-row justify-content-around align-items-start">
                        <div className="d-flex align-items-center flex-column mb-3">
                            <h6 className="lead text-center">Main de {adversaire?.name || "l'adversaire"}</h6>
                            <UnknownDeck />
                        </div>

                        {adversaire?.hp && (
                            <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                                <h6 className="lead text-center">Points de Vie</h6>
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <Image src={lifeBar} width={40} height={40} alt="life bar" />
                                    <p className="lead text-center ms-2 mb-0">{adversaire.hp} points</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Plateau (Game Board) */}
                <div className="bg-light-subtle border border-secondary rounded px-3 text-center">
                    <div className="container d-flex justify-content-center">
                        {/* Cartees de l'adversaire dur le plateau */}
                        {adversaire?.board?.length > 0 && (
                            <DeckGame deck={adversaire.board}
                                handleAttackAux={(card) => {
                                    console.log(card)
                                    setEnemyCard(card.key)
                                }}
                            />
                        )}
                    </div>
                    {/* Separator */}
                    <hr className="my-4 border-secondary" />
                    {/* Render Player's Board if available */}
                    {joueur?.board?.length > 0 && (
                        <DeckGame deck={joueur.board}
                            handleAttackAux={(card) => {
                                console.log()
                                setSelCard(card?.key)
                            }}
                        />
                    )}
                </div>

                {/* Main Joueur */}
                {joueur?.hand?.length > 0 && (
                    <div className="d-flex flex-column justify-content-center mt-3">
                        <DeckGame deck={joueur.hand}
                            playCard={(card) => {
                                console.log(card)
                                playCard(card?.key)
                            }} />
                        <div className="d-flex flex-row justify-content-around">
                            {/* Points de Vie Joueur */}
                            {joueur?.hp && (
                                <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                                    <h6 className="lead text-center">Points de Vie</h6>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                        <Image src={lifeBar} width={40} height={40} alt="life bar" />
                                        <p className="lead text-center ms-2 mb-0">{joueur.hp} points</p>
                                    </div>
                                </div>
                            )}

                            {/* Passer le tour a l'adversaire */}
                            <div className="col-md-3 d-flex flex-row align-items-center justify-content-center">
                                <button
                                    className="btn btn-outline-dark me-2"
                                    onClick={() => selCard && attackPlayer(selCard)}
                                    disabled={adversaire?.hand?.length <= 0} 
                                >
                                    Attacquer {adversaire?.name}
                                </button>

                                {adversaire && (
                                    <button
                                        className="btn btn-outline-info"
                                        onClick={() => endTurn()} 
                                        disabled={joueur?.turn == false} 
                                    >
                                        Fin Tour
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default Plateau;
