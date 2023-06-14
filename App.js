import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import NavBar from "./Components/NavBar";
import { ResourceBar } from "./Components/ResourceBar";
import Forge from "./Routes/Forge";
import Production from "./Routes/Production";
import Hangar from "./Routes/Hangar";
import { StateProvider } from "./Data/StateProvider";
import EventBox from "./Components/EventBox";
import Mine from "./Routes/Mine";
import Parts from "./Routes/Parts";
import Base from "./Components/Base";
import { Patrol } from "./Routes/Patrol";

export default function App() {
  // const [gameData, setGameData] = useState({
  //   resources: {
  //     resourceName: {
  //       stock: num,
  //       perSecond: numAddsToStock
  //     }
  //   },
  //   parts: {
  //     engines: [
  //       engineNameShortId = {
  //         tier: num,
  //         statName: num,
  //         statName2: num,
  //       }
  //     ]
  //   },
  //   mechs: {
  //   }
  // })

  const [screen, setScreen] = useState("Mine");
  return (
    <StateProvider>
      <View style={styles.container}>
        <ResourceBar />
        <Base />

        <EventBox />
        {screen == "Mine" ? <Mine /> : <View />}
        {screen == "Forge" ? <Forge /> : <View />}
        {screen == "Parts" ? <Parts /> : <View />}
        {screen == "Mechs" ? <Hangar /> : <View />}
        {screen == "Patrol" ? <Patrol /> : <View />}
        <View style={styles.navWrapper}>
          <NavBar setScreen={setScreen} />
        </View>
      </View>
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  navWrapper: {
    position: "absolute",
    bottom: 0,
    width: vw(100),
  },
  resourceWrapper: {
    position: "absolute",
    top: 20,
    width: vw(100),
  },
});
