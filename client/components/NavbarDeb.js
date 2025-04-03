import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const NavbarDeb = ({ action }) => {
    const navigation = useNavigation();

    return (
        <View className="bg-dark p-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">League Of Stones</Text>

          <View className="flex-row items-center">
            <Button
              title={action}
              className="border border-white text-white px-4 py-2 rounded"
              onPress={action === "Connexion" ? () => router.push("/") : () => router.push("/inscription")}
            />
          </View>
        </View>
    );
};

export default NavbarDeb;
