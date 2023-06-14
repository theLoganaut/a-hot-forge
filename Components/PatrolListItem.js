import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GameContext } from "../Data/StateProvider";
import DynamBtn from "./DynamBtn";
import PartModal from "../Components/PartModal";

const PatrolListItem = ({ patrolItem, setPatrolGroups, patrolGroups }) => {
  const { gameMechs } = useContext(GameContext);

  const partType = "Mechs";

  const [modalVisible, setModalVisible] = useState(false);

  const [totalPatrolStats, setTotalPatrolStats] = useState({
    dps: 0,
    dur: 0,
  });

  // useEffect(() => {
  //   let tempStats = {
  //     dps: 0,
  //     dur: 0,
  //   };
  //   for (let i = 0; i < patrolItem.mechs.length; i++) {
  //     tempStats = {
  //       dps: tempStats.dps + patrolItem.mechs[i].stats.dps,
  //       dur: tempStats.dur + patrolItem.mechs[i].stats.dur,
  //     };
  //   }
  //   setTotalPatrolStats(tempStats);
  // }, [patrolItem]);

  const addMech = (mechData) => {
    // let patrol = patrolGroups.filter((patrol) => {return patrol.id == patrolId})
    // patrol.mechs.push(mechData)
    let toIndex = patrolGroups.findIndex(
      (patrol) => patrol.id == patrolItem.id
    );
    setPatrolGroups([
      ...patrolGroups,
      patrolGroups[toIndex].mechs.push(mechData),
    ]);
  };

  return (
    <View style={[styles.wrapper, { width: "100%", marginBottom: "-6%" }]}>
      <PartModal
        errorType={partType}
        modalData={gameMechs}
        setModalVisible={setModalVisible}
        modalFunction={addMech}
        modalVisible={modalVisible}
      />
      {/* indiv item wrapper */}
      <View style={[{ width: "100%" }]}>
        {/* info box */}
        <View style={[{ alignItems: "center", marginBottom: "-4%" }]}>
          {/* info box top, mine name  */}

          <Text>{patrolItem.location}</Text>
        </View>
        <View style={[styles.rowWrap, { justifyContent: "space-around" }]}>
          {/* the list of mechs */}

          <View
            style={[
              { flex: 4, alignItems: "center", justifyContent: "center" },
              styles.border,
              styles.rowWrap,
            ]}
          >
            {patrolItem.mechs.map((mech) => {
              return (
                <View
                  style={[
                    styles.border,
                    {
                      padding: 3,
                      margin: 2,
                      alignItems: "center",
                      alignSelf: "center",
                    },
                  ]}
                >
                  <Text>dps: {mech.stats.dps}</Text>
                  <Text>dur: {mech.stats.dur}</Text>
                </View>
              );
            })}
          </View>
          {/* the buttons to change patrol */}
          <View
            style={[
              styles.border,
              { flex: 1.5, justifyContent: "center", alignItems: "center" },
            ]}
          >
            {/* info box data */}
            <Text>dur: {totalPatrolStats.dur}</Text>
            <Text>dps: {totalPatrolStats.dps}</Text>
            <Text>3/3</Text>
          </View>
          <View>
            <DynamBtn
              btnText={"+Mech"}
              action={() => setModalVisible(!modalVisible)}
            />
            <DynamBtn btnText={"Edit Ptrl"} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flexDirection: "row",
    padding: "2%",
    width: "100%",
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttons: {
    paddingLeft: "5%",
  },
  rowWrap: {
    position: "relative",
    flexDirection: "row",
    padding: "5%",
  },
  rightWrap: {
    position: "relative",
    justifyContent: "space-between",
    height: "100%",
  },
});

export default PatrolListItem;
