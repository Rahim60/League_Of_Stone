import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
//import MatchMakingAccept from ./MatchMakingAccept;

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
        <View className="p-4 flex-1 justify-center items-center">
            {!isParticipating ? (
                <Button
                    onPress={rejoindreMatchmaking}
                    title={loading ? "Chargement..." : isAuthenticated ? "Rejoindre le matchmaking" : "Veuillez vous connecter d'abord"}
                    disabled={!isAuthenticated || loading}
                    className="bg-blue-500 p-4 rounded"
                />
            ) : (
                <Button
                    onPress={quitterMatchmaking}
                    title="Quitter le matchmaking"
                    className="bg-red-500 p-4 rounded"
                />
            )}

            {isParticipating && matchmakingId && (
                <View className="mt-3 p-3 border rounded bg-light">
                    <Text className="font-bold">Votre ID de matchmaking: {matchmakingId}</Text>
                    <Text className="font-semibold">Demandes reçues :</Text>
                    {requests.length > 0 ? (
                        <FlatList
                            data={requests}
                            keyExtractor={(item) => item.userId.toString()}
                            renderItem={({ item }) => (
                                <View className="flex-row justify-between p-2 border-b">
                                    <View>
                                        <Text className="font-bold">{item.name} veut jouer avec vous!</Text>
                                        <Text className="text-sm">ID Utilisateur: {item.userId} | ID Matchmaking: {item.matchmakingId}</Text>
                                    </View>
                                    <View>
                                        {/* <MatchMakingAccept matchmakingId={item.matchmakingId}/> */}
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                        <Text className="text-muted">Aucune demande pour le moment. En attente de joueurs...</Text>
                    )}
                </View>
            )}
        </View>
    );
}
