// Participate.js
import { useEffect, useState } from "react";
// import MatchMakingAccept from "./MatchMakingAccept";

export default function Participate({ matchmakingId, isParticipating, updateParticipationStatus }) {
    const [requests, setRequests] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        let intervalId = null;
        
        if (isParticipating && matchmakingId) {
            intervalId = setInterval(() => {
                fetchMatchmakingStatus();
            }, 5000);
        }
        
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isParticipating, matchmakingId]);

    const checkAuth = () => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(!!token);
    };

    const fetchMatchmakingStatus = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3001/matchmaking/participate", {
                method: "GET",
                headers: {
                    "www-authenticate": `${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur d'authentification ou autre erreur serveur");
                    }
                    return response.json();
                })
                .then(data => {
                    setRequests(data.request || []);
                })
                .catch(err => console.log("Erreur lors de la récupération des demandes", err));
        }
    };

    const rejoindreMatchmaking = () => {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3001/matchmaking/participate", {
                method: "GET",
                headers: {
                    "www-authenticate": `${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur d'authentification ou autre erreur serveur");
                    }
                    return response.json();
                })
                .then(data => {
                    updateParticipationStatus(data.matchmakingId, true);
                    setRequests(data.request || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("Erreur lors de la participation au matchmaking", err);
                    updateParticipationStatus(null, false);
                    setLoading(false);
                });
        } else {
            console.log("Utilisateur non authentifié");
            setLoading(false);
        }
    };

    const quitterMatchmaking = () => {
        updateParticipationStatus(null, false);
        setRequests([]);
    };

    return (
        <div className="container mt-4">
            {!isParticipating ? (
                <button 
                    onClick={rejoindreMatchmaking} 
                    className="btn btn-primary"
                    disabled={!isAuthenticated || loading}
                >
                    {loading ? "Chargement..." : isAuthenticated ? "Rejoindre le matchmaking" : "Veuillez vous connecter d'abord"}
                </button>
            ) : (
                <button onClick={quitterMatchmaking} className="btn btn-danger">
                    Quitter le matchmaking
                </button>
            )}

            {isParticipating && matchmakingId && (
                <div className="mt-3 p-3 border rounded bg-light">
                    <h4>Votre ID de matchmaking: {matchmakingId}</h4>
                    <h5>Demandes reçues :</h5>
                    {requests.length > 0 ? (
                        <ul className="list-group">
                            {requests.map((req, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{req.name}</strong> veut jouer avec vous!<br />
                                        <small>ID Utilisateur: {req.userId} | ID Matchmaking: {req.matchmakingId}</small>
                                    </div>
                                    <div>
                                       {/* <MatchMakingAccept matchmakingId={req.matchmakingId}/> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">Aucune demande pour le moment. En attente de joueurs...</p>
                    )}
                </div>
            )}
        </div>
    );
}