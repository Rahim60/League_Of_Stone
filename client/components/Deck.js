import Carte from "./Cards";
import { View } from "react-native";

const Deck = ({ handleAjouterDeck, deck })=> {
  return (
    <View className="flex-1 justify-center items-center p-4">
        <View className="flex-row flex-wrap justify-center">
          {deck.map((champ) => (
            <View key={champ.id} className="p-2">
                <Carte info={champ} deplacer={handleAjoutADeck} />
            </View>
          ))}
        </View>
    </View>
  );
};

export default Deck;