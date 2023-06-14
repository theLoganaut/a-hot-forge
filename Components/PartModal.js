import React, { useState, useContext } from "react";
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

const Item = ({ stats, action }) => (
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

    <DynamBtn btnText={"✔️"} action={action} />
  </View>
);

const PartModal = ({
  modalData,
  setModalVisible,
  modalVisible,
  modalFunction,
  errorType,
}) => {
  // console.log(modalData);
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        // setModalVisible(!modalVisible);
      }}
      // styles={{ height: "100%" }}
    >
      <View style={[styles.centeredView, { height: "100%" }]}>
        <View style={[styles.modalView, { height: "70%", marginTop: "70%" }]}>
          <View>
            <DynamBtn
              action={() => setModalVisible(!modalVisible)}
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

          {modalData.length > 0 ? (
            <FlatList
              data={modalData}
              renderItem={({ item }) => (
                <Item stats={item} action={() => modalFunction(item)} />
              )}
              keyExtractor={(item) => item.id}
              style={{ width: "80%", height: "50%", borderWidth: 2 }}
            />
          ) : (
            <View>
              <Text>You dont have any {errorType}</Text>
            </View>
          )}
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

export default PartModal;
