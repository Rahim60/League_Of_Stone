import { useEffect, useState } from "react";
//import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Champions from "../../components/Champions";


export default function GameBoard() {

  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [board, setBoard] = useState(Array(10).fill(null));
  const [attackingCard, setAttackingCard] = useState(null);

  useEffect(() => {
    const storedDeck = sessionStorage.getItem("deck");
    if (storedDeck) {
      setDeck(JSON.parse(storedDeck));
      setHand(JSON.parse(storedDeck).slice(0, 4));
    }
  },[]);

  const moveCard = (champion, index) => {
    if (!board[index]) {
      const newBoard = [...board];
      newBoard[index] = champion;
      setBoard(newBoard);
      setHand(hand.filter((c) => c.id !== champion.id));
    }
  };

  const attackCard = (attackerIndex, defenderIndex) => {
    if (board[attackerIndex] && board[defenderIndex]) {
      setAttackingCard({ from: attackerIndex, to: defenderIndex });
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[defenderIndex] = null; // Simulating a simple defeat
        setBoard(newBoard);
        setAttackingCard(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-green-700 min-h-screen">
      <h1 className="text-white text-2xl mb-4">League of Legends Card Game</h1>
      
      {/* Board Spaces */}
      <div className="grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg">
        {board.slice(0, 5).map((slot, index) => (
          <div key={index} className="relative w-32 h-48 border-2 border-yellow-400 flex items-center justify-center" onClick={() => attackCard(index, index + 5)}>
            {slot && (
              <motion.img 
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${slot.key}_0.jpg`} 
                alt={slot.name} 
                className="w-full h-full object-cover rounded-lg"
                animate={attackingCard?.from === index ? { y: [0, 20, -10, 0] } : {}} 
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="my-4"></div>

      <div className="grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg">
        {board.slice(5, 10).map((slot, index) => (
          <div key={index + 5} className="relative w-32 h-48 border-2 border-blue-400 flex items-center justify-center" onClick={() => attackCard(index + 5, index)}>
            {slot && (
              <motion.img 
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${slot.key}_0.jpg`} 
                alt={slot.name} 
                className="w-full h-full object-cover rounded-lg"
                animate={attackingCard?.to === index + 5 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Hand */}
      <h2 className="text-white text-xl mt-6">Your Hand</h2>
      <div className="flex space-x-4 p-4 bg-gray-900 rounded-lg">
        <Champions toutleschampions={hand} deplacer={(champ) => moveCard(champ, board.indexOf(null))} />
      </div>
    </div>
  );
}
