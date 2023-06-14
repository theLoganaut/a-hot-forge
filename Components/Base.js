import DynamBtn from "../Components/DynamBtn";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { GameContext } from "../Data/StateProvider";

const Base = () => {
  const { gameBaseStats } = useContext(GameContext);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: "4%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>
            Base; dur: {gameBaseStats.dur}| dps: {gameBaseStats.dps}
          </Text>
          <Text>hp bar</Text>
        </View>
        <View>
          <Text>Wave; dur: X | dps: X</Text>
          <Text>hp bar</Text>
        </View>
      </View>
      <Text style={{ alignSelf: "center" }}>death possibility</Text>
    </View>
  );
};

export default Base;
