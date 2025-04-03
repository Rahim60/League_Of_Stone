import { useCallback, useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import axios from "axios";

const MatchMaking = () => {
    const [players, setPlayers] = useState([]); // macthmakingId, request, match

    const [matchInfo, setMatchInfo] = useState({
        matchmakingId: "",
        request: [],
    });

    const [success, setSucess] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const intervalRef = useRef(null);

    // Function to join matchmaking
    const joinMatchmaking = useCallback(() => {
        axios.get(`/matchmaking/participate`).then(({ data }) => {
            console.log(data)
            setMatchInfo(prevData => ({
                ...prevData,
                matchmakingId: data?.matchmakingId,
                request: data?.request,
            }))
            fetchPlayers();
        }).catch(({ message }) => setError(message))

        axios.get('/match/getMatch').then(({ data }) => (data?.player1 && data?.player2) && router.push("/game"))
            .catch(({ message }) => setError(message))

        // matchInfo?.match && router.push("/game");
    }, []);

    // Function to fetch players dans la liste d'attente
    const fetchPlayers = useCallback(() =>
        axios.get(`/matchmaking/getAll`).then(({ data }) => setPlayers((prevData) =>
            data.map(player => {
                const existingPlayer = prevData.find(prevPlayer => prevPlayer?.matchmakingId === player?.matchmakingId);
                return {
                    ...player,
                    isSent: existingPlayer ? existingPlayer.isSent : false // Preserve or reset
                };
            })
        )).catch(({ message }) => setError(message))
    , []);

    // Function to send a request to play contre un joueur precis
    const sendRequest = (matchmakingId) => {
        axios.get(`/matchmaking/request?matchmakingId=${matchmakingId}`).then(() => setSucess("Requête envoyée !")).
            catch(({ message }) => setError(message))
        
        !error && setPlayers(prevState => prevState.map(player => player?.matchmakingId == matchmakingId ? { ...player, isSent: true } : player))
    }

    // Add accept request logic upon request received
    const acceptRequest = (matchmakingId) => {
        axios.get(`/matchmaking/acceptRequest?matchmakingId=${matchmakingId}`).then(({ data }) => {
            setSucess("Match calé !")
            sessionStorage.setItem("activeMatch", JSON.stringify(data))
        }).catch(({ message }) => {
            console.log(message)
            setError("Erreur lors de la acceptation de l'invitation. Relance ")
        })
        
        if (!error) router.push("/game")
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            joinMatchmaking();
            fetchPlayers();
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [joinMatchmaking]);


    useEffect(() => {
        const storedPlayers = JSON.parse(sessionStorage.getItem("players"));
        if (storedPlayers) setPlayers(storedPlayers);
    }, []);

    // Save to storage whenever players update
    useEffect(() => sessionStorage.setItem("players", JSON.stringify(players)), [players]);

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2 className="text-center">Match Making</h2>

                {success && <p className="alert alert-success">{success}</p>}
                {error && <p className="alert alert-danger">{error}</p>}

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {/* ✅ Affichage Players dans la Liste */}
                        {players.length > 0 ? (
                            players.map((player) =>
                                player?.matchmakingId !== matchInfo?.matchmakingId ? (
                                    <tr key={player?.matchmakingId}>
                                        <td>{player?.name}</td>
                                        <td>{player?.email}</td>
                                        <td>
                                            {/* How to know if he sent a request! */}
                                            {player?.isSent === false ?
                                                <button className="btn btn-primary"
                                                    onClick={() => sendRequest(player?.matchmakingId)}>
                                                    Inviter à jouer
                                                </button> :
                                                <button className="btn btn-tertiary" disabled>
                                                    Requête Envoyée
                                                </button>
                                            }

                                        </td>
                                    </tr>
                                ) : null
                            )
       
                        ) :
                            (
                            <tr>
                                <td colSpan="3" className="text-center">Aucun joueur en attente...</td>
                            </tr>
                        )}
                        
                        {/* ✅ Affichage Request Reçues */}
                        {matchInfo?.request.map(({ player }) => (
                            <tr key={player?.matchmakingId}>
                                <td>{player?.name}</td>
                                <td></td>
                                <td>
                                    {/* How to know if he sent a request! */}
                                    <button className="btn btn-success"
                                        onClick={() => acceptRequest(player?.matchmakingId)}>
                                        Accepter invitiation
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>

    );
};

export default MatchMaking;
