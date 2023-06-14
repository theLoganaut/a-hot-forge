import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DynamBtn from "../Components/DynamBtn";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useContext, useState } from "react";
import { GameContext } from "../Data/StateProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgeItemList from "../Components/ForgeItemList";

function Forge() {
  const { setForgeLoads, forgeLoads, setForgeTrigger } =
    useContext(GameContext);

  const transformer = Object.entries(forgeLoads);
  return (
    <View style={{ height: "100%", maxHeight: vh(50) }}>
      <Text>Welcome to the forge</Text>
      <View
        style={[
          styles.button,
          {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          },
        ]}
      >
        {/* {
          forgeLoads.map((forge, key) => {
            return <ForgeItemList key={key} forgeItem={forge} />;
          })
        } */}
        {transformer?.map((forge, index) => {
          return (
            <ForgeItemList
              key={index}
              forgeData={forge[1]}
              forgeName={forge[0]}
              forgeLength={transformer.length}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flexDirection: "row",
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
  },
});

export default Forge;
