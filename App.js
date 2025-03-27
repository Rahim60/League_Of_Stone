// clientMobile/App.js
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./screens/index";  // ⬅ Importer Home

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Index />  /* ⬅ Afficher Home */
    </View>
  );
}