import { View, Text, Image, TouchableOpacity } from "react-native";
import Champion from "./Champions";

export default function Carte({ info, deplacer }) {
    const champchoisie=()=>{

    }
    return (
        <TouchableOpacity
          className="m-3 shadow-lg rounded-xl bg-white w-72"
          onPress={() => {deplacer(info);}}
        >
          <Image
            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.key}_0.jpg` }}
            className="w-full h-48 rounded-t-xl"
          />

          {/* Nom du champion */}
          <View className="p-4">
            <Text className="text-lg font-bold text-center">{info.name}</Text>
          </View>

          {/* Infos Attack & Defense */}
          <View className="border-t border-gray-300 p-4">
            <Text className="text-gray-700"> Attack: {info.info.attack}</Text>
            <Text className="text-gray-700"> Defense: {info.info.defense}</Text>
          </View>
        </TouchableOpacity>
      );
}
