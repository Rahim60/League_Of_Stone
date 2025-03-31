import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001/matchmaking";

const ListeAttente = () => {
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState("");
    const [userMatchmakingId, setUserMatchmakingId] = useState("");
    const [request, setRequest] = useState([]);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.clear();
        window.location.href = "/signin"; // Redirection
    };

    useEffect(() => {  
        if (typeof window !== "undefined") {
            const storedToken = sessionStorage.getItem("token");
            const storedName = sessionStorage.getItem("name");
            if (storedToken) setToken(storedToken);
            if (storedName) setUsername(storedName);
        }
    }, []);

    // Exécuter ces fonctions UNIQUEMENT quand token est mis à jour
    useEffect(() => {
        if (!token) return;
        console.log("Token mis à jour :", token); // Vérifie si le token est bien récupéré
        
        const inter = setInterval(joinMatchmaking, 5000);
        const interval = setInterval(fetchPlayers, 5000);
        return () => {clearInterval(interval);clearInterval(inter);}
    },[token]); // Ajoute token comme dépendance

    // Function to join matchmaking
    const joinMatchmaking = async () => {
        try {
            const response = await fetch(`${API_URL}/participate`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "www-authenticate": token
                }
            });
            if (!response.ok) throw new Error("Erreur lors de la participation");
            const data = await response.json();
            console.log("Données de matchmaking :", data);
            setUserMatchmakingId(data.matchmakingId);
            setRequest(data.request);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to fetch players
    const fetchPlayers = async () => {
        try {
            const response = await fetch(`${API_URL}/getAll`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "www-authenticate": token
                }
            });
            if (!response.ok) throw new Error("Erreur lors de la récupération des joueurs");
            const data = await response.json();
            console.log("Liste des joueurs :", data); 
            setPlayers(data);
        } catch (err) {
            setError(err.message);
        }
    };
    const sendRequest = async () => {
        try {
            const response = await fetch(`${API_URL}/request?matchmakingId=${userMatchmakingId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "www-authenticate": token
                }
            });
            if (!response.ok) throw new Error("Erreur lors de l'envoi de la demande");
            const data = await response.json();
            console.log("Demande envoyée :", data);
            setRequest(data.request);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
                <h2>League Of Stones</h2>
                {username && (
                    <div className="d-flex align-items-center">
                        <span className="fw-bold mr-3 col-4">{username}</span>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </div>
                )}
            </nav>
            
            <div className="container mt-4">
                <h2 className="text-center">Liste d&apos;Attente</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length > 0 ? (
                            players.map((player) =>
                                player.matchmakingId !== userMatchmakingId ? (
                                    <tr key={player.matchmakingId}>
                                        <td>{player.name}</td>
                                        <td>{player.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => sendRequest(player.matchmakingId)}
                                            >
                                                Inviter à jouer
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            )
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">Aucun joueur en attente...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListeAttente;
