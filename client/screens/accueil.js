import { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Champion from "../components/Champions";
import Deck from "../components/Deck";
import Navbar from "../components/Navbar";
import axios from "axios";


export default function Accueil() {
  const [champions, setChampion] = useState([]);
  const [deck, setDeck] = useState([]);
  const navigation = useNavigation();

    useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const name = await AsyncStorage.getItem("name");
      if (!token || !name) {
        Alert.alert("Non connecté", "Vous allez être redirigé vers la connexion");
        navigation.navigate("Connexion");
      }
    };
    checkAuth();
    axios
      .get(`/cards`)
      .then(({ data }) => setChampion(data))
      .catch((err) => console.log(err));
    }, [navigation]);

    const deplacer = (newChamp) => {
        if (deck.length < 20) {
          setChampion((prevChampions) => prevChampions.filter((champ) => champ.id !== newChamp.id));
          setDeck((prevDeck) => [...prevDeck, newChamp]);
        }
      };

    const supprimer = (delChamp) => {
        setDeck((prevDeck) => prevDeck.filter((champ) => champ.id !== delChamp.id));
        setChampion((prevChampions) => [...prevChampions, delChamp]);
    };

    const handleSubmitDeck = async () => {
        await AsyncStorage.setItem("deck", JSON.stringify(deck));
        navigation.navigate("ConfDeck");
    };
    return (
    <View className="flex-1 bg-gray-900">
      <Navbar title={""} />

      <View className="flex-1 flex-row">
        {/* Section Champions */}
        <View className="flex-1 p-5 border-r border-gray-700">
          <Text className="text-orange-500 text-center text-lg font-bold mb-3">Les champions disponibles</Text>
          <ScrollView>
            <Champion champions={champions} handleAjoutAChampions={deplacer} />
          </ScrollView>
        </View>

        {/* Section Deck */}
        <View className="flex-1 p-5">
          <Text className="text-white text-center text-lg font-bold mb-3">Mon deck</Text>

          <View className="text-center mt-3">
            <Text className="text-white">Cartes dans le deck : {deck.length}/20</Text>
          </View>

          <ScrollView>
            <Deck deck={deck} handleAjoutADeck={supprimer} />
          </ScrollView>

          {deck.length >= 20 && (
            <View className="text-center mt-3">
              <Button title="Valider Selection" color="#28a745" onPress={handleSubmitDeck} />
            </View>
          )}
        </View>
      </View>
    </View>
);
}

