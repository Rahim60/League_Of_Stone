import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const MatchMaking = () => {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [request, setRequest] = useState([]);
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const navigate = useRouter();

    const fetchPlayers = async () => {
        try {
            const res = await axios.get("/matchmaking/getAll");
            const players = res.data;
            const filtered = players.filter((player) => player._id !== userId);
            setAvailablePlayers(filtered);
        } catch (error) {
            console.log("Erreur lors de la récupération des joueurs :", error);
        }
    };

    // Function to join matchmaking and check for match
    const joinMatchmaking = useCallback(async () => {
        try {
            const { data } = await axios.get("/matchmaking/participate");
            const players = data?.request;
            setRequest(players);

            await fetchPlayers();

            const participateData = await axios.get("/matchmaking/participate");

            const username = localStorage.getItem("name");

            if (participateData.data?.match) {
                console.log("particiapte")
                initDeck();
                navigate.push("/game"); // Redirect to game
            }

        } catch (err) {
            setError(err.message);
        }
    }, [navigate]);

    useEffect(() => {

        joinMatchmaking(); // Your original matchmaking call

        const intervalId = setInterval(joinMatchmaking, 3000); // Every 3s

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [joinMatchmaking, navigate]);


    const initDeck = async () => {
        try {
            // Make the API call to initialize the deck
            await axios.get(`/match/initDeck?deck=${JSON.stringify(deck.map(({ key }) => ({ key })))}`);
        } catch (err) {
            // Handle errors here
            console.log(err.message || err);
            setError("Erreur lors de la récupération du jeu");
        }
    };


    // Function to send request and check for match
    const sendRequest = async (matchmakingId, playerName) => {
        try {
            const { data } = await axios.get(`/matchmaking/request`, {
                params: { matchmakingId },
            });

            setAvailablePlayers((prev) =>
                prev.map((player) =>
                    player.matchmakingId === matchmakingId
                        ? { ...player, isSent: true }
                        : player
                )
            );

        } catch (error) {
            console.log("Erreur lors de l'envoi de la requête :", error);
        }
    };

    // Function to accept request and check for match
    const acceptRequest = async (matchmakingId, playerName) => {
        try {
            const { data } = await axios.get(`/matchmaking/acceptRequest`, {
                params: { matchmakingId },
            });

            setAvailablePlayers((prev) =>
                prev.filter((player) => player.matchmakingId !== matchmakingId)
            );
            const participateData = await axios.get("/matchmaking/participate");

            if (participateData.data?.match?.player1?.name === playerName) {
                initDeck()
                    .then(() => navigate.push("/game"))
                    .catch(setError);// Redirect if match is made or player names match
            }

        } catch (error) {
            console.log("Erreur lors de l'acceptation de la requête :", error);
        }
    };

    return (
        <>
            <Navbar />

            {error && <p className="alert alert-danger">{error}</p>}

            <div className="container mt-5">
                <h2 className="mb-4">Matchmaking</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availablePlayers.map((player) => (
                            <tr key={player.matchmakingId}>
                                <td>{player.name}</td>
                                <td>{player.email || "-"}</td>
                                <td>
                                    {player.isSent ? (
                                        <button className="btn btn-outline-secondary" disabled>
                                            Requête Envoyée
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-secondary me-2"
                                            onClick={() => sendRequest(player.matchmakingId, player.name)}
                                        >
                                            Inviter à jouer
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {request.map((player) => (
                            <tr key={player.matchmakingId}>
                                <td>{player.name}</td>
                                <td></td>
                                <td>
                                    <button
                                        className="btn btn-outline-dark"
                                        onClick={() => acceptRequest(player.matchmakingId, player.name)}
                                    >
                                        Accepter
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
