import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import axios from "axios";

const MatchMaking = () => {
    const [players, setPlayers] = useState([]);

    const [userMatchmakingId, setUserMatchmakingId] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    // Function to join matchmaking
    const joinMatchmaking = () => {
        axios.get(`/matchmaking/participate`).then(({ data }) => {
            setUserMatchmakingId(data?.matchmakingId);
            fetchPlayers();
        }).catch(({ message }) => setError(message))
    };


    // Function to fetch players
    const fetchPlayers = () => {
        axios.get(`/matchmaking/getAll`).then(({ data }) => setPlayers(data)).catch(({ message }) => setError(message))
    };

    // Function to send a request to play
    const sendRequest = (matchmakingId) => {
        axios.get(`/request?matchmakingId=${matchmakingId}`).then(({ data }) => alert("Requête envoyée !")).
            catch(({ message }) => setError(message))
    };

    // Add accept request logic upon request received
    const acceptRequest = (matchmakingId) => {
        axios.get(`/acceptRequest?matchmakingId=${matchmakingId}`).then(({ data }) => alert("Match calé !"))
            .then(() => router.push("/game")).catch(({ message }) => setError(message))
    };

    useEffect(() => {
        joinMatchmaking();
        return () => clearInterval(setInterval(fetchPlayers, 5000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2 className="text-center">Match Making</h2>
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
                                player?.matchmakingId !== userMatchmakingId ? (
                                    <tr key={player?.matchmakingId}>
                                        <td>{player?.name}</td>
                                        <td>{player?.email}</td>
                                        <td>
                                            {/* How to know if he sent a request! */}
                                            <button className="btn btn-primary"
                                                onClick={() => sendRequest(player?.matchmakingId)}>
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

export default MatchMaking;
