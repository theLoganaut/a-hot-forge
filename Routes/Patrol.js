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
import AsyncStorage from "@react-native-async-storage/async-storage";
import PatrolListItem from "../Components/PatrolListItem";
import PatrolModal from "../Components/PatrolModal";
import { tempMechs } from "../Data/tempData";

export const Patrol = () => {
  const { gameMechs, gameBaseStats, setGameBaseStats } =
    useContext(GameContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [patrolGroups, setPatrolGroups] = useState([
    {
      id: "123",
      location: "Central",
      stats: {
        dps: 75,
        dur: 30,
      },
      mechs: tempMechs,
    },
  ]);

  useEffect(() => {
    let tempTotals = {
      dps: 0,
      dur: 0,
    };
    for (let i = 0; i < patrolGroups.length; i++) {
      tempTotals = {
        dps: tempTotals.dps + patrolGroups[i].stats.dps,
        dur: tempTotals.dur + patrolGroups[i].stats.dur,
      };
    }
    setGameBaseStats(tempTotals);
  }, [patrolGroups]);

  return (
    <View style={{ height: "100%", maxHeight: vh(50) }}>
      <Text>Patrols run constantly.</Text>
      <DynamBtn
        btnText={"Add Patrol"}
        action={() => setModalVisible(!modalVisible)}
      />
      <PatrolModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        modalData={gameMechs}
        patrolGroups={patrolGroups}
        setPatrolGroups={setPatrolGroups}
      />
      <View style={{ overflow: "hidden", height: "85%", borderBottomWidth: 1 }}>
        {/* //TODO make this a scrollable */}
        <FlatList
          data={patrolGroups}
          renderItem={({ item }) => (
            <PatrolListItem
              patrolItem={item}
              // location={patrol.location}
              setPatrolGroups={setPatrolGroups}
              patrolGroups={patrolGroups}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {/* {patrolGroups.map((patrol) => {
            return (
              <PatrolListItem
                key={patrol.id}
                patrolItem={patrol}
                patrolGroups={patrolGroups}
                setPatrolGroups={setPatrolGroups}
              />
            );
          })} */}
      </View>
    </View>
  );
};
