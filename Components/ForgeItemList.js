import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DynamBtn from "../Components/DynamBtn";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useContext, useEffect } from "react";
import { GameContext } from "../Data/StateProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgeItemList = ({ forgeName, forgeData, forgeLength }) => {
  const { setForgeLoads, setForgeTrigger, forgeLoads, gameRaw, setGameRaw } =
    useContext(GameContext);

  const fill = () => {
    // let tempMine = mineLoads[resourceName]?.load.push(1);
    // mineLoads[resourceName]?.load.push(1);

    // amount is either 1 or .5,

    // needs to add increment up to the max forge load, if not increment all game raw
    if (gameRaw[forgeName] >= forgeData.max) {
      setForgeLoads({
        ...forgeLoads,
        [forgeName]: {
          ...forgeLoads[forgeName],
          load: forgeLoads[forgeName].load + forgeData[forgeName].max,
        },
      });
      setGameRaw({
        ...gameRaw,
        [forgeName]: gameRaw[forgeName] - forgeData[forgeName].max,
      });
      setForgeTrigger(true);
    } else if (forgeData.cost <= gameRaw[forgeName] < forgeData.max) {
      setForgeLoads({
        ...forgeLoads,
        [forgeName]: {
          ...forgeLoads[forgeName],
          load: forgeLoads[forgeName].load + gameRaw[forgeName],
        },
      });
      setGameRaw({ ...gameRaw, [forgeName]: 0 });
      setForgeTrigger(true);
    }

    console.log(forgeLoads[forgeName].load);
  };

  useEffect(() => {
    // if (mineLoads[resourceName]?.load >= mineLoads[resourceName]?.max) {
    //   //! DISABLE THE BUTTON
    // } else {
    //   //! ENABLE BUTTON
    // }

    // counts each empty load, if that is equal to amt of objects in mineLength, disable, else enable
    for (forges in forgeLoads) {
      let emptyCount = 0;
      if (forges.load < 1) {
        emptyCount += 1;
      }
      if (emptyCount === forgeLength) {
        setForgeTrigger(false);
      }
    }
  }, [forgeLoads[forgeName]]);

  return (
    <View style={{ width: "15%", height: "100%" }}>
      <Text style={{ alignSelf: "center" }}>{forgeName}</Text>
      <View style={[styles.button, { width: "100%", height: "40%" }]}>
        {/* indiv bar completion meter*/}
      </View>
      {/* old -> new amounts */}
      <Text style={{ alignSelf: "center" }}>
        {forgeData.cost} → {forgeData.yield}
      </Text>
      {/* final yield */}
      <Text style={{ alignSelf: "center" }}>{forgeLoads[forgeName].load}</Text>
      {/* stats for mech load per tick and forge cost & time */}
      <Text style={{ alignSelf: "center" }}>Load/t</Text>
      <Text style={{ alignSelf: "center" }}>t/Smelt</Text>
      <DynamBtn
        btnText={"+Fill"}
        buttonStyle={{ height: "10%" }}
        action={fill}
      />
      {/* <DynamBtn btnText={"+1/2"} buttonStyle={{ height: "10%" }} /> */}
      <DynamBtn btnText={"+Mech"} buttonStyle={{ height: "10%" }} />
    </View>
  );
};

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

export default ForgeItemList;
