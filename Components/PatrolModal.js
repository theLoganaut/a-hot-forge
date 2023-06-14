import React, { useState, useContext, useEffect } from "react";
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
import SelectDropdown from "react-native-select-dropdown";

const Item = ({ stats, setTempPatrol, tempPatrol }) => {
  const [selected, setSelected] = useState(false);

  const addMech = (mechData) => {
    setSelected(!selected);
    setTempPatrol({ ...tempPatrol, mechs: [...tempPatrol.mechs, mechData] });
  };

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: "black",
          padding: 5,
          width: "100%",
          marginBottom: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: selected ? "gray" : "white",
          color: selected ? "gray" : "black",
        },
      ]}
    >
      <View>
        {Object.entries(stats.stats).map((stat) => {
          <Text>{`
        ${stat}`}</Text>;
        })}
      </View>

      <View>
        {Object.entries(stats.cost).map((cost) => {
          return <Text>{cost}</Text>;
        })}
      </View>

      <DynamBtn
        btnText={"✔️"}
        action={() => addMech(stats)}
        disabled={selected}
      />
    </View>
  );
};

const PatrolModal = ({
  setModalVisible,
  modalVisible,
  modalData,
  patrolGroups,
  setPatrolGroups,
}) => {
  let locations = ["Central", "North", "South", "East", "West"];

  const [tempPatrol, setTempPatrol] = useState({
    id: "tempId",
    location: "Central",
    mechs: [],
  });

  const [tempPatrolStats, setTempPatrolStats] = useState({
    dps: 0,
    dur: 0,
  });

  useEffect(() => {
    let tempStats = {
      dps: 0,
      dur: 0,
    };
    for (let i = 0; i < tempPatrol.mechs.length; i++) {
      tempStats = {
        dps: tempStats.dps + tempPatrol.mechs[i].stats.dps,
        dur: tempStats.dur + tempPatrol.mechs[i].stats.dur,
      };
    }
    setTempPatrolStats(tempStats);
  }, [tempPatrol]);

  const createNewPatrol = () => {
    setPatrolGroups([...patrolGroups, tempPatrol]);
    setTempPatrol({
      id: "tempId",
      location: "Central",
      mechs: [],
    });
    setModalVisible(!modalVisible);
  };

  const closeAndRefresh = () => {
    setTempPatrol({
      id: "tempId",
      location: "Central",
      mechs: [],
    });
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert("Modal has been closed.");
      //   setModalVisible(!modalVisible);
      // }}
      // styles={{ height: "100%" }}
    >
      <View style={[styles.centeredView, { height: "100%" }]}>
        <View style={[styles.modalView, { height: "70%", marginTop: "70%" }]}>
          <View>
            <DynamBtn
              action={closeAndRefresh}
              btnText={"✖"}
              buttonStyle={{
                position: "absolute",
                marginTop: "-14%",
                marginBottom: "15%",
                marginLeft: "30%",
                maxWidth: "45%",
                backgroundColor: "white",
              }}
            />
          </View>

          <Text> Patrol Stats </Text>
          <View style={{ flexDirection: "row" }}>
            <Text> dur: {tempPatrolStats.dur} </Text>
            <Text> dps: {tempPatrolStats.dps} </Text>
            <Text> max: 0/3 </Text>
          </View>

          <SelectDropdown
            buttonStyle={{
              backgroundColor: null,
              borderWidth: 1,
              borderColor: "black",
              alignSelf: "center",
              margin: 5,
            }}
            dropdownStyle={{
              height: "37%",
              padding: 10,
              borderBottomColor: null,
            }}
            rowStyle={{ borderTopWidth: 1, borderColor: "lightgray" }}
            defaultButtonText="select location"
            data={locations}
            onSelect={(selectedItem, index) => {
              setTempPatrol({ ...tempPatrol, location: selectedItem });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(locations, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return locations;
            }}
          />

          {modalData.length > 0 ? (
            <FlatList
              data={modalData}
              renderItem={({ item }) => (
                // ! STILL NEEDS TO HAVE A MAX
                <Item
                  stats={item}
                  setTempPatrol={setTempPatrol}
                  tempPatrol={tempPatrol}
                />
              )}
              keyExtractor={(item) => item.id}
              style={{ width: "80%", height: "50%", borderBottomWidth: 1 }}
            />
          ) : (
            <View>
              <Text>You dont have any Mechs</Text>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              position: "relative",
              padding: 5,
              margin: 5,
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginRight: "10%", padding: 10 }}>
              <DynamBtn btnText={"Cancel"} action={closeAndRefresh} />
            </View>
            <View style={{ marginLeft: "10%", padding: 10 }}>
              {/* //! STILL NEEDS TO FILTER MECHS FROM LIST */}
              <DynamBtn btnText={"Create"} action={createNewPatrol} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default PatrolModal;
