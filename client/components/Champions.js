import { View } from "react-native";
import Carte from "./Cards";

export default function Champions({ champions, handleAjoutAChampions}) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="flex-row flex-wrap justify-center">
        {champions.map((champ) => (
          <View key={champ.id} className="p-2">
            <Carte info={champ} deplacer={handleAjoutAChampions} />
          </View>
        ))}
      </View>
    </View>
  );
}
