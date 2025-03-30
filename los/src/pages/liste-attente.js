import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001/matchmaking";

const ListeAttente = () => {
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState("");

    const [userMatchmakingId, setUserMatchmakingId] = useState(null);
    const [error, setError] = useState("");

    
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName) setUsername(storedName);
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        router.push("/signin"); // Redirection avec router
        sessionStorage.clear();
    };

    // Function to join matchmaking
    const joinMatchmaking = async () => {
        try {
            const response = await fetch(`${API_URL}/participate`, { method: "GET", authorization: `Bearer ${sessionStorage.getItem("token")}` });
            if (!response.ok) throw new Error("Erreur lors de la participation");
            const data = await response.json();
            setUserMatchmakingId(data.matchmakingId);
            fetchPlayers(); 
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to fetch players
    const fetchPlayers = async () => {
        try {
            const response = await fetch(`${API_URL}/getAll`, { method: "GET", authorization: `Bearer ${sessionStorage.getItem("token")}` });
            if (!response.ok) throw new Error("Erreur lors de la récupération des joueurs");
            const data = await response.json();
            setPlayers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to send a request to play
    const sendRequest = async (matchmakingId) => {
        try {
            const response = await fetch(`${API_URL}/request?matchmakingId=${matchmakingId}`, {
                method: "GET",
            });
            if (!response.ok) throw new Error("Erreur lors de l'envoi de la requête");
            alert("Requête envoyée !");
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        joinMatchmaking(); 
        const interval = setInterval(fetchPlayers, 5000);
        return () => clearInterval(interval); 
    }, []);

    return (
        <>
            <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
                <h2>League Of Stones</h2>

                {username && (
                <div className="d-flex align-items-center">
                    <span className="fw-bold mr-3 col-4">{username} </span>
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
