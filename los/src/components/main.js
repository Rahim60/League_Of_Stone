import Image from "next/image";
import { useState } from "react";

export default function Main({cards, placer }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleConfirmer = () => {
    if(selectedCard) {
      placer(selectedCard.key);
      setSelectedCard(null);
    }
  };

  const handleAnnuler = () => {
    setSelectedCard(null);
  };

  return (
    <div className="hand-container" style={{ 
      position: 'relative',
      height: '200px',
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end'
    }}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={{
            position: 'relative',
            transform: `rotate(${(index - cards.length/2) * 4}deg) 
                         translateY(${Math.abs(index - cards.length/2) * 8}px)`,
            transition: 'transform 0.3s',
            zIndex: selectedCard?.id === card.id ? 100 : index,
            marginLeft: '-40px',
            cursor: 'pointer'
          }}
          className="card-in-hand"
          onClick={() => setSelectedCard(card)}
        >
          <div className="card m-2 shadow" style={{ 
            width: "12rem",
            transformOrigin: 'bottom center',
            transition: 'transform 0.3s',
            border: selectedCard?.id === card.id ? '2px solid #0d6efd' : 'none'
          }}>
            <Image
              className="card-img-top"
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${card.key}_0.jpg`}
              alt={card.name}
              style={{ 
                width: "100%", 
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px" 
              }}
            />
            <div className="card-body p-2">
              <h6 className="card-title mb-1">{card.name}</h6>
              <div className="d-flex justify-content-between small">
                <span>⚔️{card.info.attack}</span>
                <span>🛡️{card.info.defense}</span>
              </div>

              {selectedCard?.id === card.id && (
                <div className="card-actions mt-2 d-flex justify-content-between">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmer();
                    }}
                    style={{ width: '48%' }}
                  >
                    Confirmer
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnnuler();
                    }}
                    style={{ width: '48%' }}
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}