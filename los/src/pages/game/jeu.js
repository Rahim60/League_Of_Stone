import { useEffect } from "react";
import Plateau from "@/components/Plateau";

const API = "http://localhost:3001/match";

export default function Jeu(){
    const [token, setToken] = useState("");
    const [deck, setDeck] = useState([]);
    const [hp, setHp] = useState(null);
    const [hand, setHand] = useState([]);
    const [board, setBoard] = useState([]);
    const [board2, setBoard2] = useState([]);
    const [cardPicked, setCardPicked] = useState(false);
    const [turn, setTurn] = useState(false);

    useEffect(() => {
        const storedDeck = sessionStorage.getItem("deck");
        const storedToken = sessionStorage.getItem("token");
        if (!storedDeck || !storedToken) router.push("/signin");
        if (storedDeck){ 
            setToken(storedToken);
            initDeck(storedToken);
            
        }
    },[]);
    const getInfo = () =>{
        fetch(`${API}/getMatch`,{
            headers:{
                "Content-Type":"application/json",
                "www-autenticate":token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de la récupération des infos");
            return response.json();
        })
        .then(rep =>{
            console.log("Infos du match : ",rep);
            setHp(rep.player1.hp);
            setHand(rep.player1.hand);// cartes dans sa main
            setBoard(rep.player1.board);// cartes dejà jouées sur le plateau
            setCardPicked(rep.player1.cardPicked);// Booléen pour savoir si une carte a été piochée ou pas
            setTurn(rep.player1.turn);// Booléen pour savoir si c'est son tour ou pas
            setBoard2(rep.player2.board);// cartes dejà jouées sur le plateau adversaire
        })
        .catch(err => console.error("Erreur : ",err))
    };
    const initDeck = (toke) =>{
        fetch(`${API}/initDeck?deck=${storedDeck}`, {
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": toke
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de l'initialisation du deck");
            return response.json();
        })
        .then(rep => {
            console.log("Deck initialisé : ",rep);
            getInfo();
        })
        .catch(err =>{
            console.error("Erreur : ",err);
        })
    };
    const pioche = ()=>{
        fetch(`${API}/pickCard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de la pioche");
            return response.json();
        })
        .then(rep =>{
            console.log("Pioche : ",rep);
            getInfo();
        })
        .catch(err =>{
            console.error("Erreur : ",err);
        })
    };
    const playCard = (cardKey) =>{
        fetch(`${API}/playCard?card=${cardKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de la pose de la carte");
            return response.json();
        })
        .then(rep =>{
            console.log("Carte posée");
            setBoard(rep.board);
            setHand(rep.hand);
        })
        .catch(err =>console.error("Erreur : ",err))
    };
    const attackCard = (cardKey, targetCardKey) =>{
        fetch(`${API}/attack?card=${cardKey}&ennemyCard=${targetCardKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de l'attaque");
            return response.json();
        })
        .then(rep =>console.log("Attaque réalisée : ",rep))
        .catch(err =>console.error("Erreur : ",err));
    }

    const attackPlayer = (cardKey) =>{
        fetch(`${API}/attackPlayer?card=${cardKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de l'attaque du joueur");
            return response.json();
        })
        .then(rep =>console.log("Attaque du joueur réalisée: ",rep))
        .catch(err =>console.error("Erreur : ",err));
    }
    const endTurn = () =>{
        fetch(`${API}/endTurn`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "www-authenticate": token
            }
        })
        .then(response =>{
            if (!response.ok) throw new Error ("Erreur lors de la fin de tour");
            return response.json();
        })
        .then(rep =>{
            console.log("Fin de tour : ",rep)
            getInfo();
        })
        .catch(err =>console.error("Erreur : ",err));
    }
    return(
        <>
            <Plateau 
                main={hand}
                deplacerCarte={playCard}
                cartesAdversaire1={board}
                cartesAdversaire2={board2}
            />
        </>
    )
}