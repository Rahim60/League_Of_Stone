import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Utilisation de React Navigation
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = ({ title }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
    const getStoredName = async () => {
        const storedName = await AsyncStorage.getItem("name");
        if (storedName) {
        setUsername(storedName);
        }
    };
    getStoredName();
    }, []);

    const navigation = useNavigation(); // Utilisation de React Navigation

    const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.clear(); // Efface toutes les données stockées
    navigation.navigate("Connexion"); // Redirection vers l'écran "Connexion"
    };

return (
    <View className="bg-gray-900 text-white p-4 flex-row justify-between items-center">
    <Text className="text-xl font-bold text-white">League Of Stones</Text>
    {title && (
    <Text className="text-lg text-white">
      {title}
    </Text>
    )}

    {username && (
    <View className="flex-row items-center">
      <Text className="text-white font-semibold mr-3">{username}</Text>
      <Button title="Déconnexion" color="#dc2626" onPress={handleLogout} />
    </View>
    )}
    </View>
);
};

export default Navbar;
