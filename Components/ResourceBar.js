import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  SectionList,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { GameContext } from "../Data/StateProvider";
import DynamBtn from "../Components/DynamBtn";

const HeaderItem = ({ title, data }) => (
  <View style={[styles.item, { flexDirection: "column" }]}>
    <Text style={styles.title}>{title}</Text>
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}
    >
      {data.map((shard) => {
        return (
          <View
            key={shard[0]}
            style={{
              padding: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{}}>{shard[0]}</Text>
            {Number.isInteger(shard[1]) === true ? (
              <Text
                style={{ padding: 5, alignItems: "center" }}
              >{`${shard[1]}`}</Text>
            ) : (
              <Text
                style={{ padding: 5, alignItems: "center" }}
              >{`${shard[1].length}`}</Text>
            )}
          </View>
        );
      })}
    </View>
  </View>
);

export const ResourceBar = () => {
  const { gameRaw, gameParts, gameMechs, gameSmelted } =
    useContext(GameContext);

  const [isModalVisible, setModalVisible] = useState(false);

  const [partTransform, setPartTransform] = useState();

  const toggleDropdown = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setSectionData([
      {
        title: "Raw Mats",
        data: Object.entries(gameRaw),
      },
      {
        title: "Smelted Mats",
        data: Object.entries(gameSmelted),
      },
      {
        title: "Parts",
        data: Object.entries(gameParts),
      },
    ]);
  }, [gameRaw, gameParts, gameSmelted]);

  const [sectionData, setSectionData] = useState([
    {
      title: "Raw Mats",
      data: Object.entries(gameRaw),
    },
    {
      title: "Smelted Mats",
      data: Object.entries(gameSmelted),
    },
    {
      title: "Parts",
      data: Object.entries(gameParts),
    },
  ]);

  return (
    <View style={isModalVisible ? styles.expanded : styles.expandable}>
      <View style={styles.resourceCol}>
        <View style={styles.resourceRow}>
          <Text style={{ overflow: "visible" }}>
            <MaterialCommunityIcons name="excavator" size={16} color="black" />#
            {gameRaw.scrap}
          </Text>
          <Text>
            <FontAwesome5 name="drum-steelpan" size={16} color="black" />&
            {gameRaw.ore}
          </Text>
          <Text>*{gameRaw.waste}</Text>
          <Text>
            <AntDesign name="CodeSandbox" size={16} color="black" />@
            {gameRaw.sand}
          </Text>
        </View>
        <FlatList
          style={{ marginTop: "20%" }}
          data={sectionData}
          renderItem={({ item }) => (
            <HeaderItem key={item.title} title={item.title} data={item.data} />
          )}
          keyExtractor={(item) => item.index}
        />
        <DynamBtn
          buttonStyle={{
            height: "auto",
            width: "20%",
            // top: "4%",
            marginTop: isModalVisible ? "5%" : "-3%",
            alignSelf: "center",
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 1,
          }}
          btnText={isModalVisible ? "up" : "down"}
          action={toggleDropdown}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expandable: {
    position: "absolute",
    height: "10%",
    borderColor: "black",
    borderWidth: 1,
    padding: "5%",
    width: "100%",
    zIndex: 10,
    top: 0,
    alignSelf: "center",
    backgroundColor: "white",
    overflow: "visible",
    marginBottom: "50%",
  },
  expanded: {
    position: "absolute",
    height: "auto",
    maxHeight: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: "5%",
    width: "100%",
    zIndex: 10,
    top: 0,
    alignSelf: "center",
    backgroundColor: "white",
    overflow: "visible",
    marginBottom: "50%",
  },
  resourceRow: {
    position: "absolute",
    height: "auto",
    width: "100%",
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-evenly",
    alignSelf: "center",
    overflow: "visible",
    marginTop: "4%",
  },
  row: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    position: "relative",
    padding: 4,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 18,
  },
});
