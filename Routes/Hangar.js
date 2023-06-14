import React, { useState, useContext, useEffect, useTransition } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  SafeAreaView,
  VirtualizedList,
} from "react-native";
import DynamBtn from "../Components/DynamBtn";
import { vh } from "react-native-expo-viewport-units";
import { GameContext } from "../Data/StateProvider";
import PartModal from "../Components/PartModal";

export const Hangar = () => {
  const [isPending, startTransition] = useTransition();
  const [mechParts, setMechParts] = useState({
    arms: null,
    chassis: null,
    processors: null,
    engines: null,
    locomotion: null,
  });
  const { gameParts, setMechQueue, mechQueue } = useContext(GameContext);
  const [partType, setPartType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [UIStats, setUIStats] = useState({ dur: 0, dps: 0, prd: 0 });
  const [UICosts, setUICosts] = useState({ iron: 0, gunpowder: 0, silicon: 0 });
  const [makeTime, setMakeTime] = useState(0);
  useEffect(() => {
    let totalStats = { dur: 0, dps: 0, prd: 0 };
    let totalCosts = { iron: 0, gunpowder: 0, silicon: 0 };
    let createTime = 0;
    const baseCosts = { iron: 16, gunpowder: 16, silicon: 14 };

    for (parts in mechParts) {
      if (mechParts[parts] !== null) {
        for (stat in mechParts[parts].stats) {
          totalStats = {
            ...totalStats,
            [stat]: totalStats[stat] + mechParts[parts].stats[stat],
          };
        }
        for (cost in mechParts[parts].cost) {
          // console.log(mechParts[parts].cost[cost]);
          totalCosts = {
            ...totalCosts,
            [cost]: totalCosts[cost] + mechParts[parts].cost[cost],
          };
          createTime = createTime + mechParts[parts].cost[cost];
        }
      }
    }
    setUIStats(totalStats);
    setUICosts(totalCosts);
    setMakeTime(Math.round(createTime / 2));
    //! still needs to compare it to the base, and give chance to overload

    // console.log(totalStats);
    //enable disable creation
    // let partArray = Object.values(mechParts);
    // let i = 0;
    // let count = 0;
    // while (i < partArray.length) {
    //   if (partArray[i] == null) {
    //     count++;
    //   }
    //   i += 1;
    // }
    // if (count == 0) {
    //   setEnableCreate(true);
    // }
  }, [mechParts]);

  const openPartSelector = (partString) => {
    setPartType(partString);
    setModalData(gameParts[partString]);
    setModalVisible(!modalVisible);
    console.log(partString);
  };

  const changeMechParts = (part) => {
    startTransition(() => {
      setMechParts({ ...mechParts, [partType]: part });
    });
    setModalVisible(!modalVisible);
  };

  const sendToCreation = () => {
    let newMech = {
      // id: uuid.v4(),
      parts: mechParts,
      cost: UICosts,
      stats: UIStats,
      time: makeTime,
    };
    setMechQueue([...mechQueue, newMech]);
    setMechParts({
      arms: null,
      chassis: null,
      processors: null,
      engines: null,
      locomotion: null,
    });
    //* calls the game state that adds it to the mech queue
  };

  return (
    <View
      style={{
        height: "100%",
        maxHeight: vh(50),
      }}
    >
      <PartModal
        errorType={partType}
        modalData={modalData}
        setModalVisible={setModalVisible}
        modalFunction={changeMechParts}
        modalVisible={modalVisible}
      />
      <View style={styles.row}>
        <View style={{ alignSelf: "center" }}>
          <Text>DUR</Text>
          <Text>{`${UIStats.dur}`}</Text>
          <Text>ir: {UICosts.iron}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text>DPS</Text>
          <Text>{UIStats.dps}</Text>
          <Text>gp: {UICosts.gunpowder}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text>PRD</Text>
          <Text>{UIStats.prd}</Text>
          <Text>si: {UICosts.silicon}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <DynamBtn
          btnText={`ARM ${mechParts.arms !== null ? "out" : "in"}`}
          action={() => openPartSelector("arms")}
        />
        <DynamBtn
          btnText={`CPU ${mechParts.processors !== null ? "out" : "in"}`}
          action={() => openPartSelector("processors")}
        />

        <DynamBtn
          btnText={`CHS ${mechParts.chassis !== null ? "out" : "in"}`}
          action={() => openPartSelector("chassis")}
        />
      </View>
      <View style={styles.row}>
        <DynamBtn
          btnText={`ENG ${mechParts.engines !== null ? "out" : "in"}`}
          action={() => openPartSelector("engines")}
        />
        <DynamBtn
          btnText={`LOC ${mechParts.locomotion !== null ? "out" : "in"}`}
          action={() => openPartSelector("locomotion")}
        />
      </View>
      <View style={styles.row}>
        <DynamBtn btnText={"Create Mech"} action={sendToCreation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  col: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
});

export default Hangar;
